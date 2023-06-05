import uuid

from django.db import models
from django.utils.text import slugify
from simple_history.models import HistoricalRecords


# Create your models here.

class ContactProxy(models.Model):
    class Meta:
        abstract = True
        verbose_name = "Información de Contacto"
        verbose_name_plural = "Información de Contactos"

    business_name = models.CharField(max_length=255, blank=True, null=True, verbose_name="Razón Social")
    description = models.TextField(verbose_name="Descripción", blank=True, null=True)
    ruc = models.CharField(max_length=15, blank=True, null=True, verbose_name="RUC")
    address = models.CharField(max_length=255, blank=True, null=True, verbose_name="Dirección")
    city = models.CharField(max_length=255, blank=True, null=True, verbose_name="Ciudad")
    country = models.CharField(max_length=255, blank=True, null=True, verbose_name="País")
    contact = models.CharField(max_length=255, blank=True, null=True, verbose_name="Contacto")
    position = models.CharField(max_length=255, blank=True, null=True, verbose_name="Cargo")
    email = models.EmailField(max_length=255, blank=True, null=True, verbose_name="Correo Electrónico")
    phone = models.CharField(max_length=20, blank=True, null=True, verbose_name="Teléfono")
    image = models.URLField(max_length=255, blank=True, null=True, verbose_name="Imagen")
    slug = models.SlugField(max_length=255, default=uuid.uuid1, verbose_name="Slug", blank=True, null=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.business_name)
        super(ContactProxy, self).save(*args, **kwargs)


class Clients(ContactProxy):
    class Meta:
        verbose_name = 'Cliente Comercial'
        verbose_name_plural = 'Clientes Comerciales'
        ordering = ['-business_name']

    history = HistoricalRecords()

    def __str__(self):
        return self.business_name


class ProviderPacking(ContactProxy):
    documents = models.URLField(max_length=200, verbose_name='Drive', blank=True, null=True)
    class Meta:
        verbose_name = 'Proveedor de Packing'
        verbose_name_plural = 'Proveedores de Packing'
        ordering = ['-business_name']

    history = HistoricalRecords()

    def __str__(self):
        return self.business_name


class SuppliersMaquila(ContactProxy):
    class Meta:
        verbose_name = 'Proveedores de Maquila'
        verbose_name_plural = "Proveedores de Maquila"
        ordering = ['-business_name']

    history = HistoricalRecords()

    def __str__(self):
        return self.business_name


class ProviderTransport(ContactProxy):
    class Meta:
        verbose_name = 'Proveedor de Transporte'
        verbose_name_plural = 'Proveedores de Transporte'
        ordering = ['-business_name']

    history = HistoricalRecords()

    def __str__(self):
        return self.business_name


class Zone(models.Model):
    class Meta:
        verbose_name = 'Zona de Almacenamiento'
        verbose_name_plural = 'Zonas de Almacenamiento'
        ordering = ['-name']

    name = models.CharField(max_length=255, blank=True, null=True, verbose_name="Nombre")
    history = HistoricalRecords()

    def __str__(self):
        return self.name


class Location(models.Model):
    class Meta:
        verbose_name = "Origen y Destino"
        verbose_name_plural = "Orígenes y Destinos"

    name = models.CharField(max_length=255, blank=True, null=True, verbose_name="Nombre")
    stock = models.PositiveIntegerField(default=0, verbose_name="Stock")
    history = HistoricalRecords()

    def __str__(self):
        return self.name


class CostProduction(models.Model):
    class Meta:
        verbose_name = "Costo de Producción"
        verbose_name_plural = "Costos de Producción"

    cost_hour_day = models.DecimalField(max_digits=10, decimal_places=2, default=0, verbose_name="Costo por Hora Día")
    cost_hour_night = models.DecimalField(max_digits=10, decimal_places=2, default=0,
                                          verbose_name="Costo por Hora Noche")
    cost_hour_extra_25 = models.DecimalField(max_digits=10, decimal_places=2, default=0,
                                             verbose_name="Costo por Hora Extra 25%")
    cost_hour_extra_35 = models.DecimalField(max_digits=10, decimal_places=2, default=0,
                                             verbose_name="Costo por Hora Extra 35%")

    history = HistoricalRecords()
