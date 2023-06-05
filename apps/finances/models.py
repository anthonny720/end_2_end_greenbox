import decimal

from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

from apps.production.models import MOD


# Create your models here.
class Category(models.Model):
    class Meta:
        verbose_name_plural = 'Tipo de costos'
        verbose_name = 'Tipo de costo'
        ordering = ['name']

    def __str__(self):
        return self.name

    name = models.CharField(max_length=100, verbose_name='Nombre')
    type = models.CharField(max_length=1, choices=(('V', 'Variable'), ('F', 'Fijo')), verbose_name='Tipo')
    cost = models.DecimalField(max_digits=10, decimal_places=2, default=0, verbose_name='Costo')


class ReportCost(models.Model):
    class Meta:
        verbose_name_plural = 'Costos'
        verbose_name = 'Costos'
        unique_together = ('date',)

    def __str__(self):
        return str(self.date)

    date = models.DateField()
    mod = models.ManyToManyField(MOD, null=True,
                                 blank=True,
                                 verbose_name='MOD', related_name='reports')

    item = models.ManyToManyField(Category, verbose_name='Categoría', related_name='reports', through='ReportCategory',
                                  through_fields=('report', 'category'))

    def get_mp_name(self):
        mp = []
        name = ''
        try:
            for item in self.mod.all():
                for i in item.process.all():
                    if i.lot.product.name not in mp:
                        mp.append(i.lot.product.name)
            if len(mp) > 0:
                name = ','.join(mp)
            else:
                name = 'No hay materia prima'
            return name
        except  Exception as e:
            return str(e)

    def get_kg_total(self):
        try:
            return sum([item.get_total_process_kg() for item in self.mod.all()])
        except Exception as e:
            return str(e)

    def get_kg_pt_total(self):
        try:
            return sum([item.get_total_kg() for item in self.mod.all()])
        except:
            return 0

    def get_cost_mod(self):
        try:
            return sum([item.get_total_cost_conditioning() for item in self.mod.all()]) + sum(
                [item.get_total_cost_packing() for item in self.mod.all()])
        except Exception as e:
            return str(e)

    def get_cost_mp(self):
        try:
            cost = sum(
                [
                    i.lot.record.get_price_plant() * j.get_paid_kg()
                    for item in self.mod.all()
                    for i in item.process.all()
                    for j in i.process.all()
                ]
            )
            return round(cost, 2)
        except Exception as e:
            return 0

    def get_cost_freight(self):
        try:
            cost = sum(
                [
                    i.lot.record.get_freight_unit() * decimal.Decimal(j.stock.kg)
                    for item in self.mod.all()
                    for i in item.process.all()
                    for j in i.process.all()
                ]
            )
            return round(cost, 2)
        except Exception as e:
            return str(e)

    def get_performance(self):
        try:
            return round((self.get_kg_pt_total() / self.get_kg_total()) * 100, 2)
        except:
            return 0

    def get_total_cost_fixed(self):
        try:
            query = ReportCategory.objects.filter(report=self)
            return sum([item.cost for item in query if item.category.type == 'F'])
        except:
            return 0

    def get_total_cost_variable(self):
        try:
            query = ReportCategory.objects.filter(report=self)
            return sum([item.cost for item in query if item.category.type == 'V'])
        except:
            return 0

    def get_total_cost(self):
        try:

            return self.get_total_cost_fixed() + self.get_total_cost_variable()
        except:
            return 0

    def get_total_cost_unit(self):
        try:
            return self.get_total_cost() / self.get_kg_pt_total()
        except:
            return 0

    def get_item_fixed(self):
        list = {}
        try:
            query = ReportCategory.objects.filter(report=self)
            for item in query:
                if item.category.type == 'F':
                    list[item.category.name] = {'id': item.id, 'cost': item.cost, 'name': item.category.name}
            return list
        except Exception as e:
            return list

    def get_item_variable(self):
        list = {}
        try:
            query = ReportCategory.objects.filter(report=self)
            for item in query:
                if item.category.type == 'V':
                    list[item.category.name] = {'id': item.id, 'cost': item.cost, 'name': item.category.name}
            return list
        except Exception as e:
            return list

    def get_week(self):
        return self.date.isocalendar()[1]

    def get_year(self):
        return self.date.year


@receiver(post_save, sender=ReportCost)
def update_cost(sender, instance, **kwargs):
    try:
        for field in Category.objects.all():
            object = ReportCategory.objects.filter(report=instance, category=field)
            if not object:
                ReportCategory.objects.create(report=instance, category=field)
    except:
        pass


class ReportCategory(models.Model):
    class Meta:
        verbose_name_plural = 'Registro por tipo de costo'
        verbose_name = 'Registro por tipo de costo'
        ordering = ['category__type']

    def __str__(self):
        return str(self.report) + ' ' + str(self.category.name)

    report = models.ForeignKey(ReportCost, on_delete=models.PROTECT, related_name='reports_category',
                               verbose_name='Reporte')
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name='report_category',
                                 verbose_name='Categoría')
    cost = models.DecimalField(max_digits=10, decimal_places=2, default=0, blank=True, null=True, verbose_name='Costo')

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        try:
            if self.category.type == 'F':
                self.cost = self.category.cost
        except Exception as e:
            pass
        super().save(force_insert, force_update, using, update_fields)
