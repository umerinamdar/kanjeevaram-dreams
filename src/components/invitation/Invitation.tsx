import { useEffect, useRef, useState } from "react";
import sealed from "@/assets/sealed-backdrop.jpg";
import hero from "@/assets/hero-backdrop.jpg";
import seal from "@/assets/wax-seal.png";
import paper from "@/assets/paper-texture.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import { ScratchCard } from "./ScratchCard";
import { couple, countdownParts, formatIST, programme, venue, wedding } from "./data";

type Stage = "sealed" | "opening" | "revealed";

export function Invitation() {
  const [stage, setStage] = useState<Stage>("sealed");
  const [namesIn, setNamesIn] = useState(false);
  const music = useRef<HTMLAudioElement>(null);
  const sfx = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    document.body.classList.toggle("inv-locked", stage !== "revealed");
    return () => document.body.classList.remove("inv-locked");
  }, [stage]);

  const open = () => {
    if (stage !== "sealed") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    sfx.current?.play().catch(() => {});
    const m = music.current;
    if (m) {
      m.muted = true;
      m.volume = 0;
      m.play()
        .then(() => {
          m.muted = false;
          const start = performance.now();
          const step = (t: number) => {
            const p = Math.min(1, (t - start) / 8000);
            m.volume = 0.6 * p;
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        })
        .catch(() => {});
    }
    setStage("opening");
    setTimeout(() => setNamesIn(true), reduced ? 0 : 2200);
    setTimeout(() => setStage("revealed"), reduced ? 50 : 6000);
  };

  const parted = stage !== "sealed";

  return (
    <main className="relative bg-inv-bg text-inv-fg">
      <audio ref={music} src="/audio/music.wav" loop preload="auto" />
      <audio ref={sfx} src="/audio/seal.wav" preload="auto" />

      {/* HERO: courtyard (revealed) */}
      <section className="relative flex h-[100dvh] items-center justify-center overflow-hidden">
        <img
          src={hero}
          alt="Temple courtyard at dawn with brass lamps and a kolam"
          width={1536}
          height={1024}
          className="hero-bg absolute inset-0 h-full w-full object-cover"
          style={{ transform: parted ? "scale(1)" : "scale(1.12)", filter: parted ? "brightness(1)" : "brightness(0.55)" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--inv-background)_110%)]" />
        <div className="relative z-10 px-6 text-center">
          <p className={`fade-up label-caps text-inv-ink ${namesIn ? "in" : ""}`}>Together with their families</p>
          <h1 className={`fade-up mt-4 font-display text-[clamp(3rem,13vw,8rem)] leading-[0.95] italic text-inv-surface drop-shadow-[0_2px_12px_var(--inv-paper-light)] ${namesIn ? "in" : ""}`} style={{ transitionDelay: "0.4s" }}>
            {couple.a}
            <span className="block font-display text-[0.5em] not-italic text-inv-border">&amp;</span>
            {couple.b}
          </h1>
          <p className={`fade-up mt-6 label-caps text-inv-ink ${namesIn ? "in" : ""}`} style={{ transitionDelay: "1s" }}>
            request the honour of your presence
          </p>
        </div>
        {stage === "revealed" && (
          <p className="absolute bottom-6 z-10 label-caps text-inv-ink/70 animate-pulse">Scroll</p>
        )}
      </section>

      {/* SEALED: drapes overlay */}
      {stage !== "revealed" && (
        <div className="fixed inset-0 z-50 overflow-hidden" aria-hidden={parted}>
          <div
            className={`curtain curtain-l absolute inset-y-0 left-0 w-1/2 bg-cover ${parted ? "open" : ""}`}
            style={{ backgroundImage: `url(${sealed})`, backgroundSize: "200% 100%", backgroundPosition: "left center" }}
          />
          <div
            className={`curtain curtain-r absolute inset-y-0 right-0 w-1/2 bg-cover ${parted ? "open" : ""}`}
            style={{ backgroundImage: `url(${sealed})`, backgroundSize: "200% 100%", backgroundPosition: "right center" }}
          />
          <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-700 ${parted ? "pointer-events-none opacity-0" : ""}`}>
            <button
              onClick={open}
              aria-label={`Open the invitation of ${couple.a} and ${couple.b}`}
              className="seal-pulse relative w-[min(46vw,220px)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-inv-accent"
            >
              <img src={seal} alt="" width={816} height={816} className="w-full drop-shadow-[0_14px_20px_rgb(0_0_0/0.55)]" />
              <span className="absolute inset-0 flex items-center justify-center font-display text-[min(8vw,2.4rem)] italic zari-text">
                {couple.initials}
              </span>
            </button>
            <span className="mt-6 rounded-sm border border-inv-accent/70 bg-inv-surface/80 px-4 py-1.5 label-caps text-inv-accent-soft backdrop-blur-sm">
              Tap to open
            </span>
            <p className="mt-4 font-display text-[clamp(1.6rem,6vw,2.6rem)] italic zari-text drop-shadow">
              {couple.a} &amp; {couple.b}
            </p>
          </div>
        </div>
      )}

      {/* CONTENT */}
      <div className="relative" style={{ backgroundImage: `url(${paper})`, backgroundSize: "400px" }}>
        <Section>
          <ScratchCard date={wedding.dateLabel} time={wedding.timeLabel} />
        </Section>

        <Section title="The Venue">
          <p className="font-display text-4xl italic text-inv-accent-soft">{venue.name}</p>
          <p className="mt-2 text-inv-muted">{venue.address}</p>
          <a href={venue.mapsUrl} target="_blank" rel="noreferrer" className="mt-6 inline-block rounded-full border border-inv-accent px-6 py-3 label-caps text-inv-accent-soft transition hover:bg-inv-accent hover:text-inv-ink">
            Open in Google Maps
          </a>
        </Section>

        <Section title="Counting the moments">
          <Countdown />
        </Section>

        <Section title="Programme">
          <ol className="mx-auto max-w-md space-y-6 text-left">
            {programme.map((p) => (
              <li key={p.name} className="flex gap-5 border-b border-inv-border/50 pb-5">
                <span className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-inv-accent" />
                <div>
                  <p className="font-display text-2xl text-inv-accent-soft">{p.name}</p>
                  <p className="label-caps text-inv-muted">{formatIST(p.iso)} IST</p>
                  <p className="mt-1 text-sm text-inv-fg/80">{p.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section title="Moments">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[g1, g2, hero, sealed].map((src, i) => (
              <img key={i} src={src} alt="" loading="lazy" className="aspect-[3/4] w-full rounded-md border border-inv-border/60 object-cover" />
            ))}
          </div>
        </Section>

        <Section>
          <blockquote className="mx-auto max-w-xl font-display text-2xl italic leading-relaxed text-inv-accent-soft md:text-3xl">
            “Take the seventh step with me, and be my friend for all the lives to come.”
          </blockquote>
          <p className="mt-4 label-caps text-inv-muted">Saptapadi</p>
        </Section>

        <section className="relative overflow-hidden py-28 text-center">
          <img src={hero} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-40" />
          <div className="relative px-6">
            <p className="label-caps text-inv-accent-soft">With love &amp; blessings</p>
            <p className="mt-4 font-display text-5xl italic zari-text md:text-7xl">{couple.a} &amp; {couple.b}</p>
            <p className="mt-4 text-inv-muted">{wedding.dateLabel}</p>
          </div>
        </section>
      </div>
    </main>
  );
}

function Section({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 text-center">
      {title && (
        <>
          <p className="label-caps text-inv-accent">{title}</p>
          <div className="zari-rule mx-auto mt-4 mb-10 w-32" />
        </>
      )}
      {children}
    </section>
  );
}

function Countdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const p = countdownParts(wedding.iso, now ?? new Date(wedding.iso).getTime());
  return (
    <div className="mx-auto grid max-w-lg grid-cols-4 gap-2 sm:gap-4" aria-live="polite">
      {(["days", "hours", "minutes", "seconds"] as const).map((k) => (
        <div key={k} className="rounded-lg border border-inv-border/70 bg-inv-surface/60 py-4">
          <p className="font-display text-3xl tabular-nums text-inv-accent-soft sm:text-5xl">{now === null ? "–" : p[k]}</p>
          <p className="label-caps mt-1 text-[0.6rem] text-inv-muted">{k}</p>
        </div>
      ))}
    </div>
  );
}
