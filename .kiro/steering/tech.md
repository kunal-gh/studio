# Tech Stack

## Framework & Core

- **Next.js 14** (App Router) - React framework with server components
- **React 18** - UI library
- **TypeScript 5** - Type-safe development

## Data Management

- **Local State** - In-memory data storage using React Context
  - No external database dependencies
  - Data provider pattern for photographs and testimonials
  - Easily extensible to add backend later

## UI & Styling

- **Tailwind CSS 3.4** - Utility-first CSS framework
- **shadcn/ui** - Component library (Radix UI primitives)
  - Components in `src/components/ui/`
  - Configuration in `components.json`
- **Lucide React** - Icon library
- **Custom fonts**: Playfair Display (headlines), Montserrat (body)

## Form & Validation

- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **@hookform/resolvers** - Form validation integration

## Utilities

- **clsx** + **tailwind-merge** - Conditional class management
- **embla-carousel-react** - Carousel functionality
- **class-variance-authority** - Component variant management

## Development Tools

- **ESLint** - Linting (disabled during builds)
- **PostCSS** - CSS processing

## Common Commands

```bash
# Development server (runs on port 9002)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Path Aliases

- `@/*` maps to `./src/*` for clean imports

## Build Configuration

- TypeScript errors ignored during builds (`ignoreBuildErrors: true`)
- ESLint checks disabled during builds (`ignoreDuringBuilds: true`)
- Remote images allowed from: placehold.co, images.unsplash.com, picsum.photos

## Deployment

- Fully static Next.js application
- Can be deployed to any static hosting (Vercel, Netlify, GitHub Pages, etc.)
- No backend dependencies required
- Use `npm run build` to create production build
