from django.urls import path, include
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("",views.index, name="index"),
    path("react-sample/",views.sample_react, name="react_sample"),
    path("", include('backend.urls'))
] + static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)