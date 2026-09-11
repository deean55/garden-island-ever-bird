import { useEffect } from "react";

declare global {
  interface Window {
    PDFLib?: unknown;
    JSZip?: unknown;
    __fieldframeKotlin?: boolean;
  }
}

/**
 * Thin host for the Kotlin/JS app in public/fieldframe.mjs.
 * All product UI, storage, PDF, and export live in kotlin-src/.
 */
export function KotlinHost() {
  useEffect(() => {
    let cancelled = false;

    if (!document.querySelector("script[data-fieldframe-kotlin]")) {
      const script = document.createElement("script");
      script.type = "module";
      script.src = "/fieldframe.mjs";
      script.dataset.fieldframeKotlin = "1";
      document.body.appendChild(script);
    }

    void (async () => {
      const [pdf, zipMod] = await Promise.all([import("pdf-lib"), import("jszip")]);
      if (cancelled) return;
      window.PDFLib = {
        PDFDocument: pdf.PDFDocument,
        StandardFonts: pdf.StandardFonts,
        rgb: pdf.rgb,
      };
      window.JSZip = zipMod.default;
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div id="kotlin-app">
      <div className="ff-page">
        <header className="ff-hero">
          <div>
            <p className="ff-kicker">FIELDFRAME · KOTLIN</p>
            <h1 className="ff-title">Photo records</h1>
            <p className="ff-lede">
              Inspection, property, vehicle, and site documentation — stored only on this device.
            </p>
          </div>
        </header>
      </div>
    </div>
  );
}
