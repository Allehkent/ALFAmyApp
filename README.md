# FRAME.

**No soft edges. A five-frame editorial system.**
Square only. Full bleed. One accent.

FRAME is the brand-system prototype in this repository (`ALFAmyApp`). It is a single-viewport, no-scroll deck: five hard-cut frames that state the visual rules used across ALFA Group digital surfaces.

Live source: [github.com/Allehkent/ALFAmyApp](https://github.com/Allehkent/ALFAmyApp)

---

## What it is

A full-bleed editorial deck, not a parcel operations dashboard.

| Frame | Label     | Purpose |
| ----- | --------- | ------- |
| 01    | Manifesto | Hero cut: *No soft edges.* |
| 02    | System    | Five rules of the frame |
| 03    | Blocks    | Contact sheet of four plates (Facade, Void, Signal, Stack) |
| 04    | Strike    | Interactive plate — tap to strike, eight hits to lock |
| 05    | Close     | *The frame holds.* Reset or leave it cut |

Navigation is swipe, tap on the index, or keyboard (`←` `→`, Home, End). Space strikes the plate on frame 04. There is no page scroll.

---

## Rules of the frame

1. **Square only** — every corner is 90°.
2. **One idea** — one thought per frame.
3. **Hard cuts** — short eases. No bounce.
4. **One accent** — vermillion, used once.
5. **Full bleed** — edge to edge. No scroll.

These rules are implemented in tokens, not comments. Radius utilities are locked to `0`. Overflow is clipped on `html` / `body`. Motion uses short cubic-bezier eases.

---

## Brand tokens

| Token | Role | Value |
| ----- | ---- | ----- |
| Accent / vermillion | Signal | `#ff3319` |
| Ink / charcoal | Background | `#090909` |
| Surface | Raised field | `#121211` |
| Foreground | Type | `#f2f0e9` |
| Muted | Meta type | `#8c887e` |
| Border | Hairline | `#2c2c29` |

Type: **Syne** (display, 700/800) and **IBM Plex Sans** (UI, 400/500/600).

ALFA Group production surfaces use ALFA Red `#dc2626`, Transit Charcoal `#171717`, and Interface Gray `#f0f0f0`. FRAME is the editorial extreme of that palette — sharper ink, one vermillion strike — not a replacement for myALFA product chrome.

---

## Stack

- React 19 + TypeScript
- TanStack Router / Start
- Vite 8
- Tailwind CSS 4 (`@theme` tokens in `src/styles.css`)
- Radix primitives (available; FRAME itself is custom plates + deck)
- Optional Better Auth + PGlite / Postgres — **off by default**

Auth is gated by `VITE_AUTH_ENABLED` in `.grok/app-env.json`. Do not wire accounts, sessions, or migrations unless the product needs per-user state.

---

## Layout

```text
src/
  components/
    frame-deck.tsx    # five-frame deck, swipe + keyboard
    plates.tsx        # Facade / Void / Signal / Stack
  routes/
    __root.tsx        # document shell, fonts, theme-color
    index.tsx         # mounts FrameDeck
  styles.css          # tokens, zero-radius, no-scroll base
  lib/og/site.json    # share-card copy
public/
  favicon.svg
  og.jpg
screenshots/          # QA captures from the builder pass
```

---

## Run locally

Requires Node.js 22+.

```bash
npm install
npm run dev
```

Dev server binds `0.0.0.0:8080`.

```bash
npm run build          # production build + migrate hook
npm run preview        # serve the build
npm run typecheck
npm run lint
npm test
```

`startup.sh` is the sandbox revive script. It starts `npm run dev` only if nothing is already listening on `:8080`.

---

## Interaction notes

- Horizontal swipe or arrow keys move between frames.
- Index pips in the chrome jump to a frame.
- Frame 04 (`Strike`) fills eight bands on tap; the ninth tap resets.
- Frame 05 (`Begin again`) returns to 01.
- Designed for both desktop and a 390×844 mobile viewport. Touch-action is locked; do not add scroll containers.

---

## What this repo is not

This repository is **not** the myALFA customer dashboard (tracking, redirects, returns, ALFA numbers, ALFA parcel shops). FRAME is the editorial system those surfaces should inherit from: hard geometry, one accent, no decorative radius.

When product UI is added here, keep React + Tailwind. Prefer Headless UI for new operational components. Keep FRAME tokens as the source of truth for ink, accent, and type.
