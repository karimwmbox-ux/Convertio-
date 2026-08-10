# Palette Journal

🎨 Palette's UX and Accessibility Insights and Learnings.

## 2026-08-10 - Meta Ads Creator Visual & Accessibility Feedback
**Learning:** Adding dynamic, visual feedback for character counts on fields with strict constraints (like Meta's Headline and Primary Text) significantly enhances usability. Color-coding thresholds (e.g., orange at 80% and red when exceeded) and aligning the counters beside labels using a flexbox container prevents visual clutter while remaining fully descriptive and accessible. Additionally, associating form labels with input/select fields using the React `useId` hook eliminates potential ID collisions in highly interactive single-page environments and guarantees proper screen reader support.
**Action:** When working on form creation modules with copy constraints, always design flex-aligned label/counter headers, color-code capacity thresholds, and link elements with unique `useId` hooks for superior screen reader and click-to-focus accessibility.
