from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from .views import FilesViewSet, DocViewSet, AppointmentViewSet, ClinicViewSet

router  = DefaultRouter()
router.register('files', FilesViewSet, basename='files')
router.register('doctors', DocViewSet, basename='doctors')
router.register('appointment', AppointmentViewSet, basename='appointment')
router.register('clinic',ClinicViewSet, basename='clinic')

urlpatterns = [
    path('api/', include(router.urls)),
    #path('api/doctors/', DocViewSet.queryset),
    path("",views.index, name="index"),
    path("react-sample/",views.sample_react, name="react_sample"),
]