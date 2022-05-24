from importlib.metadata import files
from re import L
from django.shortcuts import render, get_object_or_404, get_list_or_404
from django.http import HttpResponse, JsonResponse, Http404

from rest_framework import status, serializers
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated

from .serializers import ProfileSerializer
from django.contrib.auth import get_user_model
from pprint import pprint
import json

# Create your views here.
@api_view(['GET'])
# @permission_classes([AllowAny])
def profile_with_like_movies(request, username, page):
    profile_user = get_object_or_404(get_user_model(), username=username)
    profile_liked_movie_whole_count = profile_user.profile.user.like_movies.count()
    profile = profile_user.profile
    serializer = ProfileSerializer(profile)
    profile = serializer.data
    data = {
        'profile': profile,
        'profileLikedMovieWholeCount': profile_liked_movie_whole_count
    }
    return Response(data)

@api_view(['GET'])
def profile_with_bookmark_movies(request, username, page):
    profile_user = get_object_or_404(get_user_model(), username=username)
    
    profile = profile_user.profile
    serializer = ProfileSerializer(profile)
    return Response(serializer.data)

@api_view(['GET'])
def profile_with_article(request, username, page):
    profile_user = get_object_or_404(get_user_model(), username=username)
    
    profile = profile_user.profile
    serializer = ProfileSerializer(profile)
    return Response(serializer.data)

@api_view(['GET'])
def profile_with_comment(request, username, page):
    profile_user = get_object_or_404(get_user_model(), username=username)
    
    profile = profile_user.profile
    serializer = ProfileSerializer(profile)
    return Response(serializer.data)

@api_view(['POST'])
# @permission_classes([AllowAny])
def follow(request, username):
    profile_user = get_object_or_404(get_user_model(), username=username)
    profile = profile_user.profile
    me = request.user

    if me != profile_user:
        if me.followings.filter(pk=profile_user.pk).exists():
            # 언팔로우
            me.followings.remove(profile_user)
        else:
            # 팔로우
            me.followings.add(profile_user)

    serializer = ProfileSerializer(profile) 
    return Response(serializer.data)

@api_view(['POST', 'PUT'])
def update_profile(request, username):

    profile_user = get_object_or_404(get_user_model(), username=username)
    me = request.user
    if request.method == 'PUT':
        profile = profile_user.profile
        if me == profile_user:
            serializer = ProfileSerializer(instance=profile, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data)
    
    if request.method == 'POST':
        if me == profile_user:
            serializer = ProfileSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)



