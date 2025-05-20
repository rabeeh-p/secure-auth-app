from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings
import jwt
from bson import ObjectId
from .mongo import users  
from datetime import datetime
from rest_framework.exceptions import NotAuthenticated

class MongoUser:
    def __init__(self, user_data):
        self.user_data = user_data
        self.id = str(user_data.get("_id"))

    @property
    def is_authenticated(self):
        return True

    def __getattr__(self, attr):
        return self.user_data.get(attr)



import logging

class CustomAuthFailed(AuthenticationFailed):
    status_code = 401


class MongoJWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        print('jwt is working')
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            logging.info("No auth header or wrong format")
            return None

        try:
            token = auth_header.split(" ")[1]
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])

            user_id = payload.get("user_id")
            if not user_id:
                logging.warning("User ID not in token payload")
                raise AuthenticationFailed("User ID not found in token.")

            user = users.find_one({"_id": ObjectId(user_id)})
            if not user:
                logging.warning(f"User not found for id {user_id}")
                raise AuthenticationFailed("User not found.")

            logging.info(f"Authenticated user: {user_id}")
            return (MongoUser(user), None)

        except jwt.ExpiredSignatureError:
            logging.warning("Token expired")
            raise AuthenticationFailed("Token expired.")

        except jwt.DecodeError:
            raise AuthenticationFailed("Invalid token.")
        










        