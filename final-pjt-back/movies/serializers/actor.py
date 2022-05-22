from rest_framework import serializers
from movies.models import Actor
from .character import CharacterSerializer

class ActorSerializer(serializers.ModelSerializer):
    castedactors_set = CharacterSerializer(many=True, read_only=True)

    class Meta:
        model = Actor
        fields = ('id', 'name', 'profile_path', 'castedactors_set')
        
        
class ActorListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Actor
        # fields = ('id', 'name', 'profile_path', 'character')
        fields = ('id', 'name', 'profile_path')

class ActorNameSerializer(serializers.ModelSerializer):

    class Meta:
        model = Actor
        # fields = ('id', 'name', 'profile_path', 'character')
        fields = ('id', 'name',)