from django.shortcuts import render, get_object_or_404, get_list_or_404
from django.http import HttpResponse, JsonResponse
from django.db.models import Q, Count

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers.article import ArticleSerializer, ArticleSaveSerializer, ArticleListSerializer
from .serializers.comment import CommentSerializer

from django.core import serializers
from .models import Article, Comment
from django.http import Http404

@api_view(['GET'])
def articles_total(request, page):
    req = request.GET
    unit = int(req.get('unit'))
    sort = req.get('sort')
    
    # articles = Article.objects.filter(Q(category='review')|Q(category='free'))
    articles = Article.objects.all()
    if sort=='-comments_count':
        articles = articles.annotate(comments_count=Count('comments'))
    elif sort == '-likes_count':
        articles = articles.annotate(likes_count=Count('like_users'))
    
    start, end = (page-1)*unit, page*unit
    articles = articles.order_by(sort)[start:end]
    
    if not articles:
        raise Http404("page does not exist")
    serializer = ArticleSerializer(articles, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def articles_hot(request, page):
    req = request.GET
    unit = int(req.get('unit'))
    hot_sort = req.get('hotSort')
    hot_sort_std, hot_sort_unit = hot_sort.split('.')
    hot_sort_unit = int(hot_sort_unit)
    # articles = Article.objects.filter(Q(category='review')|Q(category='free'))
        
    # hot에 대한 filter 추가
    if hot_sort_std == 'likes':
        articles = Article.objects.order_by('-pk').annotate(likes_count=Count('like_users')).filter(likes_count__gte=hot_sort_unit)
    elif hot_sort_std == 'comments':
        articles = Article.objects.order_by('-pk').annotate(comments_count=Count('comments')).filter(comments_count__gte=hot_sort_unit)
    
    start, end = (page-1)*unit, page*unit
    articles = articles[start:end]

    if not articles:
        raise Http404("page does not exist")
    serializer = ArticleSerializer(articles, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def articles_review(request, page):
    req = request.GET
    unit = int(req.get('unit'))
    sort = req.get('sort')
    
    articles = Article.objects.filter(Q(category='review'))
    if sort=='-comments_count':
        articles = articles.annotate(comments_count=Count('comments'))
    elif sort == '-likes_count':
        articles = articles.annotate(likes_count=Count('like_users'))
    
    start, end = (page-1)*unit, page*unit
    articles = articles.order_by(sort)[start:end]
    
    if not articles:
        raise Http404("page does not exist")
    serializer = ArticleSerializer(articles, many=True)
    return Response(serializer.data)
    
    
@api_view(['GET'])
def articles_free(request, page):
    req = request.GET
    unit = int(req.get('unit'))
    sort = req.get('sort')
    
    articles = Article.objects.filter(Q(category='free'))
    if sort=='-comments_count':
        articles = articles.annotate(comments_count=Count('comments'))
    elif sort == '-likes_count':
        articles = articles.annotate(likes_count=Count('like_users'))
    
    start, end = (page-1)*unit, page*unit
    articles = articles.order_by(sort)[start:end]
    
    if not articles:
        raise Http404("page does not exist")
    serializer = ArticleSerializer(articles, many=True)
    return Response(serializer.data)


# @api_view(['GET', 'POST'])
@api_view(['POST'])
def article_create(request):
    # def article_list():
    #     articles = Article.objects.annotate(
    #         comment_count=Count('comments', distinct=True),
    #         like_count=Count('like_users', distinct=True)
    #     ).order_by('-pk')
    #     articles = Article
    #     serializer = ArticleListSerializer(articles, many=True)
    #     return Response(serializer.data)
    
    def article_create():
        serializer = ArticleSaveSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    
    # if request.method == 'GET':
    #     return article_list()
    if request.method == 'POST':
        return article_create()

    
    
@api_view(['GET', 'PUT', 'DELETE'])
def article_detail_update_delete(request, article_id):
    article = get_object_or_404(Article, pk=article_id)
    
    def article_detail():
        serializer = ArticleSerializer(article)
        return Response(serializer.data)
    
    def article_update():
        if request.user == article.user:
            serializer = ArticleSaveSerializer(instance=article, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data)
    
    def article_delete():
        if request.user == article.user:
            article.delete()
            data = {'삭제 완료': '삭제가 완료되었습니다.'}
            return Response(data, status=status.HTTP_204_NO_CONTENT)
        return Response({'삭제 안 됨': '작성자가 로그인 사용자가 아님'})

    
    if request.method == 'GET':
        return article_detail()
    
    elif request.method == 'DELETE':
        return article_delete()
    
    elif request.method == 'PUT':
        return article_update()
        
        
@api_view(['POST'])
def article_like(request, article_id):
    article = get_object_or_404(Article, pk=article_id)
    user = request.user
    if article.like_users.filter(pk=user.pk).exists():
        article.like_users.remove(user)
        serializer = ArticleSerializer(article)
        return Response(serializer.data)
    else:
        article.like_users.add(user)
        serializer = ArticleSerializer(article)
        return Response(serializer.data)


@api_view(['POST'])
def comment_create(request, article_id):
    user = request.user
    article = get_object_or_404(Article, pk=article_id)
    
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(article=article, user=user)

        # 기존 serializer 가 return 되면, 단일 comment 만 응답으로 받게됨.
        # 사용자가 댓글을 입력하는 사이에 업데이트된 comment 확인 불가 => 업데이트된 전체 목록 return 
        comments = article.comments.all()
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['PUT', 'DELETE'])
def comment_update_delete(request, article_id, comment_id):
    article = get_object_or_404(Article, pk=article_id)
    comment = get_object_or_404(Comment, pk=comment_id)

    def update_comment():
        if request.user == comment.user:
            serializer = CommentSerializer(instance=comment, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                comments = article.comments.all()
                serializer = CommentSerializer(comments, many=True)
                return Response(serializer.data)

    def delete_comment():
        if request.user == comment.user:
            comment.delete()
            comments = article.comments.all()
            serializer = CommentSerializer(comments, many=True)
            return Response(serializer.data)
    
    if request.method == 'PUT':
        return update_comment()
    elif request.method == 'DELETE':
        return delete_comment()
