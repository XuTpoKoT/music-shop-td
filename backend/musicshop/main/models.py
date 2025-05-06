from django.db import models

from django.db import models
import uuid
import hashlib
from datetime import datetime, timedelta
import jwt
from django.conf import settings


class Category(models.Model):
    name = models.CharField(max_length=200, verbose_name="Название")

    class Meta:
        verbose_name = "Категория товар"
        verbose_name_plural = "Категории товаров"

    def __str__(self):
        return self.name


class Manufacturer(models.Model):
    name = models.CharField(max_length=200, verbose_name="Название")

    class Meta:
        verbose_name = "Производитель"
        verbose_name_plural = "Производители"

    def __str__(self):
        return self.name


class Product(models.Model):
    class Meta:
        verbose_name = "Товар"
        verbose_name_plural = "Товары"

    name = models.CharField(max_length=200, verbose_name="Название")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Цена")
    description = models.TextField(max_length=3000, blank=True, default="", verbose_name="Описание")
    color = models.CharField(max_length=30, verbose_name="Цвет")
    manufacturer = models.ForeignKey(
        Manufacturer, on_delete=models.PROTECT, related_name="+", verbose_name="Производитель"
    )
    img_ref = models.URLField(verbose_name="Ссылка на изображение")
    characteristics = models.JSONField(default=dict, blank=True, verbose_name="Характеристики")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата добавления")
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name="+", verbose_name="Категория")


class PickUpPoint(models.Model):
    class Meta:
        verbose_name = "Пункт выдачи"
        verbose_name_plural = "Пункты выдачи"

    name = models.CharField(max_length=200, verbose_name="Название")
    address = models.CharField(max_length=1000, verbose_name="Адрес")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата добавления")


class User(models.Model):
    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"

    login = models.CharField(max_length=64, unique=True, verbose_name="Логин")
    firstname = models.CharField(max_length=64, verbose_name="Имя")
    surname = models.CharField(max_length=64, verbose_name="Фамилия")
    patronymic = models.CharField(max_length=64, verbose_name="Отчество")
    email = models.EmailField(unique=True, verbose_name="Эл. почта")
    password = models.CharField(max_length=128, verbose_name="Пароль")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")

    def __str__(self):
        return f"{self.login}"

    def set_password(self, password):
        self.password = hashlib.sha256(password.encode()).hexdigest()

    def check_password(self, password):
        return self.password == hashlib.sha256(password.encode()).hexdigest()

    def generate_jwt(self):
        payload = {
            "user_id": str(self.pk),
            "exp": datetime.utcnow() + timedelta(days=7),
        }
        return jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")


class Cart(models.Model):
    class Meta:
        verbose_name = "Корзина"
        verbose_name_plural = "Корзины"

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="cart")
    created_at = models.DateTimeField(auto_now_add=True)

    def total_price(self):
        return sum(item.total_price() for item in self.items.all())

    def __str__(self):
        return f"Cart of {self.user.email}"


class Order(models.Model):
    class Meta:
        verbose_name = "Заказ"
        verbose_name_plural = "Заказы"

    class Status(models.IntegerChoices):
        FORMED = 1, "formed"
        BUILT = 2, "built"
        DELIVERED = 3, "delivered"
        RECEIVED = 4, "received"

    status = models.IntegerField(choices=Status.choices, verbose_name="Статус")
    pickup_point = models.ForeignKey(
        PickUpPoint, on_delete=models.PROTECT, related_name="orders", verbose_name="Пункт выдачи"
    )
    user = models.ForeignKey(User, on_delete=models.PROTECT, related_name="orders", verbose_name="Заказчик")
    cost = models.DecimalField(max_digits=10, decimal_places=2, default=0, verbose_name="Стоимость")
    created_at = models.DateTimeField(auto_now_add=True)


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    class Meta:
        unique_together = ("order", "product")

    def total_price(self):
        return self.quantity * self.product.price

    def __str__(self):
        return f"{self.product.name} × {self.quantity}"


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    class Meta:
        unique_together = (
            "cart",
            "product",
        )  # нельзя дважды добавить один и тот же товар

    def total_price(self):
        return self.quantity * self.product.price

    def __str__(self):
        return f"{self.product.name} × {self.quantity}"
