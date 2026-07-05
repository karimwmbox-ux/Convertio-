## 2026-07-05 - [Character Limit Indicators & Accessibility in Ad Creator]
**Learning:** Implementing visual indicators for character limits using color-coded thresholds (orange at 80% capacity and red when limits are exceeded) provides immediate, actionable feedback to the user and prevents platform-specific ad rejection.
**Action:** Always include ARIA-compliant labels (using `useId` and `htmlFor`) paired with dynamic character counters for input fields that have platform-imposed constraints.
