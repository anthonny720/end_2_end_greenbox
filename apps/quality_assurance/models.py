import datetime

from django.db import models
from multiselectfield import MultiSelectField
from simple_history.models import HistoricalRecords

from apps.logistic.models import Lot


# Create your models here.
class Pineapple(models.Model):
    lot = models.OneToOneField(Lot, on_delete=models.PROTECT, related_name="analysis_pineapple", verbose_name="Lote MP")

    maturation_0_plant = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                             verbose_name=u"Maduración 0 Planta %")
    maturation_1_plant = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                             verbose_name=u"Maduración 1 Planta %")
    maturation_2_plant = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                             verbose_name=u"Maduración 2 Planta %")
    maturation_3_plant = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                             verbose_name=u"Maduración 3 Planta %")
    maturation_4_plant = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                             verbose_name=u"Maduración 4 Planta %")
    maturation_5_plant = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                             verbose_name=u"Maduración 5 Planta %")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación", )
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Fecha de actualización")
    history = HistoricalRecords()

    class Meta:
        verbose_name = "Análisis de Piña"
        verbose_name_plural = "Análisis de Piña"
        ordering = ['-id']

    def __str__(self):
        return self.lot.lot

    def get_lot(self):
        return self.lot.lot

    def get_maturation_total(self):
        try:
            return self.maturation_0_plant + self.maturation_1_plant + self.maturation_2_plant + self.maturation_3_plant + self.maturation_5_plant + self.maturation_5_plant
        except:
            return 0

    def get_pending(self):
        try:
            updated = datetime.datetime.strptime(str(self.updated_at), '%Y-%m-%d %H:%M:%S.%f').strftime(
                '%Y-%m-%d %H:%M')
            created = datetime.datetime.strptime(str(self.created_at), '%Y-%m-%d %H:%M:%S.%f').strftime(
                '%Y-%m-%d %H:%M')
            if updated != created:
                return False
            else:
                return True
        except:
            return False


class Goldenberry(models.Model):
    lot = models.OneToOneField(Lot, on_delete=models.PROTECT, related_name="analysis_goldenberry",
                               verbose_name="Lote MP")

    maturation_1 = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                       verbose_name=u"Maduración 1 %")
    maturation_2 = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                       verbose_name=u"Maduración 2 %")
    maturation_3 = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                       verbose_name=u"Maduración 3 %")
    mushroom = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                   verbose_name=u"Hongos y fermentado")
    green = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                verbose_name=u"Verde")
    cracked = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                  verbose_name=u"Rajado")
    crushed = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                  verbose_name=u"Aplastado")
    small = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                verbose_name=u'Pequeño<17mm')
    caliz = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                verbose_name=u'Caliz')
    phytosanitary = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                        verbose_name='Fitosanitario')
    watery = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                 verbose_name='Consistencia aguada')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Fecha de actualización")
    history = HistoricalRecords()

    def __str__(self):
        return self.lot.lot

    def get_lot(self):
        return self.lot.lot

    def get_defects(self):
        try:
            return self.green + self.cracked + self.crushed + self.small + self.caliz + self.phytosanitary + self.watery
        except:
            return 0

    def get_maturation_total(self):
        try:
            return self.maturation_1 + self.maturation_2 + self.maturation_3
        except:
            return 0

    def get_pending(self):
        try:
            updated = datetime.datetime.strptime(str(self.updated_at), '%Y-%m-%d %H:%M:%S.%f').strftime(
                '%Y-%m-%d %H:%M')
            created = datetime.datetime.strptime(str(self.created_at), '%Y-%m-%d %H:%M:%S.%f').strftime(
                '%Y-%m-%d %H:%M')
            if updated != created:
                return False
            else:
                return True
        except:
            return False

    class Meta:
        verbose_name = "Análisis de Aguaymanto"
        verbose_name_plural = "Análisis de Aguaymanto"
        ordering = ['-id']


class Banano(models.Model):
    lot = models.OneToOneField(Lot, on_delete=models.PROTECT, related_name="analysis_banana", verbose_name="Lote MP")

    maturation_1 = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                       verbose_name=u"Maduración 1 %")
    maturation_2 = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                       verbose_name=u"Maduración 2 %")
    maturation_3 = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                       verbose_name=u"Maduración 3 %")
    maturation_4 = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                       verbose_name=u"Maduración 4 %")
    mechanical_damages = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                             verbose_name=u"Daños mecánicos")
    broken_neck = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                      verbose_name=u"Corte de cuello")
    chafing = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                  verbose_name=u"Rozadura")
    scar = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                               verbose_name=u"Cicatriz")
    discard = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                  verbose_name=u"Descarte")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Fecha de actualización")
    history = HistoricalRecords()

    def __str__(self):
        return self.lot.lot

    def get_lot(self):
        return self.lot.lot

    def get_maturation_total(self):
        try:
            return self.maturation_1 + self.maturation_2 + self.maturation_3 + self.maturation_4
        except:
            return 0

    def get_pending(self):
        try:
            updated = datetime.datetime.strptime(str(self.updated_at), '%Y-%m-%d %H:%M:%S.%f').strftime(
                '%Y-%m-%d %H:%M')
            created = datetime.datetime.strptime(str(self.created_at), '%Y-%m-%d %H:%M:%S.%f').strftime(
                '%Y-%m-%d %H:%M')
            if updated != created:
                return False
            else:
                return True
        except:
            return False

    class Meta:
        verbose_name = "Análisis de Banano"
        verbose_name_plural = "Análisis de Banano"
        ordering = ['-id']


class Blueberry(models.Model):
    lot = models.OneToOneField(Lot, on_delete=models.PROTECT, related_name="analysis_blueberry", verbose_name="Lote MP")

    average_brix = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                       verbose_name=u"Brix promedio")
    max_brix = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                   verbose_name=u"Brix máximo")
    min_brix = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                   verbose_name=u"Brix mínimo")

    immature_fruit = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                         verbose_name=u"Fruta inmadura")
    worn_pedicel = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                       verbose_name=u"Pedicelo desgastado")
    remains_flowers = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                          verbose_name=u"Restos de flores")
    soft = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                               verbose_name=u"Fruta blanda o sobremadura")
    scars = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                verbose_name=u"Cicatrices")
    dehydrated = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                     verbose_name=u"Deshidratada")

    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Fecha de actualización")
    history = HistoricalRecords()

    class Meta:
        verbose_name = "Análisis de Arándanos"
        verbose_name_plural = "Análisis de Arándanos"
        ordering = ['-id']

    def get_lot(self):
        return self.lot.lot

    def get_pending(self):
        try:
            updated = datetime.datetime.strptime(str(self.updated_at), '%Y-%m-%d %H:%M:%S.%f').strftime(
                '%Y-%m-%d %H:%M')
            created = datetime.datetime.strptime(str(self.created_at), '%Y-%m-%d %H:%M:%S.%f').strftime(
                '%Y-%m-%d %H:%M')
            if updated != created:
                return False
            else:
                return True
        except:
            return False

    def __str__(self):
        return self.lot.lot


class Mango(models.Model):
    lot = models.OneToOneField(Lot, on_delete=models.PROTECT, related_name="analysis_mango", verbose_name="Lote MP")

    color_1 = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                  verbose_name=u"Color 1")
    color_1_5 = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                    verbose_name=u"Color 1,5 ")
    color_2 = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                  verbose_name=u"Color 2")
    color_2_5 = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                    verbose_name=u"Color 2,5")
    color_3 = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                  verbose_name=u"Color 3")
    color_3_5 = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                    verbose_name=u"Color 3,5")
    brix_7 = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                 verbose_name=u"Brix < 7")
    brix_7_8 = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                   verbose_name=u"Brix 7-8")
    brix_8_9 = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                   verbose_name=u"Brix 8-9")
    brix_9 = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                 verbose_name=u"Brix > 9")
    weight_280 = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                     verbose_name=u"Peso <280 ")
    weight_280_300 = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                         verbose_name=u"Peso 280-300 ")
    weight_300 = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                     verbose_name=u"Peso >300 ")
    mechanical_damage = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                            verbose_name=u"Daños mecanicos")
    cracked = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                  verbose_name=u"Rajado")
    sun_damage = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                     verbose_name=u"Daños de sol")
    anthracnose = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                      verbose_name=u"Antracnosis")
    rot = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                              verbose_name=u"Podrido")

    latex = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                verbose_name=u"Latex")
    queresa = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                  verbose_name=u"Queresa")
    insect_bite = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                      verbose_name=u"Picadura de insectos")
    mature = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                 verbose_name=u"maduro")
    overripe = models.DecimalField(decimal_places=2, max_digits=5, default=0.0, blank=True, null=True,
                                   verbose_name=u"Sobre maduro")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Fecha de actualización")

    history = HistoricalRecords()

    class Meta:
        verbose_name = "Análisis de Mango"
        verbose_name_plural = "Análisis de Mango"
        ordering = ['-id']

    def get_pending(self):
        try:
            updated = datetime.datetime.strptime(str(self.updated_at), '%Y-%m-%d %H:%M:%S.%f').strftime(
                '%Y-%m-%d %H:%M')
            created = datetime.datetime.strptime(str(self.created_at), '%Y-%m-%d %H:%M:%S.%f').strftime(
                '%Y-%m-%d %H:%M')
            if updated != created:
                return False
            else:
                return True
        except:
            return False

    def get_total_defects(self):
        try:
            return float(self.mechanical_damage) + float(self.cracked) + float(self.sun_damage) + float(
                self.anthracnose) + float(self.rot) + float(self.mature) + float(self.latex) + float(
                self.queresa) + float(self.insect_bite) + float(self.overripe)
        except:
            return 0

    def get_total_unharmed(self):
        try:
            return 100 - self.get_total_defects()
        except:
            return 0

    def get_lot(self):
        return self.lot.lot

    def __str__(self):
        return self.lot.lot


class StatusLot(models.Model):
    class StatusChoices(models.TextChoices):
        OBSERVED = "O", "Observado"
        PENDING = "P", "Pendiente"
        RELEASED = "R", "Liberado"
        REJECTED = "E", "Rechazado"

    DestineChoices = (

        ("P", "Perú"), ("E", "EEUU"), ("C", "Canadá"), ("U", "Europa"), ("S", "Suiza"))

    lot = models.OneToOneField(Lot, on_delete=models.PROTECT, related_name="status_lot", verbose_name="Lote MP")
    status = models.CharField(choices=StatusChoices.choices, default=StatusChoices.OBSERVED, verbose_name="Estado",
                              max_length=1)
    pt_list = models.CharField(max_length=100, blank=True, null=True, verbose_name="Lote Producto terminado")
    lot_client = models.CharField(max_length=100, blank=True, null=True, verbose_name="Lote cliente")
    destine = MultiSelectField(choices=DestineChoices, verbose_name="Destino", blank=True, max_choices=5, max_length=20)
    microbiological_analysis = models.BooleanField(default=False, verbose_name="Análisis Microbiológico")
    fosetyl = models.BooleanField(default=False, verbose_name="Fosetyl")
    pesticide = models.BooleanField(default=False, verbose_name="Pesticidas")
    observations = models.TextField(blank=True, verbose_name="Observaciones", max_length=50)

    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Fecha de actualización")

    history = HistoricalRecords()

    class Meta:
        verbose_name = "Estado de Lote"
        verbose_name_plural = "Estado de Lote"
        ordering = ['-id']

    def get_status_name(self):
        return self.get_status_display()

    def get_lot(self):
        return self.lot.lot

    def get_destine_name(self):
        return ", ".join(dict(self.DestineChoices).get(destine, "") for destine in self.destine)

    def __str__(self):
        return self.lot.lot
