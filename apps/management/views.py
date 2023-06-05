from django.db import DatabaseError
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.management.models import Clients, ProviderPacking, SuppliersMaquila, ProviderTransport, Zone, Location
from apps.management.serializers import ZoneSerializer, ProviderTransportSerializer, SuppliersMaquilaSerializer, \
    ProviderPackingSerializer, ClientsSerializer, LocationSerializer


# Create your views here.

class ListClientsView(APIView):
    def get(self, request):
        try:
            queryset = Clients.objects.all()
            name = request.query_params.get('name', None)
            if name:
                queryset = queryset.filter(business_name__icontains=name)
            serializer = ClientsSerializer(queryset, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except DatabaseError as e:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ListProviderPackingView(APIView):
    def get(self, request):
        try:
            queryset = ProviderPacking.objects.all()
            name = request.query_params.get('name', None)
            if name:
                queryset = queryset.filter(business_name__icontains=name)
            serializer = ProviderPackingSerializer(queryset, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except DatabaseError as e:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ListSuppliersMaquilaView(APIView):
    def get(self, request):
        try:
            queryset = SuppliersMaquila.objects.all()
            name = request.query_params.get('name', None)
            if name:
                queryset = queryset.filter(business_name__icontains=name)
            serializer = SuppliersMaquilaSerializer(queryset, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except DatabaseError as e:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ListProviderTransportView(APIView):
    def get(self, request):
        try:
            queryset = ProviderTransport.objects.all()
            name = request.query_params.get('name', None)
            if name:
                queryset = queryset.filter(business_name__icontains=name)
            serializer = ProviderTransportSerializer(queryset, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except DatabaseError as e:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ListZoneView(APIView):
    def get(self, request):
        try:
            zone = Zone.objects.all()
            serializer = ZoneSerializer(zone, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except DatabaseError as e:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ListLocationView(APIView):
    def get(self, request):
        try:
            location = Location.objects.all()
            serializer = LocationSerializer(location, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except DatabaseError as e:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
