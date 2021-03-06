from django.urls import path
from . import views

app_name = 'movies'
urlpatterns = [
    path('', views.home),

    path('hot/', views.hot_movies),
    path('like/', views.like_movies),
    path('bookmark/', views.bookmark_movies),
    path('genres/', views.print_genres),
    path('<int:movie_id>/', views.movie_detail),
    path('<int:movie_id>/like/', views.movie_like),
    path('<int:movie_id>/bookmark/', views.movie_bookmark),
    path('search/<int:search_page>/', views.movie_search),
    # 검색어에 맞는 내용들을 출력해줌
    path('keywordSearch/', views.print_keyword_search),
    # 비로그인 유저들에게 보여줄 추천 영화
    path('anonymous/recommend/recent/', views.anonymous_recommend_recent),
    path('anonymous/recommend/hot/', views.anonymous_recommend_hot),
]