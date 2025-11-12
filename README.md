# Ayurveda Infinity Web

Premium Ayurvedic skincare storefront built with Next.js 16, React 19, and Tailwind CSS. The experience blends cinematic visuals, storytelling-led merchandising, and a concierge-style help centre.

---

## Tech Stack
- Next.js App Router (SSG/SSR hybrid)
- React 19 with Framer Motion animations
- Tailwind CSS 4 (JIT) + custom design tokens
- Shopify Storefront API for products and checkout
- Razorpay client integration (placeholder checkout flow)

---

## Prerequisites
- Node.js 20.x (Netlify also deploys on Node 20)
- npm (comes with Node)

---

## Installation & Local Development
```bash
npm install
npm run dev
```
Visit `http://localhost:3000` to explore the experience.

Useful scripts:
- `npm run build` – production build
- `npm run start` – serve the build locally
- `npm run lint` – static analysis

> Tip: run `npm run lint` and `npm run build` locally before pushing to Netlify to catch type or bundler issues early.

---

## Environment Variables
Create a local `.env` (not committed) with the following keys:
```env
# Shopify Storefront (public)
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=storefront-token

# Shopify Admin (server-only)
SHOPIFY_ADMIN_ACCESS_TOKEN=admin-access-token
SHOPIFY_WEBHOOK_SECRET=webhook-secret

# Razorpay Checkout (client key)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_yourkey
```
Add the same values to Netlify → Site Configuration → Environment variables.

> Database-backed features (cart sync, Shopify webhooks, admin sync helpers) are disabled in this build. Re-enable them only after wiring Prisma + a managed Postgres instance.

---

## Asset Optimisation (Critical Before Deploy)
Large 4K background videos currently live in `public/VIDEOS/BG`. Compress them to sub-5 MB 1080p WebM/MP4 before production:
```bash
# Example using FFmpeg
ffmpeg -i "Spotlight - Aloe Vera.mp4" -vf scale=1920:1080 -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus spotlight-aloe.webm
ffmpeg -i spotlight-aloe.webm -ss 00:00:01 -vframes 1 spotlight-aloe-poster.jpg
```
Update the video references in `src/app/page.tsx` (hero + “Made with Purity” sections) to point at the compressed assets.

Additional tips:
- Prefer AVIF/WebP images in `/public/assets/IMAGES/**` when possible.
- Keep testimonial before/after PNGs under 400 KB for faster LCP.
- Disable or simplify particle/video layers on future mobile-specific variants if Core Web Vitals regress.

See `WHY-WEBSITE-IS-HEAVY.md` for a full audit.

---

## Netlify Deployment
1. **Connect the repository** in Netlify (Git-based deploy).
2. Netlify auto-detects the build, but ensure the following:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: `20`
3. Netlify reads `netlify.toml` and installs `@netlify/plugin-nextjs` to handle SSR/ISR.
4. Configure the environment variables listed above.
5. Trigger the deploy. On first build, expect the plugin to output the routes it converts to Netlify Functions.
6. After deploy, smoke-test key pages (`/`, `/products`, `/products/[id]`, `/faq`, `/blog`, `/cart`, `/checkout`).

### Post-deploy checklist
- Confirm videos stream (use compressed versions!)
- Validate Shopify Storefront queries by loading `/products`
- Test Razorpay checkout placeholder (requires client key)
- Monitor build logs for any warnings about large assets or experimental APIs

---

## Disabled Server Features
To keep the site database-agnostic for static hosting:
- `POST /api/cart/sync`
- `POST /api/shopify/webhook`
- `src/services/syncShopify.ts`

These endpoints now return HTTP 501 with a descriptive message. Revisit them only after provisioning Prisma + PostgreSQL.

---

## Contributing
1. Fork and clone the repository
2. Create a feature branch `git checkout -b feature/amazing`
3. Commit with context-rich messages
4. Open a pull request describing visuals, assets, and performance impact

---

## Support
For design copy or additional assets, reach out to `hello@ayurvedainfinity.com` or reference the Knowledge Hub and Self-Help Resource sections inside the app.
