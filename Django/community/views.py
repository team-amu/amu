from django.shortcuts import render, get_object_or_404, get_list_or_404
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers.article import ArticleSerializer
from .models import Article, Comment

def articles_total(request, page):
    start, end = (page-1)*20, page*20
    articles = Article.objects.order_by('-pk')[start:end]
    serializer = ArticleSerializer(articles, many=True)
    return Response(serializer.data)
