from rest_framework import serializers

from apps.production.models import ProcessPineapple, MOD, ProcessBanano


class ProcessPineappleSerializer(serializers.ModelSerializer):
    stock = serializers.CharField(source='get_stock', read_only=True)
    week = serializers.CharField(source='stock.get_week', read_only=True)
    lot = serializers.CharField(source='get_lot', read_only=True)
    date = serializers.CharField(source='get_date', read_only=True)
    provider = serializers.CharField(source='get_provider', read_only=True)
    enabled_kg = serializers.CharField(source='get_enabled_kg', read_only=True)
    paid_kg = serializers.CharField(source='get_paid_kg', read_only=True)
    percent_rejected_ranch = serializers.CharField(source='get_percent_rejected_ranch', read_only=True)
    percent_crown = serializers.CharField(source='get_percent_crown', read_only=True)
    percent_shell = serializers.CharField(source='get_percent_shell', read_only=True)
    percent_trunk = serializers.CharField(source='get_percent_trunk', read_only=True)
    percent_juice_pulp = serializers.CharField(source='get_percent_juice_pulp', read_only=True)
    paid_performance = serializers.CharField(source='get_paid_performance', read_only=True)
    net_performance = serializers.CharField(source='get_net_performance', read_only=True)
    total_pt = serializers.CharField(source='get_total_pt', read_only=True)
    performance_1_8 = serializers.CharField(source='get_performance_1_8', read_only=True)
    performance_1_16 = serializers.CharField(source='get_performance_1_16', read_only=True)
    performance_rings = serializers.CharField(source='get_performance_rings', read_only=True)
    percent_enabled = serializers.CharField(source='get_percent_enabled', read_only=True)
    brute_kg_1_8 = serializers.CharField(source='get_brute_kg_1_8', read_only=True)
    brute_kg_1_16 = serializers.CharField(source='get_brute_kg_1_16', read_only=True)
    brute_kg_rings = serializers.CharField(source='get_brute_kg_rings', read_only=True)

    class Meta:
        model = ProcessPineapple
        fields = '__all__'


class ProcessBananoSerializer(serializers.ModelSerializer):
    stock = serializers.CharField(source='get_stock', read_only=True)
    week = serializers.CharField(source='stock.get_week', read_only=True)
    lot = serializers.CharField(source='get_lot', read_only=True)
    date = serializers.CharField(source='get_date', read_only=True)
    provider = serializers.CharField(source='get_provider', read_only=True)
    enabled_kg = serializers.CharField(source='get_enabled_kg', read_only=True)
    paid_kg = serializers.CharField(source='get_paid_kg', read_only=True)
    percent_rotten = serializers.CharField(source='get_percent_rotten', read_only=True)
    percent_shell = serializers.CharField(source='get_percent_shell', read_only=True)
    paid_performance = serializers.CharField(source='get_paid_performance', read_only=True)
    net_performance = serializers.CharField(source='get_net_performance', read_only=True)
    total_pt = serializers.CharField(source='get_total_pt', read_only=True)
    performance_coins = serializers.CharField(source='get_performance_coins', read_only=True)
    performance_slices = serializers.CharField(source='get_performance_slices', read_only=True)
    percent_enabled = serializers.CharField(source='get_percent_enabled', read_only=True)
    brute_kg_coins = serializers.CharField(source='get_brute_kg_coins', read_only=True)
    brute_kg_slices = serializers.CharField(source='get_brute_kg_slices', read_only=True)

    class Meta:
        model = ProcessBanano
        fields = '__all__'


class MODSerializer(serializers.ModelSerializer):
    total_kg = serializers.CharField(source='get_total_kg', read_only=True)
    total_process_kg = serializers.CharField(source='get_total_process_kg', read_only=True)
    total_process_kg_logistic = serializers.CharField(source='get_total_process_kg_logistic', read_only=True)
    cmo_conditioning = serializers.CharField(source='get_cmo_conditioning', read_only=True)
    cmo_conditioning_25 = serializers.CharField(source='get_cmo_conditioning_25', read_only=True)
    cmo_conditioning_35 = serializers.CharField(source='get_cmo_conditioning_35', read_only=True)
    total_hours_conditioning = serializers.CharField(source='get_total_hours_conditioning', read_only=True)
    total_cost_conditioning = serializers.CharField(source='get_total_cost_conditioning', read_only=True)
    cmo_kg_conditioning = serializers.CharField(source='get_cmo_kg_conditioning', read_only=True)
    productivity_conditioning = serializers.CharField(source='get_productivity_conditioning', read_only=True)
    cmo_packing_day = serializers.CharField(source='get_cmo_packing_day', read_only=True)
    cmo_packing_night = serializers.CharField(source='get_cmo_packing_night', read_only=True)
    cmo_packing_25 = serializers.CharField(source='get_cmo_packing_25', read_only=True)
    cmo_packing_35 = serializers.CharField(source='get_cmo_packing_35', read_only=True)
    total_hours_packing = serializers.CharField(source='get_total_hours_packing', read_only=True)
    total_cost_packing = serializers.CharField(source='get_total_cost_packing', read_only=True)
    cmo_kg_packing = serializers.CharField(source='get_cmo_kg_packing', read_only=True)
    productivity_packing = serializers.CharField(source='get_productivity_packing', read_only=True)
    week = serializers.CharField(source='get_week', read_only=True)

    class Meta:
        model = MOD
        fields = '__all__'
