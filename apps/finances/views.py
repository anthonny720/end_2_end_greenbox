from django.db import DatabaseError
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.finances.models import ReportCost, ReportCategory
from apps.finances.serializers import CostSerializer
from apps.util.permissions import OperationsEditorPermission, LogisticsEditorPermission, ProductionEditorPermission


# Create your views here.

class ListCostAPIView(APIView):
    def get(self, request):
        startDate = request.query_params.get('startDate', None)
        endDate = request.query_params.get('endDate', None)
        queryset = ReportCost.objects.all().order_by('-date')
        if startDate and endDate:
            queryset = queryset.filter(date__range=[startDate[:10], endDate[:10]])
        try:
            serializer = CostSerializer(queryset, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except DatabaseError as e:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UpdateCostsAPIView(APIView):
    permission_classes = [OperationsEditorPermission | LogisticsEditorPermission | ProductionEditorPermission]

    def patch(self, request, *args, **kwargs):
        try:
            data = request.data
            for d in data:
                report = get_object_or_404(ReportCategory, id=data[d]['id'])
                report.cost = data[d]['cost']
                report.save()
            return Response({'message': 'Registro actualizado correctamente'}, status=status.HTTP_200_OK)
        except DatabaseError as e:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)