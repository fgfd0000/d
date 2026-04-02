# 🎨 Quick UI Reference Card

## Color Palette Quick Reference

### Primary Colors
```
Brand Primary:     #5577ff (Main CTA, highlights)
Brand Dark:        #1a2563 (Secondary accents)
```

### Backgrounds (Dark Mode)
```
Page:              #030712 (Body background)
Cards/Surfaces:    #111827 (Component background)
Hover States:      #1f2937 (Interactive elements)
Elevated/Modal:    #2d3f50 (Top-level elements)
```

### Text (Dark Mode)
```
Primary:           #f9fafb (Main text)
Secondary:         #d1d5db (Labels, hints)
Tertiary:          #9ca3af (Disabled, meta)
```

### Semantic
```
Success:           #10b981 ✓
Warning:           #f59e0b ⚠️
Error:             #ef4444 ✕
Info:              #3b82f6 ℹ️
```

## Spacing Scale

```
0:   0px      (no space)
1:   4px      (tiny gaps)
2:   8px      (spacing between elements)
3:   12px     (small padding)
4:   16px     (standard padding)
5:   20px     (large padding)
6:   24px     (section spacing)
8:   32px     (major spacing)
10:  40px
12:  48px
16:  64px
20:  80px
24:  96px
```

## Border Radius

```
none:   0px      (sharp corners)
sm:     4px      (subtle)
base:   6px      (buttons)
md:     8px      (cards)
lg:     12px     (larger elements)
xl:     16px     (modals, panels)
2xl:    20px     (extra large)
full:   9999px   (pills, circles)
```

## Font Sizes

```
xs:   12px  (captions)
sm:   14px  (labels)
base: 16px  (body)
lg:   18px  (subheadings)
xl:   20px  (small headings)
2xl:  24px  (headings)
3xl:  30px  (large headings)
4xl:  36px  (page titles)
```

## Font Weights

```
Light:     300  (subtle text)
Normal:    400  (body text)
Medium:    500  (labels)
Semibold:  600  (headings)
Bold:      700  (strong emphasis)
Extrabold: 800  (max emphasis)
```

## Shadow Levels

```
sm:    Subtle hover effects
base:  Default cards
md:    Elevated cards, hover states
lg:    Floating elements
xl:    Modals, dropdowns
2xl:   Maximum elevation
```

## Animation Timing

```
fast:  150ms  (quick interactions)
base:  250ms  (standard transitions)
slow:  350ms  (smooth movements)
```

## Component Quick Reference

### Button Variants
```jsx
primary   - Brand color, main CTAs
secondary - Alternative actions
ghost     - Subtle actions
danger    - Destructive actions (red)
success   - Positive actions (green)
```

### Button Sizes
```jsx
sm  - 6px 12px, 12px text (small buttons)
md  - 10px 16px, 14px text (standard)
lg  - 12px 20px, 16px text (large)
xl  - 14px 24px, 16px text (extra large)
```

### Badge Variants
```jsx
default   - Neutral gray
primary   - Brand blue
success   - Green
warning   - Amber
error     - Red
```

### Alert Types
```jsx
info      - Blue (ℹ️ information)
success   - Green (✓ positive)
warning   - Amber (⚠️ caution)
error     - Red (✕ problem)
```

## Common Patterns

### Dashboard Grid
```jsx
display: 'grid'
gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'
gap: spacing[6]
```

### 2-Column Layout
```jsx
display: 'grid'
gridTemplateColumns: '1fr 1fr'
gap: spacing[6]
/* Mobile fallback */
@media (max-width: 768px) {
  gridTemplateColumns: '1fr'
}
```

### Flex Row
```jsx
display: 'flex'
gap: spacing[4]
alignItems: 'center'
justifyContent: 'space-between'
```

### Full Width Container
```jsx
maxWidth: '1400px'
margin: '0 auto'
padding: `0 ${spacing[4]}`
```

## Theme Hook Usage

```jsx
const { theme, isDarkMode, toggleTheme } = useTheme();

// Apply colors
style={{ 
  background: theme.background.primary,
  color: theme.text.primary,
  border: `1px solid ${theme.border.medium}`
}}

// Toggle theme
onClick={() => toggleTheme()}
```

## Responsive Breakpoints

```
Mobile:    < 480px
Tablet:    480px - 768px
Desktop:   768px - 1024px
Wide:      1024px - 1280px
Ultra:     > 1280px
```

## Accessibility Checklist

- [ ] Text contrast > 4.5:1
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Semantic HTML used
- [ ] ARIA labels present
- [ ] Color not only indicator
- [ ] Animations can be disabled
- [ ] Error messages clear

## Common Component Props

### Button
```jsx
<Button
  variant="primary|secondary|ghost|danger|success"
  size="sm|md|lg|xl"
  disabled={boolean}
  loading={boolean}
  onClick={handler}
>
  Text
</Button>
```

### Input
```jsx
<Input
  label="Label"
  type="text|email|password|tel"
  placeholder="Hint text"
  value={value}
  onChange={handler}
  error={hasError}
  errorMessage="Error text"
  disabled={boolean}
/>
```

### Card
```jsx
<Card elevated={boolean}>
  Content
</Card>
```

### Badge
```jsx
<Badge variant="default|primary|success|warning|error">
  Text
</Badge>
```

### Alert
```jsx
<Alert
  type="info|success|warning|error"
  title="Optional Title"
  message="Message text"
  onClose={handler}
/>
```

### Modal
```jsx
<Modal
  isOpen={boolean}
  title="Title"
  onClose={handler}
  actions={[
    <Button key="1">Action</Button>
  ]}
>
  Content
</Modal>
```

## Import Statements

```javascript
// Theme and Provider
import { useTheme } from './ThemeProvider';
import { ThemeProvider } from './ThemeProvider';

// Components
import { 
  Button, Card, Input, Badge, Alert, 
  Spinner, Modal, Table 
} from './components';

// Design Tokens
import { 
  spacing, borderRadius, shadows, 
  transitions, animations, colors 
} from './theme';
```

## File Locations

```
Frontend System Files:
- theme.js                    (Design tokens)
- ThemeProvider.jsx           (Theme context)
- components.jsx              (Component library)

Dashboard Pages:
- ModernAuthLoginPage.jsx     (Login)
- ModernSignUp.jsx            (Registration)
- ModernCompanyDashboard.jsx  (Company page)
- ModernDriverDashboard.jsx   (Driver page)

Configuration:
- App.js                      (Main app)
- index.css                   (Global styles)
- AuthContext.js              (Existing auth)
- api.js                      (Existing API)

Documentation:
- DESIGN_SYSTEM.md            (Complete guide)
- MODERN_UI_GUIDE.md          (Implementation)
```

## Troubleshooting Quick Tips

| Issue | Solution |
|-------|----------|
| Colors wrong | Check `useTheme()` hook usage |
| Theme not saving | Check localStorage not disabled |
| Animations jerky | Check GPU acceleration enabled |
| Text hard to read | Verify 4.5:1 contrast ratio |
| Mobile looks broken | Test with proper viewport meta tag |
| Components don't style | Ensure theme provider wraps app |
| Dark mode not default | Check ThemeProvider default value |

## Animation Easing Reference

```
ease-in-out:  Natural, smooth (most used)
ease-out:     Quick start, slow finish (entrances)
ease-in:      Slow start, quick finish (exits)
linear:       Constant speed (rotations)
cubic-bezier: Custom timing
```

## Performance Tips

✅ **DO:**
- Use CSS transforms for animations
- Use opacity for fading
- Keep animations < 300ms
- Use GPU-accelerated properties
- Memoize theme context consumers
- Cache theme values

❌ **DON'T:**
- Animate dimensions (width, height)
- Animate position (use transform instead)
- Create new object/array on every render
- Use setTimeout for theme changes
- Change theme in render method
- Create inline styles in loops

## Deployment Checklist

- [ ] Dark mode works correctly
- [ ] Light mode displays properly
- [ ] All colors have sufficient contrast
- [ ] Animations smooth on all devices
- [ ] Responsive on mobile (< 480px)
- [ ] Touch targets > 44px (mobile)
- [ ] Keyboard navigation works
- [ ] No console errors
- [ ] Assets optimized
- [ ] Performance metrics pass

## Quick Component Copy-Paste

### Basic Card Container
```jsx
<Card elevated>
  <h2>Title</h2>
  <p>Content here</p>
</Card>
```

### Form with Validation
```jsx
<Input
  label="Email"
  type="email"
  error={!!errors.email}
  errorMessage={errors.email}
  value={formData.email}
  onChange={(e) => setFormData({...formData, email: e.target.value})}
/>
```

### Success Alert
```jsx
<Alert
  type="success"
  title="Success"
  message="Operation completed successfully"
  onClose={() => setShowAlert(false)}
/>
```

### Stats Grid
```jsx
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: spacing[6]
}}>
  {stats.map(stat => (
    <Card key={stat.id} elevated>
      <p style={{color: theme.text.secondary}}>{stat.label}</p>
      <h3 style={{fontSize: '32px', color: theme.primary}}>
        {stat.value}
      </h3>
    </Card>
  ))}
</div>
```

---

**Keep this card handy for quick reference!** 🚀
