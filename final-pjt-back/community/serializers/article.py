from rest_framework import serializers
from community.models import Article
from django.contrib.auth import get_user_model
from .comment import CommentSerializer

User = get_user_model()

class ArticleSerializer(serializers.ModelSerializer):
    
    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = ('pk', 'username')
            
    comments = CommentSerializer(many=True, read_only=True)
    user = UserSerializer(read_only=True)
    like_users = UserSerializer(read_only=True, many=True)
    comments_count = serializers.IntegerField(source="comments.count", read_only=True)
    likes_count = serializers.IntegerField(source="like_users.count", read_only=True)
    
    class Meta:
        model = Article
        fields = ('pk', 'user', 'category', 'movie', 'title', 'content',
                'comments', 'comments_count', 'like_users', 'likes_count',
                'created_at', 'updated_at')
        read_only_fields = ('created_at', 'updated_at')
        
        
class ArticleListSerializer(serializers.ModelSerializer):
    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = ('pk', 'username',)

    user = UserSerializer(read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    like_users = UserSerializer(read_only=True, many=True)
    comments_count = serializers.IntegerField(source="comments.count", read_only=True)
    likes_count = serializers.IntegerField(source="like_users.count", read_only=True)

    class Meta:
        model = Article
        fields = ('pk', 'user', 'category', 'title', 'comments_count', 'comments', 'likes_count', 'like_users', 'created_at', 'updated_at',)
        read_only_fields = ('created_at', 'updated_at')

        
    