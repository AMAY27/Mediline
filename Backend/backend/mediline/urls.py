from django.urls import path
from . import views

urlpatterns = [
    path("",views.index, name="index"),
    path("react-sample/",views.sample_react, name="react_sample")
]