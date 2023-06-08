# Create your views here.
import random

from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.generics import ListAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.operations_and_planning.serializers import RecordsSerializer
from .models import (Records)
from ..util.permissions import OperationsEditorPermission, LogisticsEditorPermission

months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']


def get_filtered_query(category, provider, start_date, end_date, all_data):
    queryset = Records.objects.filter(lot__product__name__icontains=category).exclude(lot__condition='E')

    if all_data:
        return queryset

    if provider:
        queryset = queryset.filter(lot__provider_id=provider)

    if start_date and end_date:
        queryset = queryset.filter(lot__entry_date__range=(start_date[:10], end_date[:10]))
    else:
        queryset = queryset[:50]
    return queryset


def generate_color(transparency=1):
    rand_color = (random.randrange(255), random.randrange(255), random.randrange(255))
    color = f"rgba({rand_color[0]}, {rand_color[1]}, {rand_color[2]}, {transparency})"
    color_full = f"rgba({rand_color[0]}, {rand_color[1]}, {rand_color[2]}, 1)"
    return color, color_full


# Create your views here.
@permission_classes([IsAuthenticatedOrReadOnly])
class ListRecordsView(APIView):

    def get(self, request, *args, **kwargs):
        category = kwargs["category"].capitalize()

        provider = request.query_params.get('provider', None)
        start_date = request.query_params.get('start_date', None)
        end_date = request.query_params.get('end_date', None)
        all_data = request.query_params.get('all', None)

        queryset = get_filtered_query(category, provider, start_date, end_date, all_data)
        try:
            report = {'kg': sum(c.get_kg_usable() for c in queryset),
                      'total': sum(c.get_total_amount_plant() for c in queryset),
                      }
            report['price'] = report['total'] / report['kg'] if report['kg'] else 0

            serializer = RecordsSerializer(queryset, many=True)
            results = serializer.data
            return Response({'data': results, 'summary': report}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'error': 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.',
                'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UpdateRecordView(APIView):
    permission_classes = [OperationsEditorPermission | LogisticsEditorPermission]

    def patch(self, request, id, format=None):
        try:
            report = get_object_or_404(Records, id=id)
            serializer = RecordsSerializer(report, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'Registro actualizado correctamente.'})
        except Exception as e:
            return Response({
                'error': 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.',
                'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


