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
                "totalPages": self.page.paginator.num_pages,
                "currentPage": self.page.number,
                "content": data,
            }
        )


class ProductListAPIView(APIView):
    pagination_class = ProductListPagination

    def get(self, request):
        min_price = request.GET.get("min_price")
        max_price = request.GET.get("max_price")
        manufacturers = [int(x) for x in request.GET.getlist("manufacturers")]
        prefix = request.GET.get("productPrefix")
        category_id = request.GET.get("categoryId")

        products = Product.objects.all()

        if min_price is not None:
            products = products.filter(price__gte=min_price)
        if max_price is not None:
            products = products.filter(price__lte=max_price)
        if manufacturers:
            products = products.filter(manufacturer__in=manufacturers)
        if prefix:
            products = products.filter(name__istartswith=prefix)
        if category_id:
            products = products.filter(category__pk=category_id)

        paginator = self.pagination_class()
        page = paginator.paginate_queryset(products, request)
        if page is not None:
            serializer = ProductSerializer(page, many=True)
        else:
            serializer = ProductSerializer(Product.objects.none(), many=True)

        return paginator.get_paginated_response(serializer.data)


class CartItemDeleteView(APIView):
    def delete(self, request: Request, pk: int):
        ci = CartItem.objects.filter(pk=pk).first()
        print([c.id for c in CartItem.objects.all()])
        if ci:
            ci.delete()
            return Response("", status=status.HTTP_200_OK)
        else:
            return Response("", status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        ci = CartItem.objects.filter(pk=pk).first()
        if ci:
            s = PatchCartItemSerializer(data=request.data)
            if not s.is_valid():
                return Response(s.errors, status=status.HTTP_400_BAD_REQUEST)
            ci.quantity = s.validated_data["count"]
            ci.save()
            return Response("", status=status.HTTP_200_OK)
        else:
            return Response("", status=status.HTTP_400_BAD_REQUEST)


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


class CategoryView(APIView):
    def get(self, request: Request) -> Response:
        return Response(
            list(CategorySerializer(p).data for p in Category.objects.all())
        )


class ManufacturerView(APIView):
    def get(self, request: Request) -> Response:
        return Response(
            list(ManufacturerSerializer(p).data for p in Manufacturer.objects.all())
        )


class UserView(APIView):
    authentication_classes = [JWTAuthentication]

    def get(self, request: Request) -> Response:
        return Response(UserSerializer(User.objects.get(pk=request.user.id)).data)


class OrderView(APIView):
    authentication_classes = [JWTAuthentication]
    pagination_class = ProductListPagination

    def post(self, request: Request) -> Response:
        user = User.objects.get(pk=request.user.id)

        cart_items = list(user.cart.items.all())
        if not cart_items:
            return Response(
                {"error": "Корзина пуста"}, status=status.HTTP_400_BAD_REQUEST
            )

        serializer = OrderCreateRequestSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        order = Order(
            pickup_point=PickUpPoint.objects.get(
                pk=serializer.validated_data["pickUpPointId"]
            ),
            status=Order.Status.FORMED,
            user=user,
        )
        order.save()

        for cart_item in cart_items:
            OrderItem(
                order=order, quantity=cart_item.quantity, product=cart_item.product
            ).save()
            order.cost += cart_item.product.price * cart_item.quantity
        order.save()

        user.cart.items.all().delete()

        return Response(
            OrderResponseSerializer(order).data, status=status.HTTP_201_CREATED
        )

    def get(self, request):
        orders = Order.objects.all()

        paginator = self.pagination_class()
        page = paginator.paginate_queryset(orders, request)
        if page is not None:
            serializer = OrderResponseSerializer(page, many=True)
        else:
            serializer = OrderResponseSerializer(Order.objects.none(), many=True)

        return paginator.get_paginated_response(serializer.data)


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
                    "name": cart_item.product.name,
                    "imgRef": cart_item.product.img_ref,
                    "count": cart_item.quantity,
                    "price": str(cart_item.product.price),
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request: Request) -> Response:
        items = CartItem.objects.filter(cart__user=request.user).prefetch_related(
            "product"
        )
        return Response(CartItemSerializer(items, many=True).data)
