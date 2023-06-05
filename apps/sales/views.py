from datetime import datetime

from django.db import DatabaseError
from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.sales.models import Samples
from apps.sales.serializers import SamplesSerializer
from apps.util.permissions import CommercialEditorPermission, LogisticsEditorPermission, OperationsEditorPermission


# Create your views here.
class ListSamplesView(APIView):
    def get(self, request):
        try:
            queryset = Samples.objects.all()
            date_start = request.query_params.get('startDate', None)
            date_end = request.query_params.get('endDate', None)
            client = request.query_params.get('client', None)
            if client:
                queryset = queryset.filter(client__icontains=client)
            if date_start and date_end:
                queryset = queryset.filter(delivery_date__range=[date_start[:10], date_end[:10]])
            else:
                queryset = queryset.filter(delivery_date__year=datetime.now().year)

            serializer = SamplesSerializer(queryset, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except DatabaseError as e:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@permission_classes([AllowAny])
class CreateSampleView(APIView):
    def post(self, request):
        try:
            serializer = SamplesSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'Solicitud registrada'}, status=status.HTTP_201_CREATED)
        except DatabaseError as e:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@permission_classes([CommercialEditorPermission | LogisticsEditorPermission | OperationsEditorPermission])
class UpdateSampleView(APIView):

    def patch(self, request, pk):
        try:
            sample = Samples.objects.get(pk=pk)
            serializer = SamplesSerializer(sample, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'Solicitud actualizada'}, status=status.HTTP_200_OK)
        except DatabaseError as e:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ListDatePendingView(APIView):
    def get(self, request):
        try:
            queryset = Samples.objects.filter(status__in=['A', 'DP', 'WD'])
            serializer = SamplesSerializer(queryset, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except DatabaseError as e:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
