from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from simple_history.admin import SimpleHistoryAdmin

from apps.operations_and_planning.models import Records, IndicatorKPIPineapple, IndicatorKPIMango, \
    IndicatorKPIAguaymanto


# Register your models here.
@admin.register(Records)
class ZoneAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('lot', 'price_camp', 'freight')
    list_filter = ('lot__product', 'lot__provider', 'lot__maquila',)
    ordering = ['lot__date_entry']
    list_per_page = 25


@admin.register(IndicatorKPIPineapple)
class KPIPineappleAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = (
        'get_week', 'date', 'projected_kg', 'price_objective')
    date_hierarchy = 'date'


@admin.register(IndicatorKPIMango)
class KPIMangoAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = (
        'get_week',
        'date', 'projected_kg',
        'price_objective')
    date_hierarchy = 'date'


@admin.register(IndicatorKPIAguaymanto)
class KPIAguaymantoAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = (
        'get_week', 'date', 'projected_kg', 'price_objective')
    date_hierarchy = 'date'
