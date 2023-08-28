from django.http import HttpResponse, JsonResponse
from .models import Files, Doctors, Appointment, Clinic
from rest_framework import viewsets
from .serializers import Fileserializer, Doctorserializer, Appointmentserializer, Clinicserializer
import django_filters.rest_framework

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

class ClinicViewSet(viewsets.ModelViewSet):
    queryset = Clinic.objects.all()
    serializer_class = Clinicserializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    def get_queryset(self):
        location = self.request.query_params.get('city')
        if location:
            return Clinic.objects.filter(city = location)
        return self.queryset