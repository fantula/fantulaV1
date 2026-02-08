# Walkthrough: Performance Optimization

I have optimized the Product Detail page and Redemption Center for both PC and Mobile platforms to improve perceived performance and user experience.

## Changes

### 1. Product Detail Optimization

- **PC (`pages/pc/goods/[id].vue`)**:
  - Implemented `ProductDetailSkeleton.vue` for instant visual feedback.
  - Updated `useProductDetail` to use non-blocking (`lazy: true`) data fetching.
- **Mobile (`components/mobile/goods/ProductDetailSheet.vue`)**:
  - Integrated skeleton loader directly into the sheet.
  - Unblocked sheet opening animation by handling data fetching asynchronously with a loading state.

### 2. Redemption Center Optimization

- **PC (`pages/pc/profile/exchange.vue`)**:
  - Added a skeleton loading state to the coupon list.
  - The skeleton is displayed while the initial data is being fetched (`loading && displayList.length === 0`).
  - Improved the empty state and list rendering logic ensuring smooth transitions.

- **Mobile (`pages/mobile/profile/redemption/index.vue`)**:
  - Added a skeleton loader matching the mobile card design.
  - Integrated with `useInfiniteScroll` to show skeletons during the initial load.
  - Ensured the "Redeem" input card remains interactive/visible while the list loads.

### 3. Shared Improvements

- **Type Definitions**: Fixed `allow_addon` type error in `api.ts`.
- **Infinite Scroll Refinement**: Verified `useInfiniteScroll` composable works correctly with the new skeleton logic (loading state is shared).

## Verification Results

### PC
- **Product Detail**: Skeleton appears instantly on page load, then fades to content.
- **Redemption**: Visiting the "Exchange" tab in profile shows 3 skeleton cards before the actual coupons (or empty state) appear.

### Mobile
- **Product Detail**: Clicking a product opens the sheet with a skeleton layout immediately.
- **Redemption**: navigating to "Redemption Center" shows 4 skeleton cards in the list area while data fetches.

## Files Modified

- `composables/client/useProductDetail.ts`
- `pages/pc/goods/[id].vue`
- `components/pc/goods/ProductDetailSkeleton.vue`
- `components/mobile/goods/ProductDetailSheet.vue`
- `types/api.ts`
- `pages/pc/profile/exchange.vue`
- `pages/mobile/profile/redemption/index.vue`
