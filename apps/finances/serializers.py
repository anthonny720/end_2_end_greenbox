from rest_framework import serializers

from apps.finances.models import ReportCategory, Category, ReportCost


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('name','type','group')

class DetailSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = ReportCategory
        fields = ('category', 'cost','id')


class CostSerializer(serializers.ModelSerializer):
    item = DetailSerializer(source='reports_category', many=True)
    mp=serializers.CharField(source='get_mp_name',read_only=True)
    week=serializers.CharField(source='get_week',read_only=True)
    year=serializers.CharField(source='get_year',read_only=True)
    performance=serializers.CharField(source='get_performance',read_only=True)

    total_cost_md=serializers.CharField(source='get_total_cost_md',read_only=True)
    total_cost_mod=serializers.CharField(source='get_total_cost_mod',read_only=True)
    total_cost_cif=serializers.CharField(source='get_total_cost_cif',read_only=True)
    item_md=serializers.DictField(source='get_item_md',read_only=True)
    item_mod=serializers.DictField(source='get_item_mod',read_only=True)
    item_cif=serializers.DictField(source='get_item_cif',read_only=True)
    kg_total=serializers.CharField(source='get_kg_total',read_only=True)
    kg_pt_total=serializers.CharField(source='get_kg_pt_total',read_only=True)


    class Meta:
        model = ReportCost
        fields = '__all__'

