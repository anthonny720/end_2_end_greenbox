import decimal
from datetime import timedelta

from django.db import models
from django.utils import timezone
from simple_history.models import HistoricalRecords

from apps.collection.models import Product
from apps.logistic.models import Output
from apps.management.models import CostProduction


# Create your models here.

class ProcessPineapple(models.Model):
    stock = models.ForeignKey(Output, on_delete=models.PROTECT, verbose_name='Stock', related_name='process')

    enabled_1_4= models.DecimalField(max_digits=7, decimal_places=3, verbose_name='Habilitado cuartos ', blank=True,default=0)
    enabled_1_8 = models.DecimalField(max_digits=7, decimal_places=3, verbose_name='Habilitado octavos ', blank=True,default=0)
    enabled_1_16 = models.DecimalField(max_digits=7, decimal_places=3, verbose_name='Habilitado tidbits', blank=True,
                                       default=0)
    enabled_rings = models.DecimalField(max_digits=7, decimal_places=3, verbose_name='Habilitado Rings', blank=True,
                                        default=0)
    rejected_ranch = models.DecimalField(max_digits=7, decimal_places=3, verbose_name='Rechazado Rancha', blank=True,
                                         default=0)
    crown = models.DecimalField(max_digits=7, decimal_places=3, verbose_name='Corona', blank=True, default=0)
    shell = models.DecimalField(max_digits=7, decimal_places=3, verbose_name='Cáscara', blank=True, default=0)
    trunk = models.DecimalField(max_digits=7, decimal_places=3, verbose_name='Tronco', blank=True, default=0)
    juice_pulp = models.DecimalField(max_digits=7, decimal_places=3, verbose_name='Jugo', blank=True, default=0)
    lot_cut_1_4 = models.CharField(max_length=50, verbose_name='Lote 1/4', blank=True, null=True)
    pt_cut_1_4 = models.DecimalField(max_digits=7, decimal_places=3, verbose_name='1/4 ', blank=True, default=0)
    lot_cut_1_8 =models.CharField(max_length=50, verbose_name='Lote 1/8', blank=True, null=True)
    pt_cut_1_8 = models.DecimalField(max_digits=7, decimal_places=3, verbose_name='1/8 ', blank=True, default=0)
    lot_cut_1_16 = models.CharField(max_length=50, verbose_name='Lote 1/16', blank=True, null=True)
    pt_cut_1_16 = models.DecimalField(max_digits=7, decimal_places=3, verbose_name='1/16', blank=True, default=0)
    lot_cut_rings = models.CharField(max_length=50, verbose_name='Lote Rings', blank=True, null=True)
    pt_cut_rings = models.DecimalField(max_digits=7, decimal_places=3, verbose_name='Rings', blank=True, default=0)
    pt_cut_recuperable = models.DecimalField(max_digits=7, decimal_places=3, verbose_name='Recuperable', blank=True,
                                             default=0)
    local = models.DecimalField(max_digits=7, decimal_places=3, verbose_name='Local', blank=True, default=0)
    quality = models.DecimalField(max_digits=7, decimal_places=3, verbose_name='Calidad', blank=True, default=0)

    history = HistoricalRecords()

    def __str__(self):
        return self.stock.date.strftime('%d/%m/%Y')

    class Meta:
        verbose_name = 'Proceso Piña'
        verbose_name_plural = 'Proceso Piña'
        ordering = ['-stock__date']

    def get_stock(self):
        try:
            return self.stock.kg
        except:
            return 0

    def get_lot(self):
        return self.stock.lot

    def get_date(self):
        return self.stock.date.strftime('%d/%m/%Y')

    def get_provider(self):
        return self.stock.lot.provider.business_name

    def get_enabled_kg(self):
        try:
            return decimal.Decimal(self.get_paid_kg()) - self.crown - self.trunk - self.shell - self.juice_pulp
        except:
            return 0

    def get_paid_kg(self):
        try:
            return decimal.Decimal(self.stock.kg) - self.rejected_ranch
        except:
            return 0

    def get_percent_rejected_ranch(self):
        try:
            return (self.rejected_ranch / decimal.Decimal(self.stock.kg)) * 100
        except:
            return 0

    def get_percent_crown(self):
        try:
            return (self.crown / self.get_paid_kg()) * 100
        except:
            return 0

    def get_percent_shell(self):
        try:
            return (self.shell / self.get_paid_kg()) * 100
        except:
            return 0

    def get_percent_trunk(self):
        try:
            return (self.trunk / self.get_paid_kg()) * 100
        except:
            return 0

    def get_percent_juice_pulp(self):
        try:
            return (self.juice_pulp / self.get_paid_kg()) * 100
        except:
            return

    def get_total_pt(self):
        try:
            return self.pt_cut_1_8 + self.pt_cut_1_16 + self.pt_cut_rings + self.local + self.pt_cut_recuperable + self.pt_cut_1_4
        except:
            return 0

    def get_paid_performance(self):
        try:
            return (self.get_total_pt() / self.get_paid_kg()) * 100
        except:
            return 0

    def get_net_performance(self):
        try:
            return (self.get_total_pt() / decimal.Decimal(self.get_stock())) * 100
        except Exception as e:
            return str(e)

    def get_performance_1_8(self):
        try:
            return (self.pt_cut_1_8 / decimal.Decimal(self.get_brute_kg_1_8())) * 100
        except:
            return 0

    def get_performance_1_4(self):
        try:
            return (self.pt_cut_1_4 / decimal.Decimal(self.get_brute_kg_1_4())) * 100
        except:
            return 0

    def get_performance_1_16(self):
        try:
            return (self.pt_cut_1_16 / decimal.Decimal(self.get_brute_kg_1_16())) * 100
        except:
            return 0

    def get_performance_rings(self):
        try:
            return (self.pt_cut_rings / decimal.Decimal(self.get_brute_kg_rings())) * 100
        except:
            return 0

    def get_percent_enabled(self):
        try:
            return (self.get_enabled_kg() / self.get_paid_kg()) * 100
        except:
            return 0


    def get_brute_kg_1_4(self):
        try:
            return (self.enabled_1_4 / self.get_percent_enabled()) * 100
        except:
            return 0

    def get_brute_kg_1_8(self):
        try:
            return (self.enabled_1_8 / self.get_percent_enabled()) * 100
        except:
            return 0

    def get_brute_kg_1_16(self):
        try:
            return (self.enabled_1_16 / self.get_percent_enabled()) * 100
        except:
            return 0

    def get_brute_kg_rings(self):
        try:
            return (self.enabled_rings / self.get_percent_enabled()) * 100
        except:
            return 0


class ProcessBanano(models.Model):
    stock = models.ForeignKey(Output, on_delete=models.PROTECT, verbose_name='Stock', related_name='process_banano')

    enabled_coins = models.DecimalField(max_digits=7, decimal_places=3, verbose_name='Habilitado coins ', blank=True,
                                        default=0)
    enabled_slices = models.DecimalField(max_digits=7, decimal_places=3, verbose_name='Habilitado slices', blank=True,
                                         default=0)
    rotten = models.DecimalField(max_digits=7, decimal_places=3, verbose_name='Podrido', blank=True, default=0)
    shell = models.DecimalField(max_digits=7, decimal_places=3, verbose_name='Cáscara', blank=True, default=0)
    lot_cut_coins = models.CharField(max_length=100, verbose_name='Lote coins', blank=True, null=True)
    pt_cut_coins = models.DecimalField(max_digits=7, decimal_places=3, verbose_name='Coins', blank=True, default=0)
    lot_cut_slices = models.CharField(max_length=100, verbose_name='Lote slices', blank=True, null=True)
    pt_cut_slices = models.DecimalField(max_digits=7, decimal_places=3, verbose_name='Slices', blank=True, default=0)
    pt_cut_recuperable = models.DecimalField(max_digits=7, decimal_places=3, verbose_name='Recuperable', blank=True,
                                             default=0)
    local = models.DecimalField(max_digits=7, decimal_places=3, verbose_name='Local', blank=True, default=0)
    quality = models.DecimalField(max_digits=7, decimal_places=3, verbose_name='Calidad', blank=True, default=0)

    history = HistoricalRecords()

    def __str__(self):
        return self.stock.date.strftime('%d/%m/%Y')

    class Meta:
        verbose_name = 'Proceso Banano'
        verbose_name_plural = 'Proceso Banano'
        ordering = ['-stock__date']

    def get_stock(self):
        try:
            return self.stock.kg
        except:
            return 0

    def get_lot(self):
        return self.stock.lot

    def get_date(self):
        return self.stock.date.strftime('%d/%m/%Y')

    def get_provider(self):
        return self.stock.lot.provider.business_name

    def get_enabled_kg(self):
        try:
            return decimal.Decimal(self.get_paid_kg()) - self.rotten - self.shell
        except:
            return 0

    def get_paid_kg(self):
        try:
            return self.stock.kg
        except:
            return 0

    def get_percent_shell(self):
        try:
            return (self.shell / self.get_paid_kg()) * 100
        except:
            return 0

    def get_percent_rotten(self):
        try:
            return (self.rotten / self.get_paid_kg()) * 100
        except:
            return 0

    def get_total_pt(self):
        try:
            return self.pt_cut_coins + self.pt_cut_slices + self.local + self.pt_cut_recuperable
        except:
            return 0

    def get_paid_performance(self):
        try:
            return self.get_total_pt() / decimal.Decimal(self.get_paid_kg()) * 100
        except Exception as e:
            return 0

    def get_net_performance(self):
        try:
            return (self.get_total_pt() / decimal.Decimal(self.get_stock())) * 100
        except Exception as e:
            return 0

    def get_performance_coins(self):
        try:
            return round((self.pt_cut_coins / decimal.Decimal(self.get_brute_kg_coins())) * 100,2)
        except:
            return 0

    def get_performance_slices(self):
        try:
            return round((self.pt_cut_slices / decimal.Decimal(self.get_brute_kg_slices())) * 100,2)
        except:
            return 0

    def get_percent_enabled(self):
        try:
            return round((self.get_enabled_kg() / decimal.Decimal(self.get_paid_kg())) * 100, 2)
        except Exception as e:
            return 0

    def get_brute_kg_coins(self):
        try:
            return round((self.enabled_coins / self.get_percent_enabled()) * 100,2)
        except:
            return 0

    def get_brute_kg_slices(self):
        try:
            return round((self.enabled_slices / self.get_percent_enabled()) * 100,2)
        except:
            return 0


class MOD(models.Model):
    class Meta:
        verbose_name = 'MOD'
        verbose_name_plural = 'MOD'
        ordering = ['-date']

    def __str__(self):
        return str(self.date)

    date = models.DateField(verbose_name='Fecha', default=timezone.now)
    process = models.ManyToManyField(Output, verbose_name='Proceso', blank=True)
    conditioning_people = models.IntegerField(
        verbose_name='Personas de Acondicionamiento', default=0)
    conditioning_hours = models.TimeField(verbose_name='Horas de Acondicionamiento', default='00:00')
    conditioning_people_25 = models.IntegerField(
        verbose_name='Personas de Acondicionamiento 25%', default=0)
    conditioning_hours_25 = models.TimeField(verbose_name='Horas de Acondicionamiento 25%', default='00:00')
    conditioning_people_35 = models.IntegerField(
        verbose_name='Personas de Acondicionamiento 35%', default=0)
    conditioning_hours_35 = models.TimeField(verbose_name='Horas de Acondicionamiento 35%', default='00:00')
    supervisor_name_conditioning = models.CharField(max_length=100, verbose_name='Nombre del Supervisor', blank=True, null=True)
    controller_name_conditioning = models.CharField(max_length=100, verbose_name='Nombre del Controller', blank=True, null=True)

    packing_people_day = models.IntegerField(verbose_name='Personas de Empaque Día',
                                             default=0)
    packing_people_night = models.IntegerField(verbose_name='Personas de Empaque Noche',
                                               default=0)
    packing_hours_day = models.TimeField(verbose_name='Horas de Empaque Día', default='00:00')
    packing_hours_night = models.TimeField(verbose_name='Horas de Empaque Noche', default='00:00')
    packing_people_25 = models.IntegerField(verbose_name='Personas de Empaque 25%',
                                            default=0)
    packing_hours_25 = models.TimeField(verbose_name='Horas de Empaque 25%', default='00:00')
    packing_people_35 = models.IntegerField(verbose_name='Personas de Empaque 35%',
                                            default=0)
    packing_hours_35 = models.TimeField(verbose_name='Horas de Empaque 35%', default='00:00')
    supervisor_name_packing = models.CharField(max_length=100, verbose_name='Nombre del Supervisor', blank=True, null=True)
    controller_name_packing = models.CharField(max_length=100, verbose_name='Nombre del Controller', blank=True, null=True)
    history = HistoricalRecords()

    def get_week(self):
        try:
            return self.date.isocalendar()[1]
        except:
            return ''

    def get_total_kg(self):
        try:
            kg = 0
            for p in self.process.all():
                if p.lot.product.name == 'Piña':
                    for i in p.process.all():
                        kg += i.get_total_pt()
                elif p.lot.product.name == 'Banano':
                    for i in p.process_banano.all():
                        kg += i.get_total_pt()
                else:
                    pass
            return kg
        except Exception as e:
            return 0

    def get_total_process_kg(self):
        try:
            kg = 0
            for p in self.process.all():
                if p.lot.product.name == 'Piña':
                    for i in p.process.all():
                        kg += i.get_paid_kg()
                elif p.lot.product.name == 'Banano':
                    for i in p.process_banano.all():
                        kg += i.get_paid_kg()
                else:
                    pass
            return kg
        except Exception as e:
            return 0

    def get_total_process_kg_logistic(self):
        try:
            kg = 0
            for p in self.process.all():
                if p.lot.product.name == 'Piña':
                    for i in p.process.all():
                        kg += i.get_stock()
                elif p.lot.product.name == 'Banano':
                    for i in p.process_banano.all():
                        kg += i.get_stock()
                else:
                    pass
            return kg
        except Exception as e:
            return 0

    def get_cmo_conditioning(self):
        try:
            total_time = self.conditioning_hours.hour + (self.conditioning_hours.minute / 60)

            return round(
                (self.conditioning_people * decimal.Decimal(total_time)) * CostProduction.objects.first().cost_hour_day,
                2)
        except Exception as e:
            return 0

    def get_cmo_conditioning_25(self):
        try:
            total_time = self.conditioning_hours_25.hour + (self.conditioning_hours_25.minute / 60)
            return round((self.conditioning_people_25 * decimal.Decimal(
                total_time)) * CostProduction.objects.first().cost_hour_extra_25, 2)
        except Exception as e:
            return 0

    def get_cmo_conditioning_35(self):
        try:
            total_time = self.conditioning_hours_35.hour + (self.conditioning_hours_35.minute / 60)
            return round((self.conditioning_people_35 * decimal.Decimal(
                total_time)) * CostProduction.objects.first().cost_hour_extra_35, 2)
        except Exception as e:
            return 0

    def get_total_hours_conditioning(self):
        try:
            total_time = timedelta(hours=self.conditioning_hours.hour, minutes=self.conditioning_hours.minute,
                                   seconds=self.conditioning_hours.second)
            total_time += timedelta(hours=self.conditioning_hours_25.hour, minutes=self.conditioning_hours_25.minute,
                                    seconds=self.conditioning_hours_25.second)
            total_time += timedelta(hours=self.conditioning_hours_35.hour, minutes=self.conditioning_hours_35.minute,
                                    seconds=self.conditioning_hours_35.second)
            return total_time
        except Exception as e:
            return 0

    def get_total_cost_conditioning(self):
        try:
            return self.get_cmo_conditioning() + self.get_cmo_conditioning_25() + self.get_cmo_conditioning_35()
        except Exception as e:
            return 0

    def get_cmo_kg_conditioning(self):
        try:
            return round(self.get_total_cost_conditioning() / self.get_total_kg(), 2)
        except Exception as e:
            return 0

    def get_productivity_conditioning(self):
        try:
            total_hours = (self.get_total_hours_packing().total_seconds() / 3600)
            return round(
                (decimal.Decimal(self.get_total_process_kg_logistic()) / self.conditioning_people) / decimal.Decimal(
                    total_hours), 2)
        except Exception as e:
            print(e)
            return 0

    def get_cmo_packing_day(self):
        try:
            total_time = self.packing_hours_day.hour + (self.packing_hours_day.minute / 60)
            return round(
                (self.packing_people_day * decimal.Decimal(total_time)) * CostProduction.objects.first().cost_hour_day,
                2)
        except Exception as e:
            return 0

    def get_cmo_packing_night(self):
        try:
            total_time = self.packing_hours_night.hour + (self.packing_hours_night.minute / 60)
            return round((self.packing_people_night * decimal.Decimal(
                total_time)) * CostProduction.objects.first().cost_hour_night, 2)
        except Exception as e:
            return 0

    def get_cmo_packing_25(self):
        try:
            total_time = self.packing_hours_25.hour + (self.packing_hours_25.minute / 60)
            return round((self.packing_people_25 * decimal.Decimal(
                total_time)) * CostProduction.objects.first().cost_hour_extra_25, 2)
        except Exception as e:
            return 0

    def get_cmo_packing_35(self):
        try:
            total_time = self.packing_hours_35.hour + (self.packing_hours_35.minute / 60)
            return round((self.packing_people_35 * decimal.Decimal(
                total_time)) * CostProduction.objects.first().cost_hour_extra_35, 2)
        except Exception as e:
            return 0

    def get_total_hours_packing(self):
        try:
            total_time = timedelta(hours=self.packing_hours_day.hour, minutes=self.packing_hours_day.minute,
                                   seconds=self.packing_hours_day.second)
            total_time += timedelta(hours=self.packing_hours_25.hour, minutes=self.packing_hours_25.minute,
                                    seconds=self.packing_hours_25.second)
            total_time += timedelta(hours=self.packing_hours_35.hour, minutes=self.packing_hours_35.minute,
                                    seconds=self.packing_hours_35.second)
            return total_time
        except Exception as e:
            return 0

    def get_total_cost_packing(self):
        try:
            return self.get_cmo_packing_day() + self.get_cmo_packing_night() + self.get_cmo_packing_25() + self.get_cmo_packing_35()
        except Exception as e:
            return 0

    def get_cmo_kg_packing(self):
        try:
            return round(self.get_total_cost_packing() / self.get_total_kg(), 2)
        except Exception as e:
            return 0

    def get_productivity_packing(self):
        try:
            total_hours = (self.get_total_hours_packing().total_seconds() / 3600)
            return round((self.get_total_kg() / self.packing_people_day) / decimal.Decimal(total_hours), 2)
        except Exception as e:
            return 0
