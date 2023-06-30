from _decimal import Decimal

from django.contrib.auth import get_user_model
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from simple_history.models import HistoricalRecords

from apps.collection.models import Provider, Product, Parcel
from apps.management.models import Transport, Outsourcing, Location, StorageArea

User = get_user_model()


# Create your models here.


class Boxes(models.Model):
    name = models.CharField(max_length=100, verbose_name="Nombre")
    weight = models.DecimalField(max_digits=4, decimal_places=2, verbose_name="Peso")
    history = HistoricalRecords()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Gestión de jaba'
        verbose_name_plural = 'Gestión de jabas'


class Pallets(models.Model):
    name = models.CharField(max_length=100, verbose_name="Nombre")
    weight = models.DecimalField(max_digits=4, decimal_places=2, verbose_name="Peso")
    history = HistoricalRecords()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Gestión de pallet'
        verbose_name_plural = 'Gestión de pallets'


class Motions(models.Model):
    class Meta:
        verbose_name = 'Movimiento de jabas'
        verbose_name_plural = 'Movimiento de jabas'
        ordering = ['date']

    description = models.CharField(max_length=100, verbose_name="Descripción")
    origin = models.ForeignKey(Location, on_delete=models.PROTECT, related_name="origin_kardex_boxes",
                               verbose_name="Origen")
    destination = models.ForeignKey(Location, on_delete=models.PROTECT, related_name="destination_kardex_boxes",
                                    verbose_name="Destino")
    quantity = models.IntegerField(verbose_name="Cantidad")
    date = models.DateField(verbose_name="Fecha", auto_now_add=True)
    history = HistoricalRecords()

    def __str__(self):
        return self.description + ' - ' + str(self.date) + ' - ' + str(self.quantity)


class Lot(models.Model):
    class Condition(models.TextChoices):
        ORGANIC = 'O', 'Orgánico'
        CONVENTIONAL = 'C', 'Convencional'
        BIOSUISSE = 'B', 'Biosuisse'
        ENDOSE = 'E', 'Endose'
        JAS = 'J', 'Jas'
        FAIRTRADE = 'F', 'Fairtrade'
        BIOSUISSE_FAIRTRADE = 'BF', 'Biosuisse/Fairtrade'
        CONVENTIONAL_FAIRTRADE = 'CF', 'Convencional/Fairtrade'
        ORGANIC_BIOSUISSE = 'OB', 'Orgánico/Biosuisse'
        ORGANIC_JAS = 'OJ', 'Orgánico/Jas'
        ORGANIC_BIOSUISSE_FAIRTRADE = 'OBF', 'Orgánico/Biosuisse/Fairtrade'
        ORGANIC_JAS_FAIRTRADE = 'OJF', 'Orgánico/Jas/Fairtrade'

    maquila = models.ForeignKey(Outsourcing, on_delete=models.CASCADE, null=True, blank=True,
                                verbose_name="Packing")
    product = models.ForeignKey(Product, on_delete=models.PROTECT, related_name="product_lot", verbose_name="Producto")
    provider = models.ForeignKey(Provider, on_delete=models.PROTECT, related_name="provider_lot",
                                 verbose_name="Proveedor")
    parcel = models.ManyToManyField(Parcel, related_name="parcel_lot", verbose_name="Parcelas", blank=True)
    carrier_guide = models.CharField(max_length=12, verbose_name="Guia de transporte")
    provider_guide = models.CharField(max_length=12, verbose_name="Guia de proveedor")
    drive = models.URLField(verbose_name="Drive", blank=True)
    invoice = models.CharField(max_length=100, blank=True, null=True, verbose_name='Factura')
    entry_date = models.DateTimeField(verbose_name="Fecha de entrada")
    departure_date = models.DateTimeField(verbose_name="Fecha de inicio de partida", blank=True, null=True)
    download_date = models.DateField(verbose_name="Fecha de descarga")
    guide_weight = models.DecimalField(decimal_places=3, max_digits=11, default=0, blank=True, null=True,
                                       verbose_name="Peso Guia")

    condition = models.CharField(max_length=12, choices=Condition.choices, default=Condition.CONVENTIONAL,
                                 verbose_name="Condición")
    variety = models.CharField(max_length=100, verbose_name="Variedad", blank=True, null=True)
    origin = models.CharField(max_length=100, verbose_name="Origen", blank=True, null=True)

    lot = models.CharField(max_length=13, unique=True, verbose_name="Lote")

    quality = models.DecimalField(decimal_places=1, max_digits=3, default=0, blank=True, null=True,
                                  verbose_name="Muestra de Calidad")

    description = models.TextField(max_length=500, blank=True, null=True, verbose_name="Descripción")

    discount_description = models.TextField(max_length=500, blank=True, null=True,
                                            verbose_name="Descripción de Descuento")
    discount = models.DecimalField(decimal_places=10, max_digits=15, default=0.00, blank=True, null=True,
                                   verbose_name="Porcentaje de Descuento Rechazo")
    discount_price = models.DecimalField(decimal_places=10, max_digits=15, default=0.00, blank=True, null=True,
                                         verbose_name='Porcentaje de Descuento Precio')
    discount_price_soles = models.DecimalField(decimal_places=2, max_digits=4, default=0.00, blank=True, null=True,
                                               verbose_name='Soles Descuento Precio')

    transport = models.ForeignKey(Transport, on_delete=models.PROTECT, related_name="carrier_lot",
                                  verbose_name="Empresa de transporte", blank=True, null=True)
    merma = models.DecimalField(decimal_places=3, max_digits=11, default=0, blank=True, null=True, verbose_name="Merma",
                                editable=False)

    stock = models.DecimalField(decimal_places=3, max_digits=11, default=0, blank=True, null=True, )
    closed = models.BooleanField(default=False, verbose_name="Cerrado/Abierto")

    history = HistoricalRecords()

    class Meta:
        verbose_name = "Lote de Materia Prima"
        verbose_name_plural = "Lotes de Materia Prima"
        ordering = ['-download_date']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._meta.get_field('discount').editable = get_user_model().is_superuser
        self._meta.get_field('discount_description').editable = get_user_model().is_superuser

    def __str__(self):
        return self.lot

    def get_condition_name(self):
        return self.get_condition_display()

    def get_parcels_name(self):
        try:
            return ', '.join([p.parcel for p in self.parcel.all()])
        except Exception as e:
            return ''

    def get_departure_time(self):
        try:
            return self.entry_date.strftime("%d/%m/%Y %H:%M")
        except:
            return ''

    def get_arrival_time(self):
        try:
            return self.departure_date.strftime("%d/%m/%Y %H:%M")
        except:
            return ''

    def get_year(self):
        try:
            return self.entry_date.strftime('%Y')
        except:
            return ""

    def get_month(self):
        try:
            return self.entry_date.strftime('%B')
        except:
            return ""

    def get_week(self):
        try:
            return self.entry_date.isocalendar()[1]
        except:
            return ''

    def get_discount_guide_kg(self):
        try:
            return round(float(self.guide_weight) * float(self.discount / 100), 2)
        except:
            return 0

    def get_total_amount_guide_kg(self):
        try:
            return self.guide_weight - self.get_discount_guide_kg()
        except:
            return 0

    def get_total_tare(self):
        try:
            return sum(count.tare for count in self.i_lot.all())
        except:
            return 0

    def get_total_net_weight(self):
        try:
            return sum(count.get_net_weight() for count in self.i_lot.all()) + float(self.quality)
        except Exception as e:
            return 0

    def get_discount_net_kg(self):
        try:
            return Decimal(self.get_total_net_weight()) * (Decimal(self.discount) / 100)
        except Exception as e:
            return 0

    def get_total_amount_net_kg(self):
        try:
            return Decimal(self.get_total_net_weight()) - Decimal(self.get_discount_net_kg())
        except:
            return 0

    def get_net_difference(self):
        try:
            return Decimal(self.get_total_net_weight()) - Decimal(self.guide_weight)
        except:
            return 0

    def get_avg_brute(self):
        try:
            return float(self.get_total_brute_weight()) / float(self.get_total_boxes())
        except:
            return 0

    def get_avg_net(self):
        try:
            return float(self.get_total_net_weight()) / float(self.get_total_boxes())
        except:
            return 0

    def get_total_brute_weight(self):
        try:
            return float(self.get_total_net_weight()) + float(self.get_total_weight_boxes())
        except Exception as e:
            return 0

    def get_total_boxes(self):
        try:
            return sum(count.get_quantity_boxes() for count in self.i_lot.all())
        except:
            return 0

    def get_calibers_percentage(self):
        try:
            total = self.get_total_calibers()
            return {f'c{x}': (float(total[f'c{x}']) / float(self.get_total_boxes())) * 100 for x in [6, 8, 10, 12, 14]}
        except Exception as e:
            return {f'c{x}': 0 for x in [6, 8, 10, 12, 14]}

    def get_total_calibers(self):
        try:
            return {f'c{x}': sum(getattr(count, f'c{x}') for count in self.i_lot.all()) for x in [6, 8, 10, 12, 14]}
        except:
            return 0

    def get_total_weight_pallets(self):
        try:
            return sum(count.get_weight_pallet() for count in self.i_lot.all())
        except:
            return 0

    def get_total_weight_boxes(self):
        try:
            return sum(count.get_weight_boxes() for count in self.i_lot.all())
        except  Exception as e:
            return str(e)

    def get_pallets(self):
        try:
            e = self.i_lot.all()
            p = {"Negro": e.filter(pallet__name="Negro").count(), "Verde": e.filter(pallet__name="Verde").count(),
                 "Azul": e.filter(pallet__name="Azul").count(), "Celeste": e.filter(pallet__name="Celeste").count()}
            return p
        except Exception as e:
            return {'Negro': 0, 'Verde': 0, 'Azul': 0, 'Celeste': 0, 'error': str(e)}

    def get_quantity_pallets(self):
        try:
            return sum(self.get_pallets().values())
        except:
            return 0

    def update_stock(self):
        try:
            self.stock = Decimal(self.get_total_net_weight()) - Decimal(self.quality)
        except:
            pass

    def get_boxes(self):
        try:
            return {"box_gb": sum(d.gb for d in self.i_lot.all()), "box_pa": sum(d.pa for d in self.i_lot.all()),
                    "box_co": sum(d.co for d in self.i_lot.all()), "box_t0": sum(d.t0 for d in self.i_lot.all()),
                    "box_t1": sum(d.t1 for d in self.i_lot.all()), "box_t2": sum(d.t2 for d in self.i_lot.all()),
                    "box_gn": sum(d.gn for d in self.i_lot.all()), "box_ma": sum(d.ma for d in self.i_lot.all())}
        except:
            return {'box_gb': 0, 'box_pa': 0, 'box_co': 0, 'box_t0': 0, 'box_t1': 0, 'box_t2': 0, 'box_gn': 0,
                    'box_ma': 0}

    def get_provider(self):
        try:
            return self.provider.business_name
        except:
            return ''

    def get_avg_box(self):
        try:
            return self.get_total_net_weight() / self.get_total_boxes()
        except:
            return 0


class ILot(models.Model):
    class Meta:
        verbose_name = 'Información de Lotes'
        verbose_name_plural = 'Información de Lotes'
        ordering = ['number']
        unique_together = ('number', 'lot')

    number = models.IntegerField(verbose_name="Numero de pallet")
    weight = models.FloatField(default=0, verbose_name="Peso bruto")
    gb = models.IntegerField(default=0, verbose_name="GreenBox")
    pa = models.IntegerField(default=0, verbose_name="PAE")
    co = models.IntegerField(default=0, verbose_name="Colores")
    t0 = models.IntegerField(default=0, verbose_name="Tibana 0")
    t1 = models.IntegerField(default=0, verbose_name="Tibana 1")
    t2 = models.IntegerField(default=0, verbose_name="Tibana 2")
    gn = models.IntegerField(default=0, verbose_name="Gandules")
    ma = models.IntegerField(default=0, verbose_name="Madera")
    pallet = models.ForeignKey(Pallets, on_delete=models.PROTECT, verbose_name="Pallet", related_name="pallets")
    tare = models.FloatField(default=0, verbose_name="Tara")
    c6 = models.IntegerField(default=0, verbose_name="Calibre 6")
    c8 = models.IntegerField(default=0, verbose_name="Calibre 8")
    c10 = models.IntegerField(default=0, verbose_name="Calibre 10")
    c12 = models.IntegerField(default=0, verbose_name="Calibre 12")
    c14 = models.IntegerField(default=0, verbose_name="Calibre 14")
    lot = models.ForeignKey(Lot, on_delete=models.PROTECT, verbose_name="Lote", related_name="i_lot")
    location = models.ForeignKey(StorageArea, on_delete=models.PROTECT, verbose_name="Ubicación de almacenamiento",
                                 related_name="i_lot")
    history = HistoricalRecords()

    def save(
            self, force_insert=False, force_update=False, using=None, update_fields=None
    ):
        self.tare = self.get_total_tare()
        super(ILot, self).save()

    def __str__(self):
        return str(self.id) + " - " + self.lot.lot

    def get_lot(self):
        try:
            return self.lot.lot
        except:
            return ""

    def get_pallet(self):
        try:
            return self.pallet.name
        except:
            return ""

    def get_quantity_boxes(self):
        try:
            return self.gb + self.pa + self.co + self.t0 + self.t1 + self.t2 + self.gn + self.ma
        except:
            return 0

    def get_weight_boxes(self):
        try:
            return (self.pa * Boxes.objects.filter(name="PAE").first().weight) + (
                    self.gb * Boxes.objects.filter(name="Greenbox").first().weight) + (
                    self.t0 * Boxes.objects.filter(name="Tibana").first().weight) + (
                    self.t1 * Boxes.objects.filter(name="Tibana 1").first().weight) + (
                    self.t2 * Boxes.objects.filter(name="Tibana 2").first().weight) + (
                    self.co * Boxes.objects.filter(name="Colores").first().weight) + (
                    self.gn * Boxes.objects.filter(name="Gandules").first().weight) + (
                    self.ma * Boxes.objects.filter(name="Madera").first().weight)
        except Exception as e:
            return 0

    def get_weight_pallet(self):
        try:
            return float(Pallets.objects.get(name=self.pallet.name).weight)
        except Exception as e:
            return 0

    def get_total_tare(self):
        try:
            return float(self.get_weight_boxes()) + float(self.get_weight_pallet())
        except Exception as e:
            return 0

    def get_net_weight(self):
        try:
            return self.weight - self.get_total_tare()
        except Exception as e:
            return 0


@receiver(post_save, sender=ILot)
def my_callback(sender, instance, *args, **kwargs):
    instance.lot.update_stock()
    instance.lot.save()


class Output(models.Model):
    class Destine(models.TextChoices):
        PRODUCCION = 'P', 'Producción'
        MERMA = 'M', 'Merma'

    class Meta:
        verbose_name = 'Salida de Lotes'
        verbose_name_plural = 'Salidas de Lotes'
        ordering = ['date']
        unique_together = ('date', 'lot', 'destine')

    date = models.DateField(verbose_name="Fecha de salida", auto_now_add=True)
    lot = models.ForeignKey(Lot, on_delete=models.PROTECT, verbose_name="Lote", related_name="output")
    kg = models.FloatField(default=0, verbose_name="Kg")
    destine = models.CharField(max_length=1, choices=Destine.choices, default=Destine.PRODUCCION,
                               verbose_name="Destino")
    history = HistoricalRecords()

    def __str__(self):
        return self.date.strftime('%d/%m/%Y') + "  -  " + self.lot.lot + " - " + str(self.kg)

    def get_destine_name(self):
        try:
            return self.get_destine_display()
        except:
            return ""

    def get_week(self):
        try:
            return self.date.isocalendar()[1]
        except:
            return ''


class RegisterOutput(models.Model):
    class Meta:
        verbose_name = 'Registro de Salidas'
        verbose_name_plural = 'Registro de Salidas'
        ordering = ['date']
        unique_together = ('date', 'item')

    date = models.DateField(verbose_name="Fecha de salida", default=timezone.now)
    item = models.ForeignKey(ILot, on_delete=models.PROTECT, verbose_name="Item", related_name="item")
    kg = models.FloatField(default=0, verbose_name="Kg")
    net_weight = models.FloatField(default=0, verbose_name="Kg Neto")
    history = HistoricalRecords()

    def __str__(self):
        return self.date.strftime('%d/%m/%Y') + "  -  " + str(self.item.number) + " - " + str(self.kg)

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        self.net_weight = self.get_net_weight()
        super().save(force_insert, force_update, using, update_fields)

    def get_net_weight(self):
        try:
            return self.kg - self.item.tare
        except:
            return 0
