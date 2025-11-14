# Data Folder

This folder contains all your portfolio content in JSON format.

## Files

- **photographs.json** - All your portfolio images
- **testimonials.json** - Client reviews and testimonials
- **contacts.json** - Contact form submissions

## ⚠️ Important

- **DO NOT delete these files** - They contain all your content
- **Backup regularly** - Copy this entire folder to keep your data safe
- **Safe to edit** - You can manually edit these JSON files if needed
- **Auto-created** - If deleted, they'll be recreated empty on next server start

## Backup Instructions

### Windows:
```bash
xcopy data data-backup-%date% /E /I
```

### Mac/Linux:
```bash
cp -r data/ data-backup-$(date +%Y%m%d)/
```

## Manual Editing (Advanced)

You can edit these files directly if you're comfortable with JSON:

1. Stop the dev server (`Ctrl+C`)
2. Edit the JSON file
3. Save your changes
4. Restart the dev server (`npm run dev`)

## File Format Examples

### photographs.json
```json
[
  {
    "id": "1234567890",
    "title": "Beautiful Sunset",
    "category": "weddings",
    "description": "A stunning sunset wedding",
    "imageUrl": "/uploads/1234567890-sunset.jpg",
    "imageHint": "Bride and groom at sunset",
    "featured": false,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### testimonials.json
```json
[
  {
    "id": "1234567890",
    "author": "Jessica & Tom",
    "text": "Amazing photographer!",
    "role": "Wedding Client",
    "avatar": "https://i.pravatar.cc/150?img=1",
    "rating": 5,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### contacts.json
```json
[
  {
    "id": "1234567890",
    "name": "John Doe",
    "email": "john@example.com",
    "message": "I'd like to book a session",
    "read": false,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

## Restoring from Backup

If something goes wrong:

1. Stop the dev server
2. Delete the current `data/` folder
3. Copy your backup folder and rename it to `data/`
4. Restart the dev server

Your content will be restored!
