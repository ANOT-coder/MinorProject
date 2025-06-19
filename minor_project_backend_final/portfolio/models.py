from django.db import models
from users.models import CustomUser  # Import the CustomUser model

class Portfolio(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='portfolios')  # Link to CustomUser
    age = models.IntegerField()
    knowledge_level = models.CharField(max_length=30)
    short_term_fluctuations = models.CharField(max_length=30)
    risk_appetite = models.CharField(max_length=30)
    investment_horizon = models.CharField(max_length=30)
    financial_goal = models.CharField(max_length=30)
    stocks = models.FloatField()
    fd = models.FloatField()
    sips = models.FloatField()
    commodities = models.FloatField()
    bonds = models.FloatField()
    cash = models.FloatField()

    def __str__(self):
        return f"{self.user.email}'s Portfolio"
