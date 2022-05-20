from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from .models import Profile
from django.contrib.auth import get_user_model
from movies.serializers.movie import MovieListSerializer
from community.serializers.article import ArticleListSerializer
from community.serializers.comment import CommentSerializer


class ProfileSerializer(serializers.ModelSerializer):

    class UserSerializer(serializers.ModelSerializer):
        followings = serializers.IntegerField(source="followings.count")
        followers = serializers.IntegerField(source="followers.count")
        like_movies = MovieListSerializer(read_only=True, many=True)
        bookmark_movies = MovieListSerializer(read_only=True, many=True)
        articles = ArticleListSerializer(read_only=True, many=True)
        comments = CommentSerializer(read_only=True, many=True)
        
        class Meta:
            model = get_user_model()
            fields = '__all__'

    user = UserSerializer(read_only=True)

    class Meta:
        model = Profile
        fields = '__all__'


class CustomRegistrationSerializer(RegisterSerializer):
    # 220519 수정
    # email만 필수 required값으로 필드 추가!
    email = serializers.EmailField()

    # 220519 수정
    # # email과 nickname을 필수 required값으로 필드 추가
    # email = serializers.EmailField()
    # nickname = serializers.CharField()

    # # 여기서 nickname을 추가한 data를 return하도록 오버라이딩 해주어야, 
    # # user정보 저장시 form.cleaned_data안에 nickname 데이터가 들어간다.
    # def get_cleaned_data(self):
    #     data = super().get_cleaned_data()
    #     data['nickname'] = self.validated_data.get('nickname', '')

    #     return data

