from django.urls import path

from .views import AnalysisListView, AnalysisDetailView, ListStatusLotView, UpdateStatusLotView

app_name = 'quality_assurance'

urlpatterns = [
    path('status', ListStatusLotView.as_view(), name='list_status'),
    path('status/<int:pk>', UpdateStatusLotView.as_view(), name='update_status'),
    path('<str:model_name>', AnalysisListView.as_view(), name='analysis_list'),
    path('<str:model_name>/<int:pk>', AnalysisDetailView.as_view(), name='analysis_detail'),

]
