from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Files
from .models import Doctors
User = get_user_model()
File = Files


class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id','email','name','password')

class Fileserializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ['id','type','doc_name','time_created','details','pdf','uid']

class Doctorserializer(serializers.ModelSerializer):
    class Meta:
        model = Doctors
        fields = ['id', 'email', 'first_name','last_name', 'professional_details', 'practicing_from','date_joined']