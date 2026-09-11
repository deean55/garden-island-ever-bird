import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { useEffect } from "react";
import { KotlinHost } from "@/components/kotlin-host";

export const Route = createFileRoute("/project/$projectId/photo/$photoId")({
  ssr: false,
  component: PhotoRedirect,
});

function PhotoRedirect() {
  const { projectId, photoId } = useParams({ from: "/project/$projectId/photo/$photoId" });
  const navigate = useNavigate();
  useEffect(() => {
    void navigate({ to: "/", hash: `/project/${projectId}/photo/${photoId}` });
  }, [navigate, photoId, projectId]);
  return <KotlinHost />;
}
