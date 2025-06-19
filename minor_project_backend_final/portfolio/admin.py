from django.contrib import admin
from .models import Portfolio

class PortfolioAdmin(admin.ModelAdmin):
    list_display = ('user', 'age', 'knowledge_level', 'risk_appetite', 'investment_horizon', 'financial_goal', 'stocks', 'fd', 'sips', 'commodities', 'bonds', 'cash')
    list_filter = ('financial_goal', 'risk_appetite')
    search_fields = ('user__email', 'user__username')  # Search by user email or username
    raw_id_fields = ('user',)  # Use a widget for selecting the user

admin.site.register(Portfolio, PortfolioAdmin)
