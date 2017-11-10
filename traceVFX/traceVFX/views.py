from django.http import JsonResponse
from django.shortcuts import render_to_response
from models import *
import json


def index(request):
    return render_to_response('index.html')


def save_note(request):
    params = json.loads(request.body)
    id = params.pop('id')
    params.pop('time')
    print params
    note, created = Note.objects.update_or_create(
        id=id, defaults=params
    )
    return JsonResponse({
        "validation": "Saved Successfully",
        "status": True
    })


def notes_list(request):
    return JsonResponse({
        "data": [{
            "title": note.title,
            "description": note.description,
            "id": note.id,
            "time": note.created.strftime('%H:%M %p'),
        } for note in Note.objects.all()],
        "status": True,
    })


def delete_note(request):
    params = json.loads(request.body)
    id = params.pop('id')
    Note.objects.get(id=id).delete()
    return JsonResponse({
        "validation": "Deleted Successfully",
        "status": True
    })
