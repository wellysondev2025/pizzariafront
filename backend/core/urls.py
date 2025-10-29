from django.urls import path
from .views import RegistroView, UsuarioView

urlpatterns = [
    path('register/', RegistroView.as_view(), name='registro'),
    path('me/', UsuarioView.as_view(), name='usuario'),
]
