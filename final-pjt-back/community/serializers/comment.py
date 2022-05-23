from rest_framework import serializers
from django.contrib.auth import get_user_model
from ..models import Comment, Article
from accounts.models import Profile

User = get_user_model()

# CUD => validation
# R => Data serializing
class CommentSerializer(serializers.ModelSerializer):
    
    class UserSerializer(serializers.ModelSerializer):
        
        class NicknameSerializer(serializers.ModelSerializer):
            class Meta:
                model = Profile
                fields = '__all__'
        
        profile = NicknameSerializer(read_only=True)
                
        class Meta:
            model = User
            fields = ('pk', 'username', 'profile')

    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ('pk', 'user', 'content', 'article', 'created_at', 'updated_at')
        read_only_fields = ('article', 'created_at', 'updated_at',)
        

class CommentListSerializer(serializers.ModelSerializer):
    class ArticleListSerializer(serializers.ModelSerializer):
        comments_count = serializers.IntegerField(source="comments.count", read_only=True)
        likes_count = serializers.IntegerField(source="like_users.count", read_only=True)
        
        class Meta:
            model = Article
            fields = ('pk', 'user', 'category', 'movie', 'rank', 'title', 'content',
                    'comments_count', 'likes_count')
            
    article = ArticleListSerializer(read_only=True)
    
    class Meta:
        model = Comment
        fields = ('pk', 'user', 'content', 'article', 'created_at', 'updated_at')
        read_only_fields = ('created_at', 'updated_at',)