# Admin Panel Guide

## Overview

Your portfolio now has a complete backend system with an easy-to-use admin panel for managing all content.

## Accessing the Admin Panel

Navigate to: **http://localhost:9002/admin**

## Features

### 1. Photographs Management (`/admin/photographs`)

**Add New Photographs:**
1. Fill in the photograph details:
   - **Title**: Name of the photograph
   - **Category**: Choose from weddings, portraits, street, fashion, live-events, or ai-generated
   - **Description**: Optional description
   - **Image Alt Text**: Accessibility description
2. Click "Choose File" to upload an image (max 5MB, JPG/PNG/WEBP/GIF)
3. Preview appears after upload
4. Click "Add Photograph" to save

**Manage Existing:**
- View all photographs in the right panel
- Click trash icon to delete any photograph
- Photographs are automatically organized by category

### 2. Testimonials Management (`/admin/testimonials`)

**Add New Testimonials:**
1. Enter client information:
   - **Client Name**: Full name
   - **Role/Title**: e.g., "Wedding Client", "Fashion Designer"
   - **Testimonial Text**: The review text
   - **Avatar URL**: Use pravatar.cc or your own image URL
   - **Rating**: Click stars to set rating (1-5)
2. Click "Add Testimonial" to save

**Manage Existing:**
- View all testimonials in the right panel
- Click trash icon to delete any testimonial

### 3. Contact Messages (`/admin/contacts`)

**View Messages:**
- All contact form submissions appear here
- New messages are highlighted
- Shows: name, email, message, and timestamp
- Click email to open in your mail client
- Click trash icon to delete messages

## Backend Architecture

### File-Based Database
- Data stored in JSON files in the `data/` directory
- Three files: `photographs.json`, `testimonials.json`, `contacts.json`
- Automatically created on first run
- Easy to backup and version control

### API Routes

All CRUD operations available via REST API:

**Photographs:**
- `GET /api/photographs` - List all
- `POST /api/photographs` - Create new
- `GET /api/photographs/[id]` - Get one
- `PATCH /api/photographs/[id]` - Update
- `DELETE /api/photographs/[id]` - Delete

**Testimonials:**
- `GET /api/testimonials` - List all
- `POST /api/testimonials` - Create new
- `PATCH /api/testimonials/[id]` - Update
- `DELETE /api/testimonials/[id]` - Delete

**Contacts:**
- `GET /api/contacts` - List all
- `POST /api/contacts` - Create new
- `PATCH /api/contacts/[id]` - Mark as read
- `DELETE /api/contacts/[id]` - Delete

**Upload:**
- `POST /api/upload` - Upload images

### Image Upload System

**Features:**
- Automatic file validation (type and size)
- Unique filename generation
- Stored in `public/uploads/` directory
- Accessible via `/uploads/[filename]`
- Max file size: 5MB
- Supported formats: JPG, PNG, WEBP, GIF

**Upload Location:**
```
public/uploads/
  ├── 1234567890-image1.jpg
  ├── 1234567891-image2.png
  └── ...
```

## Data Backup

### Manual Backup
Copy the entire `data/` directory:
```bash
cp -r data/ data-backup-$(date +%Y%m%d)/
```

### Automated Backup (Optional)
Add to your deployment script:
```bash
# Before deploying
tar -czf backup-$(date +%Y%m%d).tar.gz data/ public/uploads/
```

## Upgrading to a Real Database

The current file-based system works great for small to medium portfolios. To upgrade:

### Option 1: PostgreSQL
```bash
npm install pg
```
Update `src/lib/db.ts` to use PostgreSQL instead of JSON files.

### Option 2: MongoDB
```bash
npm install mongodb
```
Update `src/lib/db.ts` to use MongoDB instead of JSON files.

### Option 3: Prisma (Recommended)
```bash
npm install prisma @prisma/client
npx prisma init
```
Create schema and migrate. Prisma works with PostgreSQL, MySQL, SQLite, etc.

## Security Considerations

### Current Setup
- No authentication (admin panel is open)
- Suitable for local development or trusted environments

### Adding Authentication

**Option 1: Simple Password Protection**
Add environment variable:
```env
ADMIN_PASSWORD=your-secure-password
```

**Option 2: NextAuth.js (Recommended)**
```bash
npm install next-auth
```
Configure providers (Google, GitHub, Email, etc.)

**Option 3: Clerk**
```bash
npm install @clerk/nextjs
```
Full authentication solution with UI components.

## Troubleshooting

### Images Not Uploading
- Check `public/uploads/` directory exists
- Verify file size is under 5MB
- Ensure file format is supported

### Data Not Saving
- Check `data/` directory exists
- Verify write permissions
- Check browser console for errors

### API Errors
- Check dev server is running
- Verify API route paths
- Check browser network tab for details

## Best Practices

1. **Regular Backups**: Backup `data/` and `public/uploads/` regularly
2. **Image Optimization**: Compress images before uploading
3. **Alt Text**: Always provide descriptive alt text for accessibility
4. **Categories**: Keep category names consistent
5. **Testing**: Test on mobile devices after adding content

## Support

For issues or questions:
1. Check browser console for errors
2. Check dev server logs
3. Review API responses in network tab
4. Check file permissions on `data/` and `public/uploads/`
