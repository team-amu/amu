from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer

class CustomRegistrationSerializer(RegisterSerializer):
    # 220519 수정
    # email만 필수 required값으로 필드 추가!
    email = serializers.EmailField()

    # 220519 수정
    # # email과 nickname을 필수 required값으로 필드 추가
    # email = serializers.EmailField()
    # nickname = serializers.CharField()

    # # 여기서 nickname을 추가한 data를 return하도록 오버라이딩 해주어야, 
    # # user정보 저장시 form.cleaned_data안에 nickname 데이터가 들어간다.
    # def get_cleaned_data(self):
    #     data = super().get_cleaned_data()
    #     data['nickname'] = self.validated_data.get('nickname', '')

    #     return data

