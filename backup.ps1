# Backup Script for Portfolio Data
# Run this script to backup your content

$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$backupFolder = "backup_$timestamp"

Write-Host "Creating backup..." -ForegroundColor Green

# Create backup directory
New-Item -ItemType Directory -Path $backupFolder -Force | Out-Null

# Backup data folder
if (Test-Path "data") {
    Copy-Item -Path "data" -Destination "$backupFolder\data" -Recurse
    Write-Host "✓ Backed up data folder" -ForegroundColor Green
} else {
    Write-Host "⚠ No data folder found" -ForegroundColor Yellow
}

# Backup uploads folder
if (Test-Path "public\uploads") {
    Copy-Item -Path "public\uploads" -Destination "$backupFolder\uploads" -Recurse
    Write-Host "✓ Backed up uploads folder" -ForegroundColor Green
} else {
    Write-Host "⚠ No uploads folder found" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Backup completed successfully!" -ForegroundColor Green
Write-Host "Location: $backupFolder" -ForegroundColor Cyan
Write-Host ""
Write-Host "To restore from this backup:" -ForegroundColor Yellow
Write-Host "1. Stop the dev server (Ctrl+C)" -ForegroundColor White
Write-Host "2. Delete current data/ and public/uploads/ folders" -ForegroundColor White
Write-Host "3. Copy contents from $backupFolder back" -ForegroundColor White
Write-Host "4. Restart the dev server (npm run dev)" -ForegroundColor White
