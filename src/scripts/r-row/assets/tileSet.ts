import { getStore } from '../store';
import { TileSet } from '../types';

export const createTileSet = (
  image: string,
  frameWidth: number,
  frameHeight: number,
  scale = { x: 1, y: 1 }
): TileSet => {
  const img = getImage(image);
  return {
    image: img,
    position: { x: -1000, y: -1000 },
    scale,
    tileSetWidth: img.width,
    tileSetHeight: img.height,
    frameWidth,
    frameHeight,
  };
};

const getImage = (name: string) => {
  const store = getStore();
  const image = store.images[name];
  if (image === undefined) throw new Error(`Image "${name}" was not found!`);
  return image;
};

export const drawTile = (
  ctx: CanvasRenderingContext2D,
  tileSet: TileSet,
  ID: number,
  x: number,
  y: number
) => {
  const scaleX = tileSet.scale.x;
  const scaleY = tileSet.scale.y;
  const tileSetWidth = tileSet.tileSetWidth;
  const tileSetHeight = tileSet.tileSetHeight;
  const frameWidth = tileSet.frameHeight;
  const frameHeight = tileSet.frameWidth;
  const lineMax = tileSetHeight / frameWidth;
  const columnMax = tileSetWidth / frameHeight;
  const line = Math.floor(ID / columnMax);
  const column = ID - columnMax * line;
  const sx = column * frameWidth;
  const sy = line * frameHeight;

  ctx.drawImage(
    tileSet.image,
    sx,
    sy,
    frameWidth,
    frameHeight,
    x,
    y,
    frameWidth * scaleX,
    frameHeight * scaleY
  );
};
