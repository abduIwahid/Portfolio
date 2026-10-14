# Design System

## Direction
Retain the existing portfolio's recognizable identity while simplifying new or modified UI. The current page uses dark styling, bright accent effects, external fonts, and substantial inline CSS; new UI must follow the token rules below. Existing styles should be migrated incrementally, not replaced blindly.

## Color tokens
Solid colors only for new UI. No gradients, glassmorphism, or purple/blue glow palettes. Base: near-black/white with one accent (teal).

| Token | Shades 50 / 100 / 200 / 300 / 400 / 500 / 600 / 700 / 800 / 900 |
|---|---|
| background | `#FFFFFF`, `#F8FAFC`, `#F1F5F9`, `#E2E8F0`, `#CBD5E1`, `#94A3B8`, `#64748B`, `#475569`, `#1E293B`, `#0B0F14` |
| surface | `#FFFFFF`, `#FAFAFA`, `#F4F4F5`, `#E4E4E7`, `#D4D4D8`, `#A1A1AA`, `#71717A`, `#52525B`, `#27272A`, `#18181B` |
| border | `#FAFAFA`, `#F4F4F5`, `#E4E4E7`, `#D4D4D8`, `#A1A1AA`, `#71717A`, `#52525B`, `#3F3F46`, `#27272A`, `#18181B` |
| text-primary | `#FFFFFF`, `#FAFAFA`, `#F4F4F5`, `#E4E4E7`, `#D4D4D8`, `#A1A1AA`, `#71717A`, `#52525B`, `#27272A`, `#09090B` |
| text-secondary | `#FFFFFF`, `#F8FAFC`, `#F1F5F9`, `#E2E8F0`, `#CBD5E1`, `#94A3B8`, `#64748B`, `#475569`, `#334155`, `#1E293B` |
| accent | `#F0FDFA`, `#CCFBF1`, `#99F6E4`, `#5EEAD4`, `#2DD4BF`, `#14B8A6`, `#0D9488`, `#0F766E`, `#115E59`, `#134E4A` |
| success | `#F0FDF4`, `#DCFCE7`, `#BBF7D0`, `#86EFAC`, `#4ADE80`, `#22C55E`, `#16A34A`, `#15803D`, `#166534`, `#14532D` |
| warning | `#FFFBEB`, `#FEF3C7`, `#FDE68A`, `#FCD34D`, `#FBBF24`, `#F59E0B`, `#D97706`, `#B45309`, `#92400E`, `#78350F` |
| danger | `#FEF2F2`, `#FEE2E2`, `#FECACA`, `#FCA5A5`, `#F87171`, `#EF4444`, `#DC2626`, `#B91C1C`, `#991B1B`, `#7F1D1D` |

## CSS variables
```css
:root {
  --color-background: #0B0F14;
  --color-surface: #18181B;
  --color-border: #3F3F46;
  --color-text-primary: #FAFAFA;
  --color-text-secondary: #A1A1AA;
  --color-accent: #14B8A6;
  --color-success: #22C55E;
  --color-warning: #F59E0B;
  --color-danger: #EF4444;
  --shadow-sm: 0 1px 2px rgb(0 0 0 / 0.12);
  --shadow-md: 0 4px 8px rgb(0 0 0 / 0.16);
  --shadow-lg: 0 12px 24px rgb(0 0 0 / 0.2);
  --shadow-xl: 0 20px 40px rgb(0 0 0 / 0.24);
}
```

## Tailwind snippet (reference only; Tailwind is not currently installed)
```js
module.exports = {
  theme: {
    extend: {
      colors: {
        background: '#0B0F14', surface: '#18181B', border: '#3F3F46',
        'text-primary': '#FAFAFA', 'text-secondary': '#A1A1AA',
        accent: '#14B8A6', success: '#22C55E', warning: '#F59E0B',
        danger: '#EF4444'
      },
      boxShadow: {
        sm: '0 1px 2px rgb(0 0 0 / .12)',
        md: '0 4px 8px rgb(0 0 0 / .16)',
        lg: '0 12px 24px rgb(0 0 0 / .2)',
        xl: '0 20px 40px rgb(0 0 0 / .24)'
      }
    }
  }
}
```

## Typography
- Stack: `Helvetica Neue, Helvetica, Arial, sans-serif` for fast system rendering and no font dependency. Existing external fonts may remain until intentionally migrated.
- Scale: 12, 14, 16, 18, 20, 24, 32, 40, 48, 64px.
- Weights: 400 body, 500 medium, 600 headings, 700 emphasis.
- Line heights: 1.25 headings; 1.5 body; 1.6 long-form articles.

## Layout tokens
- Spacing: 4px base; `4, 8, 12, 16, 24, 32, 40, 48, 64, 80`.
- Radius: `4, 8, 12, 16, 999px` (pill only when justified).
- Breakpoints: 360, 640, 768, 1024, 1280px.
- Grid: content max-width 1120px; article max-width 720px; 12-column desktop grid, 4-column mobile grid.
- Shadows only for depth; do not use glow as a substitute for contrast.

## Icon library
Lucide is the selected icon set for any future additions. Current site uses external Font Awesome assets; replacing it requires review and should not add another icon library.

## Component states
- Button: default, hover, visible keyboard focus, disabled, loading.
- Input: default, hover, focus, invalid, disabled.
- Card: default, hover only if clickable, focus if interactive.
- Modal: open/closed, keyboard focus management, Escape behavior.
- Toast: success, warning, danger; announced accessibly.
- Table: responsive overflow strategy and semantic headers.
- Nav: active, hover, focus, collapsed mobile menu.
- Empty state: concise explanation and useful next action.
- Skeleton: only for content with genuine asynchronous loading.
- Error state: clear message and retry/fallback where appropriate.

## Accessibility
Target WCAG AA contrast; visible focus; keyboard operation; meaningful alt text; reduced motion; don't rely on color alone. Verify contrast for actual token pairings before release.
