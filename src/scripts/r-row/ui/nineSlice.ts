import { getStore } from "..";
import { NineSlice } from "../types";

export const createNineSlice = (
  x: number,
  y: number,
  width: number,
  height: number,
  x1: number,
  x2: number,
  y1: number,
  y2: number,
  image: string
): NineSlice => {
  const store = getStore();
  return {
    position: { x, y },
    size: { width, height },
    x1,
    x2,
    y1,
    y2,
    alpha: 1.0,
    image: store.images[image],
    scale: { x: 1, y: 1 },
  };
};

export const drawNineSlice = (
  ctx: CanvasRenderingContext2D,
  nineSlice: NineSlice
) => {
  ctx.save();
  ctx.globalAlpha = nineSlice.alpha;
  draw0(ctx, nineSlice);
  draw1(ctx, nineSlice);
  draw2(ctx, nineSlice);
  draw3(ctx, nineSlice);
  draw4(ctx, nineSlice);
  draw5(ctx, nineSlice);
  draw6(ctx, nineSlice);
  draw7(ctx, nineSlice);
  draw8(ctx, nineSlice);
  ctx.restore();
};

// Top left
const draw0 = (ctx: CanvasRenderingContext2D, ns: NineSlice) => {
  const iWidth = ns.image.width;
  const iHeight = ns.image.height;
  const x1 = ns.x1;
  const x2 = iWidth - ns.x2;
  const y1 = ns.y1;
  const y2 = iHeight - ns.y2;
  const sx = 0;
  const sy = 0;
  const sWidth = x1;
  const sHeight = y1;
  const dx = ns.position.x - ns.size.width / 2;
  const dy = ns.position.y - ns.size.height / 2;
  const dWidth = x1 * ns.scale.x;
  const dHeight = y1 * ns.scale.y;
  ctx.drawImage(ns.image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
};

// Top center
const draw1 = (ctx: CanvasRenderingContext2D, ns: NineSlice) => {
  const iWidth = ns.image.width;
  const iHeight = ns.image.height;
  const x1 = ns.x1;
  const x2 = iWidth - ns.x2;
  const y1 = ns.y1;
  const y2 = iHeight - ns.y2;
  const w = iWidth - ns.x1 - ns.x2;
  const sx = x1;
  const sy = 0;
  const sWidth = w;
  const sHeight = y1;
  const dx = ns.position.x - ns.size.width / 2 + x1 * ns.scale.x;
  const dy = ns.position.y - ns.size.height / 2;
  const dWidth = ns.size.width - ns.x1 * ns.scale.x - ns.x2 * ns.scale.x;
  const dHeight = y1 * ns.scale.y;
  ctx.drawImage(ns.image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
};

// Top right
const draw2 = (ctx: CanvasRenderingContext2D, ns: NineSlice) => {
  const iWidth = ns.image.width;
  const iHeight = ns.image.height;
  const x1 = ns.x1;
  const x2 = iWidth - ns.x2;
  const y1 = ns.y1;
  const y2 = iHeight - ns.y2;
  const sx = iWidth - ns.x2;
  const sy = 0;
  const sWidth = ns.x2;
  const sHeight = y1;
  const dx = ns.position.x + ns.size.width / 2 - ns.x2 * ns.scale.x;
  const dy = ns.position.y - ns.size.height / 2;
  const dWidth = x1 * ns.scale.x;
  const dHeight = y1 * ns.scale.y;
  ctx.drawImage(ns.image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
};

// Middle left
const draw3 = (ctx: CanvasRenderingContext2D, ns: NineSlice) => {
  const iWidth = ns.image.width;
  const iHeight = ns.image.height;
  const x1 = ns.x1;
  const x2 = iWidth - ns.x2;
  const y1 = ns.y1;
  const y2 = ns.y2;
  const h = iHeight - ns.y1 - ns.y2;
  const sx = 0;
  const sy = y1;
  const sWidth = ns.x1;
  const sHeight = h;
  const dx = ns.position.x - ns.size.width / 2;
  const dy = ns.position.y - ns.size.height / 2 + ns.y1 * ns.scale.y;
  const dWidth = x1 * ns.scale.x;
  const dHeight = ns.size.height - ns.y1 * ns.scale.y - ns.y2 * ns.scale.y;
  ctx.drawImage(ns.image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
};

// Middle center
const draw4 = (ctx: CanvasRenderingContext2D, ns: NineSlice) => {
  const iWidth = ns.image.width;
  const iHeight = ns.image.height;
  const x1 = ns.x1;
  const x2 = iWidth - ns.x2;
  const y1 = ns.y1;
  const y2 = ns.y2;
  const w = iWidth - ns.x1 - ns.x2;
  const h = iHeight - ns.y1 - ns.y2;
  const sx = x1;
  const sy = y1;
  const sWidth = w;
  const sHeight = h;
  const dx = ns.position.x - ns.size.width / 2 + ns.x1 * ns.scale.x;
  const dy = ns.position.y - ns.size.height / 2 + ns.y1 * ns.scale.y;
  const dWidth = ns.size.width - ns.x1 * ns.scale.x - ns.x2 * ns.scale.x;
  const dHeight = ns.size.height - ns.y1 * ns.scale.y - ns.y2 * ns.scale.y;
  ctx.drawImage(ns.image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
};

// Middle right
const draw5 = (ctx: CanvasRenderingContext2D, ns: NineSlice) => {
  const iWidth = ns.image.width;
  const iHeight = ns.image.height;
  const x1 = ns.x1;
  const x2 = iWidth - ns.x2;
  const y1 = ns.y1;
  const y2 = ns.y2;
  const h = iHeight - ns.y1 - ns.y2;
  const sx = x2;
  const sy = y1;
  const sWidth = ns.x1;
  const sHeight = h;
  const dx = ns.position.x + ns.size.width / 2 - ns.x2 * ns.scale.x;
  const dy = ns.position.y - ns.size.height / 2 + ns.y1 * ns.scale.y;
  const dWidth = x1 * ns.scale.x;
  const dHeight = ns.size.height - ns.y1 * ns.scale.y - ns.y2 * ns.scale.y;
  ctx.drawImage(ns.image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
};

// Bottom left
const draw6 = (ctx: CanvasRenderingContext2D, ns: NineSlice) => {
  const iWidth = ns.image.width;
  const iHeight = ns.image.height;
  const x1 = ns.x1;
  const x2 = iWidth - ns.x2;
  const y1 = ns.y1;
  const y2 = iHeight - ns.y2;
  const sx = 0;
  const sy = y2;
  const sWidth = x1;
  const sHeight = ns.y2;
  const dx = ns.position.x - ns.size.width / 2;
  const dy = ns.position.y + ns.size.height / 2 - ns.y2 * ns.scale.y;
  const dWidth = x1 * ns.scale.x;
  const dHeight = ns.y2 * ns.scale.y;
  ctx.drawImage(ns.image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
};

// Bottom center
const draw7 = (ctx: CanvasRenderingContext2D, ns: NineSlice) => {
  const iWidth = ns.image.width;
  const iHeight = ns.image.height;
  const x1 = ns.x1;
  const x2 = iWidth - ns.x2;
  const y1 = ns.y1;
  const y2 = iHeight - ns.y2;
  const w = iWidth - ns.x1 - ns.x2;
  const sx = x1;
  const sy = y2;
  const sWidth = w;
  const sHeight = ns.y2;
  const dx = ns.position.x + x1 * ns.scale.x - ns.size.width / 2;
  const dy = ns.position.y + ns.size.height / 2 - ns.y2 * ns.scale.y;
  const dWidth = ns.size.width - ns.x1 * ns.scale.x - ns.x2 * ns.scale.x;
  const dHeight = ns.y2 * ns.scale.y;
  ctx.drawImage(ns.image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
};

// Bottom right
const draw8 = (ctx: CanvasRenderingContext2D, ns: NineSlice) => {
  const iWidth = ns.image.width;
  const iHeight = ns.image.height;
  const x1 = ns.x1;
  const x2 = iWidth - ns.x2;
  const y1 = ns.y1;
  const y2 = iHeight - ns.y2;
  const sx = x2;
  const sy = y2;
  const sWidth = ns.x2;
  const sHeight = ns.y2;
  const dx = ns.position.x + ns.size.width / 2 - ns.x2 * ns.scale.x;
  const dy = ns.position.y + ns.size.height / 2 - ns.y2 * ns.scale.y;
  const dWidth = ns.x2 * ns.scale.x;
  const dHeight = ns.y2 * ns.scale.y;
  ctx.drawImage(ns.image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
};
