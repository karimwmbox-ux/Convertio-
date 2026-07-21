# Palette's Journal - Critical UX/Accessibility Learnings

## 2026-03-01 - Simulated Asynchronous States and Loading Feedback
**Learning:** Adding short, artificial loading delays to actions like copy generation/AI generation coupled with a deactivated button state significantly improves the perceived complexity and satisfaction of the feature, clarifying the state of the system for screen readers and avoiding repetitive triggers.
**Action:** Always implement a short delay (e.g., 800ms) with a loading spinner (e.g., `RefreshCw animate-spin`) and disabled loading text for any simulated asynchronous AI features.
