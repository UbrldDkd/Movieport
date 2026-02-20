# Plan: Fix Parameter Name Mismatch - itemsToRemove not updating

## Root Cause Analysis

### Problem
Items are not being added to `itemsToRemove` when `handleRemoveItem` is called.

### Why It Happens
**Parameter name mismatch** between the component and the hook:

**In `EditList.jsx` (line 69):**
```javascript
} = useListHandlers({
  originalList,  // ← passed as "originalList"
  ...
});
```

**In `useListHandlers.js` (line 12):**
```javascript
export function useListHandlers({
  username,
  list,  // ← expects "list"
  ...
});
```

**Result:** `list` is `undefined` in `handleRemoveItem` because the parameter name doesn't match. This causes line 65 to fail silently:
```javascript
const inOriginal = list.items?.some((i) => i.tmdb_id === tmdb_id);
// list is undefined, so inOriginal is undefined (falsy)
// The condition `if (inOriginal)` on line 70 never executes
// So items never get added to itemsToRemove
```

---

## Solution Options

### Option 1: Fix the call site (RECOMMENDED)
Change `EditList.jsx` to match the expected parameter name:

**File:** `frontend/src/pages/List/EditList/EditList.jsx`, line 69

**Before:**
```javascript
} = useListHandlers({
  originalList,
  ...
});
```

**After:**
```javascript
} = useListHandlers({
  list: originalList,  // ← explicitly map to "list"
  ...
});
```

**Why this is preferred:**
- The hook parameter name `list` makes sense semantically
- Less code to change (single line in one file)
- Keeps the hook's interface clean

---

### Option 2: Change the hook parameters
Rename `list` to `originalList` in `useListHandlers.js`:

**Changes needed:**
1. Line 12: `list` → `originalList`
2. Line 37: `list?.[field]` → `originalList?.[field]`
3. Line 65: `list.items` → `originalList.items`
4. Line 154: `setNewList(list)` → `setNewList(originalList)`

**Why this is NOT recommended:**
- Changes 4 locations in the hook
- More room for mistakes
- The hook would need to expect `originalList` even for create mode (where it's null)

---

## Additional Issue to Fix

While investigating, I noticed line 65 also needs the fix from the previous plan:

**In `useListHandlers.js` line 65:**
**Before:** `const inOriginal = list.items?.some((i) => i.tmdb_id === tmdb_id);`
**After:** `const inOriginal = list?.items?.some((i) => i.tmdb_id === tmdb_id);`

This adds protection against undefined `list` as well, which would occur with the current bug until Option 1 is applied.

---

## Recommendation
**Apply Option 1** (fix the call site in `EditList.jsx`) as it's simpler and clearer.

After fixing the parameter name, line 65 should still get the optional chaining fix from the previous plan as a defense-in-depth measure.