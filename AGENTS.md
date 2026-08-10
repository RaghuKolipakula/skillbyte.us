<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# React Best Practices
- **useEffect Intervals**: When writing React `useEffect` hooks that contain `setInterval`, NEVER include rapidly decrementing state variables (like `timeLeft`) in the dependency array if they are not required to recreate the interval. Doing so causes the interval to clear and reset prematurely, breaking the timing logic. Instead, rely on boolean toggles (like `isActive`) or use refs for mutable values that shouldn't trigger re-renders.
