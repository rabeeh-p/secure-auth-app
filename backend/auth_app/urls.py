
from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path
from .views import *





urlpatterns = [

    #SIGNUP API
    path('register/', RegisterView.as_view(), name='register'),
    
    #LOGIN API
    path('login/', LoginView.as_view(), name='login'),
    
    # PROFILE DETAILS AND PUT METHOD
    path('profile/', UserDetailView.as_view(), name='profile'),

  
]

