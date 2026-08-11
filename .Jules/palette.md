## 2026-03-05 - Asynchronous Micro-UX AI Delight State
**Learning:** Instantly changing generated copy can feel artificial and dismissive of the complex AI operation happening under the hood. Introducing a subtle artificial delay (e.g. 800ms) with a disabled continuous-tense label ("Generating...") and a spinning indicator greatly enhances the perceived value and reliability of the operation.
**Action:** When implementing mock/client-side AI generation features, always pair them with a transient `setTimeout` loading state and spinner to elevate user delight and expectation of premium quality.
