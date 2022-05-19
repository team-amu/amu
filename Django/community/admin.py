from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
from .models import Article, Comment

# Register your models here.
admin.site.register(Article)
admin.site.register(Comment)


User = get_user_model()

class MyUserAdmin(UserAdmin):
    model = User
    list_display = ('username', 'email',)
    
admin.site.register(User, MyUserAdmin)