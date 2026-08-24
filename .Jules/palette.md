## 2026-08-24 - Simulated AI Generation UX Delay

**Learning:** When generating AI content, an instantaneous client-side state update feels abrupt and artificial. Adding an intentional delay (e.g., 800ms) alongside a spinning indicator (`RefreshCw` with `animate-spin`), a continuous-tense label ("Generating..."), `aria-busy={true}`, and a disabled state provides tactile feedback, reinforces perceived value/complexity, and prevents duplicate click actions.
**Action:** Always wrap instant client-side AI simulations with a temporary loading state, timer ref cleanup on unmount, and `aria-busy` feedback for screen readers.
