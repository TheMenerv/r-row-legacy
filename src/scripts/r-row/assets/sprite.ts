import { getStore } from "../store/store";
import { Sprite } from "../types";

export const createSprite = (image: string): Sprite => {
  const img = getImage(image);
  return {
    image: img,
    position: { x: -1000, y: -1000 },
    scale: { x: 1, y: 1 },
    vFlipped: false,
    hFlipped: false,
    width: img.width,
    height: img.height,
  };
};

const getImage = (name: string) => {
  const store = getStore();
  const image = store.images[name];
  if (image === undefined) throw new Error(`Image "${name}" was not found!`);
  return image;
};

export const drawSprite = (ctx: CanvasRenderingContext2D, sprite: Sprite) => {
  const spr = sprite;
  const image = spr.image;
  const scaleX = spr.scale.x;
  const scaleY = spr.scale.y;
  const x = spr.position.x;
  const y = spr.position.y;
  const vFlipped = spr.vFlipped;
  const hFlipped = spr.hFlipped;
  const x1 = x - (image.width / 2) * scaleX;
  const x2 = -x - (image.width / 2) * scaleX;
  const y1 = y - (image.height / 2) * scaleY;
  const y2 = -y - (image.height / 2) * scaleY;
  const w = image.width * scaleX;
  const h = image.height * scaleY;
  let drawX = x1;
  let drawY = y1;
  let drawScaleX = 1;
  let drawScaleY = 1;
  if (hFlipped && !vFlipped) {
    drawScaleX = -1;
    drawX = x2;
    drawY = y1;
  } else if (vFlipped && !hFlipped) {
    drawScaleY = -1;
    drawX = x1;
    drawY = y2;
  } else if (vFlipped && hFlipped) {
    drawScaleX = -1;
    drawScaleY = -1;
    drawX = x2;
    drawY = y2;
  }
  ctx.save();
  ctx.scale(drawScaleX, drawScaleY);
  ctx.drawImage(image, drawX, drawY, w, h);
  ctx.restore();
};
