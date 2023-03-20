import { getStore } from '../store';
import { TileSet } from '../types';

const tileCache: Map<string, HTMLCanvasElement> = new Map();

export const createTileSet = (
  image: string,
  frameWidth: number,
  frameHeight: number,
  scale = { x: 1, y: 1 }
): TileSet => {
  const img = getImage(image);
  return {
    image: img,
    // position: { x: -1000, y: -1000 },
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
  y: number,
  useCacheSystem?: boolean
) => {
  const cacheKey = `${tileSet.image.src}_${ID}`;
  if (useCacheSystem) {
    if (tileCache.has(cacheKey)) {
      ctx.drawImage(tileCache.get(cacheKey), x, y);
      return;
    }
  }
  // const scaleX = tileSet.scale.x;
  // const scaleY = tileSet.scale.y;
  // const tileSetWidth = tileSet.tileSetWidth;
  // const tileSetHeight = tileSet.tileSetHeight;
  // const frameWidth = tileSet.frameWidth;
  // const frameHeight = tileSet.frameHeight;
  // const lineMax = tileSetHeight / frameWidth;
  // const columnMax = tileSetWidth / frameHeight;
  // const line = Math.floor(ID / columnMax);
  // const column = ID - columnMax * line;
  // const sx = column * frameWidth;
  // const sy = line * frameHeight;
  const sx =
    (ID % (tileSet.image.width / tileSet.frameWidth)) * tileSet.frameWidth;
  const sy =
    Math.floor(ID / (tileSet.image.width / tileSet.frameWidth)) *
    tileSet.frameHeight;

  if (useCacheSystem) {
    const offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = tileSet.frameWidth * tileSet.scale.x;
    offscreenCanvas.height = tileSet.frameHeight * tileSet.scale.y;
    const offscreenCtx = offscreenCanvas.getContext('2d');

    offscreenCtx.drawImage(
      tileSet.image,
      sx,
      sy,
      tileSet.frameWidth,
      tileSet.frameHeight,
      0,
      0,
      tileSet.frameWidth * tileSet.scale.x,
      tileSet.frameHeight * tileSet.scale.y
    );

    tileCache.set(cacheKey, offscreenCanvas);
    ctx.drawImage(offscreenCanvas, x, y);
  } else {
    ctx.drawImage(
      tileSet.image,
      sx,
      sy,
      tileSet.frameWidth,
      tileSet.frameHeight,
      x,
      y,
      tileSet.frameWidth * tileSet.scale.x,
      tileSet.frameHeight * tileSet.scale.y
    );
  }
};
