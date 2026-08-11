# AlafiaMart

Dietary-first health & wellness marketplace for Nigeria (P1 storefront).

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- Paystack checkout (test keys optional; mock fallback included)

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Scripts

- `npm run dev` — local development
- `npm run build` — production build
- `npm run start` — start production server

## P1 surfaces

- `/` homepage
- `/search`, `/category/[slug]` catalog
- `/product/[slug]` PDP
- `/cart`, `/checkout`, `/order/[id]`
- `/delivery` zone checker
- `/account` order history
- `/admin` staff dashboard
