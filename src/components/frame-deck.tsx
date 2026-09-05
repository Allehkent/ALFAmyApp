import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { Plates } from "@/components/plates";

const TOTAL = 5;
const STRIKE_MAX = 8;
const STRIKE_WORDS = [
  "Tap",
  "Corner",
  "Edge",
  "Cut",
  "Hold",
  "Lock",
  "Frame",
  "Set",
  "Locked",
] as const;

const INDEX = ["01", "02", "03", "04", "05"] as const;
const LABELS = ["Manifesto", "System", "Blocks", "Strike", "Close"] as const;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function FrameDeck() {
  const [index, setIndex] = useState(0);
  const [strikes, setStrikes] = useState(0);
  const pointer = useRef<{ x: number; y: number; id: number } | null>(null);
  const swiped = useRef(false);

  const go = useCallback((next: number) => {
    setIndex((current) => {
      const clamped = Math.max(0, Math.min(TOTAL - 1, next));
      return clamped === current ? current : clamped;
    });
  }, []);

  const prev = useCallback(() => go(index - 1), [go, index]);
  const next = useCallback(() => go(index + 1), [go, index]);

  const strike = useCallback(() => {
    setStrikes((n) => (n >= STRIKE_MAX ? 0 : n + 1));
    if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
      navigator.vibrate(12);
    }
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        go(index + 1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(index - 1);
      } else if (event.key === "Home") {
        event.preventDefault();
        go(0);
      } else if (event.key === "End") {
        event.preventDefault();
        go(TOTAL - 1);
      } else if (event.key === " " && index === 3) {
        event.preventDefault();
        strike();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index, strike]);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    pointer.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
    swiped.current = false;
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const start = pointer.current;
    if (!start || event.pointerId !== start.id) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy)) {
      event.preventDefault();
    }
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = pointer.current;
    pointer.current = null;
    if (!start || event.pointerId !== start.id) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
    swiped.current = true;
    if (dx < 0) go(index + 1);
    else go(index - 1);
  };

  return (
    <main
      className="deck-shell"
      style={{ "--deck-i": index } as CSSProperties}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={() => {
        pointer.current = null;
      }}
      aria-roledescription="carousel"
      aria-label="FRAME"
    >
      <header className="chrome chrome-top">
        <p className="font-display text-lg font-extrabold tracking-tight text-fg">
          FRAME<span className="text-accent">.</span>
        </p>
        <p className="meta tabular-nums text-fg" aria-live="polite">
          {INDEX[index]}
        </p>
      </header>

      <div className="deck-track">
        <section className="deck-slide" aria-hidden={index !== 0} aria-label="01 Manifesto">
          <Hero />
        </section>
        <section className="deck-slide" aria-hidden={index !== 1} aria-label="02 System">
          <Rules />
        </section>
        <section className="deck-slide" aria-hidden={index !== 2} aria-label="03 Blocks">
          <Blocks />
        </section>
        <section className="deck-slide" aria-hidden={index !== 3} aria-label="04 Strike">
          <Strike
            strikes={strikes}
            onStrike={() => {
              if (swiped.current) return;
              strike();
            }}
          />
        </section>
        <section className="deck-slide" aria-hidden={index !== 4} aria-label="05 Close">
          <Close onAgain={() => go(0)} />
        </section>
      </div>

      <footer className="chrome chrome-bottom">
        <button
          type="button"
          className="sq"
          onClick={prev}
          disabled={index === 0}
          aria-label="Previous frame"
        >
          <span className="caret caret-prev" />
        </button>
        <div className="flex items-center" role="tablist" aria-label="Frames">
          {INDEX.map((label, i) => (
            <button
              key={label}
              type="button"
              className="pip"
              role="tab"
              aria-label={`${label} ${LABELS[i]}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => go(i)}
            />
          ))}
        </div>
        <button
          type="button"
          className="sq"
          onClick={next}
          disabled={index === TOTAL - 1}
          aria-label="Next frame"
        >
          <span className="caret caret-next" />
        </button>
      </footer>
    </main>
  );
}

function Hero() {
  return (
    <div className="slide-pad flex h-full flex-col">
      <p className="meta">Manifesto</p>
      <div className="flex min-h-0 flex-1 flex-col justify-end pb-2 md:justify-center md:pb-0">
        <h1 className="display text-fg">
          No
          <br />
          soft
          <br />
          edges<span className="text-accent">.</span>
        </h1>
        <p className="mt-6 max-w-[22ch] text-sm leading-snug text-muted md:text-base">
          The viewport is a rectangle. Radius is a habit. We cut it.
        </p>
      </div>
    </div>
  );
}

function Rules() {
  const rules = [
    { n: "01", title: "Square only", body: "Every corner is 90°." },
    { n: "02", title: "One idea", body: "One thought per frame." },
    { n: "03", title: "Hard cuts", body: "Short eases. No bounce." },
    { n: "04", title: "One accent", body: "Vermillion, used once." },
    { n: "05", title: "Full bleed", body: "Edge to edge. No scroll." },
  ] as const;

  return (
    <div className="slide-pad flex h-full flex-col">
      <p className="meta">System</p>
      <h2 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-fg md:mt-5 md:text-5xl">
        Rules of the frame.
      </h2>
      <ol className="mt-5 w-full max-w-xl md:mt-10">
        {rules.map((rule) => (
          <li key={rule.n} className="rule-row">
            <span className="meta pt-1 tabular-nums text-accent">{rule.n}</span>
            <div>
              <p className="font-display text-rule font-bold tracking-tight text-fg">{rule.title}</p>
              <p className="mt-1 text-sm text-muted">{rule.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Blocks() {
  return (
    <div className="slide-pad flex h-full flex-col">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <p className="meta">Blocks</p>
        <p className="meta hidden sm:block">Contact sheet</p>
      </div>
      <div className="flex min-h-0 flex-1 items-center justify-center">
        <div className="grid aspect-square w-full max-w-[min(100%,calc(100dvh-14rem))] grid-cols-2 grid-rows-2 gap-1">
          <Plates />
        </div>
      </div>
    </div>
  );
}

function Strike({ strikes, onStrike }: { strikes: number; onStrike: () => void }) {
  const locked = strikes >= STRIKE_MAX;
  const word = STRIKE_WORDS[strikes];

  return (
    <div className="slide-pad flex h-full flex-col">
      <p className="meta">Strike</p>
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-6">
        <button
          type="button"
          className="strike"
          onClick={onStrike}
          aria-label={locked ? "Reset the plate" : "Strike the plate"}
        >
          {Array.from({ length: STRIKE_MAX }, (_, i) => {
            const filled = strikes > i;
            const top = ((STRIKE_MAX - 1 - i) / STRIKE_MAX) * 100;
            return (
              <span
                key={i}
                className="strike-band"
                style={{
                  top: `${top}%`,
                  height: `${100 / STRIKE_MAX}%`,
                  display: filled ? "block" : "none",
                }}
              />
            );
          })}
          <span
            className={`relative z-10 font-display text-4xl font-extrabold tracking-tight md:text-5xl ${
              locked ? "text-ink" : "text-fg"
            }`}
          >
            {word}
          </span>
        </button>
        <p className="meta tabular-nums text-fg">
          {pad(strikes)}
          <span className="text-muted"> / {pad(STRIKE_MAX)} strikes</span>
        </p>
      </div>
    </div>
  );
}

function Close({ onAgain }: { onAgain: () => void }) {
  return (
    <div className="slide-pad flex h-full flex-col">
      <p className="meta">Close</p>
      <div className="flex min-h-0 flex-1 flex-col justify-end pb-2 md:justify-center md:pb-0">
        <h2 className="display text-fg">
          The
          <br />
          frame
          <br />
          holds<span className="text-accent">.</span>
        </h2>
        <p className="mt-6 max-w-[28ch] text-sm leading-snug text-muted md:text-base">
          Five frames. One accent. No scroll. Begin again, or leave it cut.
        </p>
        <div className="mt-8">
          <button type="button" className="cta" onClick={onAgain}>
            Begin again
          </button>
        </div>
      </div>
    </div>
  );
}
