from django.db import DatabaseError
from django.db.models.deletion import ProtectedError
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.management.models import Customer, Suppliers, Outsourcing, Transport, StorageArea, Location, CostProduction, \
    UnitOfMeasurement, Categories, TaxRates, Currency, Condition, Family, SubFamily, Cut, Packing
from apps.management.serializers import (CustomerSerializer, SuppliersSerializer, OutsourcingSerializer,
                                         TransportSerializer, StorageAreaSerializer, LocationSerializer,
                                         CostProductionSerializer, UnitOfMeasurementSerializer,
                                         CategoriesSerializer, TaxRatesSerializer, CurrencySerializer,
                                         ConditionSerializer, FamilySerializer, SubFamilySerializer,
                                         CutSerializer, PackingSerializer)


# Create your views here.

class BaseListView(APIView):
    model = None
    serializer_class = None
    filter_param = None

    def get_queryset(self):
        return self.model.objects.all()

    def get(self, request):
        try:
            queryset = self.get_queryset()
            filter_value = request.query_params.get(self.filter_param, None)
            if filter_value:
                filter_kwargs = {f"{self.filter_param}__icontains": filter_value}
                queryset = queryset.filter(**filter_kwargs)
            serializer = self.serializer_class(queryset, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except DatabaseError:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        try:
            serializer = self.serializer_class(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'data': serializer.data}, status=status.HTTP_201_CREATED)
        except DatabaseError:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ListCustomerView(BaseListView):
    model = Customer
    serializer_class = CustomerSerializer
    filter_param = 'display_name'


class ListSuppliersView(BaseListView):
    model = Suppliers
    serializer_class = SuppliersSerializer
    filter_param = 'display_name'


class ListOutsourcingView(BaseListView):
    model = Outsourcing
    serializer_class = OutsourcingSerializer
    filter_param = 'display_name'


class ListTransportView(BaseListView):
    model = Transport
    serializer_class = TransportSerializer
    filter_param = 'display_name'


class ListStorageAreaView(BaseListView):
    model = StorageArea
    serializer_class = StorageAreaSerializer
    filter_param = 'name'


class ListLocationView(BaseListView):
    model = Location
    serializer_class = LocationSerializer
    filter_param = 'name'


class ListCostProductionView(BaseListView):
    model = CostProduction
    serializer_class = CostProductionSerializer
    filter_param = 'name'


class ListUnitOfMeasurementView(BaseListView):
    model = UnitOfMeasurement
    serializer_class = UnitOfMeasurementSerializer
    filter_param = 'name'


class ListCategoriesView(BaseListView):
    model = Categories
    serializer_class = CategoriesSerializer
    filter_param = 'name'


class ListTaxRatesView(BaseListView):
    model = TaxRates
    serializer_class = TaxRatesSerializer
    filter_param = 'name'


class ListCurrencyView(BaseListView):
    model = Currency
    serializer_class = CurrencySerializer
    filter_param = 'name'


class ListConditionView(BaseListView):
    model = Condition
    serializer_class = ConditionSerializer
    filter_param = 'name'


class ListFamilyView(BaseListView):
    model = Family
    serializer_class = FamilySerializer
    filter_param = 'name'


class ListSubFamilyView(BaseListView):
    model = SubFamily
    serializer_class = SubFamilySerializer
    filter_param = 'name'


class ListCutView(BaseListView):
    model = Cut
    serializer_class = CutSerializer
    filter_param = 'name'


class ListPackingView(BaseListView):
    model = Packing
    serializer_class = PackingSerializer
    filter_param = 'name'


class BaseDetailView(APIView):
    model = None
    serializer_class = None

    def get_object(self, slug):
        return self.model.objects.get(slug=slug)

    def get(self, request, slug):
        try:
            instance = self.get_object(slug)
            serializer = self.serializer_class(instance)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except self.model.DoesNotExist:
            error_message = f'No se ha encontrado un objeto con el id {slug}'
            return Response({'message': error_message}, status=status.HTTP_404_NOT_FOUND)
        except DatabaseError:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def patch(self, request, slug):
        try:
            instance = self.get_object(slug)
            serializer = self.serializer_class(instance, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'Actualizado correctamente'}, status=status.HTTP_200_OK)
        except self.model.DoesNotExist:
            error_message = f'No se ha encontrado un objeto con el id {slug}'
            return Response({'message': error_message}, status=status.HTTP_404_NOT_FOUND)
        except DatabaseError:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, slug):
        try:
            instance = self.get_object(slug)
            instance.delete()
            return Response({'message': 'Eliminado correctamente'}, status=status.HTTP_200_OK)
        except self.model.DoesNotExist:
            error_message = f'No se ha encontrado un objeto con el id {slug}'
            return Response({'message': error_message}, status=status.HTTP_404_NOT_FOUND)
        except ProtectedError as e:
            related_objects = e.protected_objects
            error_message = f'No se puede eliminar este objeto debido a la siguiente relación "PROTECT":'
            error_message += f'\n\n{str(e)}'
            return Response({'message': error_message}, status=status.HTTP_409_CONFLICT)
        except DatabaseError:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DetailCustomerView(BaseDetailView):
    model = Customer
    serializer_class = CustomerSerializer

class DetailSuppliersView(BaseDetailView):
    model = Suppliers
    serializer_class = SuppliersSerializer

class DetailOutsourcingView(BaseDetailView):
    model = Outsourcing
    serializer_class = OutsourcingSerializer

class DetailTransportView(BaseDetailView):
    model = Transport
    serializer_class = TransportSerializer
