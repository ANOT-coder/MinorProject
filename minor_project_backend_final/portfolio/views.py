from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from .models import Portfolio
from .serializers import PortfolioSerializer
import joblib
import numpy as np

# Load the trained model
model = joblib.load('D:/minor project/random_forest_best_model.pkl')

# ViewSet for Portfolio
class PortfolioViewSet(viewsets.ModelViewSet):
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer

# API to generate portfolio
@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
@csrf_exempt
def generate_portfolio(request):
    print("Request Data:", request.data)  # Debugging

    # Check if the user already has a portfolio
    if not Portfolio.objects.filter(user=request.user).exists():
        # Create a default portfolio for the user
        default_portfolio = {
            'stocks': 20.0,
            'fd': 20.0,
            'sips': 20.0,
            'commodities': 20.0,
            'bonds': 10.0,
            'cash': 10.0
        }
        Portfolio.objects.create(
            user=request.user,
            age=25,  # Default age
            knowledge_level='Beginner',  # Default knowledge level
            short_term_fluctuations='Somewhat Comfortable',  # Default comfort level
            risk_appetite='Medium',  # Default risk appetite
            investment_horizon='Mid-term (5-10 years)',  # Default investment horizon
            financial_goal='Wealth Growth',  # Default financial goal
            stocks=default_portfolio['stocks'],
            fd=default_portfolio['fd'],
            sips=default_portfolio['sips'],
            commodities=default_portfolio['commodities'],
            bonds=default_portfolio['bonds'],
            cash=default_portfolio['cash']
        )
        return Response({"message": "Default portfolio created for the user.", "portfolio": default_portfolio})

    age = request.data.get('age')
    knowledge_level = {'Beginner': 0, 'Intermediate': 1, 'Advanced': 2}[request.data.get('knowledge_level')]
    short_term_fluctuations = {'Very Comfortable': 2, 'Somewhat Comfortable': 1, 'Not Comfortable': 0}[request.data.get('short_term_fluctuations')]
    risk_appetite = {'Low': 0, 'Medium': 1, 'High': 2}[request.data.get('risk_appetite')]
    investment_horizon = {'Short-term (1-5 years)': 0, 'Mid-term (5-10 years)': 1, 'Long-term (Above 10 years)': 2}[request.data.get('investment_horizon')]
    financial_goal = {'Wealth Growth': 0, 'Stability': 1, 'Retirement': 2}[request.data.get('financial_goal')]

    # Prepare input data for the model (ensure order matches Project 1)
    input_data = np.array([[knowledge_level, age, short_term_fluctuations, risk_appetite, investment_horizon, financial_goal]])

    # Predict the portfolio composition
    portfolio = model.predict(input_data)[0].tolist()

    # Save the portfolio data to the database
    Portfolio.objects.create(
        user=request.user,
        age=age,
        knowledge_level=request.data.get('knowledge_level'),
        short_term_fluctuations=request.data.get('short_term_fluctuations'),
        risk_appetite=request.data.get('risk_appetite'),
        investment_horizon=request.data.get('investment_horizon'),
        financial_goal=request.data.get('financial_goal'),
        stocks=portfolio[0],
        fd=portfolio[1],
        sips=portfolio[2],
        commodities=portfolio[3],
        bonds=portfolio[4],
        cash=portfolio[5]
    )

    # Return the predicted portfolio as a JSON response
    response_data = {
        'stocks': portfolio[0],
        'fd': portfolio[1],
        'sips': portfolio[2],
        'commodities': portfolio[3],
        'bonds': portfolio[4],
        'cash': portfolio[5]
    }
    return Response(response_data)

# API to fetch the latest portfolio data
@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
@csrf_exempt
def get_portfolio_data(request):
    try:
        portfolio = Portfolio.objects.filter(user=request.user).latest('id')
        portfolio_data = {
            'stocks': portfolio.stocks,
            'bonds': portfolio.bonds,
            'cash': portfolio.cash,
            'fd': portfolio.fd,
            'sips': portfolio.sips,
            'commodities': portfolio.commodities,
        }
        return Response(portfolio_data)
    except ObjectDoesNotExist:
        return Response({"error": "No portfolio found for the user."}, status=404)
