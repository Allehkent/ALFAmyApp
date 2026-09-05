#!/usr/bin/env python3
"""Geometric editorial OG card for FRAME. — 1200×630, code-drawn type."""
from PIL import Image, ImageDraw

# 2× working canvas, then Lanczos down to 1200×630 for sharp edges.
SW, SH = 2400, 1260
BLACK = (9, 9, 9)  # #090909
PAPER = (242, 240, 233)  # #F2F0E9
RED = (255, 51, 25)  # #FF3319


def rect(d, x, y, w, h, fill):
    d.rectangle([round(x), round(y), round(x + w - 1), round(y + h - 1)], fill=fill)


def poly(d, pts, fill):
    d.polygon([(round(x), round(y)) for x, y in pts], fill=fill)


def draw_crop_marks(d, m, length, thick, fill):
    w, h = SW, SH
    t = thick
    L = length
    # top-left
    rect(d, m, m, L, t, fill)
    rect(d, m, m, t, L, fill)
    # top-right
    rect(d, w - m - L, m, L, t, fill)
    rect(d, w - m - t, m, t, L, fill)
    # bottom-left
    rect(d, m, h - m - t, L, t, fill)
    rect(d, m, h - m - L, t, L, fill)
    # bottom-right
    rect(d, w - m - L, h - m - t, L, t, fill)
    rect(d, w - m - t, h - m - L, t, L, fill)


def letter_F(d, x, y, w, h, t, fill):
    rect(d, x, y, t, h, fill)
    rect(d, x, y, w, t, fill)
    rect(d, x, y + h * 0.42, w * 0.72, t, fill)


def letter_R(d, x, y, w, h, t, fill):
    bowl_h = h * 0.46
    rect(d, x, y, t, h, fill)
    rect(d, x, y, w, t, fill)
    rect(d, x + w - t, y, t, bowl_h, fill)
    rect(d, x, y + bowl_h - t, w, t, fill)
    # Square-cut diagonal leg
    inner = x + t * 0.85
    poly(
        d,
        [
            (inner, y + bowl_h - 1),
            (inner + t * 1.15, y + bowl_h - 1),
            (x + w, y + h),
            (x + w - t * 1.15, y + h),
        ],
        fill,
    )


def letter_A(d, x, y, w, h, t, fill):
    # Gate A — flat top, rectangular counter, square geometry
    rect(d, x, y, t, h, fill)
    rect(d, x + w - t, y, t, h, fill)
    rect(d, x, y, w, t, fill)
    rect(d, x, y + h * 0.42, w, t, fill)


def letter_M(d, x, y, w, h, t, fill):
    rect(d, x, y, t, h, fill)
    rect(d, x + w - t, y, t, h, fill)
    # Inner V as two thick diagonals meeting at the top center
    cx = x + w / 2
    drop = h * 0.62
    # left diagonal
    poly(
        d,
        [
            (x + t - 1, y),
            (x + t + t * 0.95, y),
            (cx + t * 0.35, y + drop),
            (cx - t * 0.55, y + drop),
        ],
        fill,
    )
    # right diagonal
    poly(
        d,
        [
            (x + w - t - t * 0.95, y),
            (x + w - t + 1, y),
            (cx + t * 0.55, y + drop),
            (cx - t * 0.35, y + drop),
        ],
        fill,
    )


def letter_E(d, x, y, w, h, t, fill):
    rect(d, x, y, t, h, fill)
    rect(d, x, y, w, t, fill)
    rect(d, x, y + h * 0.42, w * 0.76, t, fill)
    rect(d, x, y + h - t, w, t, fill)


def main():
    img = Image.new("RGB", (SW, SH), BLACK)
    d = ImageDraw.Draw(img)

    draw_crop_marks(d, m=96, length=56, thick=6, fill=PAPER)

    # Letter metrics at 2×. Lockup ~62% of width, vertically centered.
    H = 584
    T = 68
    WF = 216  # F, R, A, E
    WM = 272  # M a hair wider
    GAP = 44
    P = 68  # vermillion square period — same as stroke, the one accent
    PGAP = 40

    letters = [
        ("F", WF),
        ("R", WF),
        ("A", WF),
        ("M", WM),
        ("E", WF),
    ]
    total = sum(w for _, w in letters) + GAP * (len(letters) - 1) + PGAP + P
    x0 = (SW - total) / 2
    y0 = (SH - H) / 2

    drawers = {"F": letter_F, "R": letter_R, "A": letter_A, "M": letter_M, "E": letter_E}
    x = x0
    for name, w in letters:
        drawers[name](d, x, y0, w, H, T, PAPER)
        x += w + GAP

    # Period — perfect vermillion square, sitting on the baseline
    rect(d, x + PGAP - GAP, y0 + H - P, P, P, RED)

    out_2x = "/workspace/.grok/og-card-2x.png"
    img.save(out_2x, "PNG")
    final = img.resize((1200, 630), Image.Resampling.LANCZOS)
    raw = "/workspace/.grok/og-card-raw.png"
    final.save(raw, "PNG")
    print(f"wrote {raw} {final.size}")


if __name__ == "__main__":
    main()
