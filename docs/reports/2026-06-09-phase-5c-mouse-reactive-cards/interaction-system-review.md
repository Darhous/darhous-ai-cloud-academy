# Interaction System Review

The new interactive pattern offers three features:

1. **Spotlight Tracking**: Cursor proximity applies a subtle `radial-gradient` glow based on CSS variables calculated in the React layer.
2. **3D Tilt Effect**: Based on distance from the component center, `rotateX` and `rotateY` transforms add depth to cards. This is constrained to a 2–3 degrees max tilt, keeping it professional and understated.
3. **Magnetic Pull**: Used only on the primary "Start Free Now" CTA in `FinalCTA.tsx`. As the pointer moves over the button bounds, the button visually translates slightly towards the cursor without moving the actual layout bounding box.

These interactions significantly increase the "premium" feel of the homepage without resorting to over-the-top WebGL graphics or heavy Canvas processing.
