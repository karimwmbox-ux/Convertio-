## 2025-05-15 - [Accessibility Audit: Form Labels and Icon Buttons]
**Learning:** This application had a recurring pattern of missing `id`/`htmlFor` associations for form fields and missing `aria-label` attributes on icon-only buttons (e.g., sidebar toggles, delete actions, sign-out). This makes the interface nearly impossible to navigate for screen reader users.
**Action:** When creating new interactive elements or forms, always explicitly associate labels with inputs using unique IDs and ensure every icon-only button has a descriptive `aria-label`.
