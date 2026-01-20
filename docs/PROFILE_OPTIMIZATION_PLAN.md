# Profile Main Content Optimization Plan

## 1. Design Concept: "The Workspace" (Sheer Glass)
Distinguish the right-side content from the left-side "Console".
- **Sidebar (Left)**: "Obsidian Glass" (Dark, Heavy, Control Panel). **Warm Tone (Orange/Gold)** active states.
- **Main Content (Right)**: "Sheer Glass" (Lighter, Translucent, Data Display). **Cool Tone (Cyan/Blue)** active states.

## 2. Global Standards Proposal

### 2.1 Buttons & Actions
- **Primary Action**: "Glass Pill" with Blue Gradient (`linear-gradient(90deg, #3B82F6, #06B6D4)`).
- **Secondary Action**: Transparent outline with subtle glow on hover.
- **Cards**: "Frosted Tiles" - `rgba(255, 255, 255, 0.03)` bg, `blur(16px)`, `border: 1px solid rgba(255,255,255,0.05)`. Hover effect: Lift + Glow.

### 2.2 Layout: "Hero Banner" Pattern
Instead of scattered lists, organize information into logical blocks.

#### A. Hero Banner (Top)
Integrate Avatar, Name, and Quick Stats into a wide "Profile Banner" at the top of the content area.
- *Background*: Subtle Mesh Gradient (Deep Blue/Purple) to frame the user info.
- *Content*: Avatar (Large), Nickname, User Tags/Badges.
- *Action*: "Edit Profile" button floating in this banner.

#### B. Info Grid (Middle)
3-Column Grid for data points:
- **UID Card**: Copyable, Monospace font.
- **Email Card**: Status indicator (Bound/Unbound).
- **Security Level**: Visual gauge (High/Medium/Low).

#### C. Command Center (Bottom)
Refine the existing "Account Management" grid.
- **Visuals**: Make cards taller, add larger transparent floating icons in the background of each card for depth.

## 3. Implementation Steps

### [MODIFY] `components/ProfilePersonalInfo.vue`
1. **Refactor HTML**:
   - Wrap top section in `.profile-banner`.
   - Create `.info-grid` for UID/Email.
   - Refine `.quick-actions`.
2. **Update CSS**:
   - Implement `Sheer Glass` styles.
   - Apply Blue/Cyan color palette for actions.

---
**Why this works**:
- **Contrast**: It creates a clear visual hierarchy. Dark Sidebar = Navigation; Lighter Content = Workspace.
- **Scalability**: The Grid system allows adding more modules (e.g., "Recent Orders", "Wallet") later easily.
