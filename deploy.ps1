# Deployment Script for Through Hardik's Eye
# PowerShell script to deploy to Firebase App Hosting

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Through Hardik's Eye - Deployment" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if logged in to Firebase
Write-Host "Checking Firebase authentication..." -ForegroundColor Yellow
$loginCheck = firebase login:list 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Not logged in to Firebase. Please authenticate..." -ForegroundColor Red
    firebase login
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Authentication failed. Exiting." -ForegroundColor Red
        exit 1
    }
}
Write-Host "✓ Firebase authentication verified" -ForegroundColor Green
Write-Host ""

# Confirm deployment
Write-Host "Ready to deploy to Firebase App Hosting" -ForegroundColor Yellow
Write-Host "Project: studio-6358494429-d141f" -ForegroundColor White
Write-Host ""
$confirm = Read-Host "Continue with deployment? (y/n)"
if ($confirm -ne "y" -and $confirm -ne "Y") {
    Write-Host "Deployment cancelled." -ForegroundColor Yellow
    exit 0
}
Write-Host ""

# Deploy to Firebase
Write-Host "Deploying to Firebase..." -ForegroundColor Yellow
firebase deploy

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  ✓ Deployment Successful!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Your site is now live!" -ForegroundColor Green
    Write-Host "Visit: https://studio-6358494429-d141f.web.app" -ForegroundColor Cyan
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "  ✗ Deployment Failed" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Check the error messages above for details." -ForegroundColor Yellow
    Write-Host "Run 'firebase deploy --debug' for more information." -ForegroundColor Yellow
    exit 1
}
