# Sidebar Collapse Persistence Feature

## Overview
The sidebar now has persistent collapse/expand state that works seamlessly with responsive design.

## Features

### 1. **localStorage Persistence**
- User's sidebar preference (collapsed/expanded) is saved to localStorage
- Preference persists across browser sessions
- Storage key: `sidebar-collapsed`

### 2. **Responsive Behavior**
- **Mobile (< 768px)**: Sidebar automatically collapses
- **Desktop (≥ 768px)**: Sidebar respects user's saved preference

### 3. **Smart Resize Handling**
- Window resize events are handled intelligently
- On mobile → desktop transition: Restores user preference
- On desktop → mobile transition: Auto-collapses
- User preference is only saved when manually toggling on desktop

## Implementation

### Hook: `useSidenavCollapseStore`
Located at: `/src/hooks/useSidenavCollapseStore.ts`

```typescript
const { collapsed, setCollapsed, userPreference, setUserPreference } = useSidenavCollapseStore();
```

**Returns:**
- `collapsed`: Current collapse state (boolean)
- `setCollapsed`: Function to toggle sidebar (also saves preference on desktop)
- `userPreference`: User's saved preference from localStorage (boolean | null)
- `setUserPreference`: Function to manually update preference

### Usage
The hook is already integrated into:
- `/src/App.tsx` - Main application layout
- `/src/components/Layout.tsx` - AppLayout component

Both use the same hook instance, ensuring consistent state across the application.

## How It Works

1. **Initial Load**
   - Checks localStorage for saved preference
   - Checks screen size
   - If mobile: collapses regardless of preference
   - If desktop: uses saved preference or defaults to expanded

2. **User Toggle**
   - User clicks collapse/expand button
   - State updates immediately
   - If on desktop: preference is saved to localStorage
   - If on mobile: state changes but preference is not saved

3. **Window Resize**
   - Resize event listener monitors screen size changes
   - Crossing mobile breakpoint triggers appropriate behavior
   - Desktop: restores saved preference
   - Mobile: forces collapse

## Customization

### Change Mobile Breakpoint
Edit `MOBILE_BREAKPOINT` constant in `useSidenavCollapseStore.ts`:
```typescript
const MOBILE_BREAKPOINT = 768; // Change this value
```

### Change Storage Key
Edit `STORAGE_KEY` constant in `useSidenavCollapseStore.ts`:
```typescript
const STORAGE_KEY = 'sidebar-collapsed'; // Change this value
```

## Benefits

✅ User preference is remembered across sessions  
✅ Responsive design works automatically  
✅ No conflicts between resize and manual toggle  
✅ Clean separation of concerns  
✅ Type-safe implementation  
✅ Error handling for localStorage failures  

## Troubleshooting

**Preference not saving?**
- Check browser console for localStorage errors
- Ensure browser allows localStorage
- Check if in private/incognito mode

**Sidebar not responding to resize?**
- Check if breakpoint value matches your CSS
- Verify resize event listener is attached
- Check browser console for errors
