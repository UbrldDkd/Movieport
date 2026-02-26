from .base import *
import dj_database_url
import os

DEBUG = True
ALLOWED_HOSTS = ["localhost", "127.0.0.1"]

# DATABASE - local dev
DATABASES = {
    "default": dj_database_url.config(
        default=os.environ.get("DATABASE_URL", "postgresql://user:password@localhost:5432/MoviePort"),
        conn_max_age=600,
    )
}

# Cookies
SESSION_COOKIE_SECURE = CSRF_COOKIE_SECURE = False
SESSION_COOKIE_SAMESITE = CSRF_COOKIE_SAMESITE = "Lax"

# CORS
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
CSRF_TRUSTED_ORIGINS = ["http://localhost:3000", "http://127.0.0.1:3000"]

# Static (local dev)
STATICFILES_DIRS = [BASE_DIR / "static"]

# Media (local dev)
MEDIA_ROOT = os.path.join(BASE_DIR, "media")