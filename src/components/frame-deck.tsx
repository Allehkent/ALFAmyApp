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
const LABELS = ["Homepage", "Three Pillars", "Quick Links", "Tracking", "About"] as const;

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
      aria-label="ALFA Logistics"
    >
      <header className="chrome chrome-top">
        <p className="font-display text-lg font-extrabold tracking-tight text-fg">
          ALFA<span className="text-accent">.</span>
        </p>
        <p className="meta tabular-nums text-fg" aria-live="polite">
          {INDEX[index]}
        </p>
      </header>

      <div className="deck-track">
        <section className="deck-slide" aria-hidden={index !== 0} aria-label="01 Homepage">
          <Hero />
        </section>
        <section className="deck-slide" aria-hidden={index !== 1} aria-label="02 Three Pillars">
          <Rules />
        </section>
        <section className="deck-slide" aria-hidden={index !== 2} aria-label="03 Quick Links">
          <Blocks />
        </section>
        <section className="deck-slide" aria-hidden={index !== 3} aria-label="04 Tracking">
          <Strike
            strikes={strikes}
            onStrike={() => {
              if (swiped.current) return;
              strike();
            }}
          />
        </section>
        <section className="deck-slide" aria-hidden={index !== 4} aria-label="05 About">
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
      <p className="meta">Homepage</p>
      <div className="flex min-h-0 flex-1 flex-col justify-end pb-2 md:justify-center md:pb-0">
        <h1 className="display text-fg">
          Limitless<span className="text-accent">.</span>
          <br />
          Simple<span className="text-accent">.</span>
          <br />
          Worldwide<span className="text-accent">.</span>
        </h1>
        <p className="mt-6 max-w-[28ch] text-sm leading-snug text-muted md:text-base">
          Your steps to Germany-wide and international shipping with ALFA Logistics.
        </p>
        <div className="mt-8">
          <button type="button" className="cta">
            Send parcel
          </button>
        </div>
      </div>
    </div>
  );
}

function Rules() {
  const rules = [
    {
      n: "01",
      title: "Sending parcels",
      body: "Whether your parcels are large or small, shipped privately or for business, ALFA always has the ideal solution for domestic and international shipping.",
    },
    {
      n: "02",
      title: "Receiving parcels",
      body: "Won't be at home? No problem. Redirect your parcel or register a delivery preference: deposit okay, neighbour, or collection at an ALFA Point.",
    },
    {
      n: "03",
      title: "Returning parcels",
      body: "The parcel has to go back? As a shipper you can use ALFA Returns to offer your customers a simple, individual returns service.",
    },
  ] as const;

  return (
    <div className="slide-pad flex h-full flex-col">
      <p className="meta">Three Pillars</p>
      <h2 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-fg md:mt-5 md:text-5xl">
        How we help.
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
        <p className="meta">Quick Links</p>
        <p className="meta hidden sm:block">Get started</p>
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
  return (
    <div className="slide-pad flex h-full flex-col">
      <p className="meta">Parcel Tracking</p>
      <div className="flex min-h-0 flex-1 flex-col justify-end pb-2 md:justify-center md:pb-0">
        <h2 className="display text-fg">
          Where is my
          <br />
          parcel<span className="text-accent">?</span>
        </h2>
        <p className="mt-6 max-w-[26ch] text-sm leading-snug text-muted md:text-base">
          Enter your ALFA parcel number and follow every step from pickup to doorstep.
        </p>
        <div className="mt-8 flex flex-col gap-4">
          <input
            type="text"
            placeholder="e.g. ALFA123456789DE"
            className="w-full max-w-xs border border-border bg-surface px-4 py-2 text-fg placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button type="button" className="cta w-fit">
            Track parcel
          </button>
        </div>
      </div>
    </div>
  );
}

function Close({ onAgain }: { onAgain: () => void }) {
  return (
    <div className="slide-pad flex h-full flex-col">
      <p className="meta">About ALFA</p>
      <div className="flex min-h-0 flex-1 flex-col justify-end pb-2 md:justify-center md:pb-0">
        <h2 className="display text-fg">
          Parcel
          <br />
          shipping
          <br />
          simplified<span className="text-accent">.</span>
        </h2>
        <p className="mt-6 max-w-[28ch] text-sm leading-snug text-muted md:text-base">
          ALFA Logistics is your partner for parcel shipping within Germany and internationally. With our growing network of ALFA Points, we are always just around the corner.
        </p>
        <div className="mt-8">
          <button type="button" className="cta" onClick={onAgain}>
            Back to top
          </button>
        </div>
      </div>
    </div>
  );
}
