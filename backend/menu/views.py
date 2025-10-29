from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Produto, Categoria
from .serializers import ProdutoSerializer, CategoriaSerializer

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [AllowAny]  # 👈 permite GET sem login
    authentication_classes = []

class ProdutoViewSet(viewsets.ModelViewSet):
    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializer
    permission_classes = [AllowAny]  # 👈 permite GET sem login
    authentication_classes = []