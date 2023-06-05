from django.urls import path

from apps.production.views import ProcessListView, MODListView, MODDetailView, ProcessUpdateView

app_name = "production"

urlpatterns = [
    path('mod/<str:category>', MODListView.as_view(), name='mod-process-list'),
    path('mod/<str:category>/<int:id>', MODDetailView.as_view(), name='mod-process-update'),
    path('process/<str:model_name>', ProcessListView.as_view(), name='process-list'),
    path('process/<str:model_name>/<int:id>', ProcessUpdateView.as_view(), name='process-update'),

]
