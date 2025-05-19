


from django.urls import path
from .views import *
urlpatterns = [
    
    path('register/', RegisterView.as_view(), name='register'),

    # path('login/', views.LoginView.as_view(), name='login'),
    # path('logout/', views.LogoutView.as_view(), name='logout'),
    # path('profile/', views.ProfileView.as_view(), name='profile'),
]

