from rest_framework import serializers

from apps.management.models import Clients, ProviderPacking, SuppliersMaquila, ProviderTransport, Zone, Location, \
    ContactProxy


class ContactProxySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactProxy
        fields = '__all__'


class ClientsSerializer(ContactProxySerializer):
    class Meta:
        model = Clients
        fields = '__all__'


class ProviderPackingSerializer(ContactProxySerializer):
    class Meta:
        model = ProviderPacking
        fields = '__all__'


class SuppliersMaquilaSerializer(ContactProxySerializer):
    class Meta:
        model = SuppliersMaquila
        fields = '__all__'


class ProviderTransportSerializer(ContactProxySerializer):
    class Meta:
        model = ProviderTransport
        fields = '__all__'


class ZoneSerializer(ContactProxySerializer):
    class Meta:
        model = Zone
        fields = '__all__'


class LocationSerializer(ContactProxySerializer):
    class Meta:
        model = Location
        fields = '__all__'
