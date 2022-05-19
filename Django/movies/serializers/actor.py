from rest_framework import serializers
from movies.models import Actor
from .character import CharacterSerializer

class ActorSerializer(serializers.ModelSerializer):
    character = CharacterSerializer(many=True, read_only=True)

    class Meta:
        model = Actor
        fields = ('id', 'name', 'profile_path', 'character')
        
        
class ActorListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Actor
        fields = ('id', 'name', 'profile_path', 'character')