from django.db import DatabaseError
from django.db.models import Q
from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.collection.models import Product, Provider, Parcel
from apps.collection.serializers import ProductSerializer, ProviderSerializer, ParcelSerializer
from apps.util.permissions import CertificationsEditorPermission, CollectionEditorPermission


# Create your views here.

class ListProductView(APIView):
    def get(self, request):
        try:
            queryset = Product.objects.all()
            serializer = ProductSerializer(queryset, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except DatabaseError as e:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@permission_classes([AllowAny])
class ListProviderView(APIView):
    def get(self, request):
        try:
            queryset = Provider.objects.all()
            name = request.query_params.get('name', None)
            if name:
                queryset = queryset.filter(Q(business_name__icontains=name) | Q(product__name__icontains=name))
            serializer = ProviderSerializer(queryset, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except DatabaseError as e:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@permission_classes([CertificationsEditorPermission | CollectionEditorPermission])
class ListCreateParcelView(APIView):
    def get(self, request):
        try:
            queryset = Parcel.objects.all()
            product = request.query_params.get('product', None)
            parcel = request.query_params.get('parcel', None)
            property_name = request.query_params.get('property_name', None)
            type_mp = request.query_params.get('type_mp', None)
            provider = request.query_params.get('providers', None)

            if provider:
                queryset = queryset.filter(provider_id=provider)
            if type_mp:
                queryset = queryset.filter(type_mp__icontains=type_mp)
            if property_name:
                queryset = queryset.filter(property_name__icontains=property_name)
            if product:
                queryset = queryset.filter(provider__product_id=product)
            if parcel:
                queryset = queryset.filter(parcel__icontains=parcel)
            serializer = ParcelSerializer(queryset, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except DatabaseError as e:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        try:
            serializer = ParcelSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'Parcela registrada'}, status=status.HTTP_201_CREATED)
        except DatabaseError as e:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@permission_classes([CertificationsEditorPermission | CollectionEditorPermission])
class UpdateParcelView(APIView):
    def patch(self, request, pk):
        try:
            parcel = Parcel.objects.get(pk=pk)
            serializer = ParcelSerializer(parcel, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'Parcela actualizada'}, status=status.HTTP_200_OK)
        except DatabaseError as e:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ProviderListView(APIView):
    def get(self, request, **kwargs):
        category = kwargs["category"].capitalize()
        providers = []
        try:
            for p in Product.objects.get(name__icontains=category).product_provider.all():
                providers.append({
                    'id': p.id,
                    'business_name': p.business_name}
                )
            return Response({'data': providers}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'No se encontraron resultados', 'detail': str(e)},
                            status=status.HTTP_400_BAD_REQUEST)
