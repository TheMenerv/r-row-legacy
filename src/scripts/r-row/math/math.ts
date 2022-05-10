import { Vector2 } from '../types';

export const normalizeVector2 = (v: Vector2): Vector2 => {
  let x = v.x;
  let y = v.y;
  const norm = Math.sqrt(x * x + y * y);
  return {
    x: x / norm,
    y: y / norm,
  };
};

export const radian = (angle: number) => {
  return angle * (Math.PI / 180);
};

export const distancePoint = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => {
  return Math.abs(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));
};

export const distanceVector2 = (v1: Vector2, v2: Vector2) => {
  return Math.abs(
    Math.sqrt(Math.pow(v2.x - v1.x, 2) + Math.pow(v2.y - v1.y, 2))
  );
};
