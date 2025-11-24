# Through Hardik's Eye 📸

A modern photography portfolio website built with Next.js 14, showcasing diverse photography work with a unique **Picasso-inspired cubist design**. This project features scroll-triggered animations, desaturated blue palettes, and non-traditional layouts that break conventional structures—bringing an artistic edge to portfolio presentation.

## ✨ Features

- 📸 **Portfolio Showcase** - Multiple photography categories (weddings, portraits, street, fashion, live events, AI-generated)
- 💬 **Client Testimonials** - Carousel display with star ratings
- 📝 **Contact Form** - Inquiry system with backend storage
- 🎨 **Picasso-Inspired Design** - Cubist-influenced aesthetic with scroll animations
- 🔧 **Admin Panel** - Easy content management with drag-and-drop uploads
- 🚀 **Fully Independent** - No external database required, file-based storage
- ⚡ **Fast & Responsive** - Built with Next.js App Router and optimized performance
- 🎯 **RESTful API** - Complete CRUD operations for all content types

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library with server components
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 3.4** - Utility-first styling
- **shadcn/ui** - Beautiful UI components built on Radix UI
- **Lucide React** - Icon library

### Backend & Data
- **Next.js API Routes** - RESTful API endpoints
- **File-Based Database** - JSON storage in `data/` directory
- **Image Upload System** - File uploads to `public/uploads/`
- **React Context** - Client-side data provider

### Forms & Validation
- **React Hook Form** - Form state management
- **Zod** - Schema validation

### Utilities
- **embla-carousel-react** - Carousel functionality
- **clsx + tailwind-merge** - Conditional class management

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/kunal-gh/studio.git
cd studio
```

2. **Install dependencies:**
```bash
npm install
```

3. **Run the development server:**
```bash
npm run dev
```

4. **Open your browser:**
Navigate to [http://localhost:9002](http://localhost:9002)

The website will be running locally! 🎉

### Available Scripts

```bash
npm run dev      # Start development server on port 9002
npm run build    # Create production build
npm start        # Start production server
npm run lint     # Run ESLint
```

## 📁 Project Structure

```
studio/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── admin/             # Admin panel pages
│   │   │   ├── page.tsx       # Dashboard
│   │   │   ├── photographs/   # Photo management
│   │   │   ├── testimonials/  # Testimonial management
│   │   │   └── contacts/      # Contact messages
│   │   ├── api/               # API routes
│   │   │   ├── photographs/   # Photo CRUD
│   │   │   ├── testimonials/  # Testimonial CRUD
│   │   │   ├── contacts/      # Contact CRUD
│   │   │   └── upload/        # Image upload
│   │   ├── portfolio/         # Portfolio pages
│   │   ├── testimonials/      # Testimonials page
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── home/             # Home page components
│   │   ├── portfolio/        # Portfolio components
│   │   ├── contact/          # Contact form
│   │   └── layout/           # Layout components
│   ├── lib/                  # Utilities
│   │   ├── db.ts            # Database operations
│   │   ├── data-provider.tsx # React Context
│   │   ├── actions.ts       # Server actions
│   │   └── utils.ts         # Helper functions
│   └── hooks/               # Custom React hooks
├── data/                    # JSON database
│   ├── photographs.json     # Portfolio images
│   ├── testimonials.json    # Client reviews
│   └── contacts.json        # Contact submissions
├── public/
│   └── uploads/            # Uploaded images
└── docs/                   # Documentation
```

## 🎨 Admin Panel

Manage your portfolio content through an intuitive admin interface.

### Accessing the Admin Panel

Navigate to: **[http://localhost:9002/admin](http://localhost:9002/admin)**

### Features

**📸 Photograph Management** (`/admin/photographs`)
- Upload images with drag-and-drop (max 5MB)
- Add titles, categories, descriptions, and alt text
- Organize by category (weddings, portraits, street, fashion, live events, AI-generated)
- Delete photos with one click

**💬 Testimonial Management** (`/admin/testimonials`)
- Add client reviews with star ratings
- Include client name, role, and avatar
- Manage all testimonials in one place

**📧 Contact Messages** (`/admin/contacts`)
- View all contact form submissions
- See name, email, message, and timestamp
- Click email to reply directly
- Delete messages when handled

For detailed admin instructions, see [ADMIN_GUIDE.md](./ADMIN_GUIDE.md)

## 💾 Data Management

### File-Based Storage

All data is stored in simple JSON files:

```
data/
├── photographs.json      # Your portfolio images
├── testimonials.json     # Client reviews
└── contacts.json         # Contact submissions

public/uploads/           # Uploaded images
```

**Backup:** Simply copy the `data/` and `public/uploads/` folders!

### Adding Content Programmatically

You can also manage content through the RESTful API:

**Photographs API:**
- `GET /api/photographs` - List all
- `POST /api/photographs` - Create new
- `PATCH /api/photographs/[id]` - Update
- `DELETE /api/photographs/[id]` - Delete

**Testimonials API:**
- `GET /api/testimonials` - List all
- `POST /api/testimonials` - Create new
- `PATCH /api/testimonials/[id]` - Update
- `DELETE /api/testimonials/[id]` - Delete

**Contacts API:**
- `GET /api/contacts` - List all
- `POST /api/contacts` - Create new
- `DELETE /api/contacts/[id]` - Delete

**Upload API:**
- `POST /api/upload` - Upload images

## 🚀 Deployment

This is a fully independent Next.js application that can be deployed anywhere.

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy automatically

### Other Platforms

- **Netlify** - Import from GitHub, auto-configure
- **Railway** - Deploy with one click
- **Render** - Connect repository and deploy
- **Self-hosted** - Use PM2 and nginx

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🎨 Customization

### Styling

- **Global styles:** `src/app/globals.css`
- **Theme configuration:** `tailwind.config.ts`
- **Color variables:** HSL-based in globals.css
- **Fonts:** Playfair Display (headlines), Montserrat (body)

### Design Philosophy

The design is inspired by Picasso's artistic periods:
- Desaturated blue palette (#87CEEB) for tranquility
- Muted orange-yellow accents (#E07A5F) for highlights
- Non-traditional layouts breaking conventional structures
- Scroll-triggered animations with zoom effects
- Cubist-style image transformations

## 🔒 Security Considerations

### Current Setup
- No authentication (suitable for local development)
- Admin panel is publicly accessible
- File uploads validated for type and size

### For Production

Add authentication using:
- **NextAuth.js** (recommended) - Multiple providers
- **Clerk** - Full auth solution with UI
- **Auth0** - Enterprise authentication

See [ADMIN_GUIDE.md](./ADMIN_GUIDE.md) for authentication setup instructions.

## 📈 Upgrading to a Real Database

The file-based system works great for small to medium portfolios. To scale:

### PostgreSQL
```bash
npm install pg
# Update src/lib/db.ts
```

### MongoDB
```bash
npm install mongodb
# Update src/lib/db.ts
```

### Prisma (Recommended)
```bash
npm install prisma @prisma/client
npx prisma init
# Create schema and migrate
```

No changes needed to API routes or admin panel!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📚 Documentation

- **[ADMIN_GUIDE.md](./ADMIN_GUIDE.md)** - Complete admin panel documentation
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deployment instructions for various platforms

## 🙏 Acknowledgments

- Design inspired by Picasso's cubist period
- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

---

**Made with ❤️ for photographers who want full control over their portfolio**
