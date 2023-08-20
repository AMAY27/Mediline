from django.contrib import admin
from .models import AppUser
# Register your models here.
@admin.register(AppUser)
class UserAdmin(admin.ModelAdmin):
    list_display = ['name', 'email']

