import { useEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import { renderOrnamentBitmap } from "../../../helpers/canvas";
import OrnamentData from "../OrnamentData";

type Props = {
  ornament: OrnamentData;
  onChange?: (bitmap: number[]) => void;
};

const WIDTH = 250;

const Canvas = styled.canvas`
  width: ${WIDTH}px;
  height: ${WIDTH}px;
  z-index: 0 !important;
`;

const mouseToBitmap = (
  canvas: HTMLCanvasElement,
  event: MouseEvent,
  size: number
) => {
  const rect = canvas.getBoundingClientRect();
  const mousePosition = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
  const tileSize = WIDTH / size;
  const tileX = Math.floor(mousePosition.x / tileSize);
  const tileY = Math.floor(mousePosition.y / tileSize);

  return tileY * size + tileX;
};

const OrnamentPainter = ({ ornament, onChange }: Props) => {
  const canvasElement = useRef<HTMLCanvasElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>();
  const isDrawing = useRef(false);
  const { bitmap } = ornament;
  const inMemoryBitmap = useRef(bitmap);

  useEffect(() => {
    if (!canvasElement.current) {
      throw new Error("canvas ref wasn't set on mount.");
    }

    if (!inMemoryBitmap.current) {
      throw new Error("bitmap wasn't copied properly.");
    }

    const size = Math.sqrt(inMemoryBitmap.current.length);

    context.current = canvasElement.current.getContext("2d");

    canvasElement.current.addEventListener("mousedown", (event) => {
      isDrawing.current = true;
    });

    canvasElement.current.addEventListener("mouseup", (event) => {
      isDrawing.current = false;
      const bitmapIndex = mouseToBitmap(canvasElement.current!, event, size);
      const bit = inMemoryBitmap.current![bitmapIndex];
      // TODO: update the bit. Add save button. Add clear button.
    });

    canvasElement.current.addEventListener("mousemove", (event) => {
      if (isDrawing.current) {
        const bitmapIndex = mouseToBitmap(canvasElement.current!, event, size);
        const bit = inMemoryBitmap.current![bitmapIndex];
      }
    });
  }, []);

  useEffect(() => {
    if (!context.current) {
      return;
    }

    if (!bitmap) {
      throw new Error("OrnamentData.bitmap must be defined.");
    }

    renderOrnamentBitmap(context.current, WIDTH, ornament);
  }, [ornament, bitmap]);

  return <Canvas width={WIDTH} height={WIDTH} ref={canvasElement} />;
};

export default OrnamentPainter;
