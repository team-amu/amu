from django.urls import path
from . import views

app_name = 'accounts'

urlpatterns = [
    path('profile/<username>/<int:page>/', views.profile_with_like_movies),
    path('profile/<username>/bookmark/<int:page>/', views.profile_with_bookmark_movies),
    # --페이지가 추가된 url로 수정 필요!!--
    path('profile/<username>/article/<int:page>/', views.profile_with_article),
    path('profile/<username>/comment/<int:page>/', views.profile_with_comment),
    #------------------------------------
    path('profile/<username>/follow/', views.follow),
    path('profile/<username>/update/', views.update_profile),
]
