import { createFileRoute } from "@tanstack/react-router";
import { FrameDeck } from "@/components/frame-deck";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <FrameDeck />;
}
