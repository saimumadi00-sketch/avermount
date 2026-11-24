import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import logo from "@/assets/logo.png";
import { Cursor, Magnetic, Spotlight, useMouse } from "@/components/deck/fx";
import { slides } from "@/components/deck/slides";

export const Route = createFileRoute("/")({
  validateSearch: (s: Record<string, unknown>): { slide?: number } => ({ slide: Math.min(Math.max(Number(s["slide"]) || 1, 1), 11) }),
  head: () => ({
    meta: [
      { title: "Avermont Marketing — Make Your Business Unmissable" },
      { name: "description", content: "Interactive proposal from Avermont Marketing: branding, social content and creator collaborations for local brands." },
      { property: "og:title", content: "Avermont Marketing — Make Your Business Unmissable" },
      { property: "og:description", content: "Interactive proposal: branding, social content and creator collaborations for local brands." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Deck,
});

function Deck() {
  const slide = Route.useSearch().slide ?? 1;
  const navigate = useNavigate({ from: "/" });
  const n = slides.length, i = Math.min(Math.max(Math.round(Number(slide) || 1), 1), n) - 1;
  const { x, y } = useMouse();
  const dir = useRef(1);
  const go = useCallback((t: number) => { if (t < 0 || t >= n) return; dir.current = t > i ? 1 : -1; navigate({ search: { slide: t + 1 }, replace: true }); }, [i, n, navigate]);

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (["ArrowRight", " ", "PageDown"].includes(e.key)) { e.preventDefault(); go(i + 1); }
      if (["ArrowLeft", "PageUp"].includes(e.key)) go(i - 1);
      if (e.key.toLowerCase() === "f") document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();
    };
    let sx = 0;
    const ts = (e: TouchEvent) => { sx = e.touches[0]?.clientX ?? 0; };
    const te = (e: TouchEvent) => { const d = (e.changedTouches[0]?.clientX ?? 0) - sx; if (Math.abs(d) > 60) go(d < 0 ? i + 1 : i - 1); };
    window.addEventListener("keydown", k); window.addEventListener("touchstart", ts); window.addEventListener("touchend", te);
    document.title = `${i + 1}/${n} — ${slides[i]!.title} · Avermont`;
    return () => { window.removeEventListener("keydown", k); window.removeEventListener("touchstart", ts); window.removeEventListener("touchend", te); };
  }, [go, i, n]);

  const S = slides[i]!.C;
  return (
    <div className="deck grain relative h-screen w-screen overflow-hidden bg-background text-foreground">
      <Spotlight x={x} y={y} />
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(var(--foreground)_1px,transparent_1px),linear-gradient(90deg,var(--foreground)_1px,transparent_1px)] [background-size:80px_80px]" />
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-5 sm:px-12">
        <button onClick={() => go(0)} className="flex items-center gap-3"><img src={logo} alt="" className="h-9 w-9" /><span className="text-left leading-none"><span className="block font-bold tracking-[0.2em]">AVERMONT</span><span className="block text-[10px] tracking-[0.45em] text-gold">MARKETING</span></span></button>
        <div className="flex items-center gap-4 text-xs text-muted-foreground"><span className="hidden sm:inline">← → to navigate · F for fullscreen</span><span className="font-medium text-foreground">{String(i + 1).padStart(2, "0")} / {n}</span></div>
      </header>
      <AnimatePresence mode="wait" custom={dir.current}>
        <motion.main key={i} custom={dir.current} className="relative z-10 h-full overflow-y-auto"
          initial={{ opacity: 0, x: dir.current * 80, filter: "blur(8px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} exit={{ opacity: 0, x: dir.current * -80, filter: "blur(8px)" }} transition={{ duration: 0.45 }}>
          <S x={x} y={y} />
        </motion.main>
      </AnimatePresence>
      <footer className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between gap-4 px-6 py-5 sm:px-12">
        <div className="flex gap-1.5">{slides.map((s, k) => <button key={k} aria-label={s.title} onClick={() => go(k)} className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-gold" : "w-3 bg-muted-foreground/40 hover:bg-foreground"}`} />)}</div>
        <div className="flex gap-2">
          <Magnetic onClick={() => go(i - 1)} className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-lg disabled:opacity-30">←</Magnetic>
          <Magnetic onClick={() => go(i + 1)} className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-lg text-primary-foreground">→</Magnetic>
        </div>
      </footer>
      <Cursor x={x} y={y} />
    </div>
  );
}
