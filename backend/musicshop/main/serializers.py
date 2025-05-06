from rest_framework import serializers
from .models import *
import jwt
from datetime import datetime, timedelta
from django.conf import settings


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email"]
        extra_kwargs = {"password": {"write_only": True}}


class SignUpSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=6)

    def create(self, validated_data):
        user = User(email=validated_data["email"])
        user.set_password(validated_data["password"])
        user.save()
        return user

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email уже зарегистрирован.")
        return value


class SignInSerializer(serializers.Serializer):
    # TODO: username
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data: dict) -> dict:
        try:
            user = User.objects.get(email=data["email"])
        except User.DoesNotExist:
            raise serializers.ValidationError("Invalid credentials")

        if not user.check_password(data["password"]):
            raise serializers.ValidationError("Invalid credentials")

        data["user"] = user
        return data
