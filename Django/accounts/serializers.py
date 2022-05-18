from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer

class CustomRegistrationSerializer(RegisterSerializer):
    # email과 nickname을 필수 required값으로 필드 추가
    email = serializers.EmailField()
    nickname = serializers.CharField()


