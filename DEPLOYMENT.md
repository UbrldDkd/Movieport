# Django Backend Deployment Guide for Render

## Prerequisites

1. Deploy your frontend on Netlify: `https://moviep0rt.netlify.app`
2. Create an AWS account for S3 storage
3. Create a GitHub repository with this code

---

## Step 1: AWS S3 Setup

### 1.1 Create S3 Bucket:

1. Go to [AWS Console → S3](https://console.aws.amazon.com/s3/)
2. Click "Create bucket"
3. Configure:
   - **Bucket name**: `movieport-media-{unique-id}` (must be globally unique)
   - **Region**: `us-east-1` (or your preferred region)
   - **Block Public Access settings**:
     - Uncheck "Block all public access"
     - Acknowledge the warning
   - **Object Ownership**: Enable ACLs (recommended)
   - Click "Create bucket"

### 1.2 Configure Bucket CORS Policy:

1. Open your bucket → Permissions tab → Click "CORS configuration"
2. Paste this JSON:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
    "AllowedOrigins": ["https://moviep0rt.netlify.app"],
    "ExposeHeaders": ["ETag"]
  }
]
```

3. Click "Save changes"

### 1.3 Create IAM User:

1. Go to [AWS IAM Console → Users](https://console.aws.amazon.com/iam/home#/users)
2. Click "Create user":
   - **User name**: `movieport-s3-user`
   - Select "Attach policies directly"
   - Click "Next"
3. **Permissions**: Click "Create inline policy" → JSON editor:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::your-bucket-name",
        "arn:aws:s3:::your-bucket-name/*"
      ]
    }
  ]
}
```

Replace `your-bucket-name` with your actual bucket name.

4. Click "Next" → Create user
5. Click the user → Security credentials tab
6. Click "Create access key"
7. Select "Third-party service" → Next
8. **CRITICAL**: Copy and save:
   - Access Key ID
   - Secret Access Key (you won't see this again!)
9. Store these credentials securely

### 1.4 Enable Static Website Hosting (Optional but recommended):

1. Open your bucket → Properties tab → Static website hosting
2. Click "Edit" → Enable
3. Set index document to `index.html` (can be blank, won't matter)
4. Save → Note the bucket endpoint (looks like: `http://bucket-name.s3-website-region.amazonaws.com`)

**Note**: We'll use the S3 domain (`bucket-name.s3.amazonaws.com`), not the website endpoint, for Django's `AWS_S3_CUSTOM_DOMAIN`.

---

## Step 2: Render PostgreSQL Setup

### 2.1 Create PostgreSQL Database:

1. Go to [render.com](https://render.com) → Dashboard
2. Click "New" → "PostgreSQL"
3. Configure:
   - **Name**: `movieport-db`
   - **Database**: `movieport`
   - **User**: `movieport_user`
   - **Region**: Oregon (recommended, matches most web services)
   - **Plan**: Free (0.5GB, 90-day connection limit)
   - Click "Create Database"

### 2.2 Get Database URL:

1. Once created, click on the database
2. Go to "Connection" section
3. Copy the **Internal Database URL**:
   ```
   postgresql://movieport_user:password@dpg-xxxxx.oregon-postgres.render.com:5432/movieport
   ```
4. Save this URL (you'll need it for Render environment variables)

---

## Step 3: Prepare Code for Deployment

### 3.1 Generate Secret Keys:

Open your terminal and run:

```bash
# Generate Django Secret Key
python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'

# Generate JWT Signing Key
openssl rand -hex 32
```

Save both values securely.

### 3.2 Push Code to GitHub:

```bash
cd backend
git init
git add .
git commit -m "Production deployment configuration"

# Add your GitHub repo
git remote add origin https://github.com/yourusername/your-repo.git
git branch -M main
git push -u origin main
```

---

## Step 4: Render Web Service Setup

### 4.1 Create New Web Service:

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New" → "Web Service"
3. **Connect Repository**:
   - Connect your GitHub account
   - Select the repository you just pushed
   - Click "Connect"

### 4.2 Configure Build & Deploy:

**Runtime Settings**:
- **Branch**: `main`
- **Runtime**: `Python` → Select `3.11.x`

**Build Command**:
```bash
cd Movieport && pip install -r ../requirements.txt && python manage.py collectstatic --noinput
```

**Start Command**:
```bash
cd Movieport && gunicorn Movieport.wsgi --bind 0.0.0.0:$PORT --workers 4 --timeout 120
```

### 4.3 Configure Environment Variables:

Click "Advanced" → "Environment Variables" → Add the following:

#### Django Core Variables:
```bash
DJANGO_ENV=prod
DJANGO_SECRET_KEY=<paste-django-secret-key-from-step-3>
DJANGO_ALLOWED_HOSTS=<your-app-name>.onrender.com
```

#### Database Variable:
```bash
DATABASE_URL=<paste-from-render-postgres-step-2>
```

#### CORS Variables:
```bash
CORS_ALLOWED_ORIGINS=https://moviep0rt.netlify.app,https://<your-app-name>.onrender.com
CSRF_TRUSTED_ORIGINS=https://moviep0rt.netlify.app,https://<your-app-name>.onrender.com
```

#### JWT Variable:
```bash
JWT_SIGNING_KEY=<paste-jwt-key-from-step-3>
```

#### AWS S3 Variables:
```bash
AWS_ACCESS_KEY_ID=<paste-from-aws-iam-step-1>
AWS_SECRET_ACCESS_KEY=<paste-from-aws-iam-step-1>
AWS_STORAGE_BUCKET_NAME=movieport-media-<unique-id>
AWS_S3_REGION_NAME=us-east-1
AWS_S3_CUSTOM_DOMAIN=movieport-media-<unique-id>.s3.amazonaws.com
AWS_DEFAULT_ACL=None
```

#### Security Variables:
```bash
SECURE_SSL_REDIRECT=True
SECURE_HSTS_SECONDS=31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS=True
SECURE_HSTS_PRELOAD=True
```

**Important**: Replace `<your-app-name>` with your actual Render app name (you'll see it after you name the service).

### 4.4 Deploy:

1. Click "Create Web Service"
2. Wait for deployment (2-5 minutes)
3. You'll see a log output with the deployment URL:
   ```
   https://<your-app-name>.onrender.com
   ```
4. Open the URL to verify it's running

---

## Step 5: Initialize Database

### 5.1 Create Superuser:

1. In Render Dashboard → Your Web Service
2. Click "Shell" (opens a terminal)
3. Run:
   ```bash
   cd Movieport
   python manage.py createsuperuser
   ```
4. Enter:
   - Username: `admin` (or your preferred)
   - Email: your email
   - Password: create a strong password
5. Save credentials securely

### 5.2 Verify Database Operations:

In the Render Shell, run:

```bash
# Check migrations
python manage.py showmigrations

# Verify database connectivity
python manage.py dbshell

# Exit postgres shell with \q
```

---

## Step 6: Test Deployment

### 6.1 Test Admin Panel:

1. Open: `https://<your-app-name>.onrender.com/admin/`
2. Login with the credentials you created
3. Verify you see the Django admin interface
4. Check that your apps (Accounts, Lists, ContentRelations) appear

### 6.2 Test API Endpoints:

Use Postman, curl, or browser:

```bash
# Test health check (add this endpoint if needed)
curl https://<your-app-name>.onrender.com/

# Test your API endpoints
curl https://<your-app-name>.onrender.com/accounts/api-endpoints
```

### 6.3 Test Static Files:

Open in browser:
```
https://<your-app-name>.onrender.com/static/admin/css/base.css
```

Should show CSS content without errors.

### 6.4 Test Media File Upload:

1. Go to `/admin/`
2. Find a model with an ImageField/FileField
3. Upload a file
4. Check that it appears in your AWS S3 bucket:
   - Go to AWS Console → S3 → Your bucket
   - Verify the file was uploaded
5. Access the file via URL:
   ```
   https://movieport-media-<unique-id>.s3.amazonaws.com/uploaded-file.jpg
   ```

### 6.5 Test CORS with Frontend:

1. Open browser developer tools on `https://moviep0rt.netlify.app`
2. Make API calls to your Render backend
3. Check Network tab → No CORS errors

---

## Step 7: Update Frontend Configuration

Update your Netlify frontend to use the production API URL:

### Option A: Environment Variables (Recommended):

In Netlify Dashboard → Site Settings → Environment variables:
```bash
VITE_API_URL=https://<your-app-name>.onrender.com
REACT_APP_API_URL=https://<your-app-name>.onrender.com
```

### Option B: Update Code Manually:

In your API service or axios configuration:
```javascript
const API_BASE_URL = 'https://<your-app-name>.onrender.com';
```

### Option C: Use `.env` File:

Create `.env.production` in your frontend:
```bash
VITE_API_URL=https://<your-app-name>.onrender.com
# or
REACT_APP_API_URL=https://<your-app-name>.onrender.com
```

Then rebuild and redeploy your Netlify site.

---

## Step 8: Verify Security Headers

Open browser developer tools → Network tab → Refresh page → Click any request → Check Response Headers:

You should see:
- `Strict-Transport-Security: max-age=31536000`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Content-Security-Policy` (if configured)

---

## Troubleshooting

### Deployment Fails:

**Check logs in Render Dashboard → Web Service → Logs**

Common issues:
1. Build fails: Check `pip install -r requirements.txt` errors
2. Migrations fail: Check database connection in `DATABASE_URL`
3. Static collection fails: Check `STATIC_ROOT` permissions

### Database Connection Timeout:

**Issue**: Render free tier has 90-day connection timeout

**Solutions**:
1. Upgrade to paid PostgreSQL plan ($7/mo)
2. Use connection pooling (already configured with `conn_max_age=600`)
3. Restart the web service periodically

### Static Files 404:

**Troubleshooting Steps**:
```bash
# In Render Shell:
cd Movieport
python manage.py collectstatic --noinput --clear
# Check staticfiles directory
ls -la staticfiles/
```

**Checks**:
- Verify `WHITENOISE_ROOT` in settings
- Check `STATICFILES_STORAGE` configuration
- Ensure `collectstatic` runs during build

### CORS Errors:

**Symptoms**: Browser console shows CORS errors

**Fixes**:
1. Verify `CORS_ALLOWED_ORIGINS` includes your frontend URL:
   ```bash
   # In Render environment variables
   CORS_ALLOWED_ORIGINS=https://moviep0rt.netlify.app,https://your-app.onrender.com
   ```
2. Check `CSRF_TRUSTED_ORIGINS` matches exactly
3. Enable `CORS_ALLOW_CREDENTIALS = True` (already set)
4. Verify frontend sends credentials
5. Check for trailing slashes mismatch

### Media Upload Failures:

**Symptoms**: File uploads don't work, no errors shown

**Troubleshooting Steps**:

1. **Check AWS Credentials**:
   ```bash
   # In Render Shell:
   cd Movieport
   python manage.py shell
   >>> import os
   >>> print(os.environ.get('AWS_ACCESS_KEY_ID'))
   >>> print(os.environ.get('AWS_SECRET_ACCESS_KEY'))
   ```

2. **Test S3 Connection**:
   ```python
   # In Django shell:
   from django.core.files.storage import default_storage
   from django.core.files.base import ContentFile
   content = ContentFile(b'Test content', name='test.txt')
   default_storage.save('uploads/test.txt', content)
   ```

3. **Check S3 Bucket Permissions**:
   - Verify IAM user has correct permissions
   - Check bucket CORS configuration
   - Verify bucket region matches `AWS_S3_REGION_NAME`

4. **Check Django Settings**:
   - Verify `DEFAULT_FILE_STORAGE` is set to S3
   - Check `MEDIA_URL` uses HTTPS
   - Ensure `AWS_S3_CUSTOM_DOMAIN` is correct

### Admin Panel Not Accessible:

**Symptoms**: `/admin/` returns 404 or 403

**Check**:
1. Verify `ALLOWED_HOSTS` includes the domain
2. Check `DJANGO_ALLOWED_HOSTS` environment variable
3. Ensure superuser exists
4. Check logs for authentication errors

### HTTPS Redirect Issues:

**Symptoms**: Browser warns about insecure connection

**Fix**:
1. Ensure `SECURE_SSL_REDIRECT = True` (already set)
2. Check Render provides SSL certificate (automatic)
3. Verify no hardcoded HTTP URLs in code
4. Check `MEDIA_URL` uses HTTPS

---

## Security Best Practices

### 1. Secret Management:

✅ **Do**:
- Store secrets in Render environment variables
- Rotate secret keys every 90 days
- Use strong, unique keys

❌ **Don't**:
- Commit `.env` files
- Hardcode secrets in code
- Share secrets in chat/email

### 2. Database Security:

- Use Render's internal database connection
- Never expose database credentials
- Regular updates of PostgreSQL version
- Enable SSL connections (already configured)

### 3. AWS Security:

- Grant least privilege IAM permissions
- Rotate access keys every 90 days
- Enable MFA on AWS account
- Monitor S3 access logs

### 4. Admin Panel:

- Access via HTTPS only (enforced)
- Consider changing admin URL via environment variable:
  ```bash
  ADMIN_URL=secret-admin-url/
  ```
- Remove unused admin users
- Enable two-factor authentication for admin users

### 5. API Security:

- JWT tokens have 60-minute expiration
- Refresh tokens valid for 7 days
- All API endpoints require authentication (except specific ones you may add)
- Rate limiting可以考虑添加

### 6. Regular Maintenance:

- Review Render logs weekly
- Monitor AWS S3 usage and costs
- Update dependencies regularly
- Backup database regularly (automatic with Render)

---

## Cost Estimation

### Render:
- **Web Service (Free)**: ~$0/mo (spins down after 15 min inactivity)
- **Web Service (Paid)**: $5-7/mo (always on)
- **PostgreSQL (Free)**: $0/mo (90-day connection limit, 512MB)
- **PostgreSQL (Paid)**: $7/mo (no connection limit, up to 10GB)

### AWS S3:
- **Storage**: $0.023/GB/month
- **Data Transfer (Out)**: $0.09/GB
- **Data Transfer (In)**: $0.00/GB (free)
- **Requests**: First 2,000 PUT/COPY/POST requests free/month

### Example Monthly Costs:

**Free Tier**:
- Render: $0
- PostgreSQL: $0
- AWS S3 (10GB storage, 50GB transfer):
  - Storage: $0.23
  - Transfer: $4.50
  - **Total**: ~$4.73/month

**Production Tier**:
- Render (always on): $7
- PostgreSQL (paid): $7
- AWS S3 (50GB storage, 500GB transfer):
  - Storage: $1.15
  - Transfer: $45.00
  - **Total**: ~$60.15/month

---

## Monitoring and Logging

### Render Logs:

All deployment and runtime logs available at:
```
Render Dashboard → Web Service → Logs
```

Check logs for:
- Deployment errors
- Application errors
- Database connection issues
- Media upload failures

### Django Logging:

Logs are configured to output to console (visible in Render logs):

```python
# In build.py (already configured)
LOGGING = {
    'version': 1,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'INFO',
        },
    },
}
```

### AWS CloudWatch:

Monitor S3 usage in AWS Console:
- Storage usage
- Request counts
- Data transfer
- Errors

---

## Backup and Restore

### Automatic Backups (Render):

Render automatically backs up PostgreSQL databases:
- Daily backups retained for 30 days
- Can restore via Render Dashboard

### Manual Backup:

1. **Database Backup**:
   ```bash
   # In Render Shell:
   cd Movieport
   python manage.py dumpdata > backup.json
   # Download the file from Render
   ```

2. **S3 Backup**:
   S3 has built-in versioning and replication (configure if needed)

### Restore:

1. **Database Restore**:
   - In Render Dashboard → PostgreSQL → Backups → Click backup to restore

2. **From Dump**:
   ```bash
   # Load backup
   python manage.py loaddata backup.json
   ```

---

## Performance Optimization

### Gunicorn Workers:

Currently configured with 4 workers:
```bash
gunicorn Movieport.wsgi --workers 4 --timeout 120
```

**Adjust based on resources**:
- More CPU: Increase workers
- More RAM: Increase workers
- Low traffic: Reduce to 2 workers

### Database Connection Pooling:

Configured with `conn_max_age=600` (10 minutes) reuses connections.

### Static Files:

- Whitenoise serves compressed files
- Browser caches static files via `Cache-Control` headers
- No need for CDN for static files (use CloudFront if high traffic)

### Media Files:

- S3 serves files directly
- 1-day cache (`Cache-Control: max-age=86400`)
- Consider CloudFront CDN for high-traffic applications

---

## CI/CD with GitHub Actions (Optional)

```yaml
# .github/workflows/deploy.yml
name: Deploy to Render

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Trigger Render Deploy
        run: |
          curl -X POST \
            -H "Authorization: Bearer ${{ secrets.RENDER_API_KEY }}" \
            -H "Content-Type: application/json" \
            -d '{"build_id": "${{ github.sha }}"}' \
            https://api.render.com/v1/deploys
```

Requires: Add `RENDER_API_KEY` to GitHub secrets.

---

## Next Steps After Deployment

1. **Monitor**: Set up regular log checks
2. **Alerts**: Configure Render alerts for errors
3. **Analytics**: Add application monitoring (Sentry, Datadog)
4. **Testing**: Write automated tests for critical API endpoints
5. **Documentation**: Document API endpoints with Swagger/OpenAPI
6. **Scaling**: Plan for horizontal scaling if needed
7. **Rate Limiting**: Implement rate limiting on API (django-ratelimit package)

---

### Quick Reference: Essential Commands

```bash
# Render Shell Commands:
cd Movieport                          # Navigate to project
python manage.py createsuperuser      # Create admin user
python manage.py migrate              # Run migrations
python manage.py collectstatic        # Collect static files
python manage.py shell                # Open Django shell
python manage.py dbshell              # Open PostgreSQL shell
python manage.py check --deploy       # Check deployment settings

# AWS S3 Commands (local):
aws s3 ls s3://your-bucket-name       # List bucket contents
aws s3 cp ./local-file.jpg s3://your-bucket-name/  # Upload file
```

---

### Support Resources

- **Render Docs**: https://render.com/docs
- **Django Docs**: https://docs.djangoproject.com
- **AWS S3 Docs**: https://docs.aws.amazon.com/s3/
- **Project Issues**: Create GitHub issue in your repo

---

**Deployment Complete!** 🎉

Your Django backend is now production-ready on Render with:
✅ PostgreSQL database
✅ AWS S3 media storage
✅ Whitenoise static files
✅ Security headers
✅ Gunicorn WSGI server
✅ Admin panel access
✅ CORS configured for Netlify frontend

**Next**: Update your frontend to use the new production API URL and test everything!