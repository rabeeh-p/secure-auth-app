from rest_framework import serializers
from .mongo import users
import re



class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=6)
    first_name = serializers.CharField(max_length=30, required=False, allow_blank=True)
    last_name = serializers.CharField(max_length=30, required=False, allow_blank=True)

    def validate_email(self, value):
        if users.find_one({"email": value}):
            raise serializers.ValidationError("Email already registered")
        return value

    def validate_username(self, value):
        if not re.match(r"^[a-zA-Z0-9_.-]{3,20}$", value):
            raise serializers.ValidationError(
                "Username must be 3-20 characters, alphanumeric and may include . _ -"
            )
        if users.find_one({"username": value}):
            raise serializers.ValidationError("Username already taken")
        return value

    def validate_first_name(self, value):
        if value and not re.match(r"^[A-Za-z\s]*$", value):
            raise serializers.ValidationError("First name must contain only letters and spaces")
        return value

    def validate_last_name(self, value):
        if value and not re.match(r"^[A-Za-z\s]*$", value):
            raise serializers.ValidationError("Last name must contain only letters and spaces")
        return value

    def validate_password(self, value):
        if len(value) < 6:
            raise serializers.ValidationError("Password must be at least 6 characters long")
        return value





class LoginSerializer(serializers.Serializer):
    identifier = serializers.CharField()
    password = serializers.CharField()


