from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class QuickUserForm(UserCreationForm):
    template_name = "regform.html"

    class Meta:
        model = User
        fields = ('username', 'password1', 'password2')