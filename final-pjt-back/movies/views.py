from re import S
from django.shortcuts import render, get_object_or_404, get_list_or_404
from django.http import HttpResponse, JsonResponse, Http404

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers.movie import MovieSerializer, MovieListSerializer
from .serializers.actor import ActorSerializer, ActorListSerializer 
from .serializers.genre import GenreSerializer

from django.utils import timezone
from django.db.models import Q, Sum, Count, Case, When
from datetime import datetime, timedelta, date
from .models import Movie, Genre, Actor

from django.contrib.auth.decorators import login_required

@api_view(['GET'])
def home(request):
    return Response({'정보 없음': '최근 HOT한 영화, 친구가 좋아하는 영화 로직 짜야함' })

@api_view(['GET'])
def hot_movies(request):
    now = timezone.now()
    past = date.today() - timedelta(days = 7) # 현재로부터 30일 전일때
    movies = Movie.objects.annotate(
        recent_like_num=Count('movielike', filter=Q(movielike__created_at__range=(past, now)))
        ).order_by('-recent_like_num')[:10]

    serializer = MovieListSerializer(movies, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def like_movies(request):
    
    me = request.user
    if me.is_authenticated:
    
        return Response({'정보 없음': '친구가 좋아하는 영화 로직 짜야함' })

@api_view(['GET'])
def bookmark_movies(request):
    return Response({'정보 없음': '친구가 북마크한 영화 로직 짜야함' })


@api_view(['GET'])
def movie_search(request, search_page):
    data = {
        'search_page': search_page,
        '정보 없음': 'request.GET.get().filter~~ 해서 선별해서 보내야 함',
    }
    return Response(data)


@api_view(['GET'])
def movie_detail(request, movie_id):
    movie = get_object_or_404(Movie, pk=movie_id)
    serializer = MovieSerializer(movie)
    return Response(serializer.data)


@api_view(['POST'])
def movie_like(request, movie_id):
    movie = get_object_or_404(Movie, pk=movie_id)
    user = request.user
    if movie.like_users.filter(pk=user.pk).exists():
        movie.like_users.remove(user)
    else:
        movie.like_users.add(user)
        
    serializer = MovieSerializer(movie)
    return Response(serializer.data)


@api_view(['POST'])
def movie_bookmark(request, movie_id):
    movie = get_object_or_404(Movie, pk=movie_id)
    user = request.user
    if movie.bookmark_users.filter(pk=user.pk).exists():
        movie.bookmark_users.remove(user)
    else:
        movie.bookmark_users.add(user)
        
    serializer = MovieSerializer(movie)
    return Response(serializer.data)