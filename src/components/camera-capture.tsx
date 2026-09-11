import { Camera, RefreshCcw, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { captureVideoFrame } from "@/lib/images";
import { userMessage } from "@/lib/utils";

export function CameraCapture({
  onCapture,
  onClose,
}: {
  onCapture: (blob: Blob) => void | Promise<void>;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [facing, setFacing] = useState<"environment" | "user">("environment");

  useEffect(() => {
    let cancelled = false;
    async function start() {
      setError(null);
      try {
        streamRef.current?.getTracks().forEach((t) => t.stop());
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: facing }, width: { ideal: 1920 }, height: { ideal: 1080 } },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (err) {
        if (!cancelled) setError(userMessage(err, "The camera could not be opened."));
      }
    }
    if (!navigator.mediaDevices?.getUserMedia) {
      setError("Camera capture is not supported in this browser. Choose a photo from the gallery instead.");
      return;
    }
    void start();
    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    };
  }, [facing]);

  async function shoot() {
    const video = videoRef.current;
    if (!video) return;
    setBusy(true);
    try {
      const blob = await captureVideoFrame(video);
      streamRef.current?.getTracks().forEach((t) => t.stop());
      await onCapture(blob);
    } catch (err) {
      setError(userMessage(err, "Could not capture a photograph."));
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-ink text-primary-foreground">
      <div className="flex items-center justify-between px-4 py-3">
        <p className="text-sm font-medium tracking-wide">Camera</p>
        <Button variant="ghost" size="icon-sm" className="text-primary-foreground hover:bg-white/10" onClick={onClose}>
          <X />
        </Button>
      </div>
      <div className="relative min-h-0 flex-1 bg-black">
        <video ref={videoRef} playsInline muted className="h-full w-full object-contain" />
        {error ? (
          <div className="absolute inset-0 flex items-center justify-center bg-ink/80 p-6 text-center">
            <div className="max-w-sm space-y-3">
              <p className="font-display text-xl">Camera unavailable</p>
              <p className="text-sm text-primary-foreground/70">{error}</p>
              <Button variant="secondary" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        ) : null}
      </div>
      <div className="flex items-center justify-center gap-8 px-6 py-6">
        <Button
          variant="ghost"
          size="icon"
          className="text-primary-foreground hover:bg-white/10"
          onClick={() => setFacing((f) => (f === "environment" ? "user" : "environment"))}
          disabled={!!error}
        >
          <RefreshCcw />
        </Button>
        <button
          type="button"
          onClick={() => void shoot()}
          disabled={busy || !!error}
          className="flex size-18 items-center justify-center rounded-full border-4 border-primary-foreground/80 bg-primary-foreground text-ink disabled:opacity-50"
          style={{ width: 72, height: 72 }}
          aria-label="Capture photograph"
        >
          <Camera className="size-7" />
        </button>
        <div className="size-11" />
      </div>
    </div>
  );
}
