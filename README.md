# Through Hardik's Eye

A modern photography portfolio website built with Next.js 14, showcasing diverse photography work with a unique cubist-inspired design.

## Features

- 📸 Portfolio showcase with multiple photography categories
- 💬 Client testimonials with carousel display
- 📝 Contact form for inquiries
- 🎨 Custom Picasso-inspired design with scroll animations
- 🚀 Fully independent - no external database required
- ⚡ Fast and responsive with Next.js App Router

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful UI components
- **React Context** - Local state management

## Getting Started

1. **Install dependencies:**
```bash
npm install
```

2. **Run the development server:**
```bash
npm run dev
```

3. **Open your browser:**
Navigate to [http://localhost:9002](http://localhost:9002)

## Available Scripts

- `npm run dev` - Start development server on port 9002
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
│   ├── ui/          # shadcn/ui components
│   ├── home/        # Home page components
│   ├── portfolio/   # Portfolio components
│   ├── contact/     # Contact form
│   └── layout/      # Layout components
├── lib/             # Utilities and data management
│   ├── local-data.ts      # Data storage
│   └── data-provider.tsx  # React Context provider
└── hooks/           # Custom React hooks
```

## Customization

### Adding Photos

Edit `src/lib/local-data.ts` to add or modify photographs and testimonials.

### Styling

- Global styles: `src/app/globals.css`
- Theme configuration: `tailwind.config.ts`
- Color variables: HSL-based in globals.css

### Deployment

This is a static Next.js application that can be deployed to:
- Vercel (recommended)
- Netlify
- GitHub Pages
- Any static hosting service

Simply run `npm run build` and deploy the `.next` folder.

## License

MIT
