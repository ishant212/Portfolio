/**
 * CanvasFallback — lightweight DOM-only placeholder shown by <Suspense>
 * while Three.js assets (textures, font atlases, geometries) are loading.
 *
 * Design constraints:
 *   - No Three.js / Canvas — this renders during Suspense, before the GL
 *     context has produced its first frame.
 *   - Pure CSS animation so it is zero-cost on the GPU.
 *   - Matches the portfolio's dark + cyan accent aesthetic.
 *   - Does NOT change the container dimensions — the parent section already
 *     enforces height (h-[500px], h-[400px], fill-parent), so there is no
 *     layout shift when the real canvas takes over.
 *
 * Why this matters for perceived performance:
 *   fallback={null} → the canvas area is blank/black during load, which
 *   looks broken. A spinner signals intentional loading, removing anxiety
 *   and making the page feel faster even at identical network speeds.
 */
export default function CanvasFallback() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
      }}
    >
      {/* Scoped keyframes — cf- prefix avoids collisions with any global names. */}
      <style>{`
        @keyframes cf-spin {
          to { transform: rotate(360deg); }
        }
        .cf-ring {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1.5px solid rgba(0, 245, 255, 0.12);
          border-top-color: rgba(0, 245, 255, 0.55);
          animation: cf-spin 1s linear infinite;
        }
      `}</style>
      <div className="cf-ring" />
    </div>
  );
}
