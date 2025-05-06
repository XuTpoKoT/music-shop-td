
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


class ProductListPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "pageSize"
    page_query_param = "pageNumber"

    def get_paginated_response(self, data):
        return Response(
            {
                "totalPages": self.page.paginator.count,
                "currentPage": self.page.number,
                "content": data,
            }
        )


class ProductListAPIView(APIView):
    pagination_class = ProductListPagination

    def get(self, request):

        min_price = request.GET.get("min_price")
        max_price = request.GET.get("max_price")
        manufacturers = request.GET.getlist("manufacturers")

        products = Product.objects.all()

        # Применяем фильтрацию, если параметры переданы
        if min_price is not None:
            products = products.filter(price__gte=min_price)
        if max_price is not None:
            products = products.filter(price__lte=max_price)
        if manufacturers:
            products = products.filter(manufacturer__in=manufacturers)

        paginator = self.pagination_class()
        page = paginator.paginate_queryset(products, request)
        if page is not None:
            serializer = ProductSerializer(page, many=True)
        else:
            serializer = ProductSerializer(Product.objects.none(), many=True)

        return paginator.get_paginated_response(serializer.data)


class ProductDetailAPIView(APIView):
    def get_object(self, pk: int):
        try:
            return Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            return None

    def get(self, request: Request, pk: int):
        product = self.get_object(pk)
        if not product:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(ProductSerializer(product).data)


class PickUpPointView(APIView):
    def get(self, request: Request) -> Response:
        pickup_points = list(
            PickUpPointSerializer(p).data for p in PickUpPoint.objects.all()
        )
        return Response(pickup_points)


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


class CartItemView(APIView):
    authentication_classes = [JWTAuthentication]

    def post(self, request: Request):
        serializer = CartItemCreateSerializer(
            data=request.data | {"user_id": request.user.id}
        )
        if serializer.is_valid():
            cart_item = serializer.save()
            return Response(
                {
                    "id": cart_item.id,
                    "product": cart_item.product.name,
                    "quantity": cart_item.quantity,
                    "total_price": str(cart_item.total_price()),
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request: Request) -> Response:
        items = CartItem.objects.filter(cart__user=request.user).prefetch_related(
            "product"
        )
        return Response(CartItemSerializer(items, many=True).data)
