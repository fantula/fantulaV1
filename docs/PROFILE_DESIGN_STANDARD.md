# Profile Design Standard (v2.0 - Premium Glass)

## 1. Core Philosophy: "The Dual Glass System"
The profile interface is divided into two distinct visual zones to establish hierarchy and depth.

### A. Left Zone: "The Obsidian Console" (Navigation)
- **Role**: Command & Control.
- **Visuals**: Dark, Heavy, Grounded.
- **Background**: `rgba(10, 15, 30, 0.85)` + `backdrop-filter: blur(24px)`.
- **Active State**: **Warm (Orange/Gold)**. `linear-gradient(90deg, #F97316, #EA580C)`.
- **Interaction**: High friction, solid clicks.

### B. Right Zone: "The Sheer Workspace" (Content)
- **Role**: Data Display & Operations.
- **Visuals**: Light, Airy, Precise.
- **Background**: Transparent frame `rgba(30, 41, 59, 0.3)` + `blur(16px)`.
- **Active State**: **Cool (Cyan/Blue)**. `linear-gradient(135deg, #3B82F6, #06B6D4)`.
- **Interaction**: Float, Lift, Glow.

---

## 2. Component Standards

### 2.1 Buttons
- **Primary Action**: "Glass Pill" with Gradient.
  - *Gradient*: `linear-gradient(90deg, #06B6D4, #3B82F6)` (Blue) or `#F59E0B` (Orange).
  - *Shape*: Fully rounded `100px`.
  - *Hover*: Lift (-1px) + Glow Shadow.
- **Secondary Action**: Transparent outline + Icon.
  - *Border*: `1px solid rgba(255,255,255,0.1)`.

### 2.2 Cards & Tiles
- **Glass Tile**:
  - *Bg*: `rgba(255, 255, 255, 0.03)`.
  - *Border*: `1px solid rgba(255, 255, 255, 0.06)`.
  - *Radius*: `16px`.
  - *Decoration*: Large, faint background icon (`opacity: 0.03`) rotated at corners.
- **Hover**: Lift (-2px), Border brightens, Shadow deepens.

### 2.3 Modals (Premium Container)
- **Container**: Deep Glass (`blur(30px)`), Double Border (Highlight/Shadow), `radius: 28px`.
- **Input Fields**: Glass background -> Neon Blue Glow on focus.
- **Transitions**: Scale up (0.9 -> 1.0) + Fade In.

---

## 3. Layout Patterns

### 3.1 The Hero Banner (Top)
- **Usage**: Leading section of a workspace page.
- **Style**: Full width, "Aurora" Mesh Gradient background (low opacity).
- **Content**: Large Avatar/Icon, Title, Key Status Tags.

### 3.2 The Info Grid (Middle)
- **Usage**: Displaying 3-4 key data points (Balance, Points, Level).
- **Style**: `display: grid; grid-template-columns: repeat(3, 1fr)`.

### 3.3 The Command Center (Bottom)
- **Usage**: Actionable navigation or settings.
- **Style**: Large Cards (`min-height: 100px`) with icon frames.
