from django.db import models

from django.db import models
import uuid
import hashlib
from datetime import datetime, timedelta
import jwt
from django.conf import settings


class Product(models.Model):
    class Meta:
        verbose_name = "Товар"
        verbose_name_plural = "Товары"

    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(max_length=3000, blank=True, default="")
    color = models.CharField(max_length=30)
    manufacturer = models.CharField(max_length=30)
    img_ref = models.URLField()
    characteristics = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)



class User(models.Model):
    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"

    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"User id={self.pk} email={self.email}"

    def set_password(self, password):
        self.password = hashlib.sha256(password.encode()).hexdigest()

    def check_password(self, password):
        return self.password == hashlib.sha256(password.encode()).hexdigest()

    def generate_jwt(self):
        payload = {
            "user_id": str(self.pk),
            "email": self.email,
            "exp": datetime.utcnow() + timedelta(days=7),
        }
        return jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")

