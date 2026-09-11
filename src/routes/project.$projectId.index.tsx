import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { useEffect } from "react";
import { KotlinHost } from "@/components/kotlin-host";

export const Route = createFileRoute("/project/$projectId/")({
  ssr: false,
  component: ProjectIndexRedirect,
});

function ProjectIndexRedirect() {
  const { projectId } = useParams({ from: "/project/$projectId/" });
  const navigate = useNavigate();
  useEffect(() => {
    void navigate({ to: "/", hash: `/project/${projectId}` });
  }, [navigate, projectId]);
  return <KotlinHost />;
}
