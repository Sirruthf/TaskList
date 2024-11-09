from django.http import HttpRequest
from django.shortcuts import redirect, render
from django.contrib.auth import authenticate, login, logout, update_session_auth_hash

from quick_auth.models import QuickUserForm

# Create your views here.

def register (request: HttpRequest):
    if request.method == 'POST':
        form = QuickUserForm(request.POST)

        if form.is_valid():
            form.save()
            return redirect('login')
    else:
        form = QuickUserForm()

    return render(request, template_name='registration/register.html', context={'form': form})