import json
from django.http import HttpRequest, HttpResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.core import serializers

from main.models import Task

# Create your views here.

@login_required
def index (request):
    return render(request, template_name='index.html', context={ 'username': request.user.username })


@login_required
def task_api (request: HttpRequest):
    try:
        if request.method == 'PUT' or request.method == 'PATCH':
            return update_tasks(request)
        elif request.method == 'GET':
            return provide_tasks(request)
        elif request.method == 'DELETE':
            return remove_tasks(request)
        else:
            raise NotImplementedError("Method not implemented")
    except Exception as exc:
        print(exc)
        return HttpResponse("Internal Server Error", status=500)


def remove_tasks (request: HttpRequest):
    request_parameters = json.loads(request.body)
    task = Task.objects.get(taskID=request_parameters["id"], user=request.user)
    task.delete()

    return HttpResponse("", status=200)


def provide_tasks (request: HttpRequest):
    try:
        tasks = Task.objects.filter(user=request.user)
        response = serializers.serialize('json', list(tasks))
    except Exception as exc:
        response = "[]"

    return HttpResponse(response)
    

def update_tasks (request: HttpRequest):
    request_parameters = json.loads(request.body)
    
    try:
        task = Task.objects.get(taskID=request_parameters["id"], user=request.user)
        response_code = 200
    except:
        # PUT is expected to update, if found;
        # but PATCH is not expected to create
        if request.method == 'PATCH':
            raise LookupError

        task = Task()
        task.user = request.user
        task.taskID = request_parameters['id']
        response_code = 201
    


    if "date" in request_parameters:
        task.date = request_parameters['date']
    if "name" in request_parameters:
        task.name = request_parameters['name']
    if "desc" in request_parameters:
        task.desc = request_parameters['desc']
    if "status" in request_parameters:
        task.status = request_parameters['status']

    # no try — we expect to deal with it a level upstream
    task.save()

    return HttpResponse("", status=response_code)