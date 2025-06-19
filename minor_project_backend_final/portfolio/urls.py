from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PortfolioViewSet, generate_portfolio, get_portfolio_data

router = DefaultRouter()
router.register(r'portfolios', PortfolioViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('generate_portfolio/', generate_portfolio, name='generate_portfolio'),
    path('get_portfolio/', get_portfolio_data, name='get_portfolio_data'),
]
