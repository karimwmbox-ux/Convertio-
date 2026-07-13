## 2025-05-14 - Character Limit Feedback Pattern
**Learning:** In marketing interfaces with strict platform constraints (like Meta Ads), providing real-time character count feedback with color-coded thresholds (orange at 80%, red when exceeded) prevents user frustration during the final submission phase.
**Action:** Always implement character counters for text inputs with known platform limits using the `cn` utility for dynamic coloring.

## 2025-05-14 - Accessible Form Associations with useId
**Learning:** Manual ID management for form labels in React often leads to collisions in complex dashboards. Using the `useId` hook ensures that label-input associations remain unique and accessible even when the same component is rendered multiple times.
**Action:** Adopt `useId` as the standard for all form field components to maintain WCAG compliance without manual tracking.
