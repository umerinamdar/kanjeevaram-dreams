import { useEffect, useRef, useState } from "react";

export function ScratchCard({ date, time }: { date: string; time: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [gone, setGone] = useState(false);
  const drawing = useRef(false);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const dpr = window.devicePixelRatio || 1;
    const r = c.getBoundingClientRect();
    c.width = r.width * dpr;
    c.height = r.height * dpr;
    const ctx = c.getContext("2d")!;
    ctx.scale(dpr, dpr);
    const css = getComputedStyle(document.documentElement);
    const foil = css.getPropertyValue("--inv-scratch-foil").trim();
    const hi = css.getPropertyValue("--inv-highlight").trim();
    const deep = css.getPropertyValue("--inv-border").trim();
    const g = ctx.createLinearGradient(0, 0, r.width, r.height);
    g.addColorStop(0, deep);
    g.addColorStop(0.35, foil);
    g.addColorStop(0.5, hi);
    g.addColorStop(0.65, foil);
    g.addColorStop(1, deep);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, r.width, r.height);
    for (let i = 0; i < 1800; i++) {
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.12})`;
      ctx.fillRect(Math.random() * r.width, Math.random() * r.height, 1, 1);
    }
    ctx.globalCompositeOperation = "destination-out";
  }, []);

  const reveal = () => {
    setRevealed(true);
    setTimeout(() => setGone(true), 900);
  };

  const check = () => {
    const c = canvasRef.current;
    if (!c || revealed) return;
    const d = c.getContext("2d")!.getImageData(0, 0, c.width, c.height).data;
    let clear = 0;
    let n = 0;
    for (let i = 3; i < d.length; i += 64) {
      n++;
      if (d[i] === 0) clear++;
    }
    if (clear / n >= 0.38) reveal();
  };

  const scratch = (e: React.PointerEvent) => {
    if (!drawing.current) return;
    const c = canvasRef.current!;
    const r = c.getBoundingClientRect();
    const ctx = c.getContext("2d")!;
    ctx.beginPath();
    ctx.arc(e.clientX - r.left, e.clientY - r.top, 24, 0, Math.PI * 2);
    ctx.fill();
  };

  return (
    <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-xl border border-inv-border bg-inv-paper p-1 shadow-[var(--shadow-deep)]">
      <div className="rounded-lg border border-inv-accent/60 px-6 py-8 text-center text-inv-ink">
        <p className="label-caps opacity-70">Save the date</p>
        <p className="mt-3 font-display text-3xl italic">{date}</p>
        <p className="mt-2 label-caps">{time}</p>
      </div>
      {!gone && (
        <canvas
          ref={canvasRef}
          role="button"
          tabIndex={0}
          aria-label="Scratch to reveal the wedding date. Press Enter to reveal."
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), reveal())}
          onPointerDown={(e) => {
            drawing.current = true;
            (e.target as Element).setPointerCapture(e.pointerId);
            scratch(e);
          }}
          onPointerMove={scratch}
          onPointerUp={() => {
            drawing.current = false;
            check();
          }}
          className={`absolute inset-0 h-full w-full cursor-grab touch-none rounded-xl transition-opacity duration-700 focus-visible:outline-2 focus-visible:outline-inv-accent ${revealed ? "opacity-0" : "opacity-100"}`}
        />
      )}
      {!revealed && (
        <p className="pointer-events-none absolute inset-x-0 bottom-3 text-center label-caps text-inv-ink/80">
          Rub the gold to reveal
        </p>
      )}
    </div>
  );
}
