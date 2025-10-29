from rest_framework import serializers
from .models import Usuario
from django.contrib.auth.password_validation import validate_password

class RegistroSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = Usuario
        fields = ('id', 'email', 'nome_completo', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "As senhas não coincidem."})
        return attrs

    def create(self, validated_data):
        user = Usuario.objects.create(
            email=validated_data['email'],
            username=validated_data['email'],  # username = email
            nome_completo=validated_data['nome_completo']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ('id', 'email', 'nome_completo')
