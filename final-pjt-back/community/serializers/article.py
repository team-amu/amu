from rest_framework import serializers
from community.models import Article
from accounts.models import Profile
from movies.models import Movie
from django.contrib.auth import get_user_model
from .comment import CommentSerializer

User = get_user_model()

class ArticleSaveSerializer(serializers.ModelSerializer):
    
    class UserSerializer(serializers.ModelSerializer):
        
        class NicknameSerializer(serializers.ModelSerializer):
            class Meta:
                model = Profile
                fields = '__all__'
        
        profile = NicknameSerializer(read_only=True)
        
        class Meta:
            model = User
            fields = ('pk', 'username', 'profile')
            
    comments = CommentSerializer(many=True, read_only=True)
    user = UserSerializer(read_only=True)
    like_users = UserSerializer(read_only=True, many=True)
    comments_count = serializers.IntegerField(source="comments.count", read_only=True)
    likes_count = serializers.IntegerField(source="like_users.count", read_only=True)
    
    class Meta:
        model = Article
        fields = ('pk', 'user', 'category', 'movie', 'rank', 'title', 'content',
                'comments', 'comments_count', 'like_users', 'likes_count',
                'created_at', 'updated_at')
        read_only_fields = ('created_at', 'updated_at')


class ArticleSerializer(serializers.ModelSerializer):
    
    class UserSerializer(serializers.ModelSerializer):
        
        class NicknameSerializer(serializers.ModelSerializer):
            class Meta:
                model = Profile
                fields = '__all__'
        
        profile = NicknameSerializer(read_only=True)
        
        class Meta:
            model = User
            fields = ('pk', 'username', 'profile')
    
    class MovieSerializer(serializers.ModelSerializer):
        class Meta:
            model = Movie
            fields = ('pk', 'title', 'poster_path')
            
    comments = CommentSerializer(many=True, read_only=True)
    user = UserSerializer(read_only=True)
    movie = MovieSerializer(read_only=True)
    like_users = UserSerializer(read_only=True, many=True)
    comments_count = serializers.IntegerField(source="comments.count", read_only=True)
    likes_count = serializers.IntegerField(source="like_users.count", read_only=True)
    
    class Meta:
        model = Article
        fields = ('pk', 'user', 'category', 'movie', 'rank', 'title', 'content',
                'comments', 'comments_count', 'like_users', 'likes_count',
                'created_at', 'updated_at')
        read_only_fields = ('created_at', 'updated_at')

        
class ArticleListSerializer(serializers.ModelSerializer):
    
    class UserSerializer(serializers.ModelSerializer):
        
        class NicknameSerializer(serializers.ModelSerializer):
            class Meta:
                model = Profile
                fields = ('nickname', 'profile_image')
        
        profile = NicknameSerializer(read_only=True)
        
        class Meta:
            model = User
            fields = ('pk', 'username', 'profile')
    
    class MovieSerializer(serializers.ModelSerializer):
        class Meta:
            model = Movie
            fields = ('pk', 'title')
            
    user = UserSerializer(read_only=True)
    movie = MovieSerializer(read_only=True)
    comments_count = serializers.IntegerField(source="comments.count", read_only=True)
    likes_count = serializers.IntegerField(source="like_users.count", read_only=True)
    
    # created_date = serializers.DateField(source="created_at")
    
    class Meta:
        model = Article
        fields = ('pk', 'user', 'category', 'movie', 'rank', 'title', 'content',
                'comments_count', 'likes_count',
                'created_at', 'updated_at')
        read_only_fields = ('created_at', 'updated_at')