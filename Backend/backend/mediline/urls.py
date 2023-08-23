from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from .views import FilesViewSet

router  = DefaultRouter()
router.register('files', FilesViewSet, basename='files')

urlpatterns = [
    path('api/', include(router.urls)),
    path("",views.index, name="index"),
    path("react-sample/",views.sample_react, name="react_sample"),
]