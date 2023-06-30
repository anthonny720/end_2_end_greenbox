from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from simple_history.admin import SimpleHistoryAdmin

from apps.management.models import ContactPeople, Customer, Suppliers, Outsourcing, Transport, StorageArea, Location, \
    UnitOfMeasurement, Categories, Currency, TaxRates, CostProduction, Condition, Family, SubFamily, Cut, Packing


# Register your models here.
@admin.register(ContactPeople)
class ContactAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('first_name', 'last_name', 'email')
    search_fields = ('first_name',)
    ordering = ['first_name']
    list_per_page = 25

@admin.register(Customer)
class CustomerAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('display_name', 'ruc', 'address','email','phone')
    search_fields = ('display_name',)
    ordering = ['display_name']
    list_per_page = 25

@admin.register(Suppliers)
class SuppliersAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('display_name', 'ruc', 'address','email','phone')
    search_fields = ('display_name',)
    ordering = ['display_name']
    list_per_page = 25
@admin.register(Outsourcing)
class OutsourcingAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('display_name', 'ruc', 'address','email','phone')
    search_fields = ('display_name',)
    ordering = ['display_name']
    list_per_page = 25
@admin.register(Transport)
class TransportAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('display_name', 'ruc', 'address','email','phone')
    search_fields = ('display_name',)
    ordering = ['display_name']
    list_per_page = 25
@admin.register(StorageArea)
class StorageAreaAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    ordering = ['name']
    list_per_page = 25
@admin.register(Location)
class LocationAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name','stock')
    search_fields = ('name',)
    ordering = ['name']
    list_per_page = 25

@admin.register(UnitOfMeasurement)
class UnitOfMeasurementAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    ordering = ['name']
    list_per_page = 25
@admin.register(Categories)
class CategoriesAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    ordering = ['name']
    list_per_page = 25
@admin.register(Currency)
class CurrencyAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    ordering = ['name']
    list_per_page = 25
@admin.register(TaxRates)
class TaxRatesAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name','rate')
    search_fields = ('name',)
    ordering = ['name']
    list_per_page = 25
@admin.register(CostProduction)
class CostProductionAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('cost_hour_day','cost_hour_night','cost_hour_extra_25','cost_hour_extra_35')
    list_per_page = 25

@admin.register(Condition)
class ConditionAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    ordering = ['name']
    list_per_page = 25

@admin.register(Family)
class FamilyAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    ordering = ['name']
    list_per_page = 25

@admin.register(SubFamily)
class SubFamilyAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    ordering = ['name']
    list_per_page = 25

@admin.register(Cut)
class CutAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    ordering = ['name']
    list_per_page = 25

@admin.register(Packing)
class PackingAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    ordering = ['name']
    list_per_page = 25
