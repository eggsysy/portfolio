/**
 * A `template` re-mounts on every navigation (unlike `layout`), so this wraps
 * each route in a "paper sliding onto the desk" enter animation.
 *
 * The animation is pure CSS (see `.page-enter` in globals.css) rather than JS,
 * so content is never left invisible if client JS fails to run — the animation
 * settles to the visible end state via `animation-fill-mode: both`.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>
}
