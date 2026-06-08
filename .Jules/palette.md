## 2025-05-14 - Robust Form Accessibility with `useId`
**Learning:** Hardcoding IDs for form accessibility (label-input association) in reusable React components can lead to ID collisions if the component is rendered multiple times on a page. This breaks accessibility behavior and violates HTML standards.
**Action:** Always use the `useId` hook in React components to generate unique, stable IDs for associating labels with inputs.
