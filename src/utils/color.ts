import { COLOR_DROPPER_SIZE } from './constants';

export function getPixelData(
  ctx: CanvasRenderingContext2D,
  pageX: number,
  pageY: number,
): Uint8ClampedArray {
  const halfSize = Math.floor(COLOR_DROPPER_SIZE / 2);

  // Calculate the top-left corner of the area to get
  const x = Math.floor(pageX - halfSize);
  const y = Math.floor(pageY - halfSize);

  return ctx.getImageData(x, y, COLOR_DROPPER_SIZE, COLOR_DROPPER_SIZE).data;
}

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
