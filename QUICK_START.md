# Quick Start: Managing Your Portfolio

## 🚀 Getting Started (5 Minutes)

### 1. Start Your Website

Open your terminal and run:
```bash
npm run dev
```

Your website will be available at: **http://localhost:9002**

### 2. Access Admin Panel

Open your browser and navigate to:
```
http://localhost:9002/admin
```

You'll see your admin dashboard with three options.

---

## 📸 Adding Photographs

### Step-by-Step:

1. **Click "Manage Photos"** on the dashboard

2. **Fill in the form** on the left side:
   - **Title**: Give your photo a name (e.g., "Sunset Wedding")
   - **Category**: Choose from dropdown:
     - Weddings
     - Portraits
     - Street
     - Fashion
     - Live Events
     - AI Generated
   - **Description**: Optional details about the photo
   - **Image Alt Text**: Describe the image (e.g., "Bride and groom at sunset")

3. **Upload Your Image**:
   - Click "Choose File"
   - Select an image from your computer
   - Wait for upload (you'll see a preview)
   - Supported formats: JPG, PNG, WEBP, GIF
   - Max size: 5MB

4. **Click "Add Photograph"**

5. **Done!** Your photo appears on the right side and on your website

### Managing Existing Photos:

- **View All**: Scroll through the list on the right
- **Delete**: Click the trash icon next to any photo
- **Organize**: Photos automatically group by category on your website

---

## 💬 Adding Testimonials

### Step-by-Step:

1. **Click "Manage Reviews"** on the dashboard

2. **Fill in the form**:
   - **Client Name**: Full name (e.g., "Jessica & Tom")
   - **Role/Title**: Their relationship to you (e.g., "Wedding Client")
   - **Testimonial Text**: Their review
   - **Avatar URL**: Use one of these:
     ```
     https://i.pravatar.cc/150?img=1
     https://i.pravatar.cc/150?img=2
     https://i.pravatar.cc/150?img=3
     ```
     (Change the number 1-70 for different avatars)
   - **Rating**: Click the stars (1-5)

3. **Click "Add Testimonial"**

4. **Done!** Review appears on your website

---

## 📧 Viewing Contact Messages

### Step-by-Step:

1. **Click "View Messages"** on the dashboard

2. **See All Inquiries**:
   - New messages are highlighted
   - Shows: Name, Email, Message, Date
   - Click email to reply directly

3. **Manage Messages**:
   - Click trash icon to delete
   - Messages are saved automatically when someone uses your contact form

---

## 🎨 Where Content Appears

### Photographs:
- **Home Page**: Featured in portfolio grid
- **Portfolio Pages**: Click any category to see filtered photos
- **URL**: `http://localhost:9002/portfolio/[category]`

### Testimonials:
- **Home Page**: Carousel in "Client Voices" section
- **Testimonials Page**: Full list with carousel
- **URL**: `http://localhost:9002/testimonials`

### Contact Messages:
- Saved when visitors use the contact form
- Only visible in admin panel
- Not shown publicly

---

## 💾 Your Data is Stored Here

All your content is saved in these files:

```
data/
├── photographs.json      ← Your portfolio images
├── testimonials.json     ← Client reviews
└── contacts.json         ← Contact form submissions

public/uploads/           ← Your uploaded images
```

**Backup Tip**: Copy the `data/` and `public/uploads/` folders regularly!

---

## 🔄 Daily Workflow

### Adding New Content:
1. Go to `/admin`
2. Click the section you want to update
3. Fill the form
4. Upload images if needed
5. Click "Add"
6. Check your website - changes are instant!

### Updating Content:
Currently, you can:
- ✅ Add new items
- ✅ Delete items
- 🔜 Edit items (coming soon - or delete and re-add for now)

---

## 🆘 Common Questions

### Q: How do I edit a photo/testimonial?
**A**: For now, delete it and add it again with the new information. (Edit feature can be added if needed)

### Q: Can I upload multiple photos at once?
**A**: Currently one at a time. Bulk upload can be added if needed.

### Q: What if I make a mistake?
**A**: Just delete the item and add it again. Your data is safe in the `data/` folder.

### Q: How do I backup my content?
**A**: Copy these folders:
```bash
# Windows
xcopy data data-backup /E /I
xcopy public\uploads public\uploads-backup /E /I

# Mac/Linux
cp -r data/ data-backup/
cp -r public/uploads/ public/uploads-backup/
```

### Q: Can someone else manage this?
**A**: Yes! Just share:
1. How to run `npm run dev`
2. The admin URL: `http://localhost:9002/admin`
3. This guide!

---

## 🚀 Going Live

When you're ready to deploy:

1. **Build your site**:
   ```bash
   npm run build
   ```

2. **Deploy to Vercel** (Recommended):
   - Push to GitHub
   - Connect to Vercel
   - Deploy automatically
   - Your admin panel works the same way!

3. **Your live admin URL**:
   ```
   https://yourdomain.com/admin
   ```

**Security Note**: In production, you should add password protection to `/admin`. See `ADMIN_GUIDE.md` for details.

---

## 📱 Mobile Management

The admin panel works on mobile too!
- Open `/admin` on your phone
- All features work the same
- Upload photos from your phone's camera

---

## 🎯 Pro Tips

1. **Optimize Images First**: Compress images before uploading for faster loading
2. **Consistent Naming**: Use clear, descriptive titles
3. **Alt Text Matters**: Good alt text helps with SEO and accessibility
4. **Regular Backups**: Copy your `data/` folder weekly
5. **Test on Mobile**: Check how photos look on different devices

---

## 📞 Need Help?

1. Check `ADMIN_GUIDE.md` for detailed documentation
2. Check `BACKEND_SUMMARY.md` for technical details
3. Look at browser console (F12) for error messages
4. Check the terminal where `npm run dev` is running

---

## ✨ You're All Set!

Managing your portfolio is now as easy as:
1. Go to `/admin`
2. Click what you want to manage
3. Fill the form
4. Done!

No coding required. Anyone can do it! 🎉
