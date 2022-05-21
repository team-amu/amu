from django.urls import path
from . import views

app_name = 'movies'
urlpatterns = [
    path('', views.home),

    path('hot/', views.hot_movies),
    path('like/', views.like_movies),
    path('bookmark/', views.bookmark_movies),

    path('<int:movie_id>/', views.movie_detail),
    path('<int:movie_id>/like/', views.movie_like),
    path('<int:movie_id>/bookmark/', views.movie_bookmark),
    path('search/<int:search_page>/', views.movie_search),
]