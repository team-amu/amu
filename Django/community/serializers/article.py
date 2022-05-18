from rest_framework import serializers
from community.models import Article

class ArticleSerializer(serializers.Serializer):
    
    class Meta:
        model = Article
        fields = ('title',)
        
    