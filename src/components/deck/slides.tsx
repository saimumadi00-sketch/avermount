import { motion, useTransform, type MotionValue } from "framer-motion";
import { useState } from "react";
import hero from "@/assets/hero.png";
import { Tilt, Words, rise } from "./fx";

type M = { x: MotionValue<number>; y: MotionValue<number> };
const Kicker = ({ children, d = 0 }: { children: string; d?: number }) => (
  <motion.p {...rise(d)} className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.35em] text-gold sm:text-sm">
    <span className="h-px w-10 bg-gold" />{children}
  </motion.p>
);
const H = ({ a, b, d = 0.1 }: { a: string; b?: string; d?: number }) => (
  <h2 className="max-w-5xl text-4xl font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
    <Words text={a} delay={d} />{b && <Words text={b} delay={d + 0.25} className="font-serif-i text-gold" />}
  </h2>
);
const Sub = ({ children, d = 0.5 }: { children: string; d?: number }) => (
  <motion.p {...rise(d)} className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">{children}</motion.p>
);
const Wrap = ({ children }: { children: React.ReactNode }) => <div className="mx-auto flex h-full w-full max-w-7xl flex-col justify-center px-6 py-24 sm:px-12">{children}</div>;

function Cover({ x, y }: M) {
  const px = useTransform(x, (v) => (v - (typeof window !== "undefined" ? window.innerWidth / 2 : 0)) / -40);
  const py = useTransform(y, (v) => (v - (typeof window !== "undefined" ? window.innerHeight / 2 : 0)) / -40);
  return (
    <div className="mx-auto grid h-full max-w-7xl items-center gap-10 px-6 py-24 sm:px-12 lg:grid-cols-[1.3fr_1fr]">
      <div>
        <Kicker>The creative growth partner for local brands</Kicker>
        <h1 className="text-5xl font-bold leading-[0.9] tracking-tight sm:text-7xl lg:text-[7.5rem]">
          <Words text="Make your business" delay={0.1} /><br />
          <Words text="unmissable." delay={0.4} className="font-serif-i text-gold" />
        </h1>
        <Sub d={0.8}>Creative marketing that gives people a reason to notice, remember and choose you.</Sub>
        <motion.p {...rise(1)} className="mt-10 border-t border-border pt-5 text-xs uppercase tracking-[0.3em] text-muted-foreground">Customized proposal for <span className="text-foreground">[Client Name]</span></motion.p>
      </div>
      <motion.div style={{ x: px, y: py }} initial={{ opacity: 0, scale: 0.85, rotate: -6 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: 0.4, duration: 1, type: "spring" }} className="relative hidden lg:block">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute -inset-16 rounded-full border border-dashed border-gold/30" />
        <Tilt className="rounded-3xl border border-gold/30 bg-card p-3 shadow-2xl">
          <img src={hero} alt="Avermont branded menu, coffee and phone" className="rounded-2xl" />
          <div className="p-4 text-center"><p className="text-2xl font-bold">A brand to crave.</p><p className="mt-1 text-xs uppercase tracking-[0.3em] text-gold">Designed to be discovered</p></div>
        </Tilt>
      </motion.div>
    </div>
  );
}

function Opportunity() {
  const items = [["Get noticed", "A distinctive presence that earns attention."], ["Build trust", "Consistent visuals and a clearer story."], ["Inspire action", "Content that gives customers a next step."]];
  return <Wrap>
    <Kicker>The opportunity</Kicker>
    <H a="Great businesses deserve" b="to be remembered." />
    <Sub>Being excellent is the starting point. Being seen, understood and chosen is how you grow. That is where Avermont comes in.</Sub>
    <div className="mt-12 grid gap-4 sm:grid-cols-3">
      {items.map(([t, d], i) => <motion.div key={t} {...rise(0.7 + i * 0.12)}><Tilt className="h-full rounded-2xl border border-border bg-card/60 p-7"><p className="text-5xl font-bold text-gold/40">0{i + 1}</p><p className="mt-6 text-2xl font-bold">{t}</p><p className="mt-2 text-muted-foreground">{d}</p></Tilt></motion.div>)}
    </div>
  </Wrap>;
}

function Problem() {
  const [open, setOpen] = useState(0);
  const items = [["Overlooked", "Your business may be excellent—but still disappear in a crowded feed."], ["Inconsistent", "Different visuals and messages make the brand harder to recognize."], ["Hard to choose", "Without clear offers and a reason to act, interest rarely turns into inquiry."]];
  return <Wrap>
    <Kicker>The problem we solve</Kicker>
    <H a="A better business needs a" b="better first impression." />
    <div className="mt-12 flex flex-col gap-3 lg:flex-row">
      {items.map(([t, d], i) => (
        <motion.button key={t} layout onMouseEnter={() => setOpen(i)} onClick={() => setOpen(i)} {...rise(0.5 + i * 0.1)}
          className={`rounded-2xl border p-7 text-left transition-colors lg:min-h-64 ${open === i ? "border-gold bg-gold text-primary-foreground lg:flex-[2]" : "border-border bg-card/60 lg:flex-1"}`}>
          <p className="text-sm font-medium opacity-70">0{i + 1}</p>
          <p className="mt-4 text-3xl font-bold">{t}</p>
          {open === i && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 max-w-sm text-lg">{d}</motion.p>}
        </motion.button>
      ))}
    </div>
    <motion.p {...rise(0.9)} className="mt-10 max-w-3xl text-xl">The solution is not “more posts.” It is <span className="font-serif-i text-2xl text-gold">stronger positioning, better creative and a consistent plan.</span></motion.p>
  </Wrap>;
}

function Method() {
  const steps = [["Discover", "Understand the business, customer, competitors and immediate opportunities."], ["Design", "Create the brand direction, content system and practical marketing assets."], ["Amplify", "Launch campaigns, coordinate content and improve based on feedback."]];
  return <Wrap>
    <Kicker>Our working method</Kicker>
    <H a="Strategy. Design." b="Momentum." />
    <Sub>We create a clear direction, then bring it to life across the places your customers spend time.</Sub>
    <div className="relative mt-14 grid gap-8 sm:grid-cols-3">
      <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.6, duration: 1.2 }} className="absolute left-0 right-0 top-6 hidden h-px origin-left bg-gold/50 sm:block" />
      {steps.map(([t, d], i) => <motion.div key={t} {...rise(0.8 + i * 0.25)} className="group relative" data-hover>
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold bg-background font-bold text-gold transition-all group-hover:scale-125 group-hover:bg-gold group-hover:text-primary-foreground">0{i + 1}</div>
        <p className="mt-6 text-3xl font-bold uppercase tracking-tight">{t}</p><p className="mt-2 text-muted-foreground">{d}</p>
      </motion.div>)}
    </div>
  </Wrap>;
}

function Services() {
  const s = [["Brand & visual identity", "Logo direction, design systems, brand refreshes."], ["Social content & design", "Post concepts, carousel graphics, feed planning."], ["Video & short-form", "Reel ideas, scripts, editing and cutdowns."], ["Menus & sales materials", "Menu design, promotions, flyers and digital assets."], ["Creators & collaborations", "Influencer outreach, visits and coordinated content."], ["Campaign planning", "Launch calendars, messaging and performance reviews."]];
  return <Wrap>
    <Kicker>What we do</Kicker>
    <H a="Creative services, built" b="around your brand." />
    <div className="mt-10 divide-y divide-border border-y border-border">
      {s.map(([t, d], i) => <motion.div key={t} {...rise(0.4 + i * 0.07)} data-hover className="group flex items-baseline gap-6 py-4 transition-all hover:pl-4">
        <span className="text-sm text-gold">0{i + 1}</span>
        <span className="text-xl font-bold transition-colors group-hover:text-gold sm:text-3xl">{t}</span>
        <span className="ml-auto hidden text-right text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 md:block">{d}</span>
      </motion.div>)}
    </div>
  </Wrap>;
}

function Restaurants() {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  return <div className="mx-auto grid h-full max-w-7xl items-center gap-12 px-6 py-24 sm:px-12 lg:grid-cols-2">
    <div>
      <Kicker>For restaurants & cafés</Kicker>
      <H a="Turn cravings" b="into visits." />
      <Sub>From menu appeal to an irresistible social presence—help customers picture their next visit.</Sub>
      <ul className="mt-8 space-y-3 text-lg">{["Appetizing food-first content", "Menus worth opening and sharing", "Offers, launches & creator visits"].map((t, i) => <motion.li key={t} {...rise(0.7 + i * 0.1)} className="flex gap-3"><span className="text-gold">✦</span>{t}</motion.li>)}</ul>
    </div>
    <motion.div {...rise(0.5)} className="mx-auto w-full max-w-sm">
      <Tilt className="rounded-3xl border border-border bg-card p-4">
        <div className="flex items-center gap-3 pb-3"><div className="h-9 w-9 rounded-full bg-gradient-to-br from-gold to-accent" /><p className="font-medium">your_restaurant</p></div>
        <div className="relative" onDoubleClick={() => setLiked(true)}>
          <img src={hero} alt="Sample restaurant post" className="aspect-square w-full rounded-xl object-cover" />
          {liked && <motion.span key={String(liked)} initial={{ scale: 0, opacity: 1 }} animate={{ scale: [0, 1.4, 1], opacity: [1, 1, 0] }} transition={{ duration: 1 }} className="absolute inset-0 flex items-center justify-center text-8xl text-gold">♥</motion.span>}
        </div>
        <div className="flex gap-4 pt-3 text-2xl">
          <motion.button whileTap={{ scale: 1.4 }} onClick={() => setLiked(!liked)} className={liked ? "text-gold" : ""} aria-label="Like">{liked ? "♥" : "♡"}</motion.button>
          <motion.button whileTap={{ scale: 1.4 }} onClick={() => setSaved(!saved)} className={`ml-auto ${saved ? "text-gold" : ""}`} aria-label="Save">{saved ? "★" : "☆"}</motion.button>
        </div>
        <p className="pt-2 text-sm"><b>{liked ? "1,249" : "1,248"} likes</b> · A new reason to visit. Fresh creative. Stronger brand recall.</p>
        <p className="pt-1 text-xs text-muted-foreground">Double-tap the photo ✦ Like • Save • Visit</p>
      </Tilt>
    </motion.div>
  </div>;
}

function Industries() {
  const [a, setA] = useState(0);
  const ind = [["Restaurants & cafés", "Menus, launches, reviews, food-first social."], ["Retail & fashion", "Collections, product storytelling, campaigns."], ["Lifestyle & wellness", "Trust-building content and service explainers."], ["Local services", "Professional identity, offers and lead generation."]];
  return <Wrap>
    <Kicker>More than one industry</Kicker>
    <H a="The right story works for" b="any good business." />
    <div className="mt-12 grid gap-10 lg:grid-cols-2">
      <div className="space-y-1">{ind.map(([t], i) => <button key={t} onMouseEnter={() => setA(i)} onClick={() => setA(i)} className={`block text-left text-3xl font-bold transition-all sm:text-5xl ${a === i ? "translate-x-3 text-gold" : "text-stroke opacity-60"}`}>{t}</button>)}</div>
      <motion.div key={a} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="self-center rounded-2xl border border-gold/30 bg-card/60 p-8">
        <p className="text-sm text-gold">0{a + 1} / 04</p><p className="mt-4 font-serif-i text-4xl">{ind[a]![1]}</p>
        <p className="mt-6 text-muted-foreground">We adapt the creative approach to how your customers discover and choose you.</p>
      </motion.div>
    </div>
  </Wrap>;
}

function Sprint() {
  const [w, setW] = useState(0);
  const weeks = [["Audit & align", "Goals, audience, brand and channel review."], ["Build the look", "Visual direction, key messaging and asset drafts."], ["Create & launch", "Approved creative goes live on selected channels."], ["Review & refine", "Review feedback, content performance and next steps."]];
  return <Wrap>
    <Kicker>How the work moves</Kicker>
    <H a="A focused 30-day" b="launch sprint." />
    <Sub>An illustrative starting plan. Exact timing and deliverables are agreed with each client.</Sub>
    <div className="mt-10 h-1.5 w-full overflow-hidden rounded-full bg-secondary"><motion.div animate={{ width: `${(w + 1) * 25}%` }} className="h-full bg-gold" /></div>
    <div className="mt-6 grid gap-3 sm:grid-cols-4">
      {weeks.map(([t, d], i) => <button key={t} onMouseEnter={() => setW(i)} onClick={() => setW(i)} className={`rounded-2xl border p-6 text-left transition-all ${i <= w ? "border-gold/60 bg-card" : "border-border opacity-50"}`}>
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Week 0{i + 1}</p><p className="mt-3 text-xl font-bold uppercase">{t}</p><p className="mt-2 text-sm text-muted-foreground">{d}</p>
      </button>)}
    </div>
    <p className="mt-8 text-xs uppercase tracking-[0.3em] text-muted-foreground">Clear milestones / Shared approvals / No surprises</p>
  </Wrap>;
}

function Priorities() {
  const mods = [["Brand kit", "Visual direction • typography • color • logo treatment"], ["Short-form video", "Reel concepts • scripts • edits"], ["Content system", "Post templates • content pillars • captions"], ["Creator activations", "Outreach • collaboration coordination • briefs"], ["Menu & promotions", "Menu refresh • seasonal visuals • offer creatives"], ["Campaign review", "Posting plan • feedback • reporting"]];
  const [sel, setSel] = useState<number[]>([0, 2]);
  return <Wrap>
    <Kicker>Pick your priorities</Kicker>
    <div className="flex flex-wrap items-end justify-between gap-6"><H a="What we can" b="build together." /><motion.p key={sel.length} initial={{ scale: 1.3 }} animate={{ scale: 1 }} className="text-6xl font-bold text-gold">{sel.length}<span className="text-xl text-muted-foreground"> / 6 selected</span></motion.p></div>
    <p className="mt-4 text-muted-foreground">Tap the modules that fit your business.</p>
    <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {mods.map(([t, d], i) => { const on = sel.includes(i); return <motion.button key={t} whileTap={{ scale: 0.96 }} onClick={() => setSel(on ? sel.filter((x) => x !== i) : [...sel, i])} className={`flex items-start gap-4 rounded-2xl border p-6 text-left transition-colors ${on ? "border-gold bg-gold/15" : "border-border bg-card/60"}`}>
        <span className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border ${on ? "border-gold bg-gold text-primary-foreground" : "border-border"}`}>{on && "✓"}</span>
        <span><span className="block text-xl font-bold uppercase">{t}</span><span className="mt-1 block text-sm text-muted-foreground">{d}</span></span>
      </motion.button>; })}
    </div>
  </Wrap>;
}

function Offer() {
  const [flip, setFlip] = useState(false);
  return <Wrap>
    <Kicker>Our founding partner invitation</Kicker>
    <h2 className="text-6xl font-bold leading-[0.9] tracking-tight sm:text-8xl lg:text-[9rem]"><Words text="The first" delay={0.1} /><Words text="10 brands." delay={0.3} className="font-serif-i text-gold" /></h2>
    <div className="mt-10 grid gap-6 lg:grid-cols-2">
      <motion.button {...rise(0.6)} onClick={() => setFlip(!flip)} style={{ perspective: 1200 }} className="h-64 text-left">
        <motion.div animate={{ rotateY: flip ? 180 : 0 }} transition={{ type: "spring", stiffness: 80 }} style={{ transformStyle: "preserve-3d" }} className="relative h-full">
          <div style={{ backfaceVisibility: "hidden" }} className="absolute inset-0 flex flex-col justify-center rounded-3xl bg-gold p-8 text-primary-foreground">
            <p className="text-sm uppercase tracking-[0.3em]">Selected services</p><p className="mt-2 text-5xl font-bold">No agency fee.</p><p className="mt-4 text-sm opacity-70">Tap to see the details →</p>
          </div>
          <div style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }} className="absolute inset-0 flex flex-col justify-center rounded-3xl border border-gold bg-card p-8">
            <p className="text-lg">For our first founding partners, we can offer a limited set of agreed services at no agency service fee.</p><p className="mt-4 text-muted-foreground">Scope, duration and mutual expectations are confirmed before work begins.</p>
          </div>
        </motion.div>
      </motion.button>
      <motion.div {...rise(0.8)} className="flex flex-col justify-center">
        <p className="text-xl text-muted-foreground">An introductory opportunity to explore what stronger creative marketing can do for your business.</p>
        <p className="mt-6 border-l-2 border-gold pl-4 text-sm text-muted-foreground"><b className="text-foreground">Third-party costs:</b> ad spend, influencer fees, shoots and outside expenses are not included unless agreed.</p>
      </motion.div>
    </div>
  </Wrap>;
}

function Contact() {
  return <Wrap>
    <Kicker>Let’s build your next chapter</Kicker>
    <h2 className="text-6xl font-bold leading-[0.9] tracking-tight sm:text-8xl lg:text-[8.5rem]"><Words text="Be the brand" delay={0.1} /><br /><Words text="they remember." delay={0.35} className="font-serif-i text-gold" /></h2>
    <Sub d={0.7}>Tell us what you want your customers to feel, see and do. We will help shape the story.</Sub>
    <motion.div {...rise(0.9)} className="mt-12 flex flex-wrap gap-3">
      <a href="mailto:Marketing@avermontbd.com" className="rounded-full bg-gold px-7 py-4 font-bold text-primary-foreground transition-transform hover:scale-105">Marketing@avermontbd.com</a>
      <a href="https://wa.me/8801534630290" target="_blank" rel="noreferrer" className="rounded-full border border-gold px-7 py-4 font-bold text-gold transition-colors hover:bg-gold hover:text-primary-foreground">WhatsApp +880 1534 630290</a>
      <a href="http://avermontbd.com/" target="_blank" rel="noreferrer" className="rounded-full border border-border px-7 py-4 font-bold transition-colors hover:border-foreground">avermontbd.com ↗</a>
    </motion.div>
  </Wrap>;
}

export const slides: { title: string; C: (p: M) => React.ReactElement }[] = [
  { title: "Make your business unmissable", C: Cover },
  { title: "The opportunity", C: Opportunity },
  { title: "The problem we solve", C: Problem },
  { title: "Our working method", C: Method },
  { title: "What we do", C: Services },
  { title: "Restaurants & cafés", C: Restaurants },
  { title: "More than one industry", C: Industries },
  { title: "30-day launch sprint", C: Sprint },
  { title: "Pick your priorities", C: Priorities },
  { title: "Founding partner invitation", C: Offer },
  { title: "Let's talk", C: Contact },
];
