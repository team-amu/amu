from django.urls import path
from . import views

app_name = 'community'
urlpatterns = [
    path('total/<int:page>/', views.articles_total),
    path('hot/<int:page>/', views.articles_hot),
    path('review/<int:page>/', views.articles_review),
    path('article/<int:page>/', views.articles_article),
    path('create/', views.article_create),
    path('<int:article_id>/', views.article_detail_delete),
    # path('<int:article_id>/update/', views.article_update),
    # path('<int:article_id>/comments/', views.comment_create),
    # path('<int:article_id>/comments/<int:comment_id>/', views.comment_update_delete),
]