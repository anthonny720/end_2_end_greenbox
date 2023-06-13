from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from simple_history.models import HistoricalRecords


# Create your models here.


class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        user = self.create_user(email, password, **extra_fields)

        user.is_superuser = True
        user.is_staff = True
        user.save()
        user.role = 'OPERACIONES'
        user.permissions = 'EDITOR'

        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    class Permissions(models.TextChoices):
        EDITOR = 'EDITOR', 'Editor'
        VIEWER = 'VIEWER', 'Visualizador'

    class Roles(models.TextChoices):
        OPERACIONES = 'OPERACIONES', 'Operaciones'
        LOGISTICA = 'LOGISTICA', 'Logistica'
        CERTIFICACIONES = 'CERTIFICACIONES', 'Certificaciones'
        ADMINISTRACION = 'ADMINISTRACION', 'Administración'
        CALIDAD = 'CALIDAD', 'Calidad'
        MATERIA_PRIMA = 'MATERIA_PRIMA', 'Materia Prima'
        PRODUCCION = 'PRODUCCION', 'Producción'
        PRODUCCION_ACONDICIONADO = 'PRODUCCION_ACONDICIONADO', 'Producción Acondicionado'
        PRODUCCION_ENVASADO = 'PRODUCCION_ENVASADO', 'Producción Envasado'
        COMPRAS = 'COMPRAS', 'Compras'
        ACOPIO = 'ACOPIO', 'Acopio'
        CONTABILIDAD = 'CONTABILIDAD', 'Contabilidad'
        GERENCIA = 'GERENCIA', 'Gerencia'
        COMERCIAL = 'COMERCIAL', 'Comercial'
        PLANIFICACION = 'PLANIFICACION', 'Planificación'

    email = models.EmailField(max_length=255, unique=True, verbose_name='Correo electrónico')
    first_name = models.CharField(max_length=255, blank=True, null=True, verbose_name='Nombre(s)')
    last_name = models.CharField(max_length=255, blank=True, null=True, verbose_name='Apellido(s)')
    is_active = models.BooleanField(default=True, verbose_name='Es activo')
    is_staff = models.BooleanField(default=False, verbose_name='Es administrador')
    role = models.CharField(max_length=24, choices=Roles.choices, default='OPERACIONES',verbose_name='Rol')
    permissions = models.CharField(max_length=6, choices=Permissions.choices, default='EDITOR',verbose_name='Permisos')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Creado el')
    history = HistoricalRecords()

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def get_role_name(self):
        return self.get_role_display()

    def get_permission_name(self):
        return self.get_permissions_display()

    def get_full_name(self):
        return self.first_name + ' ' + self.last_name

    def get_short_name(self):
        return self.first_name

    def get_admin(self):
        return self.is_superuser

    def __str__(self):
        return self.email

    class Meta:
        verbose_name_plural = 'Usuarios'
        verbose_name = 'Usuario'
