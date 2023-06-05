from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.generics import ListAPIView, UpdateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

# Create your views here.
from .models import (
    ProcessPineapple as Piña, MOD, ProcessBanano as Banano
)
from .serializers import ProcessPineappleSerializer, MODSerializer, ProcessBananoSerializer
from ..util.permissions import ProductionEditorPermission, ProductionConditioningEditorPermission, \
    ProductionPackingEditorPermission


class ProcessListView(ListAPIView):
    serializer_class_map = {
        Piña: ProcessPineappleSerializer,
        Banano: ProcessBananoSerializer,
    }

    def get_queryset(self):
        model_name = self.kwargs.get('model_name')
        model_class = globals().get(model_name)
        return model_class.objects.all()

    def get_serializer_class(self):
        model_name = self.kwargs.get('model_name')
        return self.serializer_class_map.get(globals().get(model_name))

    def list(self, request, *args, **kwargs):
        try:

            queryset = self.get_queryset()

            provider = request.query_params.get('provider', None)
            start_date = request.query_params.get('start_date', None)
            end_date = request.query_params.get('end_date', None)
            lot = request.query_params.get('lot', None)

            if provider:
                queryset = queryset.filter(stock__lot__provider__id__icontains=provider)
            if lot:
                queryset = queryset.filter(stock__lot__lot__icontains=lot)
            if start_date and end_date:
                queryset = queryset.filter(stock__date__range=(start_date[:10], end_date[:10]))
            elif start_date:
                queryset = queryset.filter(stock__date__gte=start_date[:10])
            else:
                queryset = queryset[:50]
            serializer_class = self.get_serializer_class()
            serializer = serializer_class(queryset, many=True)

            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            error_message = f"Se ha producido un error al obtener los registros."
            detail_message = str(e)
            return Response({'error': error_message, 'detail': detail_message},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@permission_classes(
    [ProductionEditorPermission | ProductionConditioningEditorPermission | ProductionPackingEditorPermission])
class ProcessUpdateView(UpdateAPIView):
    serializer_class_map = {
        Piña: ProcessPineappleSerializer,
        Banano: ProcessBananoSerializer,
    }

    def get_queryset(self):
        model_name = self.kwargs.get('model_name')
        model_class = globals().get(model_name)
        return model_class.objects.filter(id=self.kwargs["id"])

    def get_serializer_class(self):
        model_name = self.kwargs.get('model_name')
        return self.serializer_class_map.get(globals().get(model_name))

    def partial_update(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            instance = queryset.first()
            data = request.data
            serializer_class = self.get_serializer_class()
            serializer = serializer_class(instance, data=data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'Registro actualizado correctamente.'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'error': 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.',
                'detail': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def get_filtered_query(category, provider=None, start_date=None, end_date=None):
    queryset = MOD.objects.filter(process__lot__product__name__icontains=category).distinct()

    if provider:
        queryset = queryset.filter(process__lot__provider__id__icontains=provider)
    if start_date and end_date:
        queryset = queryset.filter(date__range=(start_date[:10], end_date[:10]))
    else:
        queryset = queryset[:50]
    return queryset


class MODListView(APIView):
    def get(self, request, *args, **kwargs):
        category = kwargs["category"].capitalize()

        provider = request.query_params.get('provider', None)
        start_date = request.query_params.get('start_date', None)
        end_date = request.query_params.get('end_date', None)
        try:
            queryset = get_filtered_query(category, provider, start_date, end_date)
            serializer = MODSerializer(queryset, many=True)
            response = serializer.data
            summary = get_summary(queryset)
            return Response({'data': response, 'summary': summary}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'error': 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.',
                'detail': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@permission_classes(
    [ProductionEditorPermission | ProductionConditioningEditorPermission | ProductionPackingEditorPermission])
class MODDetailView(APIView):
    def patch(self, request, *args, **kwargs):
        try:
            mod = MOD.objects.get(id=kwargs["id"])
            serializer = MODSerializer(mod, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'Registro actualizado correctamente.'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'error': 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.',
                'detail': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def get_summary(query):
    kg_processed = 0
    kp_pt = 0
    total_cost_conditioning = 0
    cmo_kg_conditioning = 0
    productivity_conditioning = 0
    total_cost_packing = 0
    cmo_kg_packing = 0
    productivity_packing = 0

    for item in query:
        kg_processed += item.get_total_process_kg_logistic()
        total_cost_conditioning += item.get_total_cost_conditioning()
        cmo_kg_conditioning += item.get_cmo_kg_conditioning()
        productivity_conditioning += item.get_productivity_conditioning()
        kp_pt += item.get_total_kg()
        total_cost_packing += item.get_total_cost_packing()
        cmo_kg_packing += item.get_cmo_kg_packing()
        productivity_packing += item.get_productivity_packing()

    return {
        'Kg procesados': kg_processed,
        'S/. Acondicionado': total_cost_conditioning,
        'CMO/KG Acondicionado': cmo_kg_conditioning / query.count() if query.count() > 0 else 0,
        'Productividad Acondicionado': productivity_conditioning / query.count() if query.count() > 0 else 0,
        'Kg PT': kp_pt,
        'S/. Envasado': total_cost_packing,
        'CMO/KG Envasado': cmo_kg_packing / query.count() if query.count() > 0 else 0,
        'Productividad Envasado': productivity_packing / query.count() if query.count() > 0 else 0,
    }