from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Files
User = get_user_model()


class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id','email','name','password')

class Fileserializer(serializers.ModelSerializer):
    class Meta:
        model : Files
        fields = ['id','type','doc_name','time_created','details','pdf','user_id_id']