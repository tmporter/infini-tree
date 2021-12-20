import { DivIcon, LeafletEvent, LeafletMouseEvent, PointTuple } from "leaflet";
import { useEffect, useRef } from "react";
import { Marker } from "react-leaflet";
import { useUser } from "../../contexts/UserContext";
import EditorPopup from "./Editor/EditorPopup";
import InfoPopup from "./InfoPopup";
import OrnamentData, { OrnamentStyle } from "./OrnamentData";
import "./OrnamentMarker.css";

type Props = {
  ornament: OrnamentData;
  radius?: number;
  onClick?: (event: LeafletMouseEvent) => void;
  onStyleChange?: (style: OrnamentStyle) => void;
  onPrimaryColorChange?: (color: string) => void;
  onSecondaryColorChange?: (color: string) => void;
  onDelete?: () => void;
};

const buildSvg = (ornament: OrnamentData, radius: number) => {
  switch (ornament.style) {
    case OrnamentStyle.solid:
      return `<svg 
                viewBox="0 0 ${radius * 2} ${radius * 2}" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="${ornament.color}">
                <circle cx="${radius}" cy="${radius}" r="${radius}" />
              </svg>`;
    case OrnamentStyle.striped:
      return `<svg 
                viewBox="0 0 ${radius * 2} ${radius * 2}" 
                xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <clipPath id="ornament-clip">
                    <circle cx="${radius}" cy="${radius}" r="${radius}" />
                  </clipPath>
                </defs>

                <circle
                  cx="${radius}"
                  cy="${radius}"
                  r="${radius}"
                  fill="${ornament.color}"
                />

                <rect 
                  y="${radius - radius / 4}"
                  width="${radius * 2}"
                  height="${radius / 2}"
                  fill="${ornament.secondaryColor}"
                  clip-path="url(#ornament-clip)"
                />
              </svg>`;
    case OrnamentStyle.custom:
      return `<canvas 
                id="canvas-${ornament.id}"
                class="ornament-canvas"
                width="${radius * 2}"
                height="${radius * 2}">
              </canvas>`;
    default:
      break;
  }
};

const OrnamentMarker = ({
  ornament,
  radius = 30,
  onClick = () => {},
  onStyleChange = () => {},
  onPrimaryColorChange = () => {},
  onSecondaryColorChange = () => {},
  onDelete = () => {},
}: Props) => {
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const { userId } = useUser();
  const { style, bitmap, color, secondaryColor } = ornament;

  useEffect(() => {
    if (style === OrnamentStyle.custom) {
      let bits = bitmap || [0, 0, 0, 0, 0, 0, 0, 0, 0];

      const canvasId = `#canvas-${ornament.id}`;
      const canvas = document.querySelector<HTMLCanvasElement>(canvasId);

      if (!canvas) {
        throw new Error(`canvas with id=${canvasId} not found.`);
      }

      context.current = canvas.getContext("2d");

      if (!context.current) {
        throw new Error(`Context could not be retrieved.`);
      }

      const size = Math.sqrt(bits.length); // bitmaps are assumed to be perfect squares
      const pixelSize = (radius * 2) / size;

      for (let i = 0; i < bits.length; i++) {
        const bit = bits[i];

        const x = i % size;
        const y = Math.floor(i / size);

        const pixelX = x * pixelSize;
        const pixelY = y * pixelSize;

        context.current.fillStyle = bit === 1 ? color : secondaryColor || color;

        context.current.fillRect(pixelX, pixelY, pixelSize, pixelSize);
      }
    }
  }, [style, bitmap, color, secondaryColor]);

  const icon = new DivIcon({
    iconSize: [radius * 2, radius * 2],
    className: "ornament-marker-container",
    html: `
      <div class="wrapper" data-style="${ornament.style}">
        <div class="hook"></div>
        <div class="ornament">
          ${buildSvg(ornament, radius)}
        </div>
      </div>`,
  });

  const onAdd = (event: LeafletEvent) => {
    // event.target.openPopup();
  };

  const isCreatingUser = ornament.creatingUser === userId;
  const popupOffset: PointTuple = [0, -radius - 10];

  return (
    <Marker
      position={ornament.position}
      icon={icon}
      eventHandlers={{ click: onClick, add: onAdd }}
    >
      {isCreatingUser ? (
        <EditorPopup
          ornament={ornament}
          onStyleChange={onStyleChange}
          onPrimaryColorChange={onPrimaryColorChange}
          onSecondaryColorChange={onSecondaryColorChange}
          onDelete={onDelete}
          offset={popupOffset}
          // maxWidth={246} // This does nothing for some reason...
        />
      ) : (
        <InfoPopup ornament={ornament} offset={popupOffset} />
      )}
    </Marker>
  );
};

export default OrnamentMarker;
