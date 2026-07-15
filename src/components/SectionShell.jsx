/**
 * SectionShell — DOM-only placeholder used as the Suspense fallback while
 * a React.lazy section chunk is being fetched and evaluated.
 *
 * min-h-screen mirrors the section height so there is no layout shift when
 * the real section mounts and takes over.
 *
 * Pure CSS animation — zero GPU cost, no Three.js, no Canvas.
 */
export default function SectionShell() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <style>{`
        @keyframes ss-pulse {
          0%, 100% { opacity: 0.2; }
          50%       { opacity: 0.5; }
        }
        .ss-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(0, 245, 255, 0.45);
          animation: ss-pulse 1.4s ease-in-out infinite;
        }
        .ss-dot:nth-child(2) { animation-delay: 0.2s; }
        .ss-dot:nth-child(3) { animation-delay: 0.4s; }
      `}</style>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <div className="ss-dot" />
        <div className="ss-dot" />
        <div className="ss-dot" />
      </div>
    </div>
  );
}
