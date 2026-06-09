# Implementation Fix Notes

**Fix Applied**:
1. Moved the `dismiss` function above the `useEffect` hook in `src/components/landing/CinematicIntro.tsx`.
2. Wrapped the `dismiss` function with `useCallback` to maintain a stable reference and prevent unnecessary re-renders or effect re-triggers.
3. Added `dismiss` to the dependency array of the `useEffect` hook to satisfy React's exhaustive-deps rule.
4. Imported `useCallback` from `"react"`.

**Code Changes**:
```tsx
import { useEffect, useState, useCallback } from "react";
// ...
const dismiss = useCallback(() => {
  setShow(false);
  try {
    window.sessionStorage.setItem(STORAGE_KEY, "1");
  } catch (e) {
    // ignore
  }
}, []);
// ...
useEffect(() => {
  // ...
  const timer = setTimeout(() => {
    dismiss();
  }, 2800);
  return () => clearTimeout(timer);
}, [shouldReduce, dismiss]);
```
