from django.shortcuts import render

from .models import Todo
from django.http import JsonResponse

import json
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from .forms import TodoForm


def todo_fetch(request):
    todos = Todo.objects.all()
    todo_list = []
    for index, todo in enumerate(todos, start=1):
        todo_list.append({'id': index, 'title': todo.title, 'completed': todo.completed})

    return JsonResponse(todo_list, safe=False)


@csrf_exempt
@require_POST
def todo_save(request):
    if request.body:
        data = json.loads(request.body)
        if 'todos' in data:
            todos = data['todos']
            Todo.objects.all().delete()
            for todo in todos:
                form = TodoForm(todo)
                if form.is_vaild():
                    form.save()

    return JsonResponse({})


def index(request):
    return render(request, 'todo/list.html')
