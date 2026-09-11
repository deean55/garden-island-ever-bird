import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { useEffect } from "react";
import { KotlinHost } from "@/components/kotlin-host";

export const Route = createFileRoute("/project/$projectId/pdf")({
  ssr: false,
  component: PdfRedirect,
});

function PdfRedirect() {
  const { projectId } = useParams({ from: "/project/$projectId/pdf" });
  const navigate = useNavigate();
  useEffect(() => {
    void navigate({ to: "/", hash: `/project/${projectId}/pdf` });
  }, [navigate, projectId]);
  return <KotlinHost />;
}
