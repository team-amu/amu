from re import L
from django.shortcuts import render, get_object_or_404, get_list_or_404
from django.http import HttpResponse, JsonResponse, Http404

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated

from .serializers import ProfileSerializer, ProfileWithUserInfoSerializer
from django.contrib.auth import get_user_model

# Create your views here.
@api_view(['GET'])
# @permission_classes([AllowAny])
def profile_with_like_movies(request, username):
    profile_user = get_object_or_404(get_user_model(), username=username)
    profile = profile_user.profile_set.get(user_id=profile_user.id) # 1:1도 1:M 이다!!!
    serializer = ProfileWithUserInfoSerializer(profile)
    return Response(serializer.data)

@api_view(['POST'])
# @permission_classes([AllowAny])
def follow(request, username):
    profile_user = get_object_or_404(get_user_model(), username=username)
    profile = profile_user.profile_set.get(user_id=profile_user.id) # 1:1도 1:M 이다!!!
    me = request.user

    if me != profile_user:
        if me.followings.filter(pk=profile_user.pk).exists():
            # 언팔로우
            me.followings.remove(profile_user)
        else:
            # 팔로우
            me.followings.add(profile_user)

    serializer = ProfileSerializer(profile) # 팔로우 수를 넣은 시리얼 라이저
    return Response(serializer.data)

@api_view(['POST', 'PUT'])
def update_profile(request, username):
    profile_user = get_object_or_404(get_user_model(), username=username)
    me = request.user
    
    # 프로필이 이미 있을 때 또 생성되는 거 하나만 생성되도록 이렇게 막았는데 구조 깔끔하게 바꾸기!!
    if profile_user.profile_set.filter(user_id=profile_user.id).exists():

        if request.method == 'PUT':
            profile = profile_user.profile_set.get(user_id=profile_user.id)    
            if me == profile_user and profile:
                serializer = ProfileSerializer(instance=profile, data=request.data)
                if serializer.is_valid(raise_exception=True):
                    serializer.save()
                    return Response(serializer.data)
    
    else:
        if request.method == 'POST':
            if me == profile_user:
                serializer = ProfileSerializer(data=request.data)
                if serializer.is_valid(raise_exception=True):
                    serializer.save(user=request.user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def profile_with_bookmark_movies(request, username):
    profile_user = get_object_or_404(get_user_model(), username=username)
    
    profile = profile_user.profile_set.get(user_id=profile_user.id) # 1:1도 1:M 이다!!!
    serializer = ProfileWithUserInfoSerializer(profile)
    return Response(serializer.data)

@api_view(['GET'])
def profile_with_article(request, username):
    profile_user = get_object_or_404(get_user_model(), username=username)
    
    profile = profile_user.profile_set.get(user_id=profile_user.id) # 1:1도 1:M 이다!!!
    serializer = ProfileWithUserInfoSerializer(profile)
    return Response(serializer.data)

@api_view(['GET'])
def profile_with_comment(request, username):
    profile_user = get_object_or_404(get_user_model(), username=username)
    
    profile = profile_user.profile_set.get(user_id=profile_user.id) # 1:1도 1:M 이다!!!
    serializer = ProfileWithUserInfoSerializer(profile)
    return Response(serializer.data)
