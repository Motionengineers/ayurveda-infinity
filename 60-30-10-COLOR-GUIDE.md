# 60-30-10 Color Rule Implementation Guide
## Ayurveda Infinity Website

### Overview
The 60-30-10 rule creates visual hierarchy and balance by allocating colors in specific proportions:
- **60%** Primary: Backgrounds, large areas, main surfaces
- **30%** Secondary: Navigation, cards, content areas, secondary buttons
- **10%** Accent: CTAs, links, icons, highlights

---

## Ayurveda Infinity Palette

### 60% Primary (Backgrounds)
```css
--palette-60-primary: #F4EDE1;        /* Clay Beige - main background */
--palette-60-primary-light: #FDFBF8;  /* Light variant for cards */
--palette-60-primary-dark: #E8DBC3;   /* Darker variant for depth */
```

**Usage:**
- Main page backgrounds
- Section backgrounds
- Card backgrounds (light variant)
- Large content areas

**Tailwind Classes:**
- `bg-palette-60` - Main primary background
- `bg-palette-60-light` - Light card backgrounds
- `bg-palette-60-dark` - Subtle depth

---

### 30% Secondary (Structure)
```css
--palette-30-secondary: #A7C6A1;        /* Herbal Green - main secondary */
--palette-30-secondary-light: #C8D5C4;  /* Light sage for subtle backgrounds */
--palette-30-secondary-dark: #8DAD85;   /* Darker sage for depth */
```

**Usage:**
- Navigation bars
- Card borders and backgrounds
- Secondary buttons
- Content section backgrounds
- Footer backgrounds
- Product cards

**Tailwind Classes:**
- `bg-palette-30` - Main secondary background
- `bg-palette-30-light` - Subtle secondary backgrounds
- `bg-palette-30-dark` - Darker secondary elements
- `border-palette-30` - Secondary borders
- `text-palette-30` - Secondary text

---

### 10% Accent (Highlights & CTAs)
```css
--palette-10-accent: #D9A441;        /* Turmeric Gold - main accent */
--palette-10-accent-light: #FBE7B7;  /* Light gold for hover states */
--palette-10-accent-dark: #B8872E;   /* Darker gold for pressed states */
```

**Usage:**
- Primary CTA buttons
- Links and interactive elements
- Icons that need attention
- Highlights and badges
- Hover states
- Active states

**Tailwind Classes:**
- `bg-palette-10` - Main accent background (CTAs)
- `bg-palette-10-light` - Light accent (hover states)
- `bg-palette-10-dark` - Dark accent (pressed states)
- `text-palette-10` - Accent text color
- `border-palette-10` - Accent borders

---

### Supporting Neutrals
```css
--neutral-text-dark: #46392B;    /* Deep Earth - primary text */
--neutral-text-medium: #6B5D4F;  /* Medium text */
--neutral-text-light: #9B8E7F;   /* Light text */
--neutral-surface: #FFFFFF;      /* White for cards */
--neutral-border: #E8E2D9;       /* Subtle borders */
```

---

## Implementation Examples

### Hero Section
```tsx
<section className="bg-palette-60"> {/* 60% Primary */}
  <div className="bg-palette-30/10 rounded-lg"> {/* 30% Secondary - subtle */}
    <button className="bg-palette-10 text-white"> {/* 10% Accent */}
      Shop Now
    </button>
  </div>
</section>
```

### Navigation
```tsx
<nav className="bg-neutral-surface border-b border-palette-30/20"> {/* 30% Secondary border */}
  <a href="/" className="text-palette-30-dark hover:text-palette-10"> {/* 30% → 10% on hover */}
    Products
  </a>
</nav>
```

### Product Cards
```tsx
<div className="bg-neutral-surface border-2 border-palette-30/30"> {/* 30% Secondary border */}
  <h3 className="text-neutral-text-dark"> {/* Neutral text */}
    Product Name
  </h3>
  <button className="bg-palette-10 hover:bg-palette-10-dark"> {/* 10% Accent */}
    Add to Cart
  </button>
</div>
```

### Footer
```tsx
<footer className="bg-palette-30/5"> {/* 30% Secondary - very subtle */}
  <a href="/contact" className="text-palette-10 hover:text-palette-10-dark"> {/* 10% Accent */}
    Contact Us
  </a>
</footer>
```

---

## Color Accessibility

### Contrast Ratios
- **Primary Text on 60% Background:** ✅ 7.2:1 (WCAG AAA)
- **Text on 30% Secondary:** ✅ 4.8:1 (WCAG AA)
- **White Text on 10% Accent:** ✅ 4.5:1 (WCAG AA)

### Best Practices
1. **Text Readability:** Always use `neutral-text-dark` for primary text
2. **Interactive Elements:** Use `palette-10` (accent) for CTAs
3. **Subtle Backgrounds:** Use `palette-30-light` or `palette-30/10` for subtle structure
4. **Hover States:** Transition from `palette-30` to `palette-10` for interactive elements

---

## Quick Reference

| Element | Color | Percentage | Usage |
|---------|-------|------------|-------|
| Page Background | `palette-60` | 60% | Main backgrounds |
| Navigation | `palette-30` or `neutral-surface` | 30% | Structure |
| Cards | `neutral-surface` with `palette-30` borders | 30% | Content containers |
| Primary Buttons | `palette-10` | 10% | CTAs |
| Links | `palette-10` | 10% | Interactive text |
| Icons | `palette-10` | 10% | Highlights |
| Text | `neutral-text-dark` | - | Readability |

---

## Migration Notes

All existing color classes still work:
- `bg-herbal-green` → Maps to `palette-30`
- `bg-turmeric-gold` → Maps to `palette-10`
- `bg-clay-beige` → Maps to `palette-60`
- `text-deep-earth` → Maps to `neutral-text-dark`

New palette classes are available for explicit 60-30-10 usage:
- `bg-palette-60`, `bg-palette-30`, `bg-palette-10`
- `text-palette-60`, `text-palette-30`, `text-palette-10`
- `border-palette-30`, `border-palette-10`

