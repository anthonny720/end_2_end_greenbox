from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from simple_history.admin import SimpleHistoryAdmin

from apps.inventory.models import Materials, Products


# Register your models here.

@admin.register(Materials)
class MaterialsAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('description', 'category', 'status', 'stock')
    search_fields = ('description',)
    list_filter = ('category', 'status')
    ordering = ['description']
    list_per_page = 25

@admin.register(Products)
class ProductsAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('family', 'group', 'product', 'lot','stock')
    search_fields = ('lot',)
    list_filter = ('family', 'group')
    list_per_page = 25
