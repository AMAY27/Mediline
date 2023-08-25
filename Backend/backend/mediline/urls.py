from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from .views import FilesViewSet, DocViewSet

router  = DefaultRouter()
router.register('files', FilesViewSet, basename='files')
router.register('doctors', DocViewSet, basename='doctors')

urlpatterns = [
    path('api/', include(router.urls)),
    #path('api/doctors/', DocViewSet.queryset),
    path("",views.index, name="index"),
    path("react-sample/",views.sample_react, name="react_sample"),
]