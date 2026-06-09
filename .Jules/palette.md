## 2025-05-15 - Improving Dashboard Accessibility and Semantics

**Learning:** Interactive elements in the Converto Studio dashboard (like preset cards and cloud templates) were implemented as non-semantic `div` elements, making them inaccessible to keyboard and screen reader users. Additionally, icon-only buttons lacked descriptive labels, and form fields lacked explicit associations.

**Action:**
- Use the `useId` hook to generate unique IDs for linking `<label>` and `<input>` elements, ensuring reliable accessibility even in dynamic forms.
- Convert interactive containers to semantic `<button type="button">` when they don't contain other interactive elements.
- For interactive containers that *do* contain nested buttons (e.g., delete actions), use `role="button"` and `tabIndex={0}` on the parent to provide keyboard access without violating HTML nesting rules. Always include an `onKeyDown` handler for Enter/Space key support.
- Ensure all icon-only buttons have a descriptive `aria-label`.
