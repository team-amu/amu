from re import S
from django.shortcuts import render, get_object_or_404, get_list_or_404
from django.http import HttpResponse, JsonResponse, Http404

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers.movie import MovieSerializer, MovieListSerializer, MovieTitleSerializer, SearchedMovieSerializer
from .serializers.actor import ActorSerializer, ActorListSerializer, ActorNameSerializer 
from .serializers.genre import GenreSerializer
from .serializers.character import CharacterSerializer

from django.utils import timezone
from django.db.models import Q, Sum, Count, Case, When, Avg, Value, Func, F
from django.db.models.functions import Length
from datetime import datetime, timedelta, date
from .models import Movie, Genre, Actor, CastedActors

from django.contrib.auth.decorators import login_required

@api_view(['GET'])
def home(request):
    return Response({'정보 없음': '최근 HOT한 영화, 친구가 좋아하는 영화 로직 짜야함' })

@api_view(['GET'])
def hot_movies(request):
    now = timezone.now()
    past = date.today() - timedelta(days = 7) # 현재로부터 30일 전일때
    # 30일 이내에 좋아요와 북마크가 많이 눌린 영화들!!
    movies = Movie.objects.annotate(
        recent_like_num=Count('movielike', filter=Q(movielike__created_at__range=(past, now))),
        recent_bookmark_num=Count('moviebookmark', filter=Q(movielike__created_at__range=(past, now))),
        ).filter((~Q(recent_like_num=0)) | (~Q(recent_bookmark_num=0))
        ).order_by('-recent_like_num', '-recent_bookmark_num')[:10]

    serializer = MovieListSerializer(movies, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def like_movies(request):
    # 내가 팔로우한 사람들이 좋아하는 영화 랜덤 10개
    me = request.user
    if me.is_authenticated:
        movies = Movie.objects.annotate(
            like_num=Count('like_users', filter=Q(like_users__followers=me))
        ).filter(~Q(like_num=0)).order_by('?')[:10]
        
        serializer = MovieListSerializer(movies, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def bookmark_movies(request):
    # 내가 팔로우한 사람들이 북마크한 영화 랜덤 10개
    me = request.user
    if me.is_authenticated:
        movies = Movie.objects.annotate(
            bookmark_num=Count('bookmark_users', filter=Q(bookmark_users__followers=me))
        ).filter(~Q(bookmark_num=0)).order_by('?')[:10]
        
        serializer = MovieListSerializer(movies, many=True)
        return Response(serializer.data)

# 나중에 리팩토링하기!! 너무 더러움!!;ㅠ
@api_view(['GET'])
# 검색한 영화 정렬, 필터 해서 출력!
def movie_search(request, search_page):
    search_word = request.GET.get('searchKeywords')
    type = request.GET.get('type')
    selected_genres = request.GET.getlist('selectedGenres[]')
    rank = request.GET.get('minRank')
    sort = request.GET.get('sort')

    print(request.GET)
    if selected_genres:
        if search_word:
            research_word = search_word.replace(' ', '')

            if type == 'title':
                results = Movie.objects.annotate(
                    retitle=Func(
                        F('title'), Value(' '), Value(''), function='replace'
                    )
                ).filter(Q(retitle__contains=research_word) & Q(genres__id__in=selected_genres) & Q(vote_average__gte=rank)
                ).distinct().order_by(sort)

            else: # 해당 배우가 출연한 영화를 찾는다
                results =Movie.objects.annotate(
                    rename=Func(
                        F('actors__name'), Value(' '), Value(''), function='replace'
                    )
                ).filter(Q(rename__icontains=research_word) & Q(genres__id__in=selected_genres) & Q(vote_average__gte=rank)
                ).distinct().order_by(sort)
        else:
            results = Movie.objects.all().filter(Q(genres__id__in=selected_genres) & Q(vote_average__gte=rank)).distinct().order_by(sort)
    else:
        if search_word:
            research_word = search_word.replace(' ', '')

            if type == 'title':
                results = Movie.objects.annotate(
                    retitle=Func(
                        F('title'), Value(' '), Value(''), function='replace'
                    )
                ).filter(Q(retitle__contains=research_word) & Q(vote_average__gte=rank)).distinct().order_by(sort)

            else: # 해당 배우가 출연한 영화를 찾는다
                results =Movie.objects.annotate(
                    rename=Func(
                        F('actors__name'), Value(' '), Value(''), function='replace'
                    )
                ).filter(Q(rename__icontains=research_word) & Q(vote_average__gte=rank)).distinct().order_by(sort)
        else:
            results = Movie.objects.all().filter(Q(vote_average__gte=rank)).distinct().order_by(sort)[:20] # 렉때문에 일단 20개만!! pagination 추가하기!


    serializer = SearchedMovieSerializer(results, many=True)

    print(results)
    return Response(serializer.data)


@api_view(['GET'])
def movie_detail(request, movie_id):
    movie = get_object_or_404(Movie, pk=movie_id)
    # 커뮤니티 랭크 평균 뽑고 싶음... 어케 해결하지..
    # amu = Movie.objects.annotate(amu_rank=Count('article_set__rank')).order_by('-amu_rank')
    # print(amu)
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

@api_view(['GET'])
# 검색어에 맞는 내용들을 출력해줌
def print_keyword_search(request): 
    keyword = request.GET.get('searchKeywords')
    select = request.GET.get('type')        

    if select == 'title':
        if keyword:
            rekeyword = keyword.replace(' ', '')
            results = Movie.objects.annotate(
                retitle=Func(
                    F('title'), Value(' '), Value(''), function='replace'
                )
            ).filter(retitle__contains=rekeyword)
        else:
            return Response({})
        serializer = MovieTitleSerializer(results, many=True)

    else: # 배우일 때
        if keyword:
            rekeyword = keyword.replace(' ', '')
            results = Actor.objects.annotate(
                retitle=Func(
                    F('name'), Value(' '), Value(''), function='replace'
                )
            ).filter(retitle__contains=rekeyword)
        else:
            return Response({})
        serializer = ActorNameSerializer(results, many=True)
    
    return Response(serializer.data)

@api_view(['GET'])
def print_genres(request):
    genres =Genre.objects.all()
    serializer = GenreSerializer(genres, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def anonymous_recommend_recent(request):

    movies = Movie.objects.all().order_by('-release_date')[:10]
    serializer = MovieListSerializer(movies, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def anonymous_recommend_hot(request):

    movies = Movie.objects.all().order_by('-popularity')[:10]

    serializer = MovieListSerializer(movies, many=True)
    return Response(serializer.data)