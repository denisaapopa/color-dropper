import { COLOR_DROPPER_SIZE } from './constants';

export const getPixelData = (
  ctx: CanvasRenderingContext2D,
  clampedX: number,
  clampedY: number,
) => {
  // Calculate the pixel data area
  const halfSize = Math.floor(COLOR_DROPPER_SIZE / 2);
  const x = Math.floor(clampedX - halfSize);
  const y = Math.floor(clampedY - halfSize);

  // Extract pixel data
  return ctx.getImageData(
    Math.max(0, x), // Ensure we don't go out of bounds
    Math.max(0, y),
    COLOR_DROPPER_SIZE,
    COLOR_DROPPER_SIZE,
  ).data;
};

export function getNormalizedHexColor(r: number, g: number, b: number) {
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export function getColorMatrixFromPixelData(data: Uint8ClampedArray) {
  const colorMatrix: string[][] = [];
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const hexColor = getNormalizedHexColor(r, g, b);
    if (!colorMatrix[Math.floor(i / (4 * COLOR_DROPPER_SIZE))]) {
      colorMatrix[Math.floor(i / (4 * COLOR_DROPPER_SIZE))] = [];
    }
    colorMatrix[Math.floor(i / (4 * COLOR_DROPPER_SIZE))].push(hexColor);
  }
  return colorMatrix;
}

export function getCenterColorFromMatrix(colorMatrix: string[][]) {
  const center = Math.floor(COLOR_DROPPER_SIZE / 2);
  return colorMatrix[center][center];
}

export const drawImage = (
  offset: {
    x: number;
    y: number;
  },
  scale: number,
  ctx?: CanvasRenderingContext2D | null,
  img?: HTMLImageElement | null,
) => {
  if (!ctx || !img) return; // Check if context and image are available
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.save();

  // Calculate center of the canvas
  const centerX = ctx.canvas.width / 2;
  const centerY = ctx.canvas.height / 2;

  // Translate to center, apply offset, then scale
  ctx.translate(centerX + offset.x, centerY + offset.y);
  ctx.scale(scale, scale);
  ctx.drawImage(
    img,
    -img.width / 2, // Center the image horizontally
    -img.height / 2, // Center the image vertically
    img.width,
    img.height,
  );

  ctx.restore();
};
