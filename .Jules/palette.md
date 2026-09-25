## 2026-09-25 - Semantic Interactive Elements in Mock Ad Previews
**Learning:** Mock preview cards (such as social ad previews) often use non-semantic `div` elements for simulated actions like 'Like', 'Comment', and 'Share'. This prevents keyboard navigation, screen reader announcement, and focus indicators.
**Action:** Always wrap interactive actions in social media or card previews in semantic `<button type="button">` elements with descriptive `aria-label`s and `focus-visible` ring styles.
