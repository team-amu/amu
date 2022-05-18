from django.urls import path
from . import views

app_name = 'movies'
urlpatterns = [
    path('', views.index),
    path('genre/', views.index2)
]