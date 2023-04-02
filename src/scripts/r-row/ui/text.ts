export const drawText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  color?: string,
  position: 'right' | 'center' | 'left' = 'center',
  font?: {
    name: string;
    size: string;
  },
  strokeColor?: string,
  strokeSize?: number
) => {
  ctx.save();
  if (color !== undefined) ctx.fillStyle = color;
  if (font !== undefined) ctx.font = `${font.size} ${font.name}`;
  const textWidth = ctx.measureText(text).width;
  let posX = x - textWidth / 2;
  if (position === 'left') posX = x;
  else if (position === 'right') posX = x - textWidth;
  if (strokeColor && strokeSize) {
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeSize;
    ctx.strokeText(text, posX, y);
  }
  ctx.fillText(text, posX, y);
  ctx.restore();
};
