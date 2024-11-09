from django.urls import path
from main import views

urlpatterns = [
    path('', views.index, name='index'),
    path('api/tasks/', views.task_api, name='api')
]
