export interface QuickLinkCard {
  title: string;
  description: string;
  buttonText: string;
  highlight?: boolean;
}

function QuickLinkCard({ card }: { card: QuickLinkCard }) {
  return (
    <div className={`plate flex h-full w-full flex-col justify-between p-6 ${card.highlight ? "bg-accent" : "bg-surface"}`}>
      <div>
        <h3 className={`font-display text-lg font-bold tracking-tight ${card.highlight ? "text-ink" : "text-fg"}`}>
          {card.title}
        </h3>
        <p className={`mt-3 text-sm leading-snug ${card.highlight ? "text-ink/80" : "text-muted"}`}>
          {card.description}
        </p>
      </div>
      <button
        type="button"
        className={`mt-4 self-start px-4 py-2 font-display text-sm font-bold tracking-tight transition-colors ${
          card.highlight
            ? "bg-ink text-accent hover:bg-fg"
            : "border border-border text-fg hover:bg-border/50"
        }`}
      >
        {card.buttonText}
      </button>
    </div>
  );
}

export function Plates() {
  const quickLinks: QuickLinkCard[] = [
    {
      title: "Send a parcel",
      description: "Private or business. Drop off at an ALFA Point or book a pickup. From 3.59 €.",
      buttonText: "Send parcel",
    },
    {
      title: "For business customers",
      description: "Request a personal, no-obligation quote for regular shipping volumes.",
      buttonText: "Request offer",
      highlight: true,
    },
    {
      title: "Log in / Register",
      description: "Send, receive, redirect and return parcels with myALFA.",
      buttonText: "To myALFA",
    },
    {
      title: "Find an ALFA Point",
      description: "Find a nearby parcel shop or partner station.",
      buttonText: "Find location",
    },
  ];

  return (
    <>
      {quickLinks.map((card, index) => (
        <QuickLinkCard key={index} card={card} />
      ))}
    </>
  );
}
