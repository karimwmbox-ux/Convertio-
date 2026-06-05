## 2025-05-15 - [Dynamic Button Labels and Accessibility]
**Learning:** Using a static `aria-label` on a button with dynamic internal text (like a loading state change) prevents screen readers from announcing the status update, as the ARIA label takes precedence.
**Action:** Avoid static `aria-label` for buttons that need to communicate status changes through their text content. Ensure form inputs always have explicit `id` and `htmlFor` associations for screen reader reliability.
