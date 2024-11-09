from typing import Any
from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Task (models.Model):
    date = models.CharField(max_length=24)
    name = models.CharField(max_length=100)
    desc = models.TextField()
    status = models.BooleanField()
    taskID = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)