from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from .views import FilesViewSet, DocViewSet, AppointmentViewSet, AppointmentDetailsViewSet, ClinicViewSet, SpecializationViewSet, DocspecViewSet, AvailabilityViewSet, ClinicappointmentsViewSet, DoctorsappointmentsViewSet

router = DefaultRouter()
router.register('files', FilesViewSet, basename='files')
router.register('doctors', DocViewSet, basename='doctors')
router.register('appointment', AppointmentViewSet, basename='appointment')
#router.register('appointmentdetails', AppointmentDetailsViewSet, basename='appointmentdetails')
router.register('clinic',ClinicViewSet, basename='clinic')
router.register('specialization',SpecializationViewSet, basename='specialization')
router.register('docspec',DocspecViewSet, basename='docspec')
router.register('availability', AvailabilityViewSet, basename='availability')
router.register('clinicappointments', ClinicappointmentsViewSet, basename='clinicappointments')
router.register('doctorappointments', DoctorsappointmentsViewSet, basename='doctorappointments')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/appointmentdetails/<int:appid>/', AppointmentDetailsViewSet.as_view({'get': 'retrieve'}), name='appointment-details'),
    #path('api/doctors/', DocViewSet.queryset),
    path("",views.index, name="index"),
    path("react-sample/",views.sample_react, name="react_sample"),
]