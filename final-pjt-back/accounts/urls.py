from django.urls import path
from . import views

app_name = 'accounts'

urlpatterns = [
    path('profile/<username>/', views.profile_with_like_movies),
    path('profile/<username>/bookmark/', views.profile_with_bookmark_movies),
    # --페이지가 추가된 url로 수정 필요!!--
    path('profile/<username>/article/', views.profile_with_article),
    path('profile/<username>/comment/', views.profile_with_comment),
    #------------------------------------
    path('profile/', views.get_my_profile),
    path('profile/<username>/follow/', views.follow),
    path('profile/<username>/update/', views.update_profile),
]
