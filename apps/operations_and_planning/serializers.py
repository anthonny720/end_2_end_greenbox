from rest_framework import serializers

from .models import Records
from ..logistic.models import Lot
from ..logistic.serializers import SummaryLotSerializer


class RecordsSerializer(serializers.ModelSerializer):
    # total_amount_plant = serializers.CharField(source='get_total_amount_plant', read_only=True)
    # total_amount_camp = serializers.CharField(source='get_total_amount_camp', read_only=True)
    # price_plant = serializers.CharField(source='get_price_plant', read_only=True)
    # price_camp_final = serializers.CharField(source='get_price_camp', read_only=True)
    # discount_soles = serializers.CharField(source='get_discount_money_soles', read_only=True)
    # kg_usable = serializers.CharField(source='get_kg_usable', read_only=True)
    # kg_discounted = serializers.CharField(source='get_kg_discounted', read_only=True)
    # freight_unit = serializers.CharField(source='get_freight_unit', read_only=True)
    lot = SummaryLotSerializer(read_only=True)

    class Meta:
        model = Records
        fields = '__all__'


class LotCustomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lot
        fields = ('lot', 'get_total_net_weight',)

