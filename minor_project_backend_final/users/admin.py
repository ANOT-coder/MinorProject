from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser
from portfolio.models import Portfolio  # Only import Portfolio now

# Inline for Portfolio
class PortfolioInline(admin.StackedInline):
    model = Portfolio
    can_delete = False
    verbose_name_plural = 'Portfolios'
    fk_name = 'user'

# Custom UserAdmin class
class CustomUserAdmin(UserAdmin):
    inlines = (PortfolioInline,)  # Only include PortfolioInline
    list_display = ('email', 'username', 'is_staff', 'is_active')  # Fields to display in the list view
    list_filter = ('is_staff', 'is_active')  # Filters for the right sidebar
    search_fields = ('email', 'username')  # Search by email or username
    ordering = ('email',)  # Default ordering

    # Fieldsets for the detail view
    fieldsets = (
        (None, {
            'fields': ('username', 'password')
        }),
        ('Personal info', {
            'fields': ('first_name', 'last_name', 'email')
        }),
        ('Permissions', {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')
        }),
        ('Important dates', {
            'fields': ('last_login', 'date_joined')
        }),
    )

    # Fieldsets for the add view
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2'),
        }),
    )

# Register the CustomUser model with the custom admin class
admin.site.register(CustomUser, CustomUserAdmin)
