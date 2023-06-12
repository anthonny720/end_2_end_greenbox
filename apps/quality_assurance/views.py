from datetime import datetime

from django.db import DatabaseError
from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.generics import ListAPIView, RetrieveUpdateAPIView, get_object_or_404
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import (
    Blueberry as blueberry,
    Banano as banano,
    Goldenberry as goldenberry,
    Mango as mango,
    Pineapple as pineapple, StatusLot,
)
from .serializers import (
    BlueberrySerializer,
    BananoSerializer,
    GoldenberrySerializer,
    MangoSerializer,
    PineappleSerializer, StatusLotSerializer,
)
from ..util.permissions import QualityEditorPermission, CertificationsEditorPermission


@permission_classes([IsAuthenticatedOrReadOnly])
class AnalysisListView(ListAPIView):
    serializer_class_map = {
        blueberry: BlueberrySerializer,
        banano: BananoSerializer,
        goldenberry: GoldenberrySerializer,
        mango: MangoSerializer,
        pineapple: PineappleSerializer,
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
            date_start = request.query_params.get('start_date', None)
            date_end = request.query_params.get('end_date', None)
            all_data= request.query_params.get('all', None)
            if date_start and date_end:
                queryset = queryset.filter(lot__entry_date__range=[date_start, date_end])
            else:
                if all_data:
                    queryset = queryset.all()
                else:
                    queryset = queryset.filter(lot__entry_date__month=datetime.now().month)
            serializer_class = self.get_serializer_class()
            serializer = serializer_class(queryset, many=True)

            return Response({'data': serializer.data}, status=status.HTTP_200_OK)

        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@permission_classes([QualityEditorPermission, ])
class AnalysisDetailView(RetrieveUpdateAPIView):
    serializer_class_map = {
        blueberry: BlueberrySerializer,
        banano: BananoSerializer,
        goldenberry: GoldenberrySerializer,
        mango: MangoSerializer,
        pineapple: PineappleSerializer,
    }

    def get_queryset(self):
        model_name = self.kwargs.get('model_name')
        model_class = globals().get(model_name)
        return model_class.objects.all()

    def get_serializer_class(self):
        model_name = self.kwargs.get('model_name')
        return self.serializer_class_map.get(globals().get(model_name))

    def patch(self, request, *args, **kwargs):

        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            success_message = "Registro actualizado correctamente."
            return Response({'message': success_message}, status=status.HTTP_200_OK)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ListStatusLotView(APIView):
    def get(self, request):
        try:
            queryset = StatusLot.objects.all()

            lot = request.query_params.get('lot', None)
            status_lot = request.query_params.get('status', None)
            year = request.query_params.get('year', None)
            product = request.query_params.get('product', None)

            if lot:
                queryset = queryset.filter(lot__lot__icontains=lot)
            if product:
                queryset = queryset.filter(lot__product=product)
            if year:
                queryset = queryset.filter(lot__entry_date__year=year)
            else:
                queryset = queryset.filter(lot__entry_date__year=datetime.now().year)
            if status_lot:
                queryset = queryset.filter(status__icontains=status_lot)
            serializer = StatusLotSerializer(queryset, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except DatabaseError as e:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@permission_classes([CertificationsEditorPermission, ])
class UpdateStatusLotView(APIView):
    def get(self, request, pk):
        try:
            queryset = StatusLot.objects.get(pk=pk)
            serializer = StatusLotSerializer(queryset)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except DatabaseError as e:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def patch(self, request, pk):
        try:

            queryset = get_object_or_404(StatusLot, pk=pk)
            queryset.microbiological_analysis = request.data.get('microbiological_analysis')
            queryset.fosetyl = request.data.get('fosetyl')
            queryset.pesticide = request.data.get('pesticide')
            queryset.destine = request.data.get('destine')
            queryset.observations = request.data.get('observations')
            queryset.status = request.data.get('status')
            queryset.pt_list = request.data.get('pt_list')
            queryset.lot_client = request.data.get('lot_client')
            queryset.save()
            return Response({'message': 'Item actualizado'}, status=status.HTTP_200_OK)
        except DatabaseError as e:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
