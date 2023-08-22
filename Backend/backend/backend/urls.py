
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic import TemplateView
from rest_framework.routers import DefaultRouter
from mediline.views import FilesViewSet


router  = DefaultRouter()
router.register('files', FilesViewSet, basename='files')

urlpatterns = [
    #path('admin/', admin.site.urls),
    #path('mediline/', include("mediline.urls")),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.urls.authtoken')),
    path('auth/', include('djoser.social.urls')),
    path('api/', include(router.urls))
]

urlpatterns += [re_path(r'^.*',TemplateView.as_view(template_name='index.html'))]
