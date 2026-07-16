## 2026-07-16 - [AdCreator UX Enhancements]
**Learning:** When simulating asynchronous operations (like "Magic Generate" or "Saving") with `setTimeout` in React components, capturing the state directly in the timer callback can lead to stale closure bugs if the user continues to interact with the form.
**Action:** Always disable form inputs and buttons during the "loading" or "saving" state to prevent data loss and inconsistent state, or use a `useRef` to track the latest state if interaction must remain enabled.
