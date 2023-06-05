from django.db import models

from apps.quality_assurance.models import StatusLot


# Create your models here.
class Materials(models.Model):
    code = models.CharField(max_length=10, blank=True, verbose_name='Codigo')
    sap = models.CharField(max_length=10, blank=True, verbose_name='SAP')
    description = models.CharField(max_length=100, blank=True, verbose_name='Descripcion')
    category = models.CharField(max_length=100, blank=True, verbose_name='Categoria')
    status = models.CharField(max_length=100, blank=True, verbose_name='Estado')
    safety_stock = models.CharField(max_length=100, blank=True, verbose_name='Stock de Seguridad')
    stock = models.CharField(max_length=100, blank=True, verbose_name='Stock')
    cost = models.CharField(max_length=100, blank=True, verbose_name='Costo')
    capacity = models.CharField(max_length=100, blank=True, verbose_name='Capacidad')

    def __str__(self):
        return self.code

    class Meta:
        verbose_name = 'Material'
        verbose_name_plural = 'Materiales'
        ordering = ['description']


class Products(models.Model):
    family = models.CharField(max_length=100, blank=True, verbose_name='Familia')
    group = models.CharField(max_length=100, blank=True, verbose_name='Grupo')
    certification = models.CharField(max_length=100, blank=True, verbose_name='Certificacion')
    product = models.CharField(max_length=100, blank=True, verbose_name='Producto')
    cut = models.CharField(max_length=100, blank=True, verbose_name='Corte')
    variety = models.CharField(max_length=100, blank=True, verbose_name='Variedad')
    client = models.CharField(max_length=100, blank=True, verbose_name='Cliente')
    presentation = models.CharField(max_length=100, blank=True, verbose_name='Presentacion')
    packaging = models.CharField(max_length=100, blank=True, verbose_name='Embalaje')
    packing = models.CharField(max_length=100, blank=True, verbose_name='Empaque')
    lot = models.CharField(max_length=100, blank=True, verbose_name='Lote')
    date_of_production = models.CharField(max_length=100, blank=True, verbose_name='Fecha de Produccion')
    date_of_expiration = models.CharField(max_length=100, blank=True, verbose_name='Fecha de Expiracion')
    boxes = models.CharField(max_length=100, blank=True, verbose_name='Cajas')
    article = models.CharField(max_length=100, blank=True, verbose_name='Articulo')
    provider = models.CharField(max_length=100, blank=True, verbose_name='Proveedor')
    condition = models.CharField(max_length=100, blank=True, verbose_name='Condicion')
    fcl = models.CharField(max_length=100, blank=True, verbose_name='FCL')
    campaign = models.CharField(max_length=100, blank=True, verbose_name='Campaña')
    observations = models.CharField(max_length=100, blank=True, verbose_name='Observaciones')
    stock = models.DecimalField(max_digits=9, decimal_places=4, default=0, blank=True, verbose_name='Stock')
    destines = models.CharField(max_length=100, blank=True, verbose_name='Destinos')

    def __str__(self):
        return self.product

    class Meta:
        verbose_name = 'Producto'
        verbose_name_plural = 'Productos'
        ordering = ['product']
