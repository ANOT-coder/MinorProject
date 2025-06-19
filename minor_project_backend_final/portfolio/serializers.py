from rest_framework import serializers
from .models import Portfolio

class PortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Portfolio
        fields = ['stocks', 'fd', 'sips', 'commodities', 'bonds', 'cash']
