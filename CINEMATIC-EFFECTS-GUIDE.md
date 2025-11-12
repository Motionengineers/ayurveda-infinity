# Cinematic Effects Guide
## Depth Layers, Parallax & Button Animations

### Overview
This guide documents the cinematic effects implemented on the Ayurveda Infinity website, including floating particles, 3D parallax, big bold headlines, and button glow animations.

---

## 1. Depth Layers System

### Layer Structure
The hero section uses a 5-layer depth system for cinematic depth:

1. **Depth Layer 1** (z-index: 1) - Background Video
2. **Depth Layer 2** (z-index: 2) - Floating Particles
3. **Depth Layer 3** (z-index: 3) - Organic Shapes with Parallax
4. **Depth Layer 4** (z-index: 4) - Hand-drawn Texture Overlay
5. **Depth Layer 5** (z-index: 10) - Content (Text, Buttons, Images)

### Implementation
```tsx
<section className="relative min-h-[85vh]">
  {/* Layer 1: Background */}
  <div className="depth-layer-1">
    <BackgroundVideo />
  </div>
  
  {/* Layer 2: Particles */}
  <div className="depth-layer-2">
    <FloatingParticles />
  </div>
  
  {/* Layer 3: Parallax Shapes */}
  <div className="depth-layer-3">
    <ParallaxLayer>
      <OrganicShapes />
    </ParallaxLayer>
  </div>
  
  {/* Layer 4: Texture */}
  <div className="depth-layer-4">
    <HandDrawnTexture />
  </div>
  
  {/* Layer 5: Content */}
  <div className="depth-content">
    {/* Your content */}
  </div>
</section>
```

---

## 2. Floating Particles

### Component: `FloatingParticles`
Located in `src/components/FloatingParticles.tsx`

**Features:**
- Canvas-based particle system
- Smooth animation with `requestAnimationFrame`
- Customizable count, color, speed, and size
- Glow effects on particles
- Wraps around screen edges

**Usage:**
```tsx
<FloatingParticles 
  count={60}
  color="rgba(217, 164, 65, 0.25)"
  speed={0.3}
  size={{ min: 2, max: 5 }}
/>
```

**Props:**
- `count` (number): Number of particles (default: 50)
- `color` (string): Particle color with opacity (default: turmeric gold)
- `speed` (number): Movement speed (default: 0.5)
- `size` (object): Min/max particle size (default: { min: 2, max: 6 })
- `className` (string): Additional CSS classes

**Performance:**
- Uses canvas for efficient rendering
- Automatically cleans up on unmount
- Responsive to window resize

---

## 3. 3D Parallax Effect

### Component: `ParallaxLayer`
Located in `src/components/ParallaxLayer.tsx`

**Features:**
- Scroll-based parallax movement
- Smooth transform transitions
- Customizable speed and direction
- Hardware-accelerated with `will-change`
- Passive scroll listeners for performance

**Usage:**
```tsx
<ParallaxLayer speed={0.3} direction="up">
  <YourContent />
</ParallaxLayer>
```

**Props:**
- `speed` (number): Parallax speed multiplier (default: 0.5)
- `direction` ("up" | "down"): Movement direction (default: "up")
- `offset` (number): Initial offset in pixels (default: 0)
- `className` (string): Additional CSS classes

**Speed Guidelines:**
- `0.1-0.2`: Subtle, slow movement (content)
- `0.3-0.5`: Medium movement (shapes, images)
- `0.6-1.0`: Fast movement (background elements)

**Best Practices:**
- Use slower speeds for text content
- Use faster speeds for decorative elements
- Combine with different directions for depth

---

## 4. Big Bold Headline

### Style: `.big-bold-headline`
Located in `src/app/globals.css`

**Features:**
- Responsive font size: `clamp(2.5rem, 8vw, 6rem)`
- Ultra-bold weight: `font-weight: 900`
- Animated gradient text
- Uppercase transformation
- Letter spacing optimization

**CSS:**
```css
.big-bold-headline {
  font-size: clamp(2.5rem, 8vw, 6rem);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  background: linear-gradient(135deg, ...);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-shift 8s ease infinite;
}
```

**Usage:**
```tsx
<h1 className="big-bold-headline font-serif">
  Pure, Potent,<br />
  Proven.<br />
  <span style={{ /* gradient styles */ }}>
    Ayurvedic Excellence.
  </span>
</h1>
```

**Animation:**
- Gradient shifts position over 8 seconds
- Creates subtle, dynamic text effect
- Smooth, infinite loop

---

## 5. Button Glow Animation

### Component: `GlowButton`
Located in `src/components/GlowButton.tsx`

**Features:**
- Multiple glow effects (radial, shimmer, pulse)
- Micro-motion animations
- Customizable variants and sizes
- Smooth hover transitions
- Accessible focus states

**Usage:**
```tsx
<GlowButton
  href="/products"
  variant="primary"
  size="lg"
  className="micro-motion-button"
  glowColor="rgba(217, 164, 65, 0.6)"
>
  Shop Now
</GlowButton>
```

**Props:**
- `href` (string): Link URL (creates `<a>` tag)
- `onClick` (function): Click handler (creates `<button>` tag)
- `variant` ("primary" | "secondary" | "outline"): Button style
- `size` ("sm" | "md" | "lg"): Button size
- `glowColor` (string): Custom glow color
- `className` (string): Additional CSS classes

**Glow Effects:**
1. **Radial Glow**: Blurred background on hover
2. **Shimmer**: Animated gradient sweep
3. **Pulse**: Ping animation on hover
4. **Border Glow**: Animated border gradient

**Micro-Motion:**
- Hover: `translateY(-2px) scale(1.02)`
- Active: `translateY(0) scale(0.98)`
- Smooth cubic-bezier transitions

**CSS Classes:**
- `.micro-motion-button`: Adds micro-motion effects
- `.button-glow`: Adds border glow effect

---

## 6. Animation Performance

### Optimizations
1. **Hardware Acceleration**
   - `transform: translateZ(0)`
   - `will-change: transform`
   - `backface-visibility: hidden`

2. **Passive Event Listeners**
   - Scroll events use `{ passive: true }`
   - Reduces main thread blocking

3. **RequestAnimationFrame**
   - Particles use RAF for smooth animation
   - Automatic cleanup on unmount

4. **CSS Animations**
   - GPU-accelerated transforms
   - Efficient keyframe animations

### Performance Guidelines
- Limit particle count to 50-100
- Use parallax speeds < 1.0
- Avoid animating layout properties
- Use `transform` and `opacity` only

---

## 7. Implementation Examples

### Full Hero Section
```tsx
<section className="relative min-h-[85vh] bg-palette-60 overflow-hidden">
  {/* Background Video */}
  <div className="depth-layer-1">
    <BackgroundVideo src="..." opacity={0.25} />
  </div>
  
  {/* Floating Particles */}
  <div className="depth-layer-2 floating-particles">
    <FloatingParticles count={60} color="rgba(217, 164, 65, 0.25)" />
    <FloatingParticles count={30} color="rgba(167, 198, 161, 0.2)" />
  </div>
  
  {/* Parallax Shapes */}
  <div className="depth-layer-3">
    <ParallaxLayer speed={0.3} direction="up">
      <OrganicBlob1 />
    </ParallaxLayer>
  </div>
  
  {/* Content */}
  <div className="depth-content">
    <ParallaxLayer speed={0.1} direction="up">
      <h1 className="big-bold-headline">Your Headline</h1>
      <GlowButton href="/products" variant="primary" size="lg">
        Shop Now
      </GlowButton>
    </ParallaxLayer>
  </div>
</section>
```

---

## 8. Color Palette

### Glow Colors
- **Primary**: `rgba(217, 164, 65, 0.6)` - Turmeric Gold
- **Secondary**: `rgba(167, 198, 161, 0.6)` - Herbal Green
- **Particles**: `rgba(217, 164, 65, 0.25)` - Subtle Gold

### Gradient Colors
- **Headline**: Deep Earth → Turmeric Gold → Deep Earth
- **Button Border**: Turmeric Gold → Herbal Green → Turmeric Gold

---

## 9. Accessibility

### Considerations
- **Motion**: Respects `prefers-reduced-motion`
- **Focus**: Visible focus rings on buttons
- **Performance**: Degrades gracefully on low-end devices
- **Semantics**: Proper ARIA labels on interactive elements

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  .parallax-layer,
  .floating-particles,
  .big-bold-headline {
    animation: none;
    transform: none;
  }
}
```

---

## 10. Browser Support

### Supported Features
- ✅ CSS `backdrop-filter` (Safari, Chrome, Firefox)
- ✅ Canvas API (All modern browsers)
- ✅ CSS `clip-path` (All modern browsers)
- ✅ `requestAnimationFrame` (All modern browsers)

### Fallbacks
- Particles: Gracefully degrade on older browsers
- Parallax: Static positioning on unsupported browsers
- Gradients: Solid color fallbacks

---

## 11. File Structure

```
src/
├── components/
│   ├── FloatingParticles.tsx    # Particle system
│   ├── ParallaxLayer.tsx        # Parallax wrapper
│   └── GlowButton.tsx           # Animated button
├── app/
│   ├── globals.css              # Animation styles
│   └── page.tsx                 # Hero implementation
└── ...
```

---

## 12. Troubleshooting

### Particles Not Showing
- Check canvas element is rendered
- Verify z-index layering
- Check browser console for errors

### Parallax Not Working
- Verify scroll event listeners
- Check element visibility
- Ensure proper z-index stacking

### Button Glow Not Visible
- Check glow color opacity
- Verify hover state
- Check z-index of glow elements

### Performance Issues
- Reduce particle count
- Lower parallax speeds
- Disable on mobile if needed

---

## 13. Future Enhancements

1. **3D Transform Effects**
   - Perspective transforms
   - 3D card flips
   - Depth-based scaling

2. **Advanced Particles**
   - Particle trails
   - Interactive particles
   - Physics-based movement

3. **Scroll Animations**
   - Fade-in on scroll
   - Stagger animations
   - Scroll-triggered effects

4. **Cursor Effects**
   - Magnetic buttons
   - Cursor trails
   - Interactive hover states

