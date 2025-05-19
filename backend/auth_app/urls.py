


from django.urls import path
from .views import *
urlpatterns = [

    #SIGNUP API
    path('register/', RegisterView.as_view(), name='register'),
    
    #LOGIN API
    path('login/', LoginView.as_view(), name='login'),
    
]

