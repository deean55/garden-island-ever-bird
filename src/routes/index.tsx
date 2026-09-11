import { createFileRoute } from "@tanstack/react-router";
import { KotlinHost } from "@/components/kotlin-host";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return <KotlinHost />;
}
