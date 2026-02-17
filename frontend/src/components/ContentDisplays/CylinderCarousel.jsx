import { useState, useRef, useCallback, useEffect } from 'react';

// ─── Data ──────────────────────────────────────────────────────────────────────
const POSTERS = [
  {
    id: 1,
    title: 'Dune: Part Two',
    url: 'https://image.tmdb.org/t/p/w342/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg',
  },
  {
    id: 2,
    title: 'Oppenheimer',
    url: 'https://image.tmdb.org/t/p/w342/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
  },
  {
    id: 3,
    title: 'Poor Things',
    url: 'https://image.tmdb.org/t/p/w342/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg',
  },
  {
    id: 4,
    title: 'Saltburn',
    url: 'https://image.tmdb.org/t/p/w342/qjhahqKnOdyyakHZPFJeHOFHaAo.jpg',
  },
  {
    id: 5,
    title: 'Past Lives',
    url: 'https://image.tmdb.org/t/p/w342/k3waqVXS5GlsKE7aBQIaEUHnFRs.jpg',
  },
  {
    id: 6,
    title: 'All of Us Strangers',
    url: 'https://image.tmdb.org/t/p/w342/1b4PaCeMjMKbg2M3IWzNM9muJWY.jpg',
  },
  {
    id: 7,
    title: 'The Zone of Interest',
    url: 'https://image.tmdb.org/t/p/w342/hUu9zyZmKuTosGpGcZXQxLGRSIS.jpg',
  },
  {
    id: 8,
    title: 'American Fiction',
    url: 'https://image.tmdb.org/t/p/w342/8Hb9Oj3Gp9TpSdBLxBm7kFQqTBF.jpg',
  },
  {
    id: 9,
    title: 'Priscilla',
    url: 'https://image.tmdb.org/t/p/w342/uSv9dyEQMQBEurAmRfvxgfViWNm.jpg',
  },
  {
    id: 10,
    title: 'Killers of the FM',
    url: 'https://image.tmdb.org/t/p/w342/c48Kncs9C3BNytGSHEq6GiCFQxp.jpg',
  },
  {
    id: 11,
    title: 'Ferrari',
    url: 'https://image.tmdb.org/t/p/w342/lqoMzCcZYEFK729d6qzt349fB4o.jpg',
  },
  {
    id: 12,
    title: 'Maestro',
    url: 'https://image.tmdb.org/t/p/w342/6ZLobl1CgFbJCKgbrCNZJJ3GKGz.jpg',
  },
];

// ─── Geometry ──────────────────────────────────────────────────────────────────
// N posters sit on a cylinder of radius R.
// Each poster i occupies an angle: θ_i = (2π / N) * i  radians
// We rotate the whole cylinder by `wheelAngle` (in radians).
//
// For poster i:
//   angle  = θ_i + wheelAngle
//   The poster's position on the cylinder surface:
//     translateZ = R * cos(angle)   — how far forward/back it is
//     translateX is handled by rotateY around the cylinder axis (no explicit X needed)
//   rotateY = -angle (in degrees)   — faces the viewer when angle ≈ 0
//
// A poster is "front-facing" when angle ≈ 0 (mod 2π).
// translateZ = R puts it closest to the viewer at angle = 0.
// rotateY = -angle keeps the face always pointing outward from the cylinder.
//
// The active poster gets an extra `translateZ` push (PULL_OUT) so it steps
// forward off the surface, like a magazine being pulled from a rack.

const N = POSTERS.length;
const STEP = (2 * Math.PI) / N; // angular gap between posters (rad)
const RADIUS = 420; // cylinder radius in px — tune for spread
const PULL_OUT = 80; // extra Z for active poster (px)
const FADE_START = Math.PI * 0.52; // angle at which opacity starts dropping
const FADE_END = Math.PI * 0.85; // angle at which poster is invisible

function mod(n, m) {
  return ((n % m) + m) % m;
}

function posterStyle(i, wheelAngle, activeIdx, hoveredIdx, isDragging) {
  const rawAngle = STEP * i + wheelAngle;
  // Normalise to [-π, π] so cos() reads naturally
  const angle = ((rawAngle + Math.PI) % (2 * Math.PI)) - Math.PI;

  const cosA = Math.cos(angle);
  const tz = RADIUS * cosA; // Z position on cylinder
  const ry = -angle * (180 / Math.PI); // face outward

  // Visibility: posters past ~90° are "behind" the cylinder
  const absAngle = Math.abs(angle);
  if (absAngle > Math.PI * 0.92) return null; // cull back-face posters

  // Opacity fade toward sides
  const opacity =
    absAngle < FADE_START
      ? 1
      : 1 - (absAngle - FADE_START) / (FADE_END - FADE_START);

  // zIndex: closer posters (higher cosA) sit on top
  const zIndex = Math.round(cosA * 100) + 100;

  // Active / hovered pull-out
  const isActive = i === activeIdx;
  const isHovered = i === hoveredIdx;
  const pullZ = isActive || isHovered ? PULL_OUT : 0;

  // Slight brightness for depth
  const brightness = 0.45 + 0.55 * Math.max(0, cosA);

  return {
    transform: `rotateY(${ry}deg) translateZ(${tz + pullZ}px)`,
    opacity: Math.max(0, Math.min(1, opacity)),
    zIndex,
    filter: `brightness(${brightness.toFixed(2)})`,
    willChange: 'transform, opacity, filter',
  };
}

// ─── Component ─────────────────────────────────────────────────────────────────
export default function CylinderCarousel({ items = POSTERS }) {
  const count = items.length;

  // wheelAngle: current rotation of the cylinder in radians
  // We store it as a float and let CSS transitions handle smoothing
  const [wheelAngle, setWheelAngle] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const dragStart = useRef(null);
  const angleAtStart = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const velocityRef = useRef(0);
  const accumRef = useRef(0);

  // Which poster is currently front-facing?
  // front = poster whose angle ≈ 0  →  i * STEP + wheelAngle ≡ 0  →  i ≡ -wheelAngle / STEP
  const updateActive = useCallback(
    (angle) => {
      const raw = -angle / STEP;
      const idx = mod(Math.round(raw), count);
      setActiveIdx(idx);
    },
    [count]
  );

  // ── Drag / touch ──────────────────────────────────────────────────────────────
  const getX = (e) => (e.touches ? e.touches[0].clientX : e.clientX);

  const onPointerDown = useCallback(
    (e) => {
      dragStart.current = getX(e);
      angleAtStart.current = wheelAngle;
      lastX.current = getX(e);
      lastTime.current = performance.now();
      velocityRef.current = 0;
      setIsDragging(true);
    },
    [wheelAngle]
  );

  const onPointerMove = useCallback(
    (e) => {
      if (dragStart.current === null) return;
      const x = getX(e);
      const dx = x - dragStart.current;
      const now = performance.now();
      const dt = Math.max(1, now - lastTime.current);

      velocityRef.current = (x - lastX.current) / dt; // px/ms
      lastX.current = x;
      lastTime.current = now;

      // Map 1px of drag → small rotation; tweak divisor for feel
      const newAngle = angleAtStart.current + dx / (RADIUS * 1.05);
      setWheelAngle(newAngle);
      updateActive(newAngle);
    },
    [updateActive]
  );

  const onPointerUp = useCallback(() => {
    if (dragStart.current === null) return;
    dragStart.current = null;
    setIsDragging(false);

    // Momentum: velocity (px/ms) → angular velocity
    const angularVel = velocityRef.current / (RADIUS * 1.05);
    // Snap to nearest poster after momentum settles
    let target = wheelAngle + angularVel * 120; // 120ms worth of momentum
    // Snap to nearest step
    target = Math.round(target / STEP) * STEP;
    setWheelAngle(target);
    updateActive(target);
  }, [wheelAngle, updateActive]);

  // ── Wheel / trackpad ──────────────────────────────────────────────────────────
  const onWheel = useCallback(
    (e) => {
      e.preventDefault();
      accumRef.current += (e.deltaX || -e.deltaY) * 0.003;
      const snapped = Math.round(accumRef.current / STEP) * STEP;
      setWheelAngle(snapped);
      updateActive(snapped);
    },
    [updateActive]
  );

  // ── Keyboard ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') {
        setWheelAngle((a) => {
          const n = a - STEP;
          updateActive(n);
          return n;
        });
      }
      if (e.key === 'ArrowLeft') {
        setWheelAngle((a) => {
          const n = a + STEP;
          updateActive(n);
          return n;
        });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [updateActive]);

  const activeItem = items[activeIdx];

  // ─── Render ───────────────────────────────────────────────────────────────────
  return (
    <div
      className='relative w-full h-screen overflow-hidden bg-[#0d0d0d] flex flex-col items-center justify-center'
      style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
    >
      {/* Header */}
      <div className='absolute top-0 left-0 right-0 flex justify-between items-start px-8 pt-8 z-20 pointer-events-none'>
        <div>
          <p className='text-[10px] tracking-[0.3em] text-white/30 uppercase mb-1'>
            Now Showing
          </p>
          <h1 className='text-white text-base font-light tracking-wide'>
            {activeItem.title}
          </h1>
        </div>
        <p className='text-[10px] tracking-[0.25em] text-white/20 uppercase pt-1'>
          {String(activeIdx + 1).padStart(2, '0')} /{' '}
          {String(count).padStart(2, '0')}
        </p>
      </div>

      {/* 3D stage */}
      <div
        className='relative flex items-center justify-center'
        style={{
          width: '100%',
          height: 520,
          perspective: 1000,
          perspectiveOrigin: '50% 50%',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        onMouseDown={onPointerDown}
        onMouseMove={onPointerMove}
        onMouseUp={onPointerUp}
        onMouseLeave={onPointerUp}
        onTouchStart={onPointerDown}
        onTouchMove={onPointerMove}
        onTouchEnd={onPointerUp}
        onWheel={onWheel}
        tabIndex={0}
        role='listbox'
        aria-label='Film carousel'
      >
        {/* Cylinder origin — everything rotates around this point */}
        <div
          style={{
            transformStyle: 'preserve-3d',
            position: 'relative',
            width: 0,
            height: 0,
          }}
        >
          {items.map((item, i) => {
            const s = posterStyle(
              i,
              wheelAngle,
              activeIdx,
              hoveredIdx,
              isDragging
            );
            if (!s) return null;

            const isActive = i === activeIdx;

            return (
              <div
                key={item.id}
                role='option'
                aria-selected={isActive}
                style={{
                  position: 'absolute',
                  left: -90,
                  top: -135,
                  width: 180,
                  height: 270,
                  transition: isDragging
                    ? 'opacity 0.1s ease, filter 0.1s ease'
                    : 'transform 0.55s cubic-bezier(0.23,1,0.32,1), opacity 0.4s ease, filter 0.4s ease',
                  ...s,
                }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => {
                  if (!isDragging) {
                    // Rotate wheel so clicked poster becomes front
                    const target = -i * STEP;
                    setWheelAngle(target);
                    setActiveIdx(i);
                    accumRef.current = target;
                  }
                }}
              >
                <div
                  className='w-full h-full rounded overflow-hidden relative'
                  style={{
                    boxShadow: isActive
                      ? '0 20px 60px rgba(0,0,0,0.8)'
                      : '0 8px 24px rgba(0,0,0,0.5)',
                    cursor: isActive ? 'default' : 'pointer',
                  }}
                >
                  <img
                    src={item.url}
                    alt={item.title}
                    draggable={false}
                    className='w-full h-full object-cover'
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      if (e.currentTarget.nextSibling) {
                        e.currentTarget.nextSibling.style.display = 'flex';
                      }
                    }}
                  />
                  {/* Fallback */}
                  <div
                    className='absolute inset-0 items-center justify-center text-center px-3 text-white/50 text-xs'
                    style={{
                      display: 'none',
                      background: `hsl(${(item.id * 43) % 360}, 20%, 18%)`,
                    }}
                  >
                    {item.title}
                  </div>

                  {/* Thin top edge highlight — physical depth cue */}
                  <div
                    className='absolute top-0 left-0 right-0 h-px'
                    style={{ background: 'rgba(255,255,255,0.12)' }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer: thin rule + hint */}
      <div className='absolute bottom-0 left-0 right-0 px-8 pb-8 flex justify-between items-end z-20 pointer-events-none'>
        <div className='flex gap-2 items-center'>
          {/* Minimal dot strip — active segment */}
          {items.map((_, i) => (
            <div
              key={i}
              className='rounded-full transition-all duration-300'
              style={{
                width: i === activeIdx ? 18 : 4,
                height: 4,
                background:
                  i === activeIdx
                    ? 'rgba(255,255,255,0.9)'
                    : 'rgba(255,255,255,0.15)',
              }}
            />
          ))}
        </div>
        <p className='text-[9px] tracking-[0.3em] text-white/15 uppercase'>
          drag · scroll · ← →
        </p>
      </div>
    </div>
  );
}
