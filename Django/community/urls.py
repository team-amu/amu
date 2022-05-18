from django.urls import path
from . import views

app_name = 'community'
urlpatterns = [
    path('total/<int:page>/', views.articles_total),
    path('hot/<int:page>/', views.articles_hot),
    path('review/<int:page>/', views.articles_review),
    path('article/<int:page>/', views.articles_article),
]