# Design System

## Principles
Premium, restrained, technical, readable. Solid colors only. No gradients, glassmorphism, purple/blue glow, fake dashboards, or decorative AI imagery. Use real project screenshots only after the owner approves them.

## Palette tokens
Black/white base with one accent: warm orange. Shades are proposed tokens; verify WCAG AA contrast for actual foreground/background pairings before release.

```css
:root {
  --background-50: #ffffff;
  --background-100: #f8f8f8;
  --background-200: #eeeeee;
  --background-500: #a3a3a3;
  --background-900: #171717;

  --surface-50: #ffffff;
  --surface-100: #fafafa;
  --surface-200: #f2f2f2;
  --surface-500: #737373;
  --surface-900: #202020;

  --border-50: #f5f5f5;
  --border-100: #e5e5e5;
  --border-200: #d4d4d4;
  --border-500: #737373;
  --border-900: #404040;

  --text-primary-50: #ffffff;
  --text-primary-100: #f5f5f5;
  --text-primary-200: #e5e5e5;
  --text-primary-500: #737373;
  --text-primary-900: #171717;

  --text-secondary-50: #fafafa;
  --text-secondary-100: #f5f5f5;
  --text-secondary-200: #e5e5e5;
  --text-secondary-500: #666666;
  --text-secondary-900: #404040;

  --accent-50: #fff7ed;
  --accent-100: #ffedd5;
  --accent-200: #fed7aa;
  --accent-500: #f97316;
  --accent-900: #7c2d12;

  --success-50: #f0fdf4;
  --success-100: #dcfce7;
  --success-200: #bbf7d0;
  --success-500: #16a34a;
  --success-900: #14532d;

  --warning-50: #fffbeb;
  --warning-100: #fef3c7;
  --warning-200: #fde68a;
  --warning-500: #d97706;
  --warning-900: #78350f;

  --danger-50: #fef2f2;
  --danger-100: #fee2e2;
  --danger-200: #fecaca;
  --danger-500: #dc2626;
  --danger-900: #7f1d1d;
}
[data-theme="dark"] {
  --background-50: #171717;
  --background-100: #202020;
  --background-200: #262626;
  --background-500: #737373;
  --background-900: #ffffff;

  --surface-50: #202020;
  --surface-100: #262626;
  --surface-200: #303030;
  --surface-500: #a3a3a3;
  --surface-900: #ffffff;

  --border-50: #262626;
  --border-100: #333333;
  --border-200: #404040;
  --border-500: #737373;
  --border-900: #d4d4d4;

  --text-primary-50: #171717;
  --text-primary-100: #262626;
  --text-primary-200: #404040;
  --text-primary-500: #b3b3b3;
  --text-primary-900: #fafafa;

  --text-secondary-50: #202020;
  --text-secondary-100: #303030;
  --text-secondary-200: #404040;
  --text-secondary-500: #a3a3a3;
  --text-secondary-900: #d4d4d4;

  --accent-50: #431407;
  --accent-100: #7c2d12;
  --accent-200: #9a3412;
  --accent-500: #fb923c;
  --accent-900: #fff7ed;

  --success-50: #052e16;
  --success-100: #14532d;
  --success-200: #166534;
  --success-500: #4ade80;
  --success-900: #f0fdf4;

  --warning-50: #451a03;
  --warning-100: #78350f;
  --warning-200: #92400e;
  --warning-500: #fbbf24;
  --warning-900: #fffbeb;

  --danger-50: #450a0a;
  --danger-100: #7f1d1d;
  --danger-200: #991b1b;
  --danger-500: #f87171;
  --danger-900: #fef2f2;
}
```

Token shades represent semantic roles and must not be used blindly as text/background pairs. Check actual pair contrast before release.

## Shadows
```css
:root {
  --shadow-sm: 0 1px 2px rgb(0 0 0 / 0.06);
  --shadow-md: 0 4px 10px rgb(0 0 0 / 0.08);
  --shadow-lg: 0 12px 28px rgb(0 0 0 / 0.10);
  --shadow-xl: 0 24px 48px rgb(0 0 0 / 0.14);
}
```

## Typography
- Font stack: `Helvetica Neue, Helvetica, Arial, sans-serif`.
- Rationale: no font download/license dependency, strong system-font performance. Use system fonts first; Inter/Geist only if a verified visual need justifies self-hosting.
- Scale: 12, 14, 16, 18, 20, 24, 30, 36, 48, 60px.
- Weights: 400 body, 500 emphasis, 600 headings, 700 rare emphasis.
- Line heights: 1.25 headings, 1.5 body, 1.65 long-form articles.

## Spacing, radius, breakpoints
- 4px base scale: `1=4`, `2=8`, `3=12`, `4=16`, `5=20`, `6=24`, `8=32`, `10=40`, `12=48`, `16=64`, `20=80`, `24=96`.
- Radius: 4, 8, 12, 16, 9999px (pill only where useful).
- Breakpoints: 480px, 768px, 1024px, 1280px.
- Grid: 12 columns desktop, 8 tablet, 4 mobile; max content width 1200px; readable article width 68ch.
- Motion: short transitions (120–220ms); honor `prefers-reduced-motion`.

## Icons
Use **Lucide** only. Do not mix icon libraries or use emojis as UI icons.

## Component state requirements
| Component | Required states |
|---|---|
| Button | default, hover, focus-visible, disabled, loading |
| Input | default, hover, focus, invalid, disabled |
| Card | default, hover, focus-within |
| Modal | open, closed, focus trap, Escape close |
| Toast | success, error, info, dismissible |
| Table | responsive overflow, empty |
| Nav | desktop, mobile, current route, keyboard focus |
| Empty state | useful explanation + next action |
| Skeleton | shape-matched, reduced-motion safe |
| Error state | clear message + retry/contact option |

## Accessibility
- WCAG AA contrast (4.5:1 normal text, 3:1 large text/UI where applicable).
- Visible focus ring, keyboard navigation, skip-to-content, semantic headings, descriptive link labels, meaningful alt text.
- Form labels and errors associated programmatically; announce submission status to assistive technology.
- Do not use color alone to communicate status.

## Tailwind snippet (planned)
```ts
// Tailwind config concept; adapt to the installed Tailwind version.
theme: {
  extend: {
    colors: {
      background: "var(--background-100)",
      surface: "var(--surface-100)",
      border: "var(--border-200)",
      foreground: "var(--text-primary-900)",
      muted: "var(--text-secondary-500)",
      accent: "var(--accent-500)",
      success: "var(--success-500)",
      warning: "var(--warning-500)",
      danger: "var(--danger-500)"
    },
    boxShadow: {
      sm: "var(--shadow-sm)",
      md: "var(--shadow-md)",
      lg: "var(--shadow-lg)",
      xl: "var(--shadow-xl)"
    }
  }
}
```
