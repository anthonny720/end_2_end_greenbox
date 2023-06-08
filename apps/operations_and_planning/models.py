from decimal import Decimal

from django.core.exceptions import ObjectDoesNotExist
from django.db import models
from simple_history.models import HistoricalRecords

from apps.logistic.models import Lot

from apps.production.models import MOD


# Create your models here.


class Records(models.Model):
    lot = models.OneToOneField(Lot, on_delete=models.PROTECT, verbose_name="Lote", related_name="record")
    price_camp = models.DecimalField(decimal_places=2, max_digits=4, default=0, verbose_name="Precio Campo",blank=True, null=True)
    freight = models.DecimalField(decimal_places=4, max_digits=9, default=0, blank=True, null=True,verbose_name="Flete")


    history = HistoricalRecords()

    class Meta:
        verbose_name = "Registro Materia Prima"
        verbose_name_plural = "Registro de Materia Prima"
        ordering = ["-lot__entry_date"]

    def get_discount_percentage(self):
        try:
            return self.lot.discount
        except ObjectDoesNotExist:
            return 0

    def get_brute_weight(self):
        try:
            return Decimal(self.lot.get_total_net_weight()) + Decimal(self.lot.get_total_boxes())
        except:
            return 0

    def get_kg_discounted(self):
        try:
            return (float(self.lot.get_total_net_weight()) * float(self.get_discount_percentage())) / 100
        except ValueError:
            raise 0

    def get_discount_soles(self):
        try:
            return float(self.price_camp) * float(self.get_kg_discounted())
        except:
            return 0

    def get_kg_usable(self):
        try:
            return Decimal(self.lot.get_total_net_weight()) - Decimal(self.get_kg_discounted())
        except ValueError:
            raise 0

    def get_discount_soles(self):
        try:
            return round(float(self.price_camp) * float(self.get_kg_discounted()), 2)
        except:
            return 0

    def get_price_camp(self):
        try:
            kg_discount = Decimal(self.lot.get_total_net_weight()) * (Decimal(self.lot.discount_price) / 100)
            kg_usable = (self.get_kg_usable() - kg_discount) * self.price_camp
            discount_soles = kg_discount * self.lot.discount_price_soles
            price_camp = (kg_usable + discount_soles) / self.get_kg_usable()
            return price_camp
        except Exception as e:
            return str(e)

    def get_price_plant(self):
        try:
            return ((Decimal(self.get_kg_usable()) * Decimal(self.get_price_camp())) + Decimal(self.freight)) / Decimal(
                self.get_kg_usable())
        except:
            return 0

    def get_total_amount_plant(self):
        try:
            return self.get_kg_usable() * self.get_price_plant()
        except:
            return 0

    def get_total_amount_camp(self):
        try:
            return self.get_kg_usable() * self.get_price_camp()
        except:
            return 0

    def get_freight_unit(self):
        try:
            return self.freight / self.lot.get_total_net_weight()
        except:
            return 0

    def __str__(self):
        return self.lot.lot

