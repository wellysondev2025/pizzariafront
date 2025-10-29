from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from menu.views import CategoriaViewSet, ProdutoViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from pedidos.views import PedidoViewSet
from django.conf.urls.static import static
from django.conf import settings

router = routers.DefaultRouter()
router.register(r'categorias', CategoriaViewSet)
router.register(r'produtos', ProdutoViewSet)
router.register(r'pedidos', PedidoViewSet, basename='pedidos')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),

    # Rotas JWT padrão
    path('api/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Rotas de registro e perfil
    path('api/auth/', include('core.urls')),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
