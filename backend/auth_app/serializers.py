from rest_framework import serializers

class RegisterSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    password = serializers.CharField(min_length=6)

    def validate_email(self, value):
        from .mongo import users   
        if users.find_one({"email": value}):
            raise serializers.ValidationError("Email already registered")
        return value


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()


