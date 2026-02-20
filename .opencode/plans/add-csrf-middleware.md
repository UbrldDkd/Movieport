# Plan: Add CSRF Middleware

## Goal
Add CSRF (Cross-Site Request Forgery) protection middleware to the Django backend for standard security compliance.

## Changes Required

### 1. Update `backend/Movieport/Movieport/settings/base.py`

**Current MIDDLEWARE order:**
```python
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]
```

**New MIDDLEWARE order:**
```python
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",    # ← ADD THIS
    "django.middleware.common.CommonMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]
```

### Why this order matters
CsrfViewMiddleware must come **after** SessionMiddleware (for session-based CSRF tokens) and **before** CommonMiddleware

### Already configured
- `CSRF_TRUSTED_ORIGINS` is already set in both `dev.py` and `prod.py`
- `CSRF_COOKIE_SECURE` and `CSRF_COOKIE_SAMESITE` are already configured
- No additional changes needed

## Notes
- This is a minimal, standard security addition
- Since your app uses JWT authentication (cookie-based), CSRF protection provides an extra layer of security
- The frontend may need to include CSRF tokens in requests for certain Django views (though DRF JWT views typically exempt this)