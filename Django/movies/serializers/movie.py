from rest_framework import serializers
from movies.models import Movie, Genre

class MovieSerializer(serializers.ModelSerializer):
    
    class GenreSerializer(serializers.ModelSerializer):
        class Meta:
            model = Genre
            fields = ('id', 'name')
        
    genres = GenreSerializer(read_only=True, many=True)
        
    
    class Meta:
        model = Movie
        fields = ('id', 'actors', 'genres','title', 'release_date', 'popularity',
                'vote_count', 'vote_average', 'overview', 'homepage', 'runtime',
                'poster_path', 'video_key', 'image_key')
        
        
class MovieListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Movie
        fields = ('title', 'poster_path', 'overview', 'runtime', 'vote_average')