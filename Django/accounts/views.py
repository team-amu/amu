from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated

# Create your views here.
@api_view(['GET'])
@permission_classes([AllowAny])
def profile(request, username):
    return Response({ 'name': username})