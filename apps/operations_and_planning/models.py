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


class IndicatorKPI(models.Model):
    date = models.DateField(verbose_name="Fecha de ingreso", unique=True)
    projected_kg = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True,
                                       verbose_name="Ingreso proyectado")
    price_objective = models.DecimalField(max_digits=7, decimal_places=2, verbose_name='Precio objetivo', default=0.0,
                                          blank=True, null=True)
    lots = models.ManyToManyField(Lot, blank=True, verbose_name='Lotes')

    def __str__(self):
        return str(self.date)

    def get_week(self):
        try:
            return self.date.isocalendar()[1]
        except:
            return 0

    def get_year(self):
        try:
            return self.date.strftime('%Y')
        except:
            return 0

    def get_month(self):
        try:
            return self.date.strftime('%B')
        except:
            return 0

    def get_entry_real(self):
        entry_real = 0.0
        try:
            for lot in self.lots.all():
                entry_real += float(lot.get_total_net_weight())
            return entry_real
        except:
            return 0

    def get_compliance_entry(self):
        try:
            return float(self.get_entry_real()) / float(self.projected_kg) * 100
        except Exception as e:
            return 0

    def get_price(self):
        total = 0
        kg = 0
        try:
            for lot in self.lots.all():
                kg += lot.record.get_kg_usable()
                total += lot.record.get_total_amount_plant()
            return total / kg
        except Exception as e:
            return 0

    class Meta:
        verbose_name = 'Indicador'
        verbose_name_plural = 'Indicadores'
        ordering = ['date']
        abstract = True


class IndicatorKPIPineapple(IndicatorKPI):
    class Meta:
        verbose_name = "Indicador de Piña"
        verbose_name_plural = "Indicador de Piña"

    def get_information(self):
        # Initialize variables
        caliber_6 = caliber_8_10_12 = caliber_14 = 0
        maduration_0 = maduration_1 = maduration_2_3 = maduration_4_5 = 0

        # Loop through all lots and calculate values
        for lot in self.lots.all():
            caliber_6 += lot.get_calibers_percentage()['c6'] * lot.get_total_net_weight()
            caliber_8_10_12 += lot.get_total_net_weight() * (
                    lot.get_calibers_percentage()['c8'] + lot.get_calibers_percentage()['c10'] +
                    lot.get_calibers_percentage()['c12'])
            caliber_14 += lot.get_calibers_percentage()['c14'] * lot.get_total_net_weight()
            maduration_0 += float(lot.analysis_pineapple.maturation_0_plant) * lot.get_total_net_weight()
            maduration_1 += float(lot.analysis_pineapple.maturation_1_plant) * lot.get_total_net_weight()
            maduration_2_3 += lot.get_total_net_weight() * (
                    float(lot.analysis_pineapple.maturation_2_plant) + float(lot.analysis_pineapple.maturation_3_plant))
            maduration_4_5 += lot.get_total_net_weight() * (
                    float(lot.analysis_pineapple.maturation_4_plant) + float(lot.analysis_pineapple.maturation_5_plant))

        # Calculate averages
        entry_real = self.get_entry_real()
        information = {
            'caliber_6': caliber_6 / entry_real,
            'caliber_8_10_12': caliber_8_10_12 / entry_real,
            'caliber_14': caliber_14 / entry_real,
            'maduration_0': maduration_0 / entry_real,
            'maduration_1': maduration_1 / entry_real,
            'maduration_2_3': maduration_2_3 / entry_real,
            'maduration_4_5': maduration_4_5 / entry_real,
        }

        return information


class IndicatorKPIMango(IndicatorKPI):
    class Meta:
        verbose_name = "Indicador de Mango"
        verbose_name_plural = "Indicador de Mango"

    def get_information(self):
        wt_280 = wt_280_300 = wt_300 = color_1 = color_1_5_2_5 = color_3 = mechanical_damage = physical_damage = plagues = others = 0
        information = {'wt_280': wt_280, 'wt_280_300': wt_280_300, 'wt_300': wt_300,
                       'color_1': color_1, 'color_1_5_2_5': color_1_5_2_5, 'color_3': color_3,
                       'mechanical_damage': mechanical_damage, 'physical_damage': physical_damage,
                       'plagues': plagues, 'others': others}
        try:
            total_net_weight = self.get_entry_real()

            for lot in self.lots.all():
                analysis = lot.analysis_mango
                wt_280 += float(analysis.weight_280) * lot.get_total_net_weight()
                wt_280_300 += float(analysis.weight_280_300) * lot.get_total_net_weight()
                wt_300 += float(analysis.weight_300) * lot.get_total_net_weight()
                color_1 += float(analysis.color_1) * lot.get_total_net_weight()
                color_1_5_2_5 += float(lot.get_total_net_weight()) * (
                        float(analysis.color_1_5) + float(analysis.color_2_5) + float(analysis.color_2))
                color_3 += (float(analysis.color_3_5) + float(analysis.color_3)) * lot.get_total_net_weight()
                mechanical_damage += lot.get_total_net_weight() * (
                        float(analysis.mechanical_damage) + float(analysis.cracked))
                physical_damage += lot.get_total_net_weight() * (
                        float(analysis.sun_damage) + float(analysis.latex))
                plagues += lot.get_total_net_weight() * (
                        float(analysis.anthracnose) + float(analysis.queresa) + float(analysis.insect_bite))
                others += lot.get_total_net_weight() * (
                        float(analysis.rot) + float(analysis.mature) + float(analysis.overripe))

            if total_net_weight > 0:
                information['wt_280'] = wt_280 / total_net_weight
                information['wt_280_300'] = wt_280_300 / total_net_weight
                information['wt_300'] = wt_300 / total_net_weight
                information['color_1'] = color_1 / total_net_weight
                information['color_1_5_2_5'] = color_1_5_2_5 / total_net_weight
                information['color_3'] = color_3 / total_net_weight
                information['mechanical_damage'] = mechanical_damage / total_net_weight
                information['physical_damage'] = physical_damage / total_net_weight
                information['plagues'] = plagues / total_net_weight
                information['others'] = others / total_net_weight

            return information
        except:
            return information


class IndicatorKPIAguaymanto(IndicatorKPI):
    class Meta:
        verbose_name = "Indicador de Aguaymanto"
        verbose_name_plural = "Indicador de Aguaymanto"

    def get_information(self):
        information = {
            'maduration_1': 0,
            'maduration_2': 0,
            'maduration_3': 0,
            'mushroom': 0,
            'green': 0,
            'cracked': 0,
            'crushed': 0
        }
        entry_real = self.get_entry_real()
        try:
            for lot in self.lots.all():
                analysis = lot.analysis_aguaymanto
                information['maduration_1'] += float(analysis.maturation_1) * lot.get_total_net_weight()
                information['maduration_2'] += float(analysis.maturation_2) * lot.get_total_net_weight()
                information['maduration_3'] += float(analysis.maturation_3) * lot.get_total_net_weight()
                information['mushroom'] += float(analysis.mushroom) * lot.get_total_net_weight()
                information['green'] += float(analysis.green) * lot.get_total_net_weight()
                information['cracked'] += float(analysis.cracked) * lot.get_total_net_weight()
                information['crushed'] += float(analysis.crushed) * lot.get_total_net_weight()
            for key in information:
                information[key] /= entry_real if entry_real > 0 else 0
            return information
        except Exception as e:
            return information
