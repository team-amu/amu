from rest_framework import serializers
from movies.models import Movie, Genre, CastedActors, Actor
from .actor import ActorSerializer, ActorListSerializer
from community.serializers.article import ArticleSerializer
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
            fields = ('pk', 'username')
        
    genres = GenreSerializer(read_only=True, many=True)
    actors = ActorSerializer(read_only=True, many=True)
    castedactors_set = CharacterSerializer(read_only=True, many=True)
    like_users = UserSerializer(read_only=True, many=True)
    likes_count = serializers.IntegerField(source="like_users.count")
    bookmark_users = UserSerializer(read_only=True, many=True)
    bookmarks_count = serializers.IntegerField(source="bookmark_users.count")
    article_set = ArticleSerializer(read_only=True, many=True)

    class Meta:
        model = Movie
        fields = ('id', 'genres','title', 'release_date', 'popularity',
                'vote_count', 'vote_average', 'overview', 'homepage', 'runtime',
                'poster_path', 'video_key', 'image_key', 'actors', 'castedactors_set',
                'likes_count', 'like_users', 'bookmarks_count', 'bookmark_users', 'article_set',)
        
        
class MovieListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Movie
        fields = ('id', 'title', 'poster_path', 'overview', 'runtime', 'vote_average')
        
class MovieTitleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Movie
        fields = ('id', 'title')

class MoviePosterSerializer(serializers.ModelSerializer):

    class Meta:
        model = Movie
        fields = ('id', 'title', 'poster_path')

class SearchedMovieSerializer(serializers.ModelSerializer):

    class GenreSerializer(serializers.ModelSerializer):
        class Meta:
            model = Genre
            fields = ('id', 'name')
            
    genres = GenreSerializer(read_only=True, many=True)

    class Meta:
        model = Movie
        fields = ('id', 'title', 'genres', 'release_date', 'vote_average', 'overview')