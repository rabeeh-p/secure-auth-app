from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings
import jwt
from bson import ObjectId
from .mongo import users  # Adjust this
from datetime import datetime

class MongoUser:
    def __init__(self, user_data):
        self.user_data = user_data
        self.id = str(user_data.get("_id"))

    @property
    def is_authenticated(self):
        return True

    def __getattr__(self, attr):
        return self.user_data.get(attr)


class MongoJWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return None

        try:
            token = auth_header.split(" ")[1]
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])

            user_id = payload.get("user_id")
            if not user_id:
                raise AuthenticationFailed("User ID not found in token.")

            user = users.find_one({"_id": ObjectId(user_id)})
            if not user:
                raise AuthenticationFailed("User not found.")

            return (MongoUser(user), None)
        except Exception as e:
            raise AuthenticationFailed(f"Authentication failed: {str(e)}")




