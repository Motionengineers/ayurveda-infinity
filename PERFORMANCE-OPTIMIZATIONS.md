# ⚡ Performance Optimizations Guide

## 🎯 Quick Fixes (Implement Now)

### 1. Replace Background Videos with Optimized Version

**Before:**
```tsx
<BackgroundVideo src="/VIDEOS/BG/Spotlight - Aloe Vera.mp4" opacity={0.25} />
```

**After:**
```tsx
<OptimizedBackgroundVideo 
  src="/VIDEOS/BG/Spotlight - Aloe Vera-compressed.mp4" 
  poster="/VIDEOS/BG/Spotlight - Aloe Vera-poster.jpg"
  opacity={0.25}
  lazy={true}
/>
```

**Benefits:**
- Lazy loads video (only when in view)
- Uses poster image as fallback
- Pauses when out of view
- Saves 50-100MB on initial load

### 2. Replace FloatingParticles with Optimized Version

**Before:**
```tsx
<FloatingParticles count={60} />
<FloatingParticles count={30} />
```

**After:**
```tsx
<OptimizedParticles 
  count={20} 
  disableOnMobile={true}
  pauseOnScroll={true}
/>
```

**Benefits:**
- 70% fewer particles (20 vs 90)
- CSS animations instead of canvas (lighter)
- Disabled on mobile
- Pauses when out of view
- Saves CPU/GPU usage

### 3. Use LazyScrollReveal Instead of ScrollReveal

**Before:**
```tsx
<ScrollReveal direction="up" delay={0.2}>
  <Content />
</ScrollReveal>
```

**After:**
```tsx
<LazyScrollReveal direction="up" delay={0.2} disableOnMobile={true}>
  <Content />
</LazyScrollReveal>
```

**Benefits:**
- Respects prefers-reduced-motion
- Disabled on mobile
- Lighter animations
- Better performance

### 4. Add Lazy Loading to Images

**Before:**
```tsx
<Image src={image} alt="..." />
```

**After:**
```tsx
<Image 
  src={image} 
  alt="..." 
  loading="lazy"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### 5. Dynamic Import Heavy Components

**Before:**
```tsx
import FloatingParticles from "@/components/FloatingParticles";
import ParallaxLayer from "@/components/ParallaxLayer";
```

**After:**
```tsx
import dynamic from "next/dynamic";

const FloatingParticles = dynamic(() => import("@/components/OptimizedParticles"), {
  ssr: false,
});
```

---

## 📦 Video Compression Guide

### Compress Videos Using FFmpeg

```bash
# Install FFmpeg
brew install ffmpeg  # macOS
# or
sudo apt install ffmpeg  # Linux

# Compress video to 1080p, WebM format (smaller)
ffmpeg -i input.mp4 -vf scale=1920:1080 -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus output.webm

# Create poster image
ffmpeg -i input.mp4 -ss 00:00:01 -vframes 1 output-poster.jpg

# Compress to MP4 (if WebM not supported)
ffmpeg -i input.mp4 -vf scale=1920:1080 -c:v libx264 -crf 23 -preset slow -c:a aac -b:a 128k output-compressed.mp4
```

### Target Sizes
- **Background videos**: < 5MB (1080p, 30fps)
- **Product videos**: < 10MB (1080p, 30fps)
- **Poster images**: < 200KB (JPEG, 1920x1080)

---

## 🖼️ Image Optimization

### Compress Images

```bash
# Install sharp-cli
npm install -g sharp-cli

# Convert to WebP
sharp -i input.jpg -o output.webp -q 80

# Convert to AVIF (best compression)
sharp -i input.jpg -o output.avif -q 50

# Resize and compress
sharp -i input.jpg -o output.jpg -w 1920 -q 80
```

### Use Next.js Image Component

```tsx
<Image
  src="/product.jpg"
  alt="Product"
  width={800}
  height={600}
  loading="lazy"
  placeholder="blur"
  quality={85}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

---

## 🚀 Code Splitting

### Dynamic Imports

```tsx
// Heavy components
const ProductHoverCard = dynamic(() => import("@/components/ProductHoverCard"), {
  loading: () => <div>Loading...</div>,
});

// Below-fold content
const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: false,
});
```

### Route-based Code Splitting

Next.js automatically code-splits by route, but you can optimize further:

```tsx
// app/product/[handle]/page.tsx
import dynamic from "next/dynamic";

const ProductHero = dynamic(() => import("@/components/product/ProductHero"));
const ProductDetails = dynamic(() => import("@/components/product/ProductDetails"));
```

---

## 📊 Bundle Analysis

### Analyze Bundle Size

```bash
# Install analyzer
npm install @next/bundle-analyzer

# Add to next.config.ts
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);

# Run analysis
ANALYZE=true npm run build
```

---

## 🎨 CSS Optimization

### Remove Unused CSS

```bash
# Install PurgeCSS
npm install -D @fullhuman/postcss-purgecss

# Add to postcss.config.js
module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    process.env.NODE_ENV === 'production' && require('@fullhuman/postcss-purgecss')({
      content: ['./src/**/*.{js,jsx,ts,tsx}'],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
    }),
  ].filter(Boolean),
};
```

---

## 🔧 Next.js Optimizations

### Update next.config.ts

```typescript
const nextConfig: NextConfig = {
  // Enable compression
  compress: true,
  
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  
  // Experimental optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  
  // Headers for caching
  async headers() {
    return [
      {
        source: '/VIDEOS/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

---

## 📱 Mobile Optimizations

### Disable Heavy Features on Mobile

```tsx
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

{!isMobile && <FloatingParticles />}
{!isMobile && <BackgroundVideo />}
```

### Reduce Animations on Mobile

```tsx
const prefersReducedMotion = useReducedMotion();

{!prefersReducedMotion && <ScrollReveal />}
```

---

## 🎯 Performance Targets

| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| First Contentful Paint | ~5s | < 1.5s | 🔴 |
| Largest Contentful Paint | ~10s | < 2.5s | 🔴 |
| Time to Interactive | ~15s | < 3.5s | 🔴 |
| Total Bundle Size | ~500KB | < 200KB | 🔴 |
| Total Page Weight | ~150MB | < 2MB | 🔴 |

---

## ✅ Implementation Checklist

- [ ] Compress all background videos
- [ ] Replace BackgroundVideo with OptimizedBackgroundVideo
- [ ] Replace FloatingParticles with OptimizedParticles
- [ ] Replace ScrollReveal with LazyScrollReveal
- [ ] Add lazy loading to all images
- [ ] Dynamic import heavy components
- [ ] Disable animations on mobile
- [ ] Compress product images
- [ ] Enable code splitting
- [ ] Remove unused CSS
- [ ] Add bundle analyzer
- [ ] Test performance with Lighthouse

---

## 🧪 Testing Performance

### Run Lighthouse

```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit
lighthouse http://localhost:3000 --view
```

### Performance Budget

Set performance budgets in `next.config.ts`:

```typescript
const nextConfig = {
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
  // Performance budgets
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};
```

---

## 📈 Expected Improvements

After implementing all optimizations:

- **Load Time**: 15-45s → 2-4s (90% improvement)
- **Bundle Size**: 500KB → 200KB (60% reduction)
- **Page Weight**: 150MB → 2MB (98% reduction)
- **Lighthouse Score**: 40-50 → 90+ (100% improvement)

---

## 🚨 Critical Actions Required

1. **Compress videos** - Biggest impact
2. **Reduce particles** - CPU/GPU usage
3. **Lazy load images** - Initial load
4. **Code split** - JavaScript bundle
5. **Disable on mobile** - Mobile performance

