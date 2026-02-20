# Plan: Fix TypeError in handleRemoveItem

## Problem
Error: `Cannot read properties of undefined (reading 'items')` at `useListHandlers.js:65`

## Root Cause
In `useListHandlers.js` at line 65, the code tries to access `list.items` without checking if `list` exists:

```javascript
const inOriginal = list.items?.some((i) => i.tmdb_id === tmdb_id);
```

The line uses optional chaining (`?.`) on `items` but NOT on `list`, so if `list` is `undefined`, it throws an error.

## Solution

### File: `frontend/src/pages/List/EditList/handlers/useListHandlers.js`

**Line 65** - Add optional chaining to `list`:

**Before:**
```javascript
const inOriginal = list.items?.some((i) => i.tmdb_id === tmdb_id);
```

**After:**
```javascript
const inOriginal = list?.items?.some((i) => i.tmdb_id === tmdb_id);
```

## Why This Fixes It
- The `?` after `list` ensures that if `list` is `undefined` or `null`, the entire expression returns `undefined` instead of throwing an error
- This is consistent with the pattern used elsewhere in the file (e.g., line 37: `list?.[field]`)
- `const inOriginal` will be `undefined` if `list` doesn't exist, which means `inOriginal` will be falsy, so the condition `if (inOriginal)` won't execute (which is correct behavior)

## Testing
After applying this fix, the error should stop occurring when:
- Creating a new list (where `list` might not exist yet)
- Removing items from a list