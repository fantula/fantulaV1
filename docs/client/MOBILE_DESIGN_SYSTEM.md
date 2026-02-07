# Mobile Client Design System (Liquid Metal)

> **Version**: 1.0 | **Theme**: Aurora Dark (Liquid Metal)
> **Goal**: Unify mobile UI with a premium, glassmorphism-heavy aesthetic.

## 1. Color System

### Primary (Brand Blue)
- **Base**: `#178fc6` (Sky Blue)
- **Gradient**: `linear-gradient(135deg, #178fc6 0%, #0c6a96 100%)`
- **Glow**: `box-shadow: 0 4px 15px rgba(23, 143, 198, 0.4)`

### Accent (Conversion Orange)
- **Base**: `#F97316` (Vibrant Orange)
- **Gradient**: `linear-gradient(135deg, #F97316 0%, #EA580C 100%)`
- **Glow**: `box-shadow: 0 4px 15px rgba(249, 115, 22, 0.4)`

### Cyber (Tech Cyan)
- **Base**: `#06B6D4`
- **Gradient**: `linear-gradient(135deg, #22D3EE 0%, #0891B2 100%)`

### Backgrounds
- **Deep Space**: `#020617` (Slate 950) - *Standard Page Background*
- **Glass Panel**: `rgba(15, 23, 42, 0.6)` - *Standard Card*
- **Deep Glass**: `rgba(15, 23, 42, 0.95)` - *Modals / Popups*

---

## 2. Button System (`.btn-mobile-*`)

All buttons use the "Squircle" shape (`border-radius: 14px`) and integrated glow.

### Primary Button
**Class**: `.btn-mobile-primary`
**Use**: Main actions (Login, Submit, Confirm)
```css
.btn-mobile-primary {
  background: linear-gradient(135deg, #178fc6 0%, #0c6a96 100%);
  color: #fff;
  box-shadow: 0 4px 15px rgba(23, 143, 198, 0.4);
}
```

### Accent Button
**Class**: `.btn-mobile-accent`
**Use**: High-conversion actions (Buy Now, Checkout)
```css
.btn-mobile-accent {
  background: linear-gradient(135deg, #F97316 0%, #EA580C 100%);
  color: #fff;
  box-shadow: 0 4px 15px rgba(249, 115, 22, 0.4);
}
```

### Ghost Button
**Class**: `.btn-mobile-ghost`
**Use**: Secondary actions (Cancel, Back)
```css
.btn-mobile-ghost {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #cbd5e1;
}
```

---

## 3. Glassmorphism Utilities

### Standard Card (`.glass-card`)
- **Blur**: `12px`
- **Opacity**: `0.6`
- **Border**: `1px solid rgba(56, 189, 248, 0.1)`

### Popup / Modal (`.glass-panel-deep`)
- **Blur**: `24px`
- **Opacity**: `0.95`
- **Shadow**: `0 16px 40px rgba(0, 0, 0, 0.6)`
