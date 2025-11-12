# Shopify Integration Setup Guide

## ✅ Implementation Complete

This document outlines the complete Shopify integration for the Ayurveda Infinity website.

---

## 📁 Project Structure

```
ayurveda-web/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── shopify/
│   │   │   │   ├── create-checkout/route.ts
│   │   │   │   ├── webhook/route.ts
│   │   │   │   ├── products/route.ts
│   │   │   │   └── product/[handle]/route.ts
│   │   │   └── cart/
│   │   │       └── sync/route.ts
│   │   └── product/
│   │       └── [handle]/
│   │           └── page.tsx   # Product page
│   ├── components/
│   │   ├── product/
│   │   │   ├── ProductHero.tsx
│   │   │   └── ProductDetails.tsx
│   │   └── cart/
│   │       └── CartSlideOver.tsx
│   ├── hooks/
│   │   └── useCart.ts
│   ├── lib/
│   │   ├── shopify/
│   │   │   ├── storefront.ts  # Storefront API
│   │   │   └── admin.ts       # Admin API
│   │   └── db.ts              # Prisma client
│   ├── services/
│   │   └── syncShopify.ts     # Sync service
│   └── types/
│       └── shopify.d.ts       # TypeScript types
└── .env.example
```

---

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
npm install @prisma/client prisma
```

### 2. Environment Variables

Create `.env.local` file:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/ayurveda_shopify?schema=public"

# Shopify Storefront API (Public)
SHOPIFY_STORE_DOMAIN="your-store.myshopify.com"
SHOPIFY_STOREFRONT_ACCESS_TOKEN="your-storefront-access-token"

# Shopify Admin API (Private - server-side only)
SHOPIFY_ADMIN_ACCESS_TOKEN="your-admin-access-token"

# Webhook Secret
SHOPIFY_WEBHOOK_SECRET="your-webhook-secret"
```

### 3. Database Setup

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio
npx prisma studio
```

### 4. Shopify API Setup

#### Storefront API Token
1. Go to Shopify Admin → Settings → Apps and sales channels
2. Develop apps → Create an app
3. Configure Storefront API scopes:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_write_customers`
4. Install app and copy Storefront API access token

#### Admin API Token
1. In the same app, configure Admin API scopes:
   - `read_products`
   - `read_orders`
   - `read_customers`
   - `read_inventory`
   - `write_fulfillments`
2. Install app and copy Admin API access token

#### Webhook Setup
1. In Shopify Admin → Settings → Notifications
2. Create webhooks for:
   - `orders/create` → `https://your-domain.com/api/shopify/webhook`
   - `orders/updated` → `https://your-domain.com/api/shopify/webhook`
   - `products/create` → `https://your-domain.com/api/shopify/webhook`
   - `products/update` → `https://your-domain.com/api/shopify/webhook`
   - `inventory_levels/update` → `https://your-domain.com/api/shopify/webhook`
3. Copy webhook secret

---

## 🚀 Usage

### Product Page

Visit `/product/[handle]` to see a product page with:
- Product images gallery
- Variant selection
- Add to cart
- Buy now (direct checkout)
- Product details accordion

### Cart

The cart is managed client-side using the `useCart` hook:
- Stored in localStorage
- Synced to server every 5 minutes
- Slide-over UI component

### Checkout

Two options:
1. **Shopify-hosted checkout** (recommended) - Redirects to Shopify checkout page
2. **Custom checkout** - Can be implemented for full control

---

## 📊 Database Models

### Product
- Stores product information from Shopify
- Linked to variants, images, and metafields

### Variant
- Product variants with pricing and inventory
- Linked to cart items and order items

### Cart
- User shopping carts
- Can be session-based or user-based

### ShopOrder
- Orders synced from Shopify
- Linked to customers and fulfillments

### Customer
- Customer information
- Linked to orders

---

## 🔄 Sync Service

### Manual Sync

```typescript
import { syncProducts, syncOrders } from "@/services/syncShopify";

// Sync products
await syncProducts({ limit: 250 });

// Sync orders
await syncOrders({ limit: 250, status: "any" });
```

### Automatic Sync

Webhooks automatically sync:
- New orders
- Product updates
- Inventory changes

---

## 🎨 Components

### ProductHero
- Large product image
- Thumbnail gallery
- Zoom on hover

### ProductDetails
- Product title and description
- Variant selection
- Price and discounts
- Quantity selector
- Add to cart / Buy now buttons
- Trust badges
- Details accordion

### CartSlideOver
- Slide-over cart UI
- Item management
- Checkout button

---

## 🔐 Security

- ✅ Admin API tokens are server-side only
- ✅ Webhook HMAC verification
- ✅ Environment variables for secrets
- ✅ Rate limiting (Shopify handles this)

---

## 📝 Next Steps

1. ✅ Set up environment variables
2. ✅ Run database migrations
3. ✅ Configure Shopify API tokens
4. ✅ Set up webhooks
5. ⏳ Create admin panel
6. ⏳ Implement product sync script
7. ⏳ Add authentication for admin
8. ⏳ Set up order fulfillment

---

## 🐛 Troubleshooting

### Products not loading
- Check Storefront API token
- Verify store domain
- Check API version compatibility

### Webhooks not working
- Verify webhook secret
- Check webhook URL is accessible
- Verify HMAC signature

### Database errors
- Run `npx prisma generate`
- Check DATABASE_URL
- Verify migrations are applied

---

## 📚 Resources

- [Shopify Storefront API Docs](https://shopify.dev/docs/api/storefront)
- [Shopify Admin API Docs](https://shopify.dev/docs/api/admin)
- [Prisma Docs](https://www.prisma.io/docs)
- [Next.js App Router Docs](https://nextjs.org/docs/app)

---

## ✅ Checklist

- [x] Prisma schema created
- [x] Shopify API helpers created
- [x] Product page components
- [x] Cart functionality
- [x] Checkout API
- [x] Webhook handlers
- [x] Sync service
- [ ] Admin panel (pending)
- [ ] Authentication (pending)
- [ ] Product sync script (pending)

