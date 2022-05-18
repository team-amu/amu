from django.shortcuts import render, get_object_or_404, get_list_or_404
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers import ArticleSerializer
from django.core import serializers
from .models import Article, Comment

@api_view(['GET'])
def articles_total(request, page):
    articles = Article.objects.all()
    serializer = ArticleSerializer(articles, many=True)
    print(serializer)
    print(serializer.data)
    return Response(serializer.data)
