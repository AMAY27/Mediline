from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Files
from .models import Doctors, Appointment, Clinic, Specialization, Doc_specialization, Availability, AppUser
User = get_user_model()
File = Files



class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id','email','name','password')

#class ClinicManagerSerializer(UserCreateSerializer):
#    class Meta:
#        model = User
#        fields = ('id', 'email', 'name', 'professional_details', 'practicing_from')

#class CustomUserCreateSerializer(DjoserUserCreateSerializer):
#    user_type = serializers.CharField()  # Add a field to specify the user type
#
#    class Meta:
#        model = AppUser  # Default to AppUser, but we'll change it in the create method
#
#    def create(self, validated_data):
#        user_type = validated_data.pop('user_type', 'app_user')  # Default to 'app_user' if not specified
#        if user_type == 'clinic_manager':
#            instance = ClinicManager(**validated_data)
#        else:
#            instance = AppUser(**validated_data)
#        instance.set_password(validated_data['password'])
#        instance.save()
#        return instance


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