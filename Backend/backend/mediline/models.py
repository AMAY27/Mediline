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
    uid= models.ForeignKey(AppUser, on_delete=models.CASCADE)
    type = models.CharField(max_length=255)
    doc_name = models.CharField(max_length=255)
    time_created = models.DateTimeField(auto_now_add=True)
    details = models.CharField(max_length=255)
    pdf = models.FileField(upload_to='store/pdfs/')

    def __str__(self):
        return self.pdf
    
class Doctors(models.Model):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    professional_details = models.CharField(max_length=1000)
    practicing_from = models.DateTimeField()
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField()

    class Meta:
        db_table = "doctors"
    
class Qualifications(models.Model):
    docid = models.ForeignKey(Doctors, on_delete=models.CASCADE)
    qualification_name = models.CharField(max_length=255)
    institute_name = models.CharField(max_length=255)
    procurement_year = models.TimeField()
    def doc_id(self):
        return self.docid.id


class Specialization(models.Model):
    specialization_name = models.CharField(max_length=255)

class Doc_specialization(models.Model):
    docid = models.ForeignKey(Doctors, on_delete=models.CASCADE)
    specialization_id = models.ForeignKey(Specialization, on_delete=models.CASCADE)
    def doc_id(self):
        return self.docid.id

class Clinic(models.Model):
    docid = models.ForeignKey(Doctors, on_delete=models.CASCADE)
    address = models.TextField(max_length=500)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    zip = models.CharField(max_length=100)

    def doc_id(self):
        return self.docid.id
    
    def user_id(self):
        return self.uid.id


class Appointment(models.Model):
    uid = models.ForeignKey(AppUser,on_delete=models.CASCADE)
    clinicid = models.ForeignKey(Clinic, on_delete=models.CASCADE)
    appointment_type = models.CharField(max_length=255)
    appointment_start_date = models.DateField(auto_now_add=True)
    appointment_status = models.CharField(max_length=255)
    appointment_date = models.DateField()

    #def user_id(self):
    #    return self.uid.id
    
    def clinic_id(self):
        return self.clinicid.id
    
class Availability(models.Model):
    docid = models.ForeignKey(Doctors, on_delete=models.CASCADE)
    clinicid = models.ForeignKey(Clinic, on_delete=models.CASCADE)
    weekday = models.CharField(max_length=100)
    morning_slot = models.CharField(max_length=100, null=True, blank=True)
    evening_slot = models.CharField(max_length=100, null=True, blank=True)
    is_available = models.BooleanField()


    def doc_id(self):
        return self.docid.id

class Testappointment(models.Model):
    uid = models.ForeignKey(AppUser,on_delete=models.CASCADE)
    centerid = models.CharField(max_length=500)
    appointment_date = models.DateField()
    status = models.CharField(max_length=100)
    test_name = models.CharField(max_length=255)
    description = models.CharField(max_length=500)
    patient_name = models.CharField(max_length=255)