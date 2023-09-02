from django.urls import path
from .views import upload_file, stats

urlpatterns = [
    path('upload/', upload_file, name='upload_file'),
    path('calculate/', stats, name='calculate')
]

