from rest_framework import serializers
from .models import Categoria, Produto

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id', 'nome']


class ProdutoSerializer(serializers.ModelSerializer):
    # Recebe o ID da categoria no POST/PATCH
    categoria = serializers.PrimaryKeyRelatedField(queryset=Categoria.objects.all())
    # Retorna o nome da categoria no GET
    categoria_nome = serializers.CharField(source='categoria.nome', read_only=True)
    imagem = serializers.ImageField(read_only=True)  # retorna a URL da imagem

    class Meta:
        model = Produto
        fields = ['id', 'nome', 'descricao', 'preco', 'imagem', 'categoria', 'categoria_nome']
