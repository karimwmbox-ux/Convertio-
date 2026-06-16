## 2025-05-14 - [Form Accessibility & Icon Usability]
**Learning:** Home-grown UI components often lack semantic associations between labels and inputs, and icon-only buttons are frequently missing ARIA labels, making them inaccessible to screen readers.
**Action:** Use the React `useId` hook to generate unique IDs for linking `<label htmlFor={id}>` and `<input id={id}>`. Always include `aria-label` on buttons that contain only icons and add `cursor-pointer` to labels to provide visual feedback for interactivity.
