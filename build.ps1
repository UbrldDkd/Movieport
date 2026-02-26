Write-Host "Installing Python dependencies..."
pip install -r requirements.txt

Write-Host "Building frontend..."
Push-Location frontend
npm install
npm run build
Pop-Location

Write-Host "Collecting static files..."
python manage.py collectstatic --no-input

Write-Host "Running migrations..."
python manage.py migrate

Write-Host "Build finished successfully!"