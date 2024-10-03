import { useEffect, useRef, useState } from 'react';
import { usePickColor } from '../state/pickColor';
import {
  getColorMatrixFromPixelData,
  getCenterColorFromMatrix,
  drawImage,
  getPixelData,
} from '../utils/canvas';
import { useColor } from '../state/color';
import { COLOR_DROPPER_SIZE } from '../utils/constants';
import { Flex } from '@chakra-ui/react';
import { SelectColor } from '../assets/SelectColor';
import { useScale } from '../state/scale';
import { useDrag } from '../state/drag';
import { useOffset } from '../state/offset';

const CanvasContainer = ({ imageSrc }: { imageSrc: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null); // Ref to store the image
  const [colorDropperActive, setIsColorDropperActive] = usePickColor();
  const [hoveredColor, setHoveredColor] = useState('#000000');
  const [colorMatrix, setColorMatrix] = useState<string[][]>([]);
  const [, setDropperColor] = useColor();
  const zoomedColorsRef = useRef<HTMLDivElement>(null);

  // State for zoom and drag
  const [scale] = useScale();
  const [offset, setOffset] = useOffset();
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useDrag();

  const pickColor = (e: React.MouseEvent) => {
    if (!colorDropperActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const zoomedColors = zoomedColorsRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx || !zoomedColors || !imageRef.current) return;

    const image = imageRef.current;

    // Get the canvas bounding rectangle
    const bounding = canvas.getBoundingClientRect();

    // Calculate the scale factor between the canvas size and the image size
    const scaleX = image.width / bounding.width;
    const scaleY = image.height / bounding.height;

    // Calculate mouse position on canvas, considering the canvas' dimensions and zoom
    const x = (e.clientX - bounding.left) * scaleX;
    const y = (e.clientY - bounding.top) * scaleY;

    // Clamp values to prevent out-of-bound errors
    const clampedX = Math.max(0, Math.min(x, image.width - 1));
    const clampedY = Math.max(0, Math.min(y, image.height - 1));

    const pixelData = getPixelData(ctx, clampedX, clampedY);

    // Set zoomed colors position and visibility
    zoomedColors.style.left = `${e.clientX}px`;
    zoomedColors.style.top = `${e.clientY}px`;
    zoomedColors.style.transform = `translate(-50%, -50%)`;
    zoomedColors.style.display = 'block';
    zoomedColors.dataset.color = hoveredColor;

    // Get color matrix from the pixel data and set the hovered color
    const colorMatrix = getColorMatrixFromPixelData(pixelData);
    const centerColor = getCenterColorFromMatrix(colorMatrix);

    setColorMatrix(colorMatrix);
    setHoveredColor(centerColor);
  };

  const selectColor = () => {
    if (colorDropperActive) {
      setDropperColor(hoveredColor);
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
      drawImage(offset, scale, ctx, imageRef.current); // Redraw the image with updated offset
    } else {
      pickColor(e); // If not dragging, allow picking color
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
          drawImage(offset, scale, ctx, img); // Draw initial image
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageSrc, scale]);

  useEffect(() => {
    // Redraw the image when offset or scale changes
    const ctx = canvasRef.current?.getContext('2d');
    drawImage(offset, scale, ctx, imageRef.current); // Redraw image on offset/scale change

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

export default CanvasContainer;
