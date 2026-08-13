Supabase media setup
=====================

Required environment variables (add to `.env` in project root):

- `SUPABASE_URL` — your Supabase project URL (e.g. https://xyz.supabase.co)
- `SUPABASE_SERVICE_ROLE_KEY` — Supabase service role key (server-side only)
- `SUPABASE_BUCKET` — bucket name (defaults to `public`)
- `USE_SUPABASE_MEDIA` — set to `True` to enable the Supabase storage backend

Notes

- The backend implements `Movieport.storage_backends.SupabaseStorage` and will be used
  when `USE_SUPABASE_MEDIA=True`.
- Uploaded files will be stored in the configured bucket and `get_avatar_url()` will
  return the Supabase public URL for the object.
- For security, keep the `SUPABASE_SERVICE_ROLE_KEY` server-side and never expose it
  to the frontend.

Frontend uploads

- Option 1 (recommended): Upload files to Supabase Storage directly from the frontend using the publishable key, then send the resulting public URL to the Django API (see frontend example in repo).
- Option 2: Upload via the Django backend (the backend will store files in Supabase when enabled). This sends the file to the backend and the backend uploads to Supabase.

Examples

- In backend `.env`:

  SUPABASE_URL=https://xyz.supabase.co
  SUPABASE_SERVICE_ROLE_KEY=xxxxx-xxxxx
  SUPABASE_BUCKET=public
  USE_SUPABASE_MEDIA=True

Render deployment notes

- In your Render service dashboard for the backend, add the following environment variables (mark `SUPABASE_SERVICE_ROLE_KEY` as a secret):
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY` (secret)
  - `SUPABASE_BUCKET` (optional, defaults to `public`)
  - `USE_SUPABASE_MEDIA=True`
  - Ensure `USE_S3` is not set or is `False` to avoid S3 taking precedence.

- After deploying, uploaded `ImageField` files will be saved to Supabase and
  `get_avatar_url()` will return the Supabase public URL for the object.

Migration note

- The `avatar_image` field was changed from a Django `ImageField` to a `URLField`.
- You must create and apply a Django migration on the backend:

  ```bash
  python manage.py makemigrations
  python manage.py migrate
  ```

- If you have existing uploaded files referenced by `ImageField`, consider migrating those values to public Supabase URLs or keeping a compatibility layer until you convert stored paths.

Frontend env

- Set frontend env variables (Vite .env) in your frontend deployment on Render or locally:

  VITE_SUPABASE_URL=https://<your-project>.supabase.co
  VITE_SUPABASE_PUBLISHABLE_KEY=<your-publishable-key>
  VITE_SUPABASE_BUCKET=avatars
