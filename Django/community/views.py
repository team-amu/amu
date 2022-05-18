from django.shortcuts import render, get_object_or_404, get_list_or_404
from django.http import HttpResponse, JsonResponse

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers.article import ArticleSerializer
from django.core import serializers
from .models import Article, Comment
from django.http import Http404

@api_view(['GET'])
def articles_total(request, page):
    start, end = (page-1)*20, page*20
    articles = get_list_or_404(Article)[start:end]
    if not articles:
        raise Http404("page does not exist")
    serializer = ArticleSerializer(articles, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def articles_hot(request, page):
    return Response({'미완성' : '정보들 params로 받아서 필터해주어야 함' })


@api_view(['GET'])
def articles_review(request, page):
    start, end = (page-1)*20, page*20
    articles = get_list_or_404(Article, category="review")[start:end]
    if not articles:
        raise Http404("page does not exist")
    serializer = ArticleSerializer(articles, many=True)
    return Response(serializer.data)
    
    
@api_view(['GET'])
def articles_article(request, page):
    start, end = (page-1)*20, page*20
    articles = get_list_or_404(Article, category="article")[start:end]
    if not articles:
        raise Http404("page does not exist")
    serializer = ArticleSerializer(articles, many=True)
    return Response(serializer.data)


@api_view(['GET', 'POST'])
def article_create(request):
    if request.method == 'GET':
        pass
    
    elif request.method == 'POST':
        serializer = ArticleSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    
@api_view(['GET', 'DELETE'])
def article_detail_delete(request, article_id):
    article = get_object_or_404(Article, pk=article_id)
    
    if request.method == 'GET':
        serializer = ArticleSerializer(article)
        return Response(serializer.data)
    
    elif request.method == 'DELETE':
        article.delete()
        return Response({'삭제': '잘됐다'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'PUT'])
def article_update(request, article_id):
    article = get_object_or_404(Article, pk=article_id)
    
    if request.method == 'GET':
        return Response({'미완성' : 'update 라우트로 이동해야 함' })
    
    elif request.method == 'PUT':
        serializer = ArticleSerializer(article, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        
