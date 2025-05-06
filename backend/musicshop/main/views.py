
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from rest_framework.permissions import AllowAny

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .authentication import JWTAuthentication
from .serializers import CartItemCreateSerializer


from .serializers import *
from .models import *


class SignUpView(APIView):
    # TODO: проблема с ответом. user - словарь, а не username.
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = SignUpSerializer(data=request.data)
        if serializer.is_valid():

            user = serializer.save()
            return Response(
                {"user": UserSerializer(user).data, "token": user.generate_jwt()},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SignInView(APIView):
    # TODO: проблема с ответом. user - словарь, а не username.
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = SignInSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data["user"]
            return Response(
                {"user": UserSerializer(user).data, "token": user.generate_jwt()}
            )
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)

