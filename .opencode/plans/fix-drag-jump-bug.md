# Plan: Fix Favourites Selection Drag Bug - First Position Item Jumping on Drag Start

## Problem Description
When a **filled PosterSlot** is dragged, the item in the first position immediately jumps to whichever position the dragged item is being moved from, as soon as the drag starts.

---

## Root Cause Analysis

### The Bug Location
**File:** `frontend/src/pages/Profile/Settings/Tabs/ProfileTab/FavouritesSelection/handlers/useFavouritesHandlers.js`

**Lines 8-14:**
```javascript
const onDragStart = (pos) => {
  dragState.setDraggedPos(pos);
  dragState.setDragOverPos(null);

  // Immediately remove from source slot logically
  positionState.setPreview(pos, null);  // ← BUG: to=null causes incorrect slot calculation
};
```

### Why This Causes the Bug

When `onDragStart` is called, it triggers `positionState.setPreview(pos, null)` where `to` (hover position) is `null`. This calls `calculatePreview(from, null)` in `usePositionState.js`:

**In `usePositionState.js`, `calculatePreview` (lines 17-58):**

1. **Removes the dragged item** (line 21-23): Creates `newItems` WITHOUT the dragged item
2. **Finds the dragged item** (line 25): Gets the dragged item from `items`
3. **With `to=null`, does NOT re-add dragged item** (line 29-30): Since `hoverPos ?? fromPos` would be `pos`, it DOES add the dragged item... BUT the logic below shifts other items incorrectly

**The actual issue (lines 32-48):**
```javascript
newItems.forEach((item) => {
  if (item === draggedClone) return;
  if (
    fromPos < hoverPos &&  // ← hoverPos is undefined, so this is fromPos < undefined = always FALSE
    item.position > fromPos &&
    item.position <= hoverPos
  ) {
    item.position -= 1;
  } else if (
    fromPos > hoverPos &&  // ← undefined is falsy, so if fromPos is 0, this is 0 > undefined. Comparisons with undefined are tricky
    item.position >= hoverPos &&
    item.position < fromPos
  ) {
    item.position += 1;
  }
});
```

When `to` is `null`, the conditions fail to work correctly because:
- `fromPos < hoverPos` becomes `number < undefined` → false
- `fromPos > hoverPos` becomes `number > undefined` → also problematic
- The shifting logic doesn't execute, so other items don't adjust

**Then in lines 51-55 (building slots):**
```javascript
const slots = new Array(slotCount).fill(null);
newItems.forEach((item) => {
  if (item.position >= 0 && item.position < slotCount)
    slots[item.position] = item;  // ← Items at position 0 might get overwritten
});
```

The issue is that when `calculatePreview(from, null)` is called, it's supposed to show the "drag in progress" state (empty slot at source position). But because of the undefined handling, items at position 0 can get misplaced.

---

## Solution Options

### Option 1: Don't call setPreview on drag start (RECOMMENDED)

**Why:** The preview should only be calculated when hovering over a target, not on drag start. On drag start, we should just mark the item as being dragged visually.

**File:** `frontend/src/pages/Profile/Settings/Tabs/ProfileTab/FavouritesSelection/handlers/useFavouritesHandlers.js`

**Change lines 8-14:**
```javascript
const onDragStart = (pos) => {
  dragState.setDraggedPos(pos);
  dragState.setDragOverPos(null);

  // Don't call setPreview on drag start - wait for onDragOver
  // The preview slot showing empty source position will be handled by UI logic
};
```

**Benefit:** Simpler, cleaner flow. Preview is only calculated when needed.

**Caveat:** The source slot might not show as empty immediately during drag. But `PosterSlot.jsx` already handles this with:
```javascript
const isDraggedHere = status.draggedPos === pos;
const showItem = item && !isDraggedHere;  // ← item won't show if dragged from here
```

So the source slot will appear empty anyway!

---

### Option 2: Fix calculatePreview to handle null/undefined properly

**File:** `frontend/src/pages/Profile/Settings/Tabs/ProfileTab/FavouritesSelection/handlers/usePositionState.js`

**Add a check at the top of `calculatePreview`:**
```javascript
const calculatePreview = (fromPos, hoverPos) => {
  // If no hover position, just show source as empty (don't shift items)
  if (hoverPos === null || hoverPos === undefined) {
    const newItems = items.filter((item) => item.position !== fromPos);
    return getSlots(newItems);  // Source slot will be null
  }

  // ... rest of existing logic
```

**Benefit:** Handles edge case explicitly.

**Caveat:** Still creates unnecessary computation on drag start.

---

### Option 3: Separate "drag start preview" from hover preview

Create a separate function that only removes the source item without shifting.

**Benefit:** More explicit control.

**Caveat:** More code complexity, another function to maintain.

---

## Recommendation

**Option 1 is the best solution** because:

1. **Simpler:** Remove one function call, reduce complexity
2. **Already handled visually:** `PosterSlot.jsx` already hides the dragged item
3. **More performant:** No unnecessary slot calculation on drag start
4. **Clearer intent:** Preview should only exist when there's something to preview (hovering over target)

The `PosterSlot` component already makes the source slot appear empty by checking:
```javascript
const showItem = item && !isDraggedHere;
```

So we don't need `setPreview(pos, null)` to make the source slot empty - it already is!

---

## Implementation Steps

1. **Remove `setPreview(pos, null)` call** from `onDragStart` in `useFavouritesHandlers.js`
2. **Test the drag behavior** to ensure:
   - Drag starts without jumping
   - Source slot appears empty
   - Hover preview works correctly
   - Drop and reorder work as expected

---

## Related Files to Review

| File | Status |
|------|--------|
| `useFavouritesHandlers.js` | ✅ Needs minimal change (remove 1 line) |
| `usePositionState.js` | ✅ No changes needed |
| `PosterSlot.jsx` | ✅ Already handles visual empty slot correctly |
| `FavouritesSelection.jsx` | ✅ No changes needed |