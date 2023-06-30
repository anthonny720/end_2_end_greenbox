from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.utils import timezone
from simple_history.models import HistoricalRecords

from apps.collection.models import Product as RawMaterial
from apps.logistic.models import Lot
from apps.management.models import Categories, Suppliers, TaxRates, Customer, Outsourcing, Condition, Family, SubFamily, \
    Cut, Packing
from apps.production.models import MOD


# Create your models here.

class Records(models.Model):
    lot = models.OneToOneField(Lot, on_delete=models.PROTECT, verbose_name="Lote", related_name="record")
    price_camp = models.DecimalField(decimal_places=2, max_digits=4, default=0, verbose_name="Precio Campo", blank=True,
                                     null=True)
    freight = models.DecimalField(decimal_places=4, max_digits=9, default=0, blank=True, null=True,
                                  verbose_name="Flete")

    history = HistoricalRecords()

    class Meta:
        verbose_name = "Registro Materia Prima"
        verbose_name_plural = "Registro de Materia Prima"
        ordering = ["-lot__entry_date"]

    def __str__(self):
        return self.lot.lot




class ItemsProxy(models.Model):
    class Meta:
        ordering = ["name"]
        abstract = True

    name = models.CharField(max_length=200, verbose_name="Nombre")
    group = models.ForeignKey(Categories, verbose_name='Grupo de producto', blank=True, null=True,
                              on_delete=models.PROTECT, related_name='%(class)s_group')
    unit_of_measurement = models.ForeignKey(Categories, verbose_name='Unidad de medida', blank=True, null=True,
                                            on_delete=models.PROTECT, related_name='%(class)s_unit')
    price = models.DecimalField(verbose_name='Precio', max_digits=6, decimal_places=3, default=0, blank=False)
    information = models.TextField(verbose_name='Información adicional', blank=True
                                   )

    def __str__(self):
        return self.name


class Material(ItemsProxy):
    class Meta:
        verbose_name = 'Material'
        verbose_name_plural = 'Materiales'

    code = models.CharField(max_length=10, verbose_name='Código')
    sap = models.CharField(max_length=10, verbose_name='Código SAP')
    supplier = models.ForeignKey(Suppliers, verbose_name='Proveedor', blank=False, null=False, on_delete=models.PROTECT,
                                 related_name='material_supplier')
    minimum_quantity=models.DecimalField(verbose_name='Cantidad mínima de pedido',max_digits=7,decimal_places=2,blank=True,null=True)
    booked = models.DecimalField(verbose_name='Reservado',max_digits=7,decimal_places=2,blank=True,null=True)


class Product(ItemsProxy):
    class Meta:
        verbose_name = 'Producto'
        verbose_name_plural = 'Productos'

    class CategoryChoices(models.TextChoices):
        A = 'a', 'A'
        B = 'b', 'B'
        C = 'c', 'C'

    raw_material = models.ForeignKey(RawMaterial, on_delete=models.PROTECT, verbose_name='Materia Prima')
    condition = models.ForeignKey(Condition, on_delete=models.PROTECT, verbose_name='Condición')
    family = models.ForeignKey(Family, on_delete=models.PROTECT, verbose_name='Familia')
    subfamily = models.ForeignKey(SubFamily, on_delete=models.PROTECT, verbose_name='Sub Familia')
    cut = models.ForeignKey(Cut, on_delete=models.PROTECT, verbose_name='Corte')
    packing = models.ForeignKey(Packing, on_delete=models.PROTECT, verbose_name='Empaque')
    category = models.CharField(max_length=1, verbose_name='Categoría', choices=CategoryChoices.choices,
                                default=CategoryChoices.A)
    net_weight = models.DecimalField(verbose_name='Peso neto envase', max_digits=5, decimal_places=3, default=0,
                                     blank=False)

    performance = models.DecimalField(verbose_name='% Rendimiento', max_digits=3, decimal_places=1, default=0,
                                      blank=False)
    capacity = models.IntegerField(verbose_name='Capacidad', default=0, blank=False)
    recipe = models.ManyToManyField(Material, related_name='products_recipes', verbose_name='Recetario',
                                    through='Recipe')

    def save(
            self, *args, **kwargs
    ):
        self.name = self.raw_material.name + " " + self.condition.name + " " + self.family.name + " " + self.subfamily.name + " " + self.cut.name + " " + self.packing.name + str(self.net_weight) + " kg " + self.category
        return self.save(*args, *kwargs)


class Stock(models.Model):
    class Meta:
        verbose_name = 'Stock'
        verbose_name_plural = 'Stock'
        unique_together = ['date', 'product']

    date = models.DateField(verbose_name='Fecha', default=timezone.now)
    quantity = models.IntegerField(verbose_name='Cantidad de stock')
    product = models.ForeignKey(Material, on_delete=models.PROTECT, related_name='stocks')

    def __str__(self):
        return f'Stock: {self.product.name} - {self.quantity} und'

    def get_unit_price(self):
        total_cost = 0
        total_quantity = 0

        stock_entries = self.product.stock_entries.all()
        for entry in stock_entries:
            total_cost += entry.quantity * entry.product.price
            total_quantity += entry.quantity

        if total_quantity > 0:
            unit_price = total_cost / total_quantity
            return unit_price

        return 0


class StockEntry(models.Model):
    product = models.ForeignKey(Material, on_delete=models.PROTECT, related_name='stock_entries')
    date = models.DateField(verbose_name='Fecha')
    quantity = models.IntegerField(verbose_name='Cantidad de ingreso')

    def __str__(self):
        return f'Ingreso de {self.quantity} unidades de {self.product} el {self.date}'

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        # Actualizar el stock después de guardar el ingreso
        stock, _ = Stock.objects.get_or_create(product=self.product, date=self.date)
        stock.quantity += self.quantity
        stock.save()


class StockExit(models.Model):
    product = models.ForeignKey(Material, on_delete=models.PROTECT, related_name='stock_exits')
    date = models.DateField(verbose_name='Fecha')
    quantity = models.IntegerField(verbose_name='Cantidad de salida')

    def __str__(self):
        return f'Salida de {self.quantity} unidades de {self.product} el {self.date}'

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        # Actualizar el stock después de guardar la salida
        stock, _ = Stock.objects.get_or_create(product=self.product, date=self.date)
        stock.quantity -= self.quantity
        stock.save()


class Recipe(models.Model):
    class Meta:
        verbose_name = 'Recetario'
        verbose_name_plural = 'Recetario'

    product = models.ForeignKey(Product, on_delete=models.PROTECT, related_name='recipe_products',
                                verbose_name='Producto')
    material = models.ForeignKey(Material, on_delete=models.PROTECT, related_name='recipe_materials',
                                 verbose_name='Material')
    quantity = models.DecimalField(verbose_name='Cantidad', max_digits=12, decimal_places=10)
    price = models.DecimalField(verbose_name='Precio', max_digits=7, decimal_places=2)

    def __str__(self):
        return str(self.id)


class Purchase(models.Model):
    class StatusChoices(models.TextChoices):
        OPEN = 'pending', 'Pendiente'
        DONE = 'done', 'Finalizado'

    class Meta:
        verbose_name = 'Compra'
        verbose_name_plural = 'Compras'
        ordering = ['-created_date']
        unique_together = ('order_id', 'supplier',)

    supplier = models.ForeignKey(Suppliers, on_delete=models.PROTECT, related_name='purchases_supplier',
                                 verbose_name='Proveedor')
    order_id = models.CharField(max_length=15, blank=False, null=False, verbose_name='ID del pedido')
    order_date = models.DateField(verbose_name='Fecha de la orden', default=timezone.now)
    invoice_id = models.CharField(max_length=15, blank=True, null=True, verbose_name='ID de la factura')
    created_date = models.DateField(verbose_name='Fecha de creación', auto_now=True)
    shipment_date = models.DateField(verbose_name='Fecha de envío', blank=True, null=True)
    arrival_date = models.DateField(verbose_name='Fecha de llegada', blank=True, null=True)
    items = models.ManyToManyField(Material, related_name='purchases_items', verbose_name='Artículos',
                                   through='PurchaseItems')
    comment = models.TextField(verbose_name='Información adicional', blank=True)
    tax_rate = models.ForeignKey(TaxRates, verbose_name='Impuesto', related_name='purchases_tax',
                                 on_delete=models.PROTECT)
    status = models.CharField(
        max_length=20,
        choices=StatusChoices.choices,
        default=StatusChoices.OPEN,
        verbose_name='Estado'
    )
    drive = models.URLField(verbose_name='Drive URL')

    def __str__(self):
        return self.order_id


class PurchaseItems(models.Model):
    class Meta:
        verbose_name = 'Artículo de compra'
        verbose_name_plural = 'Artículos de compra'
        ordering = ['-id']

    purchase = models.ForeignKey(Purchase, verbose_name='Orden de compra', on_delete=models.PROTECT,
                                 related_name='items_purchase')
    material = models.ForeignKey(Material, verbose_name='Material', on_delete=models.PROTECT,
                                 related_name='items_material')
    quantity = models.IntegerField(verbose_name='Cantidad', default=0)
    stock = models.IntegerField(verbose_name='Stock', default=0)
    price_per_unit = models.DecimalField(verbose_name='Precio unitario', max_digits=7, decimal_places=2)
    total_price = models.DecimalField(verbose_name='Precio total', max_digits=8, decimal_places=2)

    def __str__(self):
        return str(self.id)

    def save(self, *args, **kwargs):
        try:
            total_price = (self.quantity * self.price_per_unit)
            tax = total_price * (self.purchase.tax_rate.rate / 100)
            self.total_price = total_price + tax
        except:
            self.total_price = 0
        super().save(*args, **kwargs)


class SalesOrder(models.Model):
    class Meta:
        verbose_name = 'Orden de venta'
        verbose_name_plural = 'Ordenes de venta'
        ordering = ['-month', '-year']

    class MarketChoices(models.TextChoices):
        NATIONAL = 'national', 'Nacional'
        INTERNATIONAL = 'international', 'Internacional'

    class ManagementChoices(models.TextChoices):
        ONE = '30', '30 %'
        TWO = '60', '60 %'
        THREE = '90', '90 %'
        FOUR = '100', '100 %'

    class DeliveryChoices(models.TextChoices):
        PENDING = 'pending', 'Pendiente'
        PROCESS = 'process', 'Proceso'
        DELIVERED = 'delivered', 'Enviado'

    month = models.CharField(max_length=15, blank=False, null=False, verbose_name='Mes')
    year = models.CharField(max_length=4, blank=False, null=False, verbose_name='Año')
    customer = models.ForeignKey(Customer, on_delete=models.PROTECT, related_name='sales_orders_customer',
                                 verbose_name='Cliente')
    order_id = models.CharField(max_length=15, blank=False, null=False, verbose_name='Orden de compra')
    order_date = models.DateField(verbose_name='Fecha de la orden', default=timezone.now)
    quote_id = models.CharField(max_length=15, blank=False, null=False, verbose_name='Proforma Invoice')
    full_container_load_name = models.CharField(max_length=50, blank=True, null=False,
                                                verbose_name='Nombre del contenedor')
    process_plant = models.ForeignKey(Outsourcing, on_delete=models.PROTECT, related_name='sales_orders_process_plant',
                                      verbose_name='Planta de proceso')
    sku = models.ForeignKey(Product, on_delete=models.PROTECT, verbose_name='SKU', related_name='sales_order_sku')
    quantity = models.DecimalField(verbose_name='Cantidad', max_digits=8, decimal_places=2, default=0)
    price_per_unit = models.DecimalField(verbose_name='Precio unitario', max_digits=4, decimal_places=2)

    market = models.CharField(max_length=13,
                              choices=MarketChoices.choices,
                              default=MarketChoices.NATIONAL,
                              verbose_name='Mercado')
    raw_material = models.DecimalField(verbose_name='Materia Prima', max_digits=9, decimal_places=2, default=0,
                                       blank=True)
    performance = models.DecimalField(verbose_name='Rendimiento', max_digits=4, decimal_places=2, default=0, blank=True)
    capacity = models.DecimalField(verbose_name='Capacidad', max_digits=9, decimal_places=2, default=0, blank=True)
    start_date = models.DateField(verbose_name='Fecha de inicio', blank=True)
    finish_date = models.DateField(verbose_name='Fecha de finalización', blank=True)
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    shipping_date = models.DateField(verbose_name='Fecha de envío', blank=True)
    etd = models.DateField(verbose_name='Tiempo estimado de salida', blank=True)
    eta = models.DateField(verbose_name='Tiempo estimado de salida', blank=True)
    tax_rate = models.ForeignKey(TaxRates, verbose_name='Impuesto', related_name='sales_order_tax',
                                 on_delete=models.PROTECT)
    total_price = models.DecimalField(verbose_name='Precio total', max_digits=8, decimal_places=2, blank=True)
    management = models.CharField(choices=ManagementChoices.choices, max_length=3, default=ManagementChoices.ONE)
    delivery = models.CharField(choices=DeliveryChoices.choices, max_length=9, default=DeliveryChoices.PENDING)
    drive = models.URLField(verbose_name='Drive URL')

    def __str__(self):
        return self.order_id

    def save(self, *args, **kwargs):
        try:
            total_price = (self.quantity * self.price_per_unit)
            tax = total_price * (self.tax_rate.rate / 100)
            self.total_price = total_price + tax
            self.raw_material = self.quantity / (self.performance / 100)
        except:
            self.total_price = 0
            self.raw_material = 0
        super().save(*args, **kwargs)


@receiver(pre_save, sender=SalesOrder)
def my_model_pre_save(sender, instance, **kwargs):
    if not instance.id:  # Verificar si es un nuevo registro
        instance.performance = instance.sku.performance
        instance.capacity = instance.sku.capacity
