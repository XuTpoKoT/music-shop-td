from rest_framework import serializers
from .models import (
    PickUpPoint,
    Product,
    Category,
    Order,
    User,
    CartItem,
    Cart,
    Manufacturer,
)


class PickUpPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = PickUpPoint
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class ManufacturerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manufacturer
        fields = "__all__"


class OrderCreateRequestSerializer(serializers.Serializer):
    pickUpPointId = serializers.IntegerField(min_value=1)

    def validate_pickUpPointId(self, value: int) -> int:
        try:
            PickUpPoint.objects.get(pk=value)
            return value
        except PickUpPoint.DoesNotExist:
            raise serializers.ValidationError("Pickup point not found")


class PatchCartItemSerializer(serializers.Serializer):
    count = serializers.IntegerField()


class OrderResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ["status", "pickup_point", "created_at", "user", "cost", "id"]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["timestamp"] = data.pop("created_at")
        status = data.pop("status")
        data["status"] = Order.Status(status).label
        data["customerUsername"] = User.objects.get(pk=data.pop("user")).email
        data["pickUpPointAddress"] = PickUpPoint.objects.get(
            pk=data.pop("pickup_point")
        ).address
        return data


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "price",
            "description",
            "color",
            "manufacturer",
            "img_ref",
            "characteristics",
        ]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["manufacturerName"] = Manufacturer.objects.get(
            pk=data.pop("manufacturer")
        ).name
        data["imgRef"] = data.pop("img_ref")
        return data


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = CartItem
        fields = ["product", "quantity", "id"]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["count"] = data.pop("quantity")
        product: dict = data.pop("product")
        data["imgRef"] = product["imgRef"]
        data["name"] = product["name"]
        data["price"] = product["price"]
        return data


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "login", "firstname", "surname", "patronymic"]
        extra_kwargs = {"password": {"write_only": True}}


class SignUpSerializer(serializers.Serializer):
    login = serializers.CharField(max_length=64)
    firstname = serializers.CharField(max_length=64)
    surname = serializers.CharField(max_length=64)
    patronymic = serializers.CharField(max_length=64)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=6)

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email уже зарегистрирован")
        return value

    def validate_login(self, value):
        if User.objects.filter(login=value).exists():
            raise serializers.ValidationError("Логин уже занят")
        return value


class SignInSerializer(serializers.Serializer):
    # TODO: username
    login = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data: dict) -> dict:
        try:
            user = User.objects.get(login=data["login"])
        except User.DoesNotExist:
            raise serializers.ValidationError("Invalid credentials")

        if not user.check_password(data["password"]):
            raise serializers.ValidationError("Invalid credentials")

        data["user"] = user
        return data


class CartItemCreateSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(write_only=True)
    product_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = CartItem
        fields = ["user_id", "product_id", "quantity"]
        extra_kwargs = {"quantity": {"min_value": 1, "default": 1}}

    def validate_user_id(self, value):
        try:
            user = User.objects.get(pk=value)
            if not hasattr(user, "cart"):
                Cart.objects.create(user=user)
            return value
        except User.DoesNotExist:
            raise serializers.ValidationError("User not found")

    def validate_product_id(self, value):
        if not Product.objects.filter(pk=value).exists():
            raise serializers.ValidationError("Product not found")
        return value

    def create(self, validated_data):
        user = User.objects.get(pk=validated_data["user_id"])
        product = Product.objects.get(pk=validated_data["product_id"])

        cart_item, created = CartItem.objects.get_or_create(
            cart=user.cart,
            product=product,
            defaults={"quantity": validated_data["quantity"]},
        )

        if not created:
            cart_item.quantity += validated_data["quantity"]
            cart_item.save()

        return cart_item


class CartItemDeleteSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(write_only=True)
    product_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = CartItem
        fields = ["user_id", "product_id"]

    def validate_user_id(self, value):
        try:
            user = User.objects.get(pk=value)
            if not hasattr(user, "cart"):
                Cart.objects.create(user=user)
            return value
        except User.DoesNotExist:
            raise serializers.ValidationError("User not found")

    def validate_product_id(self, value):
        if not Product.objects.filter(pk=value).exists():
            raise serializers.ValidationError("Product not found")
        return value

    def create(self, validated_data):
        user = User.objects.get(pk=validated_data["user_id"])
        product = Product.objects.get(pk=validated_data["product_id"])

        cart_item, created = CartItem.objects.get_or_create(
            cart=user.cart,
            product=product,
            defaults={"quantity": validated_data["quantity"]},
        )

        if not created:
            cart_item.quantity += validated_data["quantity"]
            cart_item.save()

        return cart_item
