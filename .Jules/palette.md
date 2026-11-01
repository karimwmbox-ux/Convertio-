## 2026-06-05 - Accessible Form Labeling in Ad Creator Component
**Learning:** In dynamically toggled form interfaces like `AdCreator`, relying on plain text labels without `htmlFor` and unique IDs prevents screen readers and click-to-focus interactions from functioning. Using React's `useId` hook to generate scoped field IDs (`${baseId}-<field>`) ensures clean label-input association without ID collisions.
**Action:** Always bind labels with `htmlFor` and `id` across form fields, adding `cursor-pointer` to indicate interactivity to users.
