from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Files
from .models import Doctors, Appointment, Clinic, Specialization, Doc_specialization, Availability
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

class Appointmentserializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['id','clinicid','appointment_type','appointment_start_date','appointment_status','appointment_date','uid']

class Clinicserializer(serializers.ModelSerializer):
    class Meta:
        model = Clinic
        fields = ['id','docid','address','city','state','country','zip']

class Specializationserializer(serializers.ModelSerializer):
    class Meta:
        model = Specialization
        fields = '__all__'

class Docspecserializer(serializers.ModelSerializer):
    class Meta:
        model = Doc_specialization
        fields = '__all__'


class Availabilityserializer(serializers.ModelSerializer):
    class Meta:
        model = Availability
        fields = '__all__'


#fields = '__all__'