# Fantula (凡图拉)

Intelligent overseas streaming media membership recharge platform (Netflix, Spotify, YouTube Premium, Disney+, etc.).

## Tech Stack

- **Frontend:** Nuxt 3 (v3.17.5) + Vue 3 + TypeScript, Element Plus UI, Pinia state management
- **Backend:** Self-hosted Supabase (PostgreSQL + PostgREST + GoTrue Auth + Kong + Deno Edge Functions)
- **Payments:** WeChat Pay (Native), WeChat OAuth login
- **Storage:** Cloudflare R2
- **Email:** Resend SMTP
- **Deployment:** PM2 + Nginx + Docker Compose on 180.163.87.70

## Project Structure

```
nuxt-frontend/          # Main Nuxt 3 app (port 3000)
  api/                  # API clients (admin/, client/)
  components/           # Vue components (admin/, pc/, mobile/, shared/)
  composables/          # Vue composables (admin/, client/, mobile/, shared/)
  config/               # Route & menu config
  layouts/              # Layouts: pc.vue, mobile.vue, mgmt.vue
  middleware/            # Auth guards (client-auth, mgmt-auth, redirect.global)
  pages/                # File-based routing
    pc/                 # Desktop pages
    mobile/             # Mobile H5 pages
    manager_portal/     # Admin portal
  plugins/              # Supabase init, auth, axios
  server/               # Nitro server API (wechat/, admin/, auth/)
    utils/              # Server utils (supabase, wechat-pay, email, validation)
  stores/               # Pinia stores (shared/, admin/, client/)
  types/                # TypeScript types
  utils/                # Client utilities
supabase/               # Backend infrastructure
  migrations/           # PostgreSQL migrations
  functions/            # Deno edge functions (upload-r2, delete-r2, etc.)
scripts/scheduler/      # Cron service (port 3001) - order cleanup & status updates
docs/                   # Project documentation
config/                 # Nginx config
```

## Common Commands

```bash
# Development
cd nuxt-frontend && npm run dev        # Start dev server (localhost:3000)
cd nuxt-frontend && npm run build      # Production build → .output/

# Deployment
./deploy.sh staging quick              # Quick deploy (code + restart)
./deploy.sh staging full               # Full deploy (clean install)
./deploy.sh prod quick|full            # Production deploy

# Supabase (local)
cd supabase && docker compose up -d    # Start local Supabase
supabase migration up                  # Run migrations

# PM2 (production)
pm2 status                             # Process status
pm2 logs fantula --lines 50            # View logs
pm2 restart fantula --update-env       # Restart app
```

## Key Conventions

- **Multi-platform routing:** `/pc/*` (desktop), `/mobile/*` (mobile H5), `/manager_portal/*` (admin)
- **SSR disabled for:** admin pages, profile pages, checkout pages
- **Components:** organized by platform (`pc/`, `mobile/`, `admin/`, `shared/`)
- **Composables:** prefixed with `use*`, organized by role
- **Stores:** named `use*Store` (e.g., `useSupabaseUserStore`, `useCartStore`)
- **API clients:** named exports like `supabaseAuthApi`, `supabaseOrderApi`
- **Supabase client-side:** singleton via `getSupabaseClient()`
- **Supabase server-side:** new instance per request (`persistSession: false`)
- **Auth:** Client users via Supabase Auth; Admin users via custom JWT at `/api/admin/auth/login`
- **Error handling:** centralized `errorMapper` + `useNotify` composable for toasts
- **Validation:** Zod for runtime validation

## Database

PostgreSQL via Supabase. Key tables: `products`, `product_skus`, `categories`, `orders`, `recharge_orders`, `profiles`, `admin_users`, `admin_departments`, `coupons`, `cart_items`, `banners`, `tickets`, `messages`, `wallet_transactions`, `scheduler_tasks`.

Migrations in `supabase/migrations/`. RLS policies enforced.

## Environment Variables

Required in `.env`: `SUPABASE_URL`, `SUPABASE_KEY`, `SUPABASE_SERVICE_KEY`, WeChat Pay credentials, R2 credentials. See existing `.env` for reference.
