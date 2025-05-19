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
from datetime import datetime






# SIGNUP VIEW
class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data

            hashed_password = hashlib.sha256(data["password"].encode()).hexdigest()

            user = {
                "username": data["username"],
                "email": data["email"],
                "password": hashed_password,
                "first_name": data.get("first_name", ""),
                "last_name": data.get("last_name", ""),
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow(),
            }

            users.insert_one(user)
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# LOGIN VIEW
class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            identifier = data["identifier"]
            password = data["password"]

            user = users.find_one({
                "$or": [
                    {"username": identifier},
                    {"email": identifier}
                ]
            })


            if user:
                hashed_input_pw = hashlib.sha256(password.encode()).hexdigest()
                if user["password"] == hashed_input_pw:
                    refresh = RefreshToken.for_user(type('User', (object,), {"id": str(user["_id"])}))
                    return Response({
                        "refresh": str(refresh),
                        "access": str(refresh.access_token),
                        "user": {
                            "id": str(user["_id"]),
                            "username": user.get("username"),
                            "name": user.get("name"),
                            "email": user.get("email"),
                        }
                    })

            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        try:
            print(request.user.id,'iiii')
            user_id = str(request.user.id)   

            user = users.find_one({"_id": ObjectId(user_id)})
        except Exception as e:
            
            return Response({"error": "Invalid user ID or database error", "details": str(e)}, status=400)

        if user:
            user["_id"] = str(user["_id"])  
            user.pop("password", None)     


            for field in ["created_at", "updated_at"]:
                if field in user and isinstance(user[field], datetime):
                    user[field] = user[field].isoformat()

            return Response(user)
        else:
            return Response({"error": "User not found"}, status=404)




    def put(self, request):
        try:
            user_id = str(request.user.id)
            user = users.find_one({"_id": ObjectId(user_id)})
        except Exception:
            return Response({"error": "Invalid user ID"}, status=400)

        if not user:
            return Response({"error": "User not found"}, status=404)

        update_data = {
            "username": request.data.get("username", user.get("username")),
            "email": request.data.get("email", user.get("email")),
            "first_name": request.data.get("first_name", user.get("first_name")),
            "last_name": request.data.get("last_name", user.get("last_name")),
            "updated_at": datetime.utcnow(),
        }

        # Optional: Validate email/username here before update if needed

        users.update_one({"_id": ObjectId(user_id)}, {"$set": update_data})

        return Response({"message": "User updated successfully"})












