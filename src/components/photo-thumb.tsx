import { useThumbUrl } from "@/lib/hooks";
import { cn } from "@/lib/utils";

export function PhotoThumb({
  photoId,
  alt,
  className,
  rotation = 0,
}: {
  photoId: string;
  alt: string;
  className?: string;
  rotation?: number;
}) {
  const url = useThumbUrl(photoId, String(rotation));
  if (!url) {
    return <div className={cn("bg-muted", className)} aria-hidden />;
  }
  return (
    <img
      src={url}
      alt={alt}
      className={cn("doc-photo h-full w-full object-cover", className)}
    />
  );
}
