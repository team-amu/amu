from rest_framework import serializers
from django.contrib.auth import get_user_model
from ..models import Comment
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
        
