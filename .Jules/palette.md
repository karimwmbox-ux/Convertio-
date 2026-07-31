# Palette's Journal

Critical learnings from UX/a11y improvements.

## 2026-03-05 - Character Limit Feedback and Label Interactivity
**Learning:** Form usability and accessibility is dramatically elevated when input labels are associated via unique IDs (using `useId`) and styled as interactable elements (using `cursor-pointer`). Adding color-coded threshold feedback for character limits (orange for warning/near-limit, red for exceeded limit) immediately alerts users of ad copywriting validation without needing aggressive error modals.
**Action:** Always link form labels to their inputs using dynamic, unique accessible IDs, apply cursor-pointer feedback on interactive labels, and implement progressive visual thresholds for limited input controls.
