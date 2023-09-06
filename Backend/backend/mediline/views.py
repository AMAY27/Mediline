from django.http import HttpResponse, JsonResponse
from .models import Files, Doctors, Appointment, Clinic, Specialization, Doc_specialization, Availability
from rest_framework import viewsets
from .serializers import Fileserializer, Doctorserializer, Appointmentserializer, Clinicserializer, Specializationserializer, Docspecserializer, Availabilityserializer
import django_filters.rest_framework
from django.shortcuts import get_object_or_404
from django.db import connection
from rest_framework.response import Response
from django.db.models import Q

def index(request):
    return HttpResponse("Hello world")
# Create your views here.
def sample_react(request):
    data = {'message' : 'Hello from Django'}
    return JsonResponse(data)

class FilesViewSet(viewsets.ModelViewSet):
    queryset =  Files.objects.all()
    serializer_class = Fileserializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]  # For filtering

    def get_queryset(self):
        user_id = self.request.query_params.get('uid')
        if user_id:
            return Files.objects.filter(uid=user_id)
        return self.queryset
    
class DocViewSet(viewsets.ModelViewSet):
    queryset = Doctors.objects.all()
    serializer_class = Doctorserializer
    def doctorlist(self):
        return self.queryset
    
class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = Appointmentserializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]

    def get_queryset(self):
        user_id = self.request.query_params.get('uid')
        if user_id:
            return Appointment.objects.filter(uid=user_id)
        return self.queryset

class ClinicappointmentsViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = Appointmentserializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]

    def get_queryset(self):
        queryset = Appointment.objects.all()
        clinic_id = self.request.query_params.get('clinicid')
        date = self.request.query_params.get('date')

        if clinic_id and date:
            queryset = queryset.filter(Q(clinicid=clinic_id) & Q(appointment_date=date))
        elif clinic_id:
            queryset = queryset.filter(clinicid=clinic_id)

        return queryset

class ClinicViewSet(viewsets.ModelViewSet):
    queryset = Clinic.objects.all()
    serializer_class = Clinicserializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    def get_queryset(self):
        location = self.request.query_params.get('city')
        if location:
            return Clinic.objects.filter(city = location)
        return self.queryset
    
class SpecializationViewSet(viewsets.ModelViewSet):
    queryset = Specialization.objects.all()
    serializer_class = Specializationserializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    def get_queryset(self):
        spec = self.request.query_params.get('specid')
        if spec:
            return Specialization.objects.filter(id = spec)
        return self.queryset
    
class DocspecViewSet(viewsets.ModelViewSet):
    queryset = Doc_specialization.objects.all()
    serializer_class = Specializationserializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    def get_queryset(self):
        #doctor = self.request.query_params.get('docid')
        docid = self.request.query_params.get('docid')

        if docid:
            # Filter the Doc_specialization queryset based on the provided 'docid'
            doc_specializations = Doc_specialization.objects.filter(docid=docid)
            
            # Use values_list to fetch the specialization_id values
            specialization_ids = doc_specializations.values_list('specialization_id', flat=True)
            
            # Use the specialization_ids to filter the Specialization queryset
            specializations = Specialization.objects.filter(id__in=specialization_ids)
            
            # Extract and return only the specialization_name values
            
            return specializations

        return Specialization.objects.none()
    
class AvailabilityViewSet(viewsets.ModelViewSet):
    queryset = Availability.objects.all()
    serializer_class = Availabilityserializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    def get_queryset(self):
        doctor = self.request.query_params.get('docid')
        if doctor:
            return Availability.objects.filter(docid = doctor)
        return self.queryset
