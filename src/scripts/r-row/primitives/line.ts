import { Vector2 } from '../types';

export const drawLinePoint = (
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.restore();
};

export const drawLineVector = (
  ctx: CanvasRenderingContext2D,
  v1: Vector2,
  v2: Vector2
) => {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(v1.x, v1.y);
  ctx.lineTo(v2.x, v2.y);
  ctx.stroke();
  ctx.restore();
};
