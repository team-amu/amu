from django.shortcuts import render, get_object_or_404, get_list_or_404
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers import ArticleSerializer
from .models import Article, Comment

print(Article.objects.all())