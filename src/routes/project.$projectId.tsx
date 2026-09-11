import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/project/$projectId")({
  ssr: false,
  component: ProjectLayout,
});

function ProjectLayout() {
  return <Outlet />;
}
