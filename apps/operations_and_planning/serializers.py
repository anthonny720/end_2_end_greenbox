from rest_framework import serializers

from .models import Records, IndicatorKPIMango, IndicatorKPIAguaymanto, IndicatorKPIPineapple, IndicatorKPI
from ..logistic.models import Lot
from ..logistic.serializers import LotSerializer


class RecordsSerializer(serializers.ModelSerializer):
    total_amount_plant = serializers.CharField(source='get_total_amount_plant', read_only=True)
    total_amount_camp = serializers.CharField(source='get_total_amount_camp', read_only=True)
    price_plant = serializers.CharField(source='get_price_plant', read_only=True)
    price_camp_final = serializers.CharField(source='get_price_camp', read_only=True)
    discount_soles = serializers.CharField(source='get_discount_soles', read_only=True)
    kg_usable = serializers.CharField(source='get_kg_usable', read_only=True)
    kg_discounted = serializers.CharField(source='get_kg_discounted', read_only=True)
    freight_unit = serializers.CharField(source='get_freight_unit', read_only=True)
    lot = LotSerializer(read_only=True)

    class Meta:
        model = Records
        fields = '__all__'


class LotCustomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lot
        fields = ('lot', 'get_total_net_weight',)


class Indicator(serializers.ModelSerializer):
    year = serializers.CharField(source='get_year', read_only=True)
    month = serializers.CharField(source='get_month', read_only=True)
    week = serializers.CharField(source='get_week', read_only=True)
    entry = serializers.CharField(source='get_entry_real', read_only=True)
    compliance = serializers.CharField(source='get_compliance_entry', read_only=True)
    price = serializers.CharField(source='get_price', read_only=True)
    lots = LotCustomSerializer(many=True, read_only=True)

    class Meta:
        model = IndicatorKPI
        fields = '__all__'


class KPIPineappleSerializer(Indicator):
    info = serializers.DictField(source='get_information', read_only=True)

    class Meta:
        model = IndicatorKPIPineapple
        fields = '__all__'


class KPIMangoSerializer(Indicator):
    info = serializers.DictField(source='get_information', read_only=True)

    class Meta:
        model = IndicatorKPIMango
        fields = '__all__'


class KPIGoldenberrySerializer(Indicator):
    info = serializers.DictField(source='get_information', read_only=True)

    class Meta:
        model = IndicatorKPIAguaymanto
        fields = '__all__'
