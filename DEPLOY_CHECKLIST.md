# Pre-Deployment Checklist

## AWS S3 Setup
- [ ] Created S3 bucket with globally unique name
- [ ] Configured CORS policy for the bucket
- [ ] Created IAM user with S3 permissions
- [ ] Generated and saved Access Key ID (securely!)
- [ ] Generated and saved Secret Access Key (securely!)
- [ ] Noted S3 bucket region (e.g., us-east-1)
- [ ] Noted S3 bucket custom domain (bucket-name.s3.amazonaws.com)

## Render PostgreSQL Setup
- [ ] Created PostgreSQL database in Render
- [ ] Configured database name (movieport)
- [ ] Configured database user (movieport_user)
- [ ] Copied Internal Database URL from Render
- [ ] Saved database URL securely

## Environment Variables (Generate & Secure)
- [ ] Generated Django SECRET_KEY (python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())')
- [ ] Generated JWT SIGNING_KEY (openssl rand -hex 32)
- [ ] Saved both keys securely (password manager / encrypted file)

## Environment Variables (Configure in Render)
- [ ] Set `DJANGO_ENV=prod`
- [ ] Set `DJANGO_SECRET_KEY=<generated-key>`
- [ ] Set `DJANGO_ALLOWED_HOSTS=<your-app-name>.onrender.com`
- [ ] Set `DATABASE_URL=<from-render-postgres>`
- [ ] Set `CORS_ALLOWED_ORIGINS=https://moviep0rt.netlify.app,https://<your-app-name>.onrender.com`
- [ ] Set `CSRF_TRUSTED_ORIGINS=https://moviep0rt.netlify.app,https://<your-app-name>.onrender.com`
- [ ] Set `JWT_SIGNING_KEY=<generated-key>`
- [ ] Set `AWS_ACCESS_KEY_ID=<from-aws-iam>`
- [ ] Set `AWS_SECRET_ACCESS_KEY=<from-aws-iam>`
- [ ] Set `AWS_STORAGE_BUCKET_NAME=<your-bucket-name>`
- [ ] Set `AWS_S3_REGION_NAME=us-east-1`
- [ ] Set `AWS_S3_CUSTOM_DOMAIN=<bucket-name>.s3.amazonaws.com`
- [ ] Set `AWS_DEFAULT_ACL=None`
- [ ] Set `SECURE_SSL_REDIRECT=True`
- [ ] Set `SECURE_HSTS_SECONDS=31536000`
- [ ] Set `SECURE_HSTS_INCLUDE_SUBDOMAINS=True`
- [ ] Set `SECURE_HSTS_PRELOAD=True`

## Code Changes (Already Completed)
- [x] Updated `requirements.txt` with production dependencies
- [x] Fixed `wsgi.py` (removed settings.local, using settings.base)
- [x] Fixed `asgi.py` (removed settings.local, using settings.base)
- [x] Created `Procfile` in backend/
- [x] Created `.gitignore` in backend/
- [x] Created `.env.example` in backend/
- [x] Updated `build.py` with AWS S3 configuration and security headers
- [x] Updated `dev.py` (removed hardcoded database credentials)
- [x] Added `storages` app to `INSTALLED_APPS` in `base.py`
- [x] Added `MEDIA_URL` and `MEDIA_ROOT` to `base.py`
- [x] Created `static/` directory in Movieport/

## Local Testing (Before Deploy)
- [ ] Install dependencies: `pip install -r requirements.txt`
- [ ] Run production settings check: `cd Movieport && python manage.py check --deploy`
- [ ] Collect static files: `python manage.py collectstatic`
- [ ] Run migrations: `python manage.py migrate`
- [ ] Create superuser: `python manage.py createsuperuser`
- [ ] Test admin panel: `python manage.py runserver` → http://localhost:8000/admin/
- [ ] Test API endpoints locally
- [ ] Test static file serving locally

## Git & GitHub
- [ ] Verified no sensitive files in git (.env, venv/, etc.)
- [ ] Reviewed `.gitignore` to ensure exclusions
- [ ] Committed all code changes
- [ ] Created GitHub repository (if not exists)
- [ ] Connected GitHub repository to local git
- [ ] Pushed code to GitHub (main branch)

## Render Web Service Setup
- [ ] Connected GitHub repository to Render
- [ ] Selected correct branch (main)
- [ ] Set runtime to Python 3.11.x
- [ ] Set Build Command: `cd Movieport && pip install -r ../requirements.txt && python manage.py collectstatic --noinput`
- [ ] Set Start Command: `cd Movieport && gunicorn Movieport.wsgi --bind 0.0.0.0:$PORT --workers 4 --timeout 120`
- [ ] Named the web service (note the name: your-app-name.onrender.com)
- [ ] Added all environment variables to Render
- [ ] Reviewed all environment variables for typos
- [ ] Clicked "Create Web Service"
- [ ] Waited for initial deployment to complete

## Deployment Verification
- [ ] Checked deployment logs in Render (no errors)
- [ ] Opened deployment URL in browser
- [ ] Verified backend is running (no 500 error)
- [ ] Opened `/admin/` URL in browser
- [ ] Created superuser in Render Shell
- [ ] Logged into admin panel successfully
- [ ] Tested admin panel functionality
- [ ] Checked that all apps appear in admin (Accounts, Lists, ContentRelations)
- [ ] Tested static file URL: `https://<app>.onrender.com/static/admin/css/base.css`
- [ ] Verified static files load correctly

## API Testing
- [ ] Tested health check endpoint (if exists)
- [ ] Tested accounts API endpoints via Postman/curl
- [ ] Tested lists API endpoints via Postman/curl
- [ ] Tested content relations API endpoints via Postman/curl
- [ ] Verified no CORS errors in browser console
- [ ] Verified API responses are correct
- [ ] Tested authentication flow (login/logout)

## Media Upload Testing
- [ ] Uploaded test file via Django admin
- [ ] Verified file appears in AWS S3 bucket
- [ ] Check S3 bucket → Objects tab → Verify uploaded file
- [ ] Accessed uploaded file via URL: `https://<bucket>.s3.amazonaws.com/<filename>`
- [ ] Verified file URL works in browser
- [ ] Tested multiple file uploads
- [ ] Tested file deletion via admin

## Frontend Integration
- [ ] Updated frontend API URL to Render backend URL
- [ ] Updated Netlify environment variables (or frontend .env)
- [ ] Rebuilt/redployed frontend to Netlify
- [ ] Tested frontend API calls from Netlify to Render
- [ ] Verified CORS requests work correctly
- [ ] Tested authentication between frontend and backend
- [ ] Tested media file uploads from frontend
- [ ] Verified user registration/login flow
- [ ] Tested full application end-to-end

## Security Verification
- [ ] Verified HTTPS redirect works (HTTP → HTTPS)
- [ ] Checked security headers in browser (F12 → Network → Headers):
  - [ ] Strict-Transport-Security present
  - [ ] X-Content-Type-Options: nosniff
  - [ ] X-Frame-Options: DENY
  - [ ] Content-Security-Policy present (if configured)
- [ ] Verified DEBUG mode is False (check `/admin/` no debug toolbar)
- [ ] Verified no Django debug error pages visible
- [ ] Checked that admin panel requires authentication
- [ ] Verified SESSION_COOKIE_SECURE = True
- [ ] Verified CSRF_COOKIE_SECURE = True

## Performance & Monitoring
- [ ] Reviewed Render logs for any warnings
- [ ] Checked page load times
- [ ] Verified static files are cached by browser
- [ ] Checked S3 access logs (in S3 bucket → Properties → Logging)
- [ ] Set up Render alerts for deployment failures
- [ ] Noted Render service URL for documentation
- [ ] Saved Render dashboard link

## Documentation & Backup
- [ ] Documented all environment variables (in secure note)
- [ ] Documented AWS credentials (in secure note / password manager)
- [ ] Documented Render app details
- [ ] Saved database URL securely
- [ ] Documented admin credentials (username/password)
- [ ] Documented all URLs:
  - [ ] Render web service URL
  - [ ] Render PostgreSQL dashboard
  - [ ] AWS S3 bucket console
  - [ ] IAM user console
- [ ] Documented cost estimates
- [ ] Saved this checklist for future deployments
- [ ] Created README with deployment instructions (optional)

## Post-Deployment Setup
- [ ] Consider implementing error tracking (Sentry)
- [ ] Consider implementing rate limiting (django-ratelimit)
- [ ] Consider implementing API documentation (drf-yasg)
- [ ] Set up automated backups verification
- [ ] Configure uptime monitoring (Pingdom, UptimeRobot)
- [ ] Create on-call rotation for monitoring
- [ ] Document incident procedures

---

## Critical Success Criteria

**Deployment is successful ONLY when ALL of these are PASSING:**

✅ Render web service is live (green status)
✅ Admin panel is accessible and functional
✅ API endpoints respond correctly
✅ Static files load without errors
✅ Media files upload to S3 successfully
✅ Frontend can communicate with backend without CORS errors
✅ Authentication works between frontend and backend
✅ HTTPS is enforced on all requests
✅ Security headers are present
✅ Database migrations completed successfully
✅ No critical errors in logs

---

## Troubleshooting Notes

**If deployment fails:**
- Check Render logs immediately
- Identify the error (build, migrate, collectstatic, or runtime)
- Search the error message + "Render Django deployment"
- Review environment variables for typos
- Check that all dependencies are in requirements.txt

**Common issues:**
1. Database connection timeout → Check DATABASE_URL format
2. Static files 404 → Verify collectstatic ran
3. CORS errors → Check CORS_ALLOWED_ORIGINS spelling
4. Media upload fails → Verify AWS credentials
5. Admin 404 → Check ALLOWED_HOSTS

---

## Cost Tracking

**Monthly Costs:**
- Render Web Service: $___ (or free)
- Render PostgreSQL: $___ (or free)
- AWS S3 Storage: $___ (check AWS console)
- AWS S3 Transfer: $___ (check AWS console)
- **Total: $___/month**

**Review date:** ___________

---

## Rollback Plan

**If deployment fails, how to rollback:**

1. **Database:**
   - Render automatically creates backups
   - Use Render Dashboard → PostgreSQL → Backups → Restore

2. **Code:**
   - GitHub branches: Revert to previous commit
   - Or use GitHub Actions to deploy previous version

3. **Environment Variables:**
   - Save backup before making changes
   - Restore from your secure documentation

4. **S3:**
   - Enable versioning on S3 bucket
   - Can roll back file versions if needed

---

## Deployment Date: ___________
## Deployed By: ___________
## Deployed Version (Git Commit): ___________
## Next Deployment Review Date: ___________

**All checklist items must be completed and verified before considering deployment successful.**