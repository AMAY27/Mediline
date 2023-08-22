from django.http import HttpResponse, JsonResponse
from .models import Files
from rest_framework import viewsets
from .serializers import Fileserializer

def index(request):
    return HttpResponse("Hello world")
# Create your views here.
def sample_react(request):
    data = {'message' : 'Hello from Django'}
    return JsonResponse(data)

class FilesViewSet(viewsets.ModelViewSet):
    queryset =  Files.objects.all()
    serializer_class = Fileserializer