## 2025-05-14 - [Semantic Buttons & Label Association]
**Learning:** Using semantic `<button>` elements instead of interactive `<div>`s is critical for keyboard accessibility (TAB focus) and screen reader support. Properly associating `<label>` with `<input>` via `id`/`htmlFor` improves both accessibility and touch-target usability.
**Action:** Always prefer `<button type="button">` for interactive elements and ensure all form controls have programmatic label associations.
