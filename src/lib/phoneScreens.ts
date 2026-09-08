import { drawHoloIcon } from "@/lib/holoIcons";
import { clamp01 } from "@/lib/journeyMotion";

export type ScreenReveal = {
  chapterIndex: number;
  holoIndex?: number;
  morph: number;
  title: number;
  line: number;
  body: number;
  bullets: number[];
  detail: number;
  holo?: number;
  power?: number;
  time?: number;
};

const W = 1170;
const H = 2532;
const RED = "#ef1a12";
const HOLO_BOX = 780;

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

/** Elegant living flicker — readable, not strobing */
function holoFlicker(t: number): number {
  const breathe = 0.88 + Math.sin(t * 3.4) * 0.07 + Math.sin(t * 11.2) * 0.03;
  const blink = Math.sin(t * 2.6) > 0.96 ? 0.42 : Math.sin(t * 7.8) > 0.985 ? 0.62 : 1;
  return clamp01(breathe * blink);
}

function hash(n: number) {
  const x = Math.sin(n * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

let holoBuf: HTMLCanvasElement | null = null;
function getHoloBuf() {
  if (typeof document === "undefined") return null;
  if (!holoBuf) {
    holoBuf = document.createElement("canvas");
    holoBuf.width = HOLO_BOX;
    holoBuf.height = HOLO_BOX;
  }
  return holoBuf;
}

/** Crisp red hologram — glitch confined to the mark */
export function paintPhoneScreen(
  ctx: CanvasRenderingContext2D,
  state: ScreenReveal
) {
  const t = state.time ?? 0;
  const power = clamp01(state.power ?? 1);
  const holo = clamp01(state.holo ?? 1) * power;
  const flicker = holoFlicker(t);
  const holoIndex = state.holoIndex ?? state.chapterIndex;
  const cx = W / 2;
  const cy = H * 0.45;
  const iconSize = holoIndex < 0 ? 430 : 410;
  const breath = 1 + Math.sin(t * 2.1) * 0.018;

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, W, H);
  if (power < 0.02) return;

  // Soft core bloom (screen stays clean otherwise)
  if (holo > 0.02) {
    ctx.save();
    ctx.globalAlpha = 0.48 * holo * flicker;
    const bloom = ctx.createRadialGradient(cx, cy, 12, cx, cy, 460);
    bloom.addColorStop(0, "rgba(239,26,18,0.55)");
    bloom.addColorStop(0.45, "rgba(239,26,18,0.12)");
    bloom.addColorStop(1, "rgba(239,26,18,0)");
    ctx.fillStyle = bloom;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }

  ctx.fillStyle = "#050505";
  roundRect(ctx, W / 2 - 150, 36, 300, 64, 32);
  ctx.fill();

  if (holo < 0.02) return;

  const buf = getHoloBuf();
  if (!buf) {
    ctx.save();
    ctx.globalAlpha = holo * flicker;
    ctx.shadowColor = "rgba(239,26,18,1)";
    ctx.shadowBlur = 56;
    drawHoloIcon(ctx, holoIndex, cx, cy, iconSize * breath, RED);
    ctx.restore();
    return;
  }

  const bctx = buf.getContext("2d");
  if (!bctx) return;
  const mid = HOLO_BOX / 2;
  bctx.clearRect(0, 0, HOLO_BOX, HOLO_BOX);

  const glitchOn = Math.sin(t * 4.6) > 0.82 || Math.sin(t * 13.5) > 0.92;
  const gx = glitchOn ? (hash(t * 33) - 0.5) * 14 : 0;
  const gy = glitchOn ? (hash(t * 51) - 0.5) * 8 : 0;

  // Depth ghosts
  bctx.save();
  bctx.globalAlpha = flicker * 0.22;
  bctx.shadowColor = "rgba(255,70,50,0.7)";
  bctx.shadowBlur = 18;
  drawHoloIcon(
    bctx,
    holoIndex,
    mid - 7 + gx * 0.4,
    mid + 4,
    iconSize * breath * 0.96,
    "#ff5a45"
  );
  bctx.restore();

  bctx.save();
  bctx.globalAlpha = flicker * 0.16;
  drawHoloIcon(
    bctx,
    holoIndex,
    mid + 8 - gx * 0.35,
    mid - 3,
    iconSize * breath * 0.96,
    "#ff2a18"
  );
  bctx.restore();

  // Main mark
  bctx.save();
  bctx.globalAlpha = flicker;
  bctx.shadowColor = "rgba(239,26,18,1)";
  bctx.shadowBlur = 44 + Math.sin(t * 4.2) * 10;
  drawHoloIcon(
    bctx,
    holoIndex,
    mid + gx * 0.25,
    mid + gy * 0.25,
    iconSize * breath,
    RED
  );
  bctx.restore();

  // Interference clipped to mark pixels only
  bctx.save();
  bctx.globalCompositeOperation = "source-atop";
  bctx.globalAlpha = 0.11 * flicker;
  bctx.fillStyle = RED;
  for (let y = 0; y < HOLO_BOX; y += 6) {
    bctx.fillRect(Math.sin(y * 0.1 + t * 5) * 1.5, y, HOLO_BOX, 1);
  }

  if (glitchOn) {
    const sliceY = mid + (hash(Math.floor(t * 6)) - 0.5) * 140;
    const tearH = 10 + hash(t * 2.4) * 22;
    const row = bctx.getImageData(0, sliceY, HOLO_BOX, tearH);
    bctx.putImageData(row, gx * 1.4, sliceY);
    bctx.globalAlpha = 0.35 * flicker;
    bctx.fillRect(40, sliceY, HOLO_BOX - 80, 1.5);
  }
  bctx.restore();

  ctx.save();
  ctx.globalAlpha = holo;
  ctx.shadowColor = "rgba(239,26,18,0.9)";
  ctx.shadowBlur = 40;
  ctx.drawImage(buf, cx - mid, cy - mid);
  ctx.restore();
}
