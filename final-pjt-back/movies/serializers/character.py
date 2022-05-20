from rest_framework import serializers
from movies.models import CastedActors
from ..models import Actor

class CharacterSerializer(serializers.ModelSerializer):
    
    class ActorSerializer(serializers.ModelSerializer):
        class Meta:
            model = Actor
            fields = '__all__'
            
    actor = ActorSerializer()

    class Meta:
        model = CastedActors
        # fields = '__all__'
        exclude = ('movie',)
        