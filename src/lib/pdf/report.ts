import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import { numberPhotosForPdf } from "../repository";
import type { Photo, Project, Section } from "../models";
import { rasterizeJpeg } from "../images";
import { formatDate, padPhotoNumber, sanitizeFilename, uniqueFilename } from "../utils";

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN = 48;
const ink = rgb(0.11, 0.098, 0.082);
const muted = rgb(0.42, 0.392, 0.345);
const forest = rgb(0.118, 0.263, 0.212);
const rule = rgb(0.78, 0.729, 0.655);
const paper = rgb(0.98, 0.969, 0.945);

export type ReportPagePreview = { title: string; blob: Blob };

export interface GeneratedReport {
  bytes: Uint8Array;
  blob: Blob;
  filename: string;
  pageCount: number;
  previews: ReportPagePreview[];
}

function wrapText(font: PDFFont, text: string, size: number, maxWidth: number): string[] {
  const paragraphs = (text || "").replace(/\r\n/g, "\n").split("\n");
  const lines: string[] = [];
  for (const paragraph of paragraphs) {
    if (!paragraph.trim()) {
      lines.push("");
      continue;
    }
    const words = paragraph.split(/\s+/);
    let current = "";
    for (const word of words) {
      const next = current ? `${current} ${word}` : word;
      if (font.widthOfTextAtSize(next, size) <= maxWidth) {
        current = next;
      } else {
        if (current) lines.push(current);
        if (font.widthOfTextAtSize(word, size) <= maxWidth) {
          current = word;
        } else {
          let chunk = "";
          for (const ch of word) {
            const trial = chunk + ch;
            if (font.widthOfTextAtSize(trial, size) <= maxWidth) chunk = trial;
            else {
              if (chunk) lines.push(chunk);
              chunk = ch;
            }
          }
          current = chunk;
        }
      }
    }
    if (current) lines.push(current);
  }
  return lines.length ? lines : [""];
}

function drawHeader(page: PDFPage, font: PDFFont, project: Project) {
  page.drawText("FIELDFRAME", {
    x: MARGIN,
    y: PAGE_H - 32,
    size: 8,
    font,
    color: forest,
  });
  const name = project.name.slice(0, 48);
  const width = font.widthOfTextAtSize(name, 8);
  page.drawText(name, {
    x: PAGE_W - MARGIN - width,
    y: PAGE_H - 32,
    size: 8,
    font,
    color: muted,
  });
  page.drawLine({
    start: { x: MARGIN, y: PAGE_H - 40 },
    end: { x: PAGE_W - MARGIN, y: PAGE_H - 40 },
    thickness: 0.6,
    color: rule,
  });
}

function drawFooter(page: PDFPage, font: PDFFont, project: Project, pageNo: number, total: number) {
  page.drawLine({
    start: { x: MARGIN, y: 36 },
    end: { x: PAGE_W - MARGIN, y: 36 },
    thickness: 0.6,
    color: rule,
  });
  page.drawText(formatDate(project.date), {
    x: MARGIN,
    y: 22,
    size: 8,
    font,
    color: muted,
  });
  const label = `Page ${pageNo} of ${total}`;
  const width = font.widthOfTextAtSize(label, 8);
  page.drawText(label, {
    x: PAGE_W - MARGIN - width,
    y: 22,
    size: 8,
    font,
    color: muted,
  });
}

function fit(width: number, height: number, boxW: number, boxH: number) {
  const scale = Math.min(boxW / width, boxH / height);
  return { width: width * scale, height: height * scale };
}

async function canvasPreview(title: string, paint: (ctx: CanvasRenderingContext2D, w: number, h: number) => Promise<void> | void): Promise<ReportPagePreview> {
  const scale = 1.6;
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(PAGE_W * scale);
  canvas.height = Math.round(PAGE_H * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not render a preview page.");
  ctx.scale(scale, scale);
  ctx.fillStyle = "#faf7f1";
  ctx.fillRect(0, 0, PAGE_W, PAGE_H);
  await paint(ctx, PAGE_W, PAGE_H);
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Preview encode failed"))), "image/jpeg", 0.85);
  });
  return { title, blob };
}

export async function generateReport(
  project: Project,
  sections: Section[],
  photos: Photo[],
  getBlob: (id: string) => Promise<Blob | undefined>,
  existingNames: string[] = [],
): Promise<GeneratedReport> {
  const groups = numberPhotosForPdf(project, sections, photos);
  const doc = await PDFDocument.create();
  const regular = await doc.embedFont(StandardFonts.TimesRoman);
  const bold = await doc.embedFont(StandardFonts.TimesRomanBold);
  const sans = await doc.embedFont(StandardFonts.Helvetica);
  const sansBold = await doc.embedFont(StandardFonts.HelveticaBold);

  type BuiltPage = { kind: "cover" } | { kind: "divider"; title: string } | { kind: "photo"; number: number; section: string; description: string; photo: Photo };
  const plan: BuiltPage[] = [{ kind: "cover" }];
  for (const group of groups) {
    if (project.beforeAfterEnabled) plan.push({ kind: "divider", title: group.label });
    for (const item of group.items) {
      plan.push({
        kind: "photo",
        number: item.number,
        section: item.section.name,
        description: item.photo.description,
        photo: item.photo,
      });
    }
  }
  if (plan.length === 1) {
    // cover only — still a valid empty report
  }

  const total = plan.length;
  const previews: ReportPagePreview[] = [];

  for (let i = 0; i < plan.length; i++) {
    const spec = plan[i]!;
    const page = doc.addPage([PAGE_W, PAGE_H]);
    page.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: PAGE_H, color: paper });
    const pageNo = i + 1;

    if (spec.kind === "cover") {
      page.drawText("FIELDFRAME", { x: MARGIN, y: PAGE_H - 88, size: 10, font: sansBold, color: forest });
      page.drawText("PHOTO DOCUMENTATION REPORT", { x: MARGIN, y: PAGE_H - 104, size: 9, font: sans, color: muted });
      const titleLines = wrapText(bold, project.name || "Untitled project", 28, PAGE_W - MARGIN * 2);
      let y = PAGE_H - 160;
      for (const line of titleLines.slice(0, 4)) {
        page.drawText(line, { x: MARGIN, y, size: 28, font: bold, color: ink });
        y -= 34;
      }
      y -= 12;
      page.drawLine({ start: { x: MARGIN, y }, end: { x: MARGIN + 72, y }, thickness: 1.2, color: forest });
      y -= 28;
      const meta = [
        ["Reference", project.referenceNumber || "—"],
        ["Date", formatDate(project.date)],
        ["Photographs", String(photos.length)],
        ["Sections", String(sections.length)],
      ];
      for (const [label, value] of meta) {
        page.drawText(label.toUpperCase(), { x: MARGIN, y, size: 8, font: sansBold, color: muted });
        page.drawText(value, { x: MARGIN + 110, y, size: 11, font: regular, color: ink });
        y -= 18;
      }
      if (project.description.trim()) {
        y -= 16;
        page.drawText("DESCRIPTION", { x: MARGIN, y, size: 8, font: sansBold, color: muted });
        y -= 16;
        const desc = wrapText(regular, project.description, 11, PAGE_W - MARGIN * 2);
        for (const line of desc.slice(0, 18)) {
          page.drawText(line, { x: MARGIN, y, size: 11, font: regular, color: ink });
          y -= 15;
        }
      }
      drawFooter(page, sans, project, pageNo, total);
      previews.push(
        await canvasPreview("Cover", (ctx) => {
          ctx.fillStyle = "#1e4336";
          ctx.font = "600 10px Figtree, sans-serif";
          ctx.fillText("FIELDFRAME", MARGIN, 88);
          ctx.fillStyle = "#6b6458";
          ctx.font = "400 9px Figtree, sans-serif";
          ctx.fillText("PHOTO DOCUMENTATION REPORT", MARGIN, 104);
          ctx.fillStyle = "#1c1915";
          ctx.font = "600 28px Newsreader, serif";
          let ty = 160;
          for (const line of titleLines.slice(0, 4)) {
            ctx.fillText(line, MARGIN, ty);
            ty += 34;
          }
          ctx.fillStyle = "#1e4336";
          ctx.fillRect(MARGIN, ty + 8, 72, 1.5);
          ty += 40;
          ctx.font = "500 11px Figtree, sans-serif";
          for (const [label, value] of meta) {
            ctx.fillStyle = "#6b6458";
            ctx.fillText(label.toUpperCase(), MARGIN, ty);
            ctx.fillStyle = "#1c1915";
            ctx.fillText(value, MARGIN + 110, ty);
            ty += 18;
          }
          if (project.description.trim()) {
            ty += 16;
            ctx.fillStyle = "#6b6458";
            ctx.fillText("DESCRIPTION", MARGIN, ty);
            ty += 16;
            ctx.fillStyle = "#1c1915";
            ctx.font = "400 12px Newsreader, serif";
            const words = project.description.split(/\s+/);
            let line = "";
            for (const word of words) {
              const next = line ? `${line} ${word}` : word;
              if (ctx.measureText(next).width > PAGE_W - MARGIN * 2) {
                ctx.fillText(line, MARGIN, ty);
                ty += 16;
                line = word;
              } else line = next;
            }
            if (line) ctx.fillText(line, MARGIN, ty);
          }
        }),
      );
      continue;
    }

    if (spec.kind === "divider") {
      drawHeader(page, sans, project);
      page.drawText(spec.title, {
        x: MARGIN,
        y: PAGE_H / 2,
        size: 36,
        font: bold,
        color: ink,
      });
      page.drawText("Photographs in this set", {
        x: MARGIN,
        y: PAGE_H / 2 - 28,
        size: 12,
        font: regular,
        color: muted,
      });
      drawFooter(page, sans, project, pageNo, total);
      previews.push(
        await canvasPreview(spec.title, (ctx) => {
          ctx.fillStyle = "#1c1915";
          ctx.font = "600 36px Newsreader, serif";
          ctx.fillText(spec.title, MARGIN, PAGE_H / 2);
          ctx.fillStyle = "#6b6458";
          ctx.font = "400 12px Figtree, sans-serif";
          ctx.fillText("Photographs in this set", MARGIN, PAGE_H / 2 + 28);
        }),
      );
      continue;
    }

    drawHeader(page, sans, project);
    const heading = `Photo ${padPhotoNumber(spec.number)}  —  ${spec.section}`;
    page.drawText(heading, { x: MARGIN, y: PAGE_H - 64, size: 13, font: sansBold, color: ink });

    const descLines = wrapText(regular, spec.description.trim() || "No description.", 11, PAGE_W - MARGIN * 2);
    const shownDesc = descLines.slice(0, 8);
    const descBlock = 18 + shownDesc.length * 14;
    const boxW = PAGE_W - MARGIN * 2;
    const imageTop = PAGE_H - 82;
    const maxImageBottom = 48 + descBlock + 18;
    const boxH = Math.max(220, imageTop - maxImageBottom);

    let previewObjectUrl: string | null = null;
    let fitted = { width: boxW, height: boxH * 0.6 };
    let imgX = MARGIN;
    let imgY = maxImageBottom;

    const blob = await getBlob(spec.photo.id);
    if (blob) {
      const raster = await rasterizeJpeg(blob, spec.photo.rotation);
      const image = await doc.embedJpg(raster.bytes);
      fitted = fit(image.width, image.height, boxW, boxH);
      imgX = MARGIN + (boxW - fitted.width) / 2;
      imgY = imageTop - fitted.height;
      page.drawRectangle({
        x: imgX - 0.5,
        y: imgY - 0.5,
        width: fitted.width + 1,
        height: fitted.height + 1,
        borderColor: rule,
        borderWidth: 0.6,
      });
      page.drawImage(image, { x: imgX, y: imgY, width: fitted.width, height: fitted.height });
      const rasterCopy = new Uint8Array(raster.bytes.byteLength);
      rasterCopy.set(raster.bytes);
      previewObjectUrl = URL.createObjectURL(new Blob([rasterCopy], { type: "image/jpeg" }));
    } else {
      page.drawText("Photograph unavailable", {
        x: MARGIN,
        y: imageTop - 40,
        size: 11,
        font: regular,
        color: muted,
      });
    }

    let dy = imgY - 18;
    page.drawText("DESCRIPTION", { x: MARGIN, y: dy, size: 7, font: sansBold, color: muted });
    dy -= 14;
    for (const line of shownDesc) {
      page.drawText(line, { x: MARGIN, y: dy, size: 11, font: regular, color: ink });
      dy -= 14;
    }
    drawFooter(page, sans, project, pageNo, total);

    const previewFitted = fitted;
    const previewImgX = imgX;
    previews.push(
      await canvasPreview(heading, async (ctx) => {
        ctx.fillStyle = "#6b6458";
        ctx.font = "600 8px Figtree, sans-serif";
        ctx.fillText("FIELDFRAME", MARGIN, 28);
        ctx.fillStyle = "#1c1915";
        ctx.font = "600 13px Figtree, sans-serif";
        ctx.fillText(heading, MARGIN, 64);
        ctx.strokeStyle = "#cfc6b6";
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(MARGIN, 40);
        ctx.lineTo(PAGE_W - MARGIN, 40);
        ctx.stroke();
        if (previewObjectUrl) {
          const img = await new Promise<HTMLImageElement>((resolve, reject) => {
            const el = new Image();
            el.onload = () => resolve(el);
            el.onerror = () => reject(new Error("preview image"));
            el.src = previewObjectUrl!;
          });
          const y = 82;
          ctx.drawImage(img, previewImgX, y, previewFitted.width, previewFitted.height);
          ctx.strokeStyle = "#cfc6b6";
          ctx.strokeRect(previewImgX, y, previewFitted.width, previewFitted.height);
          URL.revokeObjectURL(previewObjectUrl);
          ctx.fillStyle = "#6b6458";
          ctx.font = "600 8px Figtree, sans-serif";
          ctx.fillText("DESCRIPTION", MARGIN, y + previewFitted.height + 22);
          ctx.fillStyle = "#1c1915";
          ctx.font = "400 12px Newsreader, serif";
          let ty = y + previewFitted.height + 40;
          for (const line of shownDesc.slice(0, 6)) {
            ctx.fillText(line, MARGIN, ty);
            ty += 16;
          }
        }
      }),
    );
  }

  const bytes = await doc.save();
  const copy = new Uint8Array(bytes.byteLength);
  copy.set(bytes);
  const filename = uniqueFilename(
    `${sanitizeFilename(project.name)}_${project.date || todayStamp()}.pdf`,
    new Set(existingNames.map((n) => n.toLowerCase())),
  );
  return {
    bytes: copy,
    blob: new Blob([copy], { type: "application/pdf" }),
    filename,
    pageCount: total,
    previews,
  };
}

function todayStamp() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
