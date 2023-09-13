from django.urls import path
from . import views
urlpatterns = [
    path('uploadIris/', views.upload_fileIris, name='upload_file_iris'),
    path('uploadBreast/', views.upload_fileBreast, name='upload_file_breast'),
    path('calculate1/', views.stats, name='calculate1'),
    path('calculate2/', views.stats2, name='calculate2'),
    path('norm/', views.normalise, name='norm'),
    path('calculate3/', views.build_decision_tree, name='calculate3'),
    
    
    # path('assignment3/',views.assignment3,name="assignment3"),
    # path('assignment3/confuse_matrix/',views.assignment3_confuse_matrix,name="assignment3_confuse_matrix"),
    # path('assignment4/',views.assignment4,name="assignment4"),
    # path('assignment5/',views.assignment5,name="assignment5"),
]

