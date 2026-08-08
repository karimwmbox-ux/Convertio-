# Palette UX Journal

## 2025-03-03 - Accessible Form Associations and Character Limits
**Learning:** In reusable forms like `AdCreator.tsx`, interactive label-input association and visible character limit indicators with orange/red state feedback thresholds (at 80% and 100%) significantly improve both the accessibility and visual feedback for users crafting platform-specific content (e.g. Meta Ads with strict copy limits).
**Action:** Always map React `useId` dynamically to inputs, set corresponding `htmlFor` on interactive label elements, apply `cursor-pointer` to labels, and show real-time length counters with color-coded feedback.
