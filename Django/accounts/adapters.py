from allauth.account.adapter import DefaultAccountAdapter


class CustomAccountAdapter(DefaultAccountAdapter):
    # 이메일 비어있을 때 에러 메세지 추가 해줘야댐!!
    # 닉네임 중복 확인 기능도 넣기!!

    def save_user(self, request, user, form, commit=True):
        data = form.cleaned_data
        # 기본 저장 필드: first_name, last_name, username, email
        user = super().save_user(request, user, form, commit=False)
        # 추가 저장 필드: nickname
        nickname = data.get("nickname")
        user.nickname = nickname

        user.save()
        return user