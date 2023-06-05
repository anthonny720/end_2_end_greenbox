from rest_framework import serializers

from apps.inventory.models import Materials, Products


class MaterialsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Materials
        fields = '__all__'


class ProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = '__all__'


class SummarySerializer(serializers.ModelSerializer):
    stock = serializers.SerializerMethodField(read_only=True)

    def get_stock(self, obj):
        try:
            return round(obj['total_stock'], 2)
        except:
            return 0

    class Meta:
        model = Products
        fields = ('family', 'stock')


class SummaryFCLSerializer(serializers.ModelSerializer):
    stock = serializers.SerializerMethodField(read_only=True)

    def get_stock(self, obj):
        try:
            return round(obj['total_stock'], 2)
        except:
            return 0

    class Meta:
        model = Products
        fields = ('stock', 'fcl', 'client', 'product', 'cut')
