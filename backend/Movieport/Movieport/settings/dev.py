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
# In dev, cookies are HTTP by default. For mobile cross-site cookie testing
# you must use HTTPS (e.g., via an ngrok tunnel). Set DEV_USE_HTTPS=True to
# make cookies use SameSite=None + Secure for testing over an HTTPS tunnel.
USE_HTTPS_FOR_DEV = os.environ.get("DEV_USE_HTTPS", "False") == "True"
if USE_HTTPS_FOR_DEV:
    SESSION_COOKIE_SECURE = CSRF_COOKIE_SECURE = True
    SESSION_COOKIE_SAMESITE = CSRF_COOKIE_SAMESITE = "None"
else:
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
# Allow additional dev origins via DEV_CORS_ALLOWED_ORIGINS env var (comma-separated)
extra_origins = os.environ.get("DEV_CORS_ALLOWED_ORIGINS")
if extra_origins:
    CORS_ALLOWED_ORIGINS += [o.strip() for o in extra_origins.split(",") if o.strip()]
CSRF_TRUSTED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
if extra_origins:
    CSRF_TRUSTED_ORIGINS += [o.strip() for o in extra_origins.split(",") if o.strip()]

# Static (local dev)
STATICFILES_DIRS = [BASE_DIR / "static"]

# Media (local dev)
MEDIA_ROOT = os.path.join(BASE_DIR, "media")