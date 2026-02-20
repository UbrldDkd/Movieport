# PLAN: Fix First Poster Jumping on Drag Start - READY TO IMPLEMENT

## Summary
Simple 1-line fix to prevent the first position item from jumping when dragging a filled PosterSlot.

## Target File
`frontend/src/pages/Profile/Settings/Tabs/ProfileTab/FavouritesSelection/handlers/useFavouritesHandlers.js`

## Exact Change

### Remove line 13 in `onDragStart` function:

**Current code (lines 8-14):**
```javascript
const onDragStart = (pos) => {
  dragState.setDraggedPos(pos);
  dragState.setDragOverPos(null);

  // Immediately remove from source slot logically
  positionState.setPreview(pos, null);  // ← DELETE THIS LINE
};
```

**After fix (lines 8-13):**
```javascript
const onDragStart = (pos) => {
  dragState.setDraggedPos(pos);
  dragState.setDragOverPos(null);
  // Preview will be calculated when hovering over a target (onDragOver)
};
```

## Why This Fixes It
- `setPreview(pos, null)` with `to=null` causes incorrect slot calculation
- The source slot already appears empty because `PosterSlot.jsx` hides `showItem` when `isDraggedHere` is true
- Removing this call prevents the premature/incorrect slot reordering on drag start

## Impact
- ✅ Fixes the jumping behavior
- ✅ No other files need changes
- ✅ Minimal, surgical fix

## Verification Checklist
After implementation, verify:
1. [ ] Dragging a filled slot no longer causes first poster to jump
2. [ ] Source slot appears empty during drag
3. [ ] Hovering over other slots shows correct preview
4. [ ] Drop and reorder works correctly
5. [ ] Empty slots can still accept drops

---