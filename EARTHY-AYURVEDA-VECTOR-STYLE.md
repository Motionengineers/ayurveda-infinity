# Earthy Ayurveda Vector Style Guide
## Ad-Agency Quality Design System

### Overview
The Earthy Ayurveda Vector Style creates an organic, hand-drawn aesthetic that reflects the natural, holistic essence of Ayurvedic skincare. This style emphasizes botanical elements, organic shapes, and hand-drawn textures.

---

## Design Principles

### 1. Organic Shapes
- **Flowing, natural forms** inspired by nature
- **Irregular borders** using organic border-radius
- **Soft, rounded edges** that feel hand-drawn
- **Asymmetrical layouts** for natural movement

### 2. Botanical Line Drawings
- **Thin strokes** (1.5px) for delicate appearance
- **Rounded line caps** (stroke-linecap: round)
- **Smooth joins** (stroke-linejoin: round)
- **No fills** - pure line art style
- **Hand-drawn feel** with slight imperfections

### 3. Hand-Drawn Textures
- **Subtle paper texture** overlays
- **Organic dot patterns** for depth
- **Irregular line patterns** for texture
- **Low opacity** (0.02-0.05) for subtlety
- **Multiply blend mode** for natural integration

### 4. Color Palette: Cream, Brown, Saffron

#### Cream (60% Primary)
- `#F4EDE1` - Main background
- `#FDFBF8` - Light variant
- `#E8DBC3` - Dark variant

#### Brown (Text & Depth)
- `#46392B` - Deep Earth (primary text)
- `#6B5D4F` - Medium brown
- `#9B8E7F` - Light brown

#### Saffron (Accent)
- `#D9A441` - Turmeric Gold (CTAs, highlights)
- `#FBE7B7` - Light saffron
- `#B8872E` - Dark saffron

---

## Component Library

### Botanical Icons
Located in `src/components/BotanicalIcons.tsx`

**Available Icons:**
- `AloeVeraIcon` - Aloe vera plant
- `TurmericIcon` - Turmeric root
- `NeemLeafIcon` - Neem leaf
- `LotusIcon` - Lotus flower
- `TulsiIcon` - Tulsi (Holy Basil)
- `SandalwoodIcon` - Sandalwood
- `AyurvedaLeafIcon` - Generic Ayurvedic leaf

**Usage:**
```tsx
import { AloeVeraIcon } from "@/components/BotanicalIcons";

<AloeVeraIcon className="w-6 h-6 botanical-icon" strokeWidth={1.5} />
```

**Styling:**
- Use `botanical-icon` class for consistent styling
- Default `strokeWidth={1.5}` for thin, delicate lines
- Color via `text-*` classes or `stroke="currentColor"`

### Organic Shapes
Located in `src/components/OrganicShapes.tsx`

**Available Shapes:**
- `OrganicBlob1` - Large flowing blob
- `OrganicBlob2` - Medium organic shape
- `OrganicBlob3` - Small accent blob
- `OrganicWave` - Flowing wave pattern
- `OrganicLeafShape` - Leaf-inspired shape
- `OrganicCircle` - Dashed circle

**Usage:**
```tsx
import { OrganicBlob1 } from "@/components/OrganicShapes";

<OrganicBlob1 className="absolute top-10 right-10 w-64 h-64 text-palette-30 opacity-10" />
```

**Placement:**
- Use as background elements
- Position absolutely with low opacity (0.05-0.1)
- Rotate for variety: `transform: rotate(15deg)`

### Hand-Drawn Textures
Located in `src/components/HandDrawnTexture.tsx`

**Available Textures:**
- `HandDrawnTexture` - Subtle line texture overlay
- `PaperTexture` - Paper-like noise texture
- `OrganicTexturePattern` - Organic dot and line patterns

**Usage:**
```tsx
import { HandDrawnTexture } from "@/components/HandDrawnTexture";

<section className="relative hand-drawn-texture">
  <HandDrawnTexture opacity={0.02} />
  {/* Content */}
</section>
```

---

## CSS Classes

### Organic Borders
```css
.organic-border {
  border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  border: 2px solid;
  transition: border-radius 0.3s ease;
}

.organic-border:hover {
  border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
}
```

**Usage:**
- Apply to cards, badges, buttons
- Creates irregular, organic border shape
- Smooth transition on hover

### Hand-Drawn Texture
```css
.hand-drawn-texture {
  position: relative;
}

.hand-drawn-texture::before {
  /* Subtle texture overlay */
}
```

**Usage:**
- Apply to sections for texture
- Adds subtle hand-drawn feel
- Low opacity for subtlety

### Botanical Icon Styling
```css
.botanical-icon {
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}
```

**Usage:**
- Applied automatically to botanical icons
- Ensures consistent line style
- Creates hand-drawn appearance

---

## Implementation Examples

### Hero Section with Vector Style
```tsx
<section className="relative bg-palette-60 hand-drawn-texture">
  {/* Organic shapes */}
  <OrganicBlob1 className="absolute top-10 right-10 w-64 h-64 text-palette-30 opacity-10" />
  <OrganicBlob2 className="absolute bottom-20 left-10 w-48 h-48 text-palette-10 opacity-8" />
  
  {/* Hand-drawn texture */}
  <HandDrawnTexture opacity={0.02} />
  
  {/* Content */}
  <div className="relative z-10">
    {/* Your content */}
  </div>
</section>
```

### Card with Botanical Icon
```tsx
<div className="rounded-2xl bg-palette-30/5 p-8 border-2 border-palette-30/20 organic-border relative">
  {/* Botanical icon decoration */}
  <div className="absolute top-4 right-4 opacity-10">
    <LotusIcon className="w-16 h-16 botanical-icon text-palette-30-dark" />
  </div>
  
  {/* Content */}
  <h3 className="relative z-10">Title</h3>
</div>
```

### Badge with Botanical Icon
```tsx
<span className="inline-flex items-center gap-2 px-4 py-2 bg-palette-30/10 text-palette-30-dark rounded-full organic-border">
  <AloeVeraIcon className="w-4 h-4 botanical-icon" />
  Cruelty Free
</span>
```

---

## Best Practices

### 1. Opacity Levels
- **Organic shapes**: 0.05-0.1 (very subtle)
- **Texture overlays**: 0.02-0.05 (barely visible)
- **Botanical icons (decorative)**: 0.1-0.2 (subtle accent)
- **Botanical icons (functional)**: 1.0 (full opacity)

### 2. Z-Index Layering
- **Background**: z-0 (organic shapes, textures)
- **Content**: z-10 (text, buttons, cards)
- **Overlays**: z-20 (modals, dropdowns)

### 3. Color Usage
- **Cream**: Backgrounds, large areas (60%)
- **Brown**: Text, borders, depth (30%)
- **Saffron**: Accents, CTAs, highlights (10%)

### 4. Spacing
- **Organic shapes**: Position outside viewport edges
- **Botanical icons**: Top-right corner of cards
- **Textures**: Full coverage, low opacity

### 5. Animation
- **Organic borders**: Smooth transition on hover
- **Icons**: Subtle fade-in on scroll
- **Shapes**: Gentle rotation for variety

---

## File Structure

```
src/
├── components/
│   ├── BotanicalIcons.tsx      # Botanical line drawing icons
│   ├── OrganicShapes.tsx       # Organic shape components
│   └── HandDrawnTexture.tsx    # Texture overlay components
├── app/
│   └── globals.css             # Vector style CSS classes
└── ...
```

---

## Color Reference

### Cream Palette
- Primary: `#F4EDE1` (var(--palette-60-primary))
- Light: `#FDFBF8` (var(--palette-60-primary-light))
- Dark: `#E8DBC3` (var(--palette-60-primary-dark))

### Brown Palette
- Deep: `#46392B` (var(--neutral-text-dark))
- Medium: `#6B5D4F` (var(--neutral-text-medium))
- Light: `#9B8E7F` (var(--neutral-text-light))

### Saffron Palette
- Primary: `#D9A441` (var(--palette-10-accent))
- Light: `#FBE7B7` (var(--palette-10-accent-light))
- Dark: `#B8872E` (var(--palette-10-accent-dark))

---

## Accessibility

- **Contrast**: All text meets WCAG AA standards
- **Icons**: Decorative icons have `aria-hidden="true"`
- **Functional icons**: Include proper `aria-label`
- **Focus states**: Visible focus rings on interactive elements

---

## Performance

- **SVG Icons**: Inline SVG for fast rendering
- **Textures**: CSS-based for minimal overhead
- **Shapes**: Optimized SVG paths
- **Opacity**: Low opacity reduces rendering cost

---

## Future Enhancements

1. **Animation**: Add subtle animations to organic shapes
2. **More Icons**: Expand botanical icon library
3. **Texture Variations**: Additional texture patterns
4. **Responsive Shapes**: Scale organic shapes for mobile
5. **Interactive Elements**: Hover effects on botanical icons

