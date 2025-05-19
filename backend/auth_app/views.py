from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.http import JsonResponse
from .mongo import users, hash_password
from bson.objectid import ObjectId
from .mongo import users   
from .serializers import RegisterSerializer, LoginSerializer
from pymongo import MongoClient
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
import hashlib









class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data

            hashed_password = hashlib.sha256(data["password"].encode()).hexdigest()

            user = {
                "name": data["name"],
                "email": data["email"],
                "password": hashed_password,
            }

            users.insert_one(user)
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

