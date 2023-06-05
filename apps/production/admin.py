from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from simple_history.admin import SimpleHistoryAdmin

from apps.production.models import ProcessPineapple, MOD, ProcessBanano


# Register your models here.

@admin.register(ProcessPineapple)
class ProcessPineappleAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('stock',)
    ordering = ['stock__date']
    date_hierarchy = 'stock__date'
    list_per_page = 25

@admin.register(ProcessBanano)
class ProcessBananoAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('stock',)
    ordering = ['stock__date']
    date_hierarchy = 'stock__date'
    list_per_page = 25


@admin.register(MOD)
class MODAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('get_total_cost_conditioning',
                    'get_cmo_kg_conditioning',
                    'get_productivity_conditioning',
                    'get_total_cost_packing',
                    'get_cmo_kg_packing',
                    'get_productivity_packing',)
    list_per_page = 25
