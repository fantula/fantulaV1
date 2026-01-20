# Wallet Page Optimization Plan

## 1. Design Gap Analysis
Current State vs. New "Sheer Workspace" Standard:
- **Backgrounds**: Currently uses heavy `#0F172A` backgrounds. -> **Goal**: Use `rgba(255, 255, 255, 0.03)` (Glass Tiles).
- **Master Card**: Too dense and dark. -> **Goal**: "Aurora Hero Card" (Light Mesh Gradient).
- **List Identity**: "Ledger" looks like a separate dark box. -> **Goal**: Integrate into the workspace flow.

## 2. Optimization Proposal

### A. Hero Section: "The Asset Core"
Create a visually stunning "Credit Card" style hero section.
- **Background**: `linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(6, 182, 212, 0.1))` + Mesh Blur.
- **Typography**: Large `Outfit` font for Balance.
- **Action**: "Purchase Quota" button as a **Neon Gradient Pill** (Orange/Amber) to drive conversion.

### B. Transaction History: "The Glass Stream"
Replace the heavy container with a clean list.
- **Tabs**: Floating "Pill Tabs" (All / Income / Expense).
- **List Items**:
  - **Income**: Highlight with Orange/Gold glow.
  - **Expense**: Subtle Blue/Slate.
  - **Hover**: Lift effect (`translateY(-2px)`).

### C. Details
- **Icons**: Use large background icons (watermarks) for depth.
- **Animations**: `fadeInUp` for list items.

## 3. Implementation Steps
1. **Refactor `wallet.vue`**:
   - Remove `.asset-master-card` heavy styles.
   - Implement `glass-tile` and `hero-banner` classes.
2. **Apply Premium Modals**:
   - Ensure `WalletRechargeModal` uses the new `BaseModal` standard.
