from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.contrib.auth.base_user import BaseUserManager
from django.conf import settings

# Create your models here.
class AppUserManager(BaseUserManager):
    def create_user(self, email, name, password=None,):
        if not email:
            raise ValueError("Email is required")
        email = self.normalize_email(email)
        user = self.model(email=email, name=name)
        user.set_password(password)
        user.save()
        return user

class AppUser(AbstractBaseUser, PermissionsMixin):
    #userid = models.UUIDField(primary_key=False, editable=False)
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']
    objects = AppUserManager()

    def get_full_name(self):
        return self.name
    
    def get_short_name(self):
        return self.name
    
    def __str__(self):
        return self.email

class Files(models.Model):
    user_id= models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    type = models.CharField(max_length=255)
    doc_name = models.CharField(max_length=255)
    time_created = models.DateTimeField(auto_now_add=True)
    details = models.CharField(max_length=255)
    pdf = models.FileField(upload_to='store/pdfs/')

    def __str__(self):
        return self.pdf