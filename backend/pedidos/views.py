from rest_framework import viewsets, permissions
from .models import Pedido
from .serializers import PedidoSerializer


class IsOwnerOrAdmin(permissions.BasePermission):
    """
    Permite acesso total ao admin e somente aos donos do pedido.
    Durante a criação (POST), permite que qualquer usuário autenticado crie pedidos.
    """

    def has_permission(self, request, view):
        # Permite criar pedidos se o usuário estiver autenticado
        if request.method == "POST":
            return request.user and request.user.is_authenticated
        return True  # Outros métodos serão validados por has_object_permission

    def has_object_permission(self, request, view, obj):
        # Permite acesso se for o dono ou admin
        return obj.cliente == request.user or request.user.is_staff


class PedidoViewSet(viewsets.ModelViewSet):
    """
    ViewSet para pedidos.
    - Clientes só podem ver os próprios pedidos.
    - Admins podem ver todos.
    - Apenas usuários autenticados podem criar pedidos.
    """
    serializer_class = PedidoSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            # Admin pode ver todos os pedidos
            return Pedido.objects.all().order_by('-criado_em')
        # Cliente só vê os próprios pedidos
        return Pedido.objects.filter(cliente=user).order_by('-criado_em')

    def perform_create(self, serializer):
        # Ao criar um pedido, o cliente logado é automaticamente vinculado
        serializer.save(cliente=self.request.user)
