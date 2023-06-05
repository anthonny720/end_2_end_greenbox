import io
import os

import gdown as gdown
import pandas as pd
import requests
from django.db.models import Q
from django.db.models import Sum
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.inventory.models import Materials, Products
from apps.inventory.serializers import MaterialsSerializer, ProductsSerializer, SummarySerializer, SummaryFCLSerializer
from apps.quality_assurance.models import StatusLot


# Create your views here.


class SyncMaterialsView(APIView):
    def get(self, request, format=None):

        url = 'https://drive.google.com/uc?id=1frWFcpoButsQDuN1s1oepN-BCk4JamJT'
        file_id = url.split('=')[1]  # obtener el ID del archivo

        # Descargar el archivo usando gdown
        url = f'https://drive.google.com/uc?id={file_id}'
        output = 'temp_file.xlsx'
        gdown.download(url, output, quiet=False)

        try:
            # Leer el archivo descargado con pandas
            df = pd.read_excel(output, dtype=str, engine='openpyxl', skiprows=5, sheet_name='PRODUCTO')
            df.fillna(0, inplace=True)

            # Eliminar los registros existentes en el modelo antes de agregar los nuevos
            Materials.objects.all().delete()

            # Recorrer el DataFrame y agregar cada registro a la base de datos
            for _, row in df.iterrows():
                obj = Materials(
                    code=row['CODIGO'],
                    description=row['DESCRIPCION'],
                    category=row['CATEGORIA'],
                    status=row['STATUS'],
                    safety_stock=row['STOCK SEGURIDAD'],
                    stock=row['EXISTENCIA ACTUAL'],
                    capacity=row['CAPACIDAD PARA CONTENEDOR'],
                    cost=row['COSTO UNITARIO'],
                    sap=row['SAP'],
                )
                obj.save()

            # Borrar el archivo temporal
            os.remove(output)

            return Response(status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ListMaterialsView(APIView):
    def get(self, request, format=None):
        try:

            queryset = Materials.objects.all()

            description = request.query_params.get('description', None)
            category = request.query_params.get('category', None)
            status_choice = request.query_params.get('status', None)
            if description:
                queryset = queryset.filter(description__icontains=description)
            if category:
                queryset = queryset.filter(category__icontains=category)
            if status_choice:
                queryset = queryset.filter(status__icontains=status_choice)
            serializer = MaterialsSerializer(queryset, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'error': 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class SyncProductsView(APIView):
    def get(self, request, format=None):

        url = 'https://drive.google.com/uc?id=1NulCTwLImxU506bNjaeZAPhWE9lYvOQr&export=download'
        # Reemplaza ID_DEL_ARCHIVO con el ID o la URL de tu archivo en Google Drive.
        response = requests.get(url)
        content = io.BytesIO(response.content)
        df = pd.read_excel(content, dtype=str, engine='openpyxl')
        df.fillna(0, inplace=True)

        # Eliminar los registros existentes en el modelo antes de agregar los nuevos
        Products.objects.all().delete()

        try:
            # Recorrer el DataFrame y agregar cada registro a la base de datos
            for _, row in df.iterrows():
                obj = Products(family=row['FAMILIA'], group=row['GRUPO'], certification=row['TIPO'],
                               product=row['PRODUCTO'], cut=row['CORTE'], variety=row['VARIEDAD'],
                               client=row['CLIENTE'], presentation=row['PRESENTACION'], packaging=row['EMBALAJE'],
                               packing=row['EMPAQUE'], lot=row['LOTE'], date_of_production=row['F.P.'],
                               date_of_expiration=row['F.V.'], boxes=row['N° CAJA'], article=row['ARTICULO'],
                               provider=row['PROVEEDOR'], condition=row['CONDICION'], fcl=row['FCL'],
                               campaign=row['CAMPAÑA'], observations=row['OBSERVACIONES'], stock=row['STOCK'])
                try:
                    if len(row['LOTE']) > 4:
                        destines = StatusLot.objects.filter(pt_list__iexact=row['LOTE'])
                        if destines.exists():
                            obj.destines = destines[0].get_destine_display()
                    else:
                        obj.destines = 'N/A'
                except:
                    obj.destines = 'N/A'
                obj.save()

            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ListProductsView(APIView):
    def get(self, request, format=None):
        try:
            queryset = Products.objects.all()
            lot = request.query_params.get('lot', None)
            presentation = request.query_params.get('presentation', None)
            certification = request.query_params.get('certification', None)
            group = request.query_params.get('group', None)
            product = request.query_params.get('product', None)
            cut = request.query_params.get('cut', None)
            observation = request.query_params.get('observations', None)
            fcl = request.query_params.get('fcl', None)
            client = request.query_params.get('client', None)
            destines = request.query_params.get('destines', None)
            if lot:
                queryset = queryset.filter(lot__icontains=lot)
            if product:
                queryset = queryset.filter(product__icontains=product)
            if fcl:
                queryset = queryset.filter(fcl__icontains=fcl)
            if cut:
                queryset = queryset.filter(cut__icontains=cut)
            if presentation:
                queryset = queryset.filter(presentation__icontains=presentation)
            if certification:
                queryset = queryset.filter(certification__icontains=certification)
            if group:
                queryset = queryset.filter(group__icontains=group)
            if observation:
                queryset = queryset.filter(observations__icontains=observation)
            if client:
                queryset = queryset.filter(client__icontains=client)
            if destines:
                queryset = queryset.filter(destines__icontains=destines)
            queryset = queryset.exclude(family__icontains='Total')
            serializer = ProductsSerializer(queryset, many=True)
            queryset = queryset.all().values('family').annotate(total_stock=Sum('stock')).exclude(
                family__icontains='Total').order_by('family')
            serializer_summary = SummarySerializer(queryset, many=True)
            return Response({'data': serializer.data, 'summary': serializer_summary.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e),
                             'error': 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ListSummaryView(APIView):
    def get(self, request, format=None):
        try:
            queryset = Products.objects.all()

            queryset = queryset.all().values('fcl', 'client', 'product', 'cut').annotate(
                total_stock=Sum('stock')).exclude(Q(fcl__icontains='Stock') | Q(family__icontains='Total')).order_by(
                'fcl')

            serializer = SummaryFCLSerializer(queryset, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'error': 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.',
                'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
