from django.urls import path
from . import views

app_name = 'community'
urlpatterns = [
    path('total/<int:page>/', views.articles_total),
]