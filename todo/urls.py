from django.urls import path
from .views import *
from django.views.decorators.http import require_POST

urlpatterns = [
    path('', index, name='index'),
    path('fetch/', todo_fetch, name='fetch'),
    path('save/', todo_save, name='save'),
]