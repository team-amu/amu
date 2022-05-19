from rest_framework import serializers
from movies.models import Movie, Genre, CastedActors, Actor
from .actor import ActorSerializer
from .character import CharacterSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class MovieSerializer(serializers.ModelSerializer):
    class GenreSerializer(serializers.ModelSerializer):
        class Meta:
            model = Genre
            fields = ('id', 'name')
            
    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = ('pk', 'username', 'nickname')
        
    genres = GenreSerializer(read_only=True, many=True)
    # actors = ActorSerializer(read_only=True, many=True)
    castedactors_set = CharacterSerializer(read_only=True, many=True)
    like_users = UserSerializer(read_only=True, many=True)
    likes_count = serializers.IntegerField(source="like_users.count")
    bookmark_users = UserSerializer(read_only=True, many=True)
    bookmarks_count = serializers.IntegerField(source="bookmark_users.count")
    
    class Meta:
        model = Movie
        fields = ('id', 'genres','title', 'release_date', 'popularity',
                'vote_count', 'vote_average', 'overview', 'homepage', 'runtime',
                'poster_path', 'video_key', 'image_key', 'castedactors_set',
                'likes_count', 'like_users', 'bookmarks_count', 'bookmark_users',)
        
        
class MovieListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Movie
        fields = ('title', 'poster_path', 'overview', 'runtime', 'vote_average')