from django.http import HttpResponse, JsonResponse
from .models import Files
from rest_framework import viewsets
from .serializers import Fileserializer
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