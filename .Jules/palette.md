## 2025-05-14 - [AI Generation Delight & Form Accessibility]
**Learning:** Users perceive AI features as more "intelligent" and complex when there is a deliberate (but short) processing delay accompanied by clear visual feedback (e.g., spinning icon and "Generating..." text). Additionally, using React's `useId` for semantic label-input association ensures robust accessibility even in complex, reusable components where static IDs might collide.
**Action:** Always implement an artificial delay (800ms-1200ms) for AI-simulated actions and use `useId` for all new form fields to maintain accessibility standards.

## 2025-05-14 - [Agent Tool Truncation Awareness]
**Learning:** Tool outputs in the Jules execution trace (e.g., `read_file`, `sed`, `cat`) are truncated at 1000 characters. Proposing changes based on truncated code leads to Groundedness Rule violations.
**Action:** When working with files larger than 1000 bytes, explicitly read them in sequential chunks using offsets or line-range tools to ensure the full context is captured in the trace before planning.
