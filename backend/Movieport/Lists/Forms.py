from django.forms import ModelForm
from .models import PortUser

class LoginForm(ModelForm):
    class Meta:
        model = PortUser
        field = ['username','email' ,'password']
    
    
    
    