from django.urls import path

from apps.finances.views import ListCostAPIView, UpdateCostsAPIView

app_name = "finance"

urlpatterns = [
    path('costs', ListCostAPIView.as_view(), name='finance'),
    path('costs/update', UpdateCostsAPIView.as_view(), name='update-finance-variable'),
]
