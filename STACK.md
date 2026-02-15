# Stack

## Framework
- **Next.js 14** with App Router
- **TypeScript** (strict mode)

## Styling
- **Tailwind CSS** for utility-first styling
- **shadcn/ui** for all components (required)
- **Lucide React** for icons

## Component Library

Always use shadcn/ui. Install components with:
```bash
npx shadcn@latest add [component]
```

Core components to install upfront:
```bash
npx shadcn@latest add button card input label select dialog table toast
```

## State Management
- **React Context + useReducer** for app state
- **react-hook-form + zod** for forms
- **TanStack Query** for server state (if needed)

## Libraries
- **sonner** for toasts (via shadcn)
- **date-fns** for date formatting
- **clsx + tailwind-merge** for class names (included with shadcn)

## Deployment
- **Vercel** with auto-deploy
- Domain: [your-domain.com]

## Backend
- API routes in Next.js for v1
- Database: [Postgres/Supabase/Prisma]
