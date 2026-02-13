# Visual Refinements - Microsoft Copilot UI Match

## Summary
Complete visual refinement to match Microsoft Copilot's interface design system. All changes are purely visual/structural with zero functional modifications.

---

## Color System

### Background Colors
- **Base background**: `#0d0d0d` (was `#0b0c10`)
- **Sidebar**: `black/20` (rgba(0,0,0,0.2))
- **Main area gradient**: `from-white/3 via-transparent to-transparent`

### Border Colors
- **Primary borders**: `white/6` (6% opacity, was 10%)
- **Interactive borders**: `white/8` → `white/12` on hover
- **Emphasis borders**: `white/10` for input focus

### Text Colors
- **Primary text**: `white/90` to `white/95`
- **Secondary text**: `white/55` to `white/65`
- **Tertiary text**: `white/35` to `white/45`
- **Headers**: `white/85`

### Surface Colors
- **Subtle surfaces**: `white/4` to `white/5`
- **Interactive surfaces**: `white/8` on hover
- **Composer background**: `black/30` with `backdrop-blur-sm`
- **Input background**: `black/40` → `black/50` on focus

---

## Typography

### Font Stack
```css
font-family: "Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif
```

### Font Sizes (exact px values)
- **11px**: Uppercase labels, section headers
- **12px**: Small UI elements, tags
- **13px**: Sidebar items, pills, buttons, secondary text
- **14px**: Body text, messages, inputs, prompt cards
- **32px**: Empty state headline

### Font Weights
- **Regular (400)**: Default body text
- **Medium (500)**: Buttons, pills, labels
- **Semibold (600)**: Section headers, headline

### Line Heights
- **1.5**: Default body
- **1.6**: User message bubbles
- **1.7**: Assistant messages (more generous)
- **tight/snug**: Headers and compact areas

### Font Smoothing
```css
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
```

---

## Spacing System (8px base)

### Component Padding
- **Sidebar**: `px-3` (12px), `py-4` (16px)
- **Composer**: `p-5` (20px)
- **Prompt cards**: `p-4` (16px)
- **Message bubbles**: `px-4 py-2.5` (16px/10px)
- **Buttons**: `px-2.5 py-1.5` to `px-4 py-2`

### Gaps
- **Tight**: `gap-1` to `gap-1.5` (4-6px)
- **Standard**: `gap-2` to `gap-2.5` (8-10px)
- **Loose**: `gap-3` (12px)

### Margins
- **Message spacing**: `mb-6` (24px between messages)
- **Section spacing**: `mt-8` to `mt-12` (32-48px)
- **Tight spacing**: `mt-1.5` to `mt-3` (6-12px)

---

## Border Radius

### Exact Values
- **Small elements**: `rounded-lg` (8px)
- **Buttons**: `rounded-[12px]` to `rounded-[14px]`
- **Cards**: `rounded-[16px]`
- **Message bubbles**: `rounded-[20px]`
- **Composer**: `rounded-[24px]`
- **Pills**: `rounded-full`

---

## Component Specifications

### Sidebar
```
Width: 260px (was 300px)
Background: black/20
Border: white/6 (right edge)
Padding: 12px horizontal

Logo area:
  - 28px × 28px icon with gradient
  - 13px font, medium weight

Buttons:
  - Height: auto (padding-based)
  - Padding: 10px × 10px (py-2.5 px-2.5)
  - Radius: 8px (rounded-lg)
  - Border: white/8 → white/12 hover

Section headers:
  - 11px uppercase
  - Semibold weight
  - tracking-wide
  - text-white/35
```

### Composer
```
Max width: 860px (was 820px)
Background: black/30 with backdrop-blur-sm
Border: white/8
Padding: 20px
Radius: 24px
Shadow: 0 4px 24px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)

Input field:
  - Background: black/40 → black/50 on focus
  - Border: white/10 → white/20 on focus
  - Radius: 16px
  - Padding: 12px × 16px
  - Font: 14px

Action buttons:
  - Size: 36px × 36px
  - Radius: 14px
  - Background: white/5
  - Border: white/8 → white/12 hover
```

### Messages
```
User messages (right-aligned):
  - Max width: 75%
  - Background: white/8
  - Border: white/10
  - Radius: 20px
  - Padding: 10px × 16px
  - Text: 14px, line-height 1.6

Assistant messages (left-aligned):
  - Max width: 85%
  - NO background or border
  - Plain text only
  - Text: 14px, line-height 1.7
  - Color: white/90

Message spacing: 24px (mb-6)
```

### Pills (Work/Web)
```
Padding: 16px × 6px (px-4 py-1.5)
Font: 13px medium
Border: white/6 inactive, white/12 active
Background: transparent → white/8 active
Radius: rounded-full
```

### Prompt Cards
```
Background: white/4
Border: white/8 → white/12 hover
Radius: 16px
Padding: 16px
Shadow: shadow-sm

Title: 14px medium, white/90
Subtitle: 13px regular, white/50, leading-snug
```

### Top Bar
```
Height: 56px (h-14)
Padding: 32px horizontal
Border: white/6 bottom
Background: gradient from-white/3

Right buttons:
  - Size: 36px × 36px
  - Radius: 12px
  - Background: white/5
  - Border: white/8
```

---

## Transitions & Interactions

### Global Transitions
```css
transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
```

### Hover States
- **Opacity increase**: 50% → 90%
- **Background**: white/5 → white/8 → white/10
- **Border**: white/8 → white/12
- **Text color**: +30-40% opacity

### Focus States
- **Input border**: white/10 → white/20
- **Input background**: black/40 → black/50
- **No harsh outlines**: `outline-none` with subtle border changes

### Disabled States
- **Opacity**: 40-50%
- **Cursor**: not-allowed
- **No hover effects**

---

## Shadows & Elevation

### Composer Shadow
```css
box-shadow: 0 4px 24px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)
```

### Prompt Cards
```
shadow-sm (Tailwind default)
```

### Loading Dots
```
Size: 8px × 8px (w-2 h-2)
Color: white/30
Animation: bounce with staggered delays (0ms, 150ms, 300ms)
```

---

## Custom Scrollbar

```css
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  border: 3px solid #0d0d0d;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.15);
}
```

---

## Gradient Accents

### Sidebar Icons
```
from-purple-500/20 to-blue-500/20
```
Used for:
- Logo icon
- User avatar

---

## Key Design Principles Applied

1. **Softer borders**: Reduced from 10% to 6-8% opacity for subtle separation
2. **Generous spacing**: Increased padding and margins throughout
3. **No assistant bubbles**: Plain text only, matching Copilot's asymmetric design
4. **Precise typography**: Exact font sizes in px for consistency
5. **Layered elevation**: Shadows and blur for depth perception
6. **Smooth interactions**: 150ms transitions with proper easing
7. **Consistent radius**: 12-24px range with exact values per component
8. **Visual hierarchy**: Opacity-based text colors (35/45/55/65/85/90)
9. **Minimal contrast**: Low-key dark theme without harsh whites
10. **System font scaling**: Segoe UI prioritized for Windows authenticity

---

## Testing Checklist

- [x] Sidebar width and spacing correct
- [x] Message bubbles: user has bubble, assistant plain text
- [x] Composer shadow and elevation visible
- [x] All font sizes match specification
- [x] Border opacities softer (6-8% range)
- [x] Hover states smooth and subtle
- [x] Focus states visible but not jarring
- [x] Spacing follows 8px system
- [x] Typography hierarchy clear
- [x] Colors match dark neutral palette
- [x] Custom scrollbar styled
- [x] Transitions at 150ms
- [x] All radii use exact values

---

## Browser Compatibility

All styles use standard CSS properties with vendor prefixes where needed:
- `-webkit-font-smoothing`
- `-moz-osx-font-smoothing`
- `::-webkit-scrollbar` (Chromium browsers only)

Tailwind 3.x handles autoprefixing for other properties.
