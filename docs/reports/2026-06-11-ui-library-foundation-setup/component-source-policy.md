# Component Source Policy

1. No component is added without a clear user or product need.
2. No effect is added without a defined hierarchy, feedback, or storytelling purpose.
3. HeroUI and shadcn/ui must not own the same control type in one feature without a written exception.
4. Imported styling must be adapted to NexaLearn colors, type, radii, spacing, focus states, and portal identity.
5. Every component must support Arabic RTL and English LTR. Directional transforms and spacing require explicit review.
6. Every interactive component must have keyboard support, visible focus, an accessible name, and adequate touch targets.
7. Continuous decorative animation is prohibited. Motion must respect `prefers-reduced-motion`.
8. Mobile performance is a release gate. Expensive blur, SVG path animation, observers, and large client bundles require measurement.
9. Registry code is project-owned after import and must pass local lint, typecheck, build, and review.
10. No component may ship if it breaks build, creates horizontal overflow, reduces contrast, or obscures content.
11. Magic UI is limited to marketing surfaces. Aceternity UI is limited to selected cinematic compositions.
12. `ui-lab` may combine sources for testing; production features should use the minimum source set necessary.
