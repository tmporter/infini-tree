import OrnamentData from "../components/Ornament/OrnamentData";

export const renderOrnamentBitmap = (
  context: CanvasRenderingContext2D,
  pixelWidth: number,
  ornament: OrnamentData
) => {
  if (!ornament.bitmap) {
    throw new Error("OrnamentData.bitmap must be defined.");
  }

  const size = Math.sqrt(ornament.bitmap.length); // bitmaps are assumed to be perfect squares
  const pixelSize = pixelWidth / size;

  for (let i = 0; i < ornament.bitmap.length; i++) {
    const bit = ornament.bitmap[i];

    const x = i % size;
    const y = Math.floor(i / size);

    const pixelX = x * pixelSize;
    const pixelY = y * pixelSize;

    context.fillStyle =
      bit === 1 ? ornament.color : ornament.secondaryColor || ornament.color;

    context.fillRect(pixelX, pixelY, pixelSize, pixelSize);
  }
};
