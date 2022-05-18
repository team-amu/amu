from rest_framework import serializers
from community.models import Article

class ArticleSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Article
        fields = ('pk', 'title', 'content', 'category')
        read_only_fields = ('user',)
        
        
    
        
    