from rest_framework import serializers
from .models import Pedido, ItemPedido
from menu.models import Produto
from menu.serializers import ProdutoSerializer

class ItemPedidoSerializer(serializers.ModelSerializer):
    produto_detalhes = ProdutoSerializer(source='produto', read_only=True)
    preco_unitario = serializers.DecimalField(max_digits=8, decimal_places=2, read_only=True)
    subtotal = serializers.SerializerMethodField()

    class Meta:
        model = ItemPedido
        fields = ['id', 'produto', 'produto_detalhes', 'quantidade', 'preco_unitario', 'subtotal']

    def get_subtotal(self, obj):
        return obj.subtotal()  # já estava correto


class PedidoSerializer(serializers.ModelSerializer):
    itens = ItemPedidoSerializer(many=True)
    cliente_email = serializers.ReadOnlyField(source='cliente.email')

    class Meta:
        model = Pedido
        fields = ['id', 'cliente_email', 'status', 'metodo_pagamento', 'total', 'itens', 'criado_em']

    def create(self, validated_data):
        itens_data = validated_data.pop('itens')
        validated_data.pop('cliente', None)
        pedido = Pedido.objects.create(cliente=self.context['request'].user, **validated_data)

        for item_data in itens_data:
            produto = Produto.objects.get(id=item_data['produto'].id)
            ItemPedido.objects.create(
                pedido=pedido,
                produto=produto,
                quantidade=item_data['quantidade'],
                preco_unitario=produto.preco
            )

        pedido.calcular_total()
        return pedido
