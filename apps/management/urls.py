from django.urls import path

from apps.management.views import (ListClientsView,

                                   ListProviderPackingView,
                                   ListSuppliersMaquilaView,
                                   ListProviderTransportView,
                                   ListZoneView, ListLocationView)

app_name = "management"
urlpatterns = [
    path('clients', ListClientsView.as_view(), name='list_clients'),
    path('providers_packing', ListProviderPackingView.as_view(), name='list_providers_packing'),
    path('suppliers_maquila', ListSuppliersMaquilaView.as_view(), name='list_suppliers_maquila'),
    path('providers_transport', ListProviderTransportView.as_view(), name='list_providers_transport'),
    path('locations', ListLocationView.as_view(), name='list_locations'),
    path('zones', ListZoneView.as_view(), name='list_zones'),
]
