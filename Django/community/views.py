from django.shortcuts import render, get_object_or_404, get_list_or_404
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers import ArticleSerializer
from django.core import serializers
from .models import Article, Comment

@api_view(['GET'])
def articles_total(request, page):
    articles2 = serializers.serialize("json", Article.objects.all())
    print('articles2', articles2)
    articles = Article.objects.all()
    print('##########################')
    print(articles)
    serializer = ArticleSerializer(articles2)
    print(serializer.data)
    print('##########################')
    return Response(serializer.data)
