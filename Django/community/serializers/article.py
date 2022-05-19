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
    
    class Meta:
        model = Article
        fields = ('pk', 'user', 'title', 'content', 'comments', 'like_users')
        
        
class ArticleListSerializer(serializers.ModelSerializer):
    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = ('pk', 'username')

    user = UserSerializer(read_only=True)
    comment_count = serializers.IntegerField(source="article.comments.count", read_only=True)
    like_count = serializers.IntegerField(source="commments.count", read_only=True)

    class Meta:
        model = Article
        fields = ('pk', 'user', 'title', 'comment_count', 'like_count')

        
    