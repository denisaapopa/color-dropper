import { useCallback, useEffect, useRef, useState } from 'react';
import { usePickColor } from '../state/pickColor';
import {
  getPixelData,
  getColorMatrixFromPixelData,
  getCenterColorFromMatrix,
} from '../utils/color';
import { useColor } from '../state/color';
import { COLOR_DROPPER_SIZE } from '../utils/constants';
import { Flex } from '@chakra-ui/react';
import { SelectColor } from '../assets/SelectColor';
import { useScale } from '../state/scale';

const Canvas = ({ imageSrc }: { imageSrc: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null); // Ref to store the image
  const [colorDropperActive, setIsColorDropperActive] = usePickColor();
  const [hoveredColor, setHoveredColor] = useState('#000000');
  const [colorMatrix, setColorMatrix] = useState<string[][]>([]);
  const [, setDropperColor] = useColor();
  const zoomedColorsRef = useRef<HTMLDivElement>(null);

  // State for zoom and drag
  const [scale] = useScale();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const pickColor = (e: React.MouseEvent) => {
    if (!colorDropperActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const zoomedColors = zoomedColorsRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx || !zoomedColors) return;

    const bounding = canvas.getBoundingClientRect();
    const x = (e.clientX - bounding.left - offset.x) / scale;
    const y = (e.clientY - bounding.top - offset.y) / scale;

    const pixelData = getPixelData(ctx, x, y);

    zoomedColors.style.left = `${e.clientX}px`;
    zoomedColors.style.top = `${e.clientY}px`;
    zoomedColors.style.transform = `translate(-50%, -50%)`;
    zoomedColors.style.display = 'block';
    zoomedColors.dataset.color = hoveredColor;

    const colorMatrix = getColorMatrixFromPixelData(pixelData);
    const centerColor = getCenterColorFromMatrix(colorMatrix);

    setColorMatrix(colorMatrix);
    setHoveredColor(centerColor);
  };

  const selectColor = () => {
    if (colorDropperActive) {
      setDropperColor({
        hexColor: hoveredColor,
        rgbColor: hoveredColor,
      });
      setIsColorDropperActive(false);
    }
  };

  const hideZoomedColors = () => {
    if (isDragging) {
      setIsDragging(false);
    }
    if (zoomedColorsRef.current) {
      zoomedColorsRef.current.style.display = 'none';
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!colorDropperActive) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const newOffsetX = e.clientX - dragStart.x;
      const newOffsetY = e.clientY - dragStart.y;
      setOffset({ x: newOffsetX, y: newOffsetY });
      const ctx = canvasRef.current?.getContext('2d');
      drawImage(ctx, imageRef.current); // Redraw the image with updated offset
    } else {
      pickColor(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const getCursorMode = () => {
    if (colorDropperActive) {
      return 'default';
    }
    if (isDragging) {
      return 'grabbing';
    }
    return 'grab';
  };

  const drawImage = (
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

  // Initialize Canvas and draw the image
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (ctx && canvas) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = imageSrc;
      imageRef.current = img; // Store image in ref

      img.onload = () => {
        if (canvas) {
          canvas.width = img.width;
          canvas.height = img.height;
          drawImage(ctx, img); // Draw initial image
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageSrc, scale]);

  useEffect(() => {
    // Redraw the image when offset or scale changes
    const ctx = canvasRef.current?.getContext('2d');
    drawImage(ctx, imageRef.current); // Redraw image on offset/scale change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageSrc, scale, offset]);

  return (
    <>
      {colorDropperActive ? (
        <Flex
          className="magnifier-container"
          ref={zoomedColorsRef}
          position="absolute"
          zIndex={1}
          display="none"
        >
          <SelectColor color={hoveredColor} />
          <table className="magnifier-container-table">
            <tbody>
              {colorMatrix.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((color, colIndex) => (
                    <td
                      key={colIndex}
                      style={{
                        backgroundColor: color,
                        width: '10px',
                        height: '10px',
                      }}
                      className="magnifier-container-table-cell"
                    >
                      {rowIndex === Math.floor(COLOR_DROPPER_SIZE / 2) &&
                      colIndex === Math.floor(COLOR_DROPPER_SIZE / 2) ? (
                        <div className="magnifier-container-center" />
                      ) : null}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Flex>
      ) : null}

      <canvas
        ref={canvasRef}
        style={{ height: 'auto', width: '100vw', cursor: getCursorMode() }}
        onMouseLeave={hideZoomedColors}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onClick={selectColor}
      />
    </>
  );
};

export default Canvas;
