# settings/__init__.py
import os

# Default to development
env = os.environ.get('DJANGO_ENV', 'dev')

if env == 'prod':
    from .build import *
else:
    from .dev import *
