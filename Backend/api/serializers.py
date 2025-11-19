from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Note

import bleach

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','password']
        extra_kwargs = {
            'password' : {
                'write_only':True
            }
        }
    
    def create(self,validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
    def sanitize_input(self,value):
        allowed_tags = ['p','b','i','u','em','strong','br']
        clean_value = bleach.clean(value,tags=allowed_tags,strip=True)

        return clean_value
    
    def validate_username(self,value):
        return self.sanitize_input(value)

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id','title','content','created_at','author']
        extra_kwargs = {
            "author": {
                "read_only" : True
            }
        }

    def validate_text(self, value):
        allowed_tags = ['b', 'i', 'u', 'strong', 'em', 'p', 'br']
        clean_value = bleach.clean(value, tags=allowed_tags, strip=True)
        return clean_value