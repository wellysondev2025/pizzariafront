from .models import Categoria, Produto

def popular_banco():
    # Cria categorias
    categorias = [
        "Lanches",
        "Bebidas",
        "Sobremesas"
    ]

    objs_categorias = []
    for nome in categorias:
        cat, created = Categoria.objects.get_or_create(nome=nome)
        objs_categorias.append(cat)

    # Cria produtos de exemplo
    produtos = [
        {"nome": "X-Burger", "descricao": "Hambúrguer com queijo e molho especial", "preco": 15.90, "categoria": objs_categorias[0]},
        {"nome": "X-Salada", "descricao": "Hambúrguer com alface, tomate e maionese", "preco": 17.50, "categoria": objs_categorias[0]},
        {"nome": "Coca-Cola 350ml", "descricao": "Refrigerante gelado", "preco": 6.00, "categoria": objs_categorias[1]},
        {"nome": "Suco de Laranja", "descricao": "Suco natural de laranja 300ml", "preco": 7.00, "categoria": objs_categorias[1]},
        {"nome": "Açaí 300ml", "descricao": "Açaí com granola e banana", "preco": 12.00, "categoria": objs_categorias[2]},
        {"nome": "Pudim de Leite", "descricao": "Pudim caseiro com calda de caramelo", "preco": 8.50, "categoria": objs_categorias[2]},
    ]

    for p in produtos:
        Produto.objects.get_or_create(**p)

    print("✅ Banco populado com sucesso!")
