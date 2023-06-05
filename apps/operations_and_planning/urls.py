from django.urls import path

from apps.operations_and_planning.views import ListRecordsView, UpdateRecordView, KPIUpdateView, KPIListView
app_name = "operations_and_planning"
urlpatterns = [
    path('records/<int:id>', UpdateRecordView.as_view(), name='update_record'),
    path('records/<str:category>', ListRecordsView.as_view(), name='list_records'),
    path('kpi/<str:model_name>', KPIListView.as_view(), name='list_kpi'),
    path('kpi/<str:model_name>/<int:id>', KPIUpdateView.as_view(), name='update_kpi'),

]
