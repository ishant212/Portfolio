import { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';

/**
 * LazyCanvas — wraps <Canvas> and switches frameloop between
 * "always" (visible) and "never" (off-screen).
 *
 * WHY PAUSE INSTEAD OF UNMOUNT:
 *   Recreating a WebGL context costs ~50–200ms, forces GPU memory
 *   reallocation, and triggers Three.js asset disposal (textures,
 *   geometries get re-uploaded on remount). Pausing is instant and free.
 *
 * HOW:
 *   IntersectionObserver watches the wrapper div. When the section
 *   enters the viewport, frameloop flips to "always" — R3F restarts
 *   the loop immediately. When it leaves, frameloop becomes "never" —
 *   the RAF is cancelled but the GL context stays alive.
 *
 * rootMargin="100px 0px": start rendering 100px *before* the section
 * scrolls into view so there is no visible pop-in.
 */
export default function LazyCanvas({
  children,
  rootMargin = '100px 0px',
  ...canvasProps
}) {
  const wrapperRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={wrapperRef} style={{ width: '100%', height: '100%' }}>
      <Canvas {...canvasProps} frameloop={isVisible ? 'always' : 'never'}>
        {children}
      </Canvas>
    </div>
  );
}
