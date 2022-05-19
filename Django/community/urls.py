from django.urls import path
from . import views

app_name = 'community'
urlpatterns = [
    # article 부분
    path('', views.article_create),
    path('<int:article_id>/', views.article_detail_update_delete),
    path('<int:article_id>/like/', views.article_like),
    
    path('total/<int:page>/', views.articles_total),
    path('hot/<int:page>/', views.articles_hot),
    path('review/<int:page>/', views.articles_review),
    path('article/<int:page>/', views.articles_article),
    
    # comment 부분
    path('<int:article_id>/comments/', views.comment_create),
    path('<int:article_id>/comments/<int:comment_id>/', views.comment_update_delete),
]