# Generated by Django 5.1.5 on 2025-02-14 10:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0003_portfolio_age_portfolio_financial_goal_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='portfolio',
            name='user',
        ),
    ]
