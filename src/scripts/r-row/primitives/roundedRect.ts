export const drawRoundedRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  fill: string = null,
  radius: number = 5,
  stroke: string = "",
  lineWidth: number = 1
) => {
  ctx.save();
  let scale = lineWidth;
  ctx.scale(scale, scale);
  // x = x / scale - width / 2;
  // y = y / scale - height / 2;
  x = (x - width / 2) / scale;
  y = (y - height / 2) / scale;
  width = width / scale;
  height = height / scale;
  radius = radius / scale;
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  if (stroke !== "") {
    ctx.strokeStyle = typeof stroke == "undefined" ? "#000" : stroke;
    ctx.stroke();
  }
  if (fill !== null) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  ctx.restore();
};
