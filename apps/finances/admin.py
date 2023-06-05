from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from simple_history.admin import SimpleHistoryAdmin

from apps.finances.models import Category, ReportCost, ReportCategory


# Register your models here.
@admin.register(Category)
class CategoryAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name', 'cost')
    list_filter = ('type',)
    list_per_page = 20


@admin.register(ReportCost)
class ReportAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('date',)

    date_hierarchy = 'date'
    list_per_page = 20


@admin.register(ReportCategory)
class ReportCategoryAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('report', 'cost',)
    list_per_page = 20
