# Project Structure

## Root Configuration

- `next.config.mjs` - Next.js configuration
- `tsconfig.json` - TypeScript configuration with `@/*` path alias
- `tailwind.config.ts` - Tailwind with custom theme (colors, fonts, animations)
- `components.json` - shadcn/ui configuration
- `package.json` - Dependencies and scripts

## Source Directory (`src/`)

### `src/app/` - Next.js App Router
- `layout.tsx` - Root layout
- `page.tsx` - Home page
- `globals.css` - Global styles with CSS variables
- `admin/` - Admin panel routes
- `portfolio/` - Portfolio page routes
- `testimonials/` - Testimonials page routes

### `src/components/`
- `ui/` - shadcn/ui components (Button, Card, Form, Toast, etc.)
- `home/` - Home page components
- `portfolio/` - Portfolio-specific components
- `contact/` - Contact form components
- `layout/` - Layout components (header, footer, navigation)
- `FirebaseErrorListener.tsx` - Error handling
- `logo.tsx` - Logo component



### `src/hooks/`
- `use-mobile.tsx` - Mobile detection hook
- `use-scroll-progress.ts` - Scroll position tracking
- `use-toast.ts` - Toast notification hook

### `src/lib/`
- `utils.ts` - Utility functions (cn for class merging)
- `actions.ts` - Server actions
- `local-data.ts` - Local data storage (photographs, testimonials)
- `data-provider.tsx` - React Context provider for data
- `placeholder-images.ts` - Image placeholder utilities
- `placeholder-images.json` - Placeholder image data

## Documentation

- `docs/blueprint.md` - Product design and style guidelines
- `docs/backend.json` - Backend configuration reference



## Conventions

- Use App Router patterns (server components by default)
- Import from `@/` for src files
- UI components follow shadcn/ui patterns
- Data accessed through React Context providers
- Custom animations defined in Tailwind config
- HSL color variables for theming
- All data stored in-memory (can be extended to use localStorage or backend)
