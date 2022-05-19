from django.urls import path
from . import views

app_name = 'movies'
urlpatterns = [
    path('', views.home),
    path('<int:movie_id>/', views.movie_detail),
    path('<int:movie_id>/like/', views.movie_like),
    path('<int:movie_id>/bookmark/', views.movie_bookmark),

    # path('search/<int:search_page>/', views.search),
]