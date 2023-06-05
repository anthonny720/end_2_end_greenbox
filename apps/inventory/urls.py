from django.urls import path

from apps.inventory.views import SyncMaterialsView, ListMaterialsView, ListProductsView, SyncProductsView, \
    ListSummaryView

app_name = "inventory"

urlpatterns = [
    path('materials', ListMaterialsView.as_view(), name='materials'),
    path('products', ListProductsView.as_view(), name='products'),
    path('sync/materials', SyncMaterialsView.as_view(), name='sync_materials'),
    path('sync/products', SyncProductsView.as_view(), name='sync_products'),
    path('summary/products', ListSummaryView.as_view(), name='summary_products')

]
