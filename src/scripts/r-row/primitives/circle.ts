import { Vector2 } from '../types';

export const drawCirclePoint = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number
) => {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
};

export const drawCircleVector = (
  ctx: CanvasRenderingContext2D,
  v: Vector2,
  radius: number
) => {
  ctx.save();
  ctx.beginPath();
  ctx.arc(v.x, v.y, radius, 0, 2 * Math.PI, false);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
};
