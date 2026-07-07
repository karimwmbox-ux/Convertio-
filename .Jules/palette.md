## 2025-05-15 - Form Accessibility & Feedback Patterns
**Learning:** In highly interactive forms like ad creators, users need immediate visual confirmation of constraints (character limits) and clear association between labels and inputs for screen readers. Using `useId` ensures unique, accessible IDs even in complex, multi-component layouts.
**Action:** Always pair `useId` with `htmlFor` on labels, and implement color-coded character counters (orange at 80%, red at 100%+) to provide intuitive, actionable feedback.
