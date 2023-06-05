from django.urls import path

from apps.collection.views import (ListProductView, ListProviderView, ListCreateParcelView, UpdateParcelView,
                                   ProviderListView)

app_name = "collection"

urlpatterns = [
    path('products', ListProductView.as_view(), name='list_products'),
    path('providers', ListProviderView.as_view(), name='list_providers'),
    path('providers/<str:category>', ProviderListView.as_view(), name='get-providers-category'),
    path('parcels', ListCreateParcelView.as_view(), name='list_create_parcels'),
    path('parcels/<int:pk>', UpdateParcelView.as_view(), name='update_parcels'),

]
