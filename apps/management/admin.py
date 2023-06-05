from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from simple_history.admin import SimpleHistoryAdmin

from apps.management.models import Clients, ProviderPacking, SuppliersMaquila, ProviderTransport, Location, Zone, \
    CostProduction


# Register your models here.
@admin.register(Clients)
class ClientsAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('business_name', 'ruc', 'address', 'country',)
    search_fields = ('business_name',)
    ordering = ['business_name']
    list_per_page = 25


@admin.register(ProviderPacking)
class ProviderPackingAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('business_name', 'ruc', 'address', 'country',)
    search_fields = ('business_name',)
    ordering = ['business_name']
    list_per_page = 25


@admin.register(SuppliersMaquila)
class SuppliersMaquilaAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('business_name', 'ruc', 'address', 'country',)
    search_fields = ('business_name',)
    ordering = ['business_name']
    list_per_page = 25


@admin.register(ProviderTransport)
class ProviderTransportAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('business_name', 'ruc', 'address', 'country',)
    search_fields = ('business_name',)
    ordering = ['business_name']
    list_per_page = 25


@admin.register(Location)
class LocationAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name',)
    ordering = ['name']
    list_per_page = 25


@admin.register(Zone)
class ZoneAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name',)
    ordering = ['name']
    list_per_page = 25


@admin.register(CostProduction)
class CostProductionAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('cost_hour_day',
                    'cost_hour_night',
                    'cost_hour_extra_25',
                    'cost_hour_extra_35')
    ordering = ['id']
    list_per_page = 25

