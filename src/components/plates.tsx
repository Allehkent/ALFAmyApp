function Grain({ id }: { id: string }) {
  return (
    <svg className="grain" aria-hidden="true">
      <filter id={id}>
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter={`url(#${id})`} />
    </svg>
  );
}

function Facade() {
  const cells = Array.from({ length: 64 }, (_, i) => {
    const col = i % 8;
    const row = Math.floor(i / 8);
    const accent = col === 5 && row === 2;
    const voidCell = (col + row) % 3 === 0;
    const deep = (col * 3 + row * 5) % 7 === 0;
    return { i, accent, voidCell, deep };
  });

  return (
    <div className="plate h-full w-full">
      <div className="grid h-full w-full grid-cols-8 grid-rows-8 gap-px bg-border p-px">
        {cells.map((cell) => (
          <div
            key={cell.i}
            className={
              cell.accent
                ? "bg-accent"
                : cell.voidCell
                  ? "bg-bg"
                  : cell.deep
                    ? "bg-surface"
                    : "bg-muted/25"
            }
          />
        ))}
      </div>
      <Grain id="grain-facade" />
      <span className="plate-caption">01 Facade</span>
    </div>
  );
}

function VoidPlate() {
  return (
    <div className="plate h-full w-full bg-fg">
      <div className="plate-window">
        <div className="h-full w-full bg-bg" />
      </div>
      <Grain id="grain-void" />
      <span className="plate-caption">02 Void</span>
    </div>
  );
}

function Signal() {
  return (
    <div className="plate h-full w-full bg-accent">
      <div className="absolute inset-0 grid place-items-center">
        <div className="h-1/3 w-1/3 bg-ink" />
      </div>
      <Grain id="grain-signal" />
      <span className="plate-caption">03 Signal</span>
    </div>
  );
}

function Stack() {
  const bands = [0.08, 0.16, 0.11, 0.22, 0.09, 0.18, 0.13, 0.2];
  return (
    <div className="plate h-full w-full">
      <div className="flex h-full w-full flex-col gap-px bg-border">
        {bands.map((mix, i) => (
          <div
            key={i}
            className="min-h-0 flex-1"
            style={{
              background: `color-mix(in oklab, var(--color-fg) ${Math.round(mix * 100)}%, var(--color-bg))`,
            }}
          />
        ))}
      </div>
      <Grain id="grain-stack" />
      <span className="plate-caption">04 Stack</span>
    </div>
  );
}

export function Plates() {
  return (
    <>
      <Facade />
      <VoidPlate />
      <Signal />
      <Stack />
    </>
  );
}
