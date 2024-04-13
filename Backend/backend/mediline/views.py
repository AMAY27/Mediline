from django.http import HttpResponse, JsonResponse
from .models import Files, Doctors, Appointmentconsultations, Clinic, Specialization, Doc_specialization, Availability
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
    queryset = Appointmentconsultations.objects.all()
    serializer_class = Appointmentserializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]

    def get_queryset(self):
        user_id = self.request.query_params.get('uid')
        if user_id:
            return Appointmentconsultations.objects.filter(uid=user_id)
        return self.queryset

class AppointmentDetailsViewSet(viewsets.ModelViewSet):
    queryset = Appointmentconsultations.objects.all()
    serializer_class = Appointmentserializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]

    
    def retrieve(self, request, *args, **kwargs):
        appointment_id = kwargs.get('appid')
        print(appointment_id)
        if appointment_id:
            try:
                # Retrieve the appointment instance
                appointment_instance = Appointmentconsultations.objects.get(id=appointment_id)

                # Serialize appointment details
                appointment_serializer = self.get_serializer(appointment_instance)
                appointment_data = appointment_serializer.data

                # Retrieve and serialize doctor details
                doctor_id = appointment_instance.docid.id
                doctor_instance = Doctors.objects.get(id=doctor_id)
                doctor_serializer = Doctorserializer(doctor_instance)
                doctor_data = doctor_serializer.data

                # Retrieve and serialize clinic details
                clinic_id = appointment_instance.clinicid.id
                clinic_instance = Clinic.objects.get(id=clinic_id)
                clinic_serializer = Clinicserializer(clinic_instance)
                clinic_data = clinic_serializer.data

                # Combine all data into a dictionary
                merged_data = {
                    **appointment_data,
                    'doctor_details': doctor_data,
                    'clinic_details': clinic_data
                }

                return Response(merged_data)
            except Appointmentconsultations.DoesNotExist:
                return Response({'error': 'Appointment not found'})
        else:
            return Response({'error': 'appid parameter is required'})

    
class ClinicappointmentsViewSet(viewsets.ModelViewSet):
    queryset = Appointmentconsultations.objects.all()
    serializer_class = Appointmentserializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]

    def get_queryset(self):
        queryset = Appointmentconsultations.objects.all()
        clinic_id = self.request.query_params.get('clinicid')
        date = self.request.query_params.get('date')

        if clinic_id and date:
            queryset = queryset.filter(Q(clinicid=clinic_id) & Q(appointment_date=date))
        elif clinic_id:
            queryset = queryset.filter(clinicid=clinic_id)

        return queryset

class DoctorsappointmentsViewSet(viewsets.ModelViewSet):
    queryset = Appointmentconsultations.objects.all()
    serializer_class = Appointmentserializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]

    def get_queryset(self):
        queryset = Appointmentconsultations.objects.all()
        docid_id = self.request.query_params.get('docid')
        date = self.request.query_params.get('date')

        if docid_id and date:
            queryset = queryset.filter(Q(docid=docid_id) & Q(appointment_date=date))
        elif docid_id:
            queryset = queryset.filter(docid=docid_id)

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
