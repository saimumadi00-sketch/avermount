import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

export function useMouse() {
  const x = useMotionValue(-100), y = useMotionValue(-100);
  useEffect(() => {
    const m = (e: PointerEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("pointermove", m);
    return () => window.removeEventListener("pointermove", m);
  }, [x, y]);
  return { x, y };
}

export function Cursor({ x, y }: { x: MotionValue<number>; y: MotionValue<number> }) {
  const sx = useSpring(x, { stiffness: 180, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 20, mass: 0.4 });
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);
  useEffect(() => {
    const o = (e: Event) => setHover(!!(e.target as HTMLElement).closest("button,a,[data-hover]"));
    const d = () => setDown(true), u = () => setDown(false);
    window.addEventListener("pointerover", o); window.addEventListener("pointerdown", d); window.addEventListener("pointerup", u);
    return () => { window.removeEventListener("pointerover", o); window.removeEventListener("pointerdown", d); window.removeEventListener("pointerup", u); };
  }, []);
  return (
    <div className="pointer-events-none fixed inset-0 z-[70] hidden [@media(pointer:fine)]:block">
      <motion.div style={{ x, y }} className="absolute -ml-1 -mt-1 h-2 w-2 rounded-full bg-gold" />
      <motion.div
        style={{ x: sx, y: sy }}
        animate={{ width: hover ? 72 : 36, height: hover ? 72 : 36, marginLeft: hover ? -36 : -18, marginTop: hover ? -36 : -18, scale: down ? 0.8 : 1 }}
        className="absolute rounded-full border border-gold/70 bg-gold/10 backdrop-blur-[1px]"
      />
    </div>
  );
}

export function Spotlight({ x, y }: { x: MotionValue<number>; y: MotionValue<number> }) {
  const bg = useTransform([x, y], ([a, b]) => `radial-gradient(600px circle at ${a}px ${b}px, color-mix(in oklab, var(--gold) 14%, transparent), transparent 60%)`);
  return <motion.div style={{ background: bg }} className="pointer-events-none fixed inset-0 z-0" />;
}

export function Magnetic({ children, className = "", onClick }: { children: ReactNode; className?: string; onClick?: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 15 }), y = useSpring(0, { stiffness: 200, damping: 15 });
  return (
    <motion.button ref={ref} style={{ x, y }} onClick={onClick} className={className}
      onPointerMove={(e) => { const r = ref.current!.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * 0.35); y.set((e.clientY - r.top - r.height / 2) * 0.35); }}
      onPointerLeave={() => { x.set(0); y.set(0); }}>
      {children}
    </motion.button>
  );
}

export function Tilt({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(0, { stiffness: 150, damping: 15 }), ry = useSpring(0, { stiffness: 150, damping: 15 });
  const [g, setG] = useState({ x: 50, y: 50, on: false });
  return (
    <motion.div ref={ref} data-hover style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onPointerMove={(e) => { const r = ref.current!.getBoundingClientRect(); const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height; ry.set((px - 0.5) * 16); rx.set((0.5 - py) * 16); setG({ x: px * 100, y: py * 100, on: true }); }}
      onPointerLeave={() => { rx.set(0); ry.set(0); setG((s) => ({ ...s, on: false })); }}
      className={`relative overflow-hidden ${className}`}>
      <div className="pointer-events-none absolute inset-0 transition-opacity duration-300" style={{ opacity: g.on ? 1 : 0, background: `radial-gradient(320px circle at ${g.x}% ${g.y}%, color-mix(in oklab, var(--gold) 22%, transparent), transparent 70%)` }} />
      <div className="relative">{children}</div>
    </motion.div>
  );
}

export function Words({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span className="inline-block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: delay + i * 0.06, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}>
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export const rise = (d = 0) => ({ initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] as const } });
