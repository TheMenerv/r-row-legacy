import { getStore } from "../store";
import { SpriteSheet, Animation } from "../types";

export const createSpriteSheet = (
  image: string,
  animations: Record<string, Animation>,
  frame: { width: number; height: number }
): SpriteSheet => {
  const img = getImage(image);
  return {
    image: img,
    position: { x: -1000, y: -1000 },
    scale: { x: 1, y: 1 },
    vFlipped: false,
    hFlipped: false,
    width: img.width,
    height: img.height,
    animations,
    frame,
    currentAnimation: null as Animation,
    currentFrame: 0,
    timerAnimation: 0,
    animationFinished: false,
  };
};

const getImage = (name: string) => {
  const store = getStore();
  const image = store.images[name];
  if (image === undefined) throw new Error(`Image "${name}" was not found!`);
  return image;
};

export const setAnimation = (spriteSheet: SpriteSheet, animation: string) => {
  const ss = spriteSheet;
  if (ss.currentAnimation !== null)
    if (ss.currentAnimation.name === animation) return;
  let found = false;
  Object.entries(ss.animations).forEach(([_, anim]) => {
    if (anim.name === animation) {
      ss.currentAnimation = anim;
      ss.currentFrame = 0;
      ss.animationFinished = false;
      ss.timerAnimation = 0;
      found = true;
    }
  });
  if (!found) throw new Error(`Animation "${animation}" does not exist!`);
};

export const updateSpriteSheet = (dt: number, spriteSheet: SpriteSheet) => {
  if (spriteSheet.currentAnimation === null) return;
  spriteSheet.timerAnimation += dt;
  if (spriteSheet.timerAnimation >= 1 / spriteSheet.currentAnimation.speed) {
    spriteSheet.timerAnimation = 0;
    spriteSheet.currentFrame++;
    if (
      spriteSheet.currentFrame >= spriteSheet.currentAnimation.frames.length
    ) {
      if (spriteSheet.currentAnimation.loop) spriteSheet.currentFrame = 0;
      else {
        spriteSheet.currentFrame =
          spriteSheet.currentAnimation.frames.length - 1;
        spriteSheet.animationFinished = true;
      }
    }
  }
};

export const drawSpriteSheet = (
  ctx: CanvasRenderingContext2D,
  spriteSheet: SpriteSheet
) => {
  const ss = spriteSheet;
  const frameID = ss.currentAnimation.frames[ss.currentFrame];
  const columns = ss.image.width / ss.frame.width;
  const line = Math.floor(frameID / columns);
  const column = frameID - line * columns;
  const frameX = column * ss.frame.width;
  const frameY = line * ss.frame.height;
  const image = ss.image;
  const scaleX = ss.scale.x;
  const scaleY = ss.scale.y;
  const x = ss.position.x;
  const y = ss.position.y;
  const vFlipped = ss.vFlipped;
  const hFlipped = ss.hFlipped;
  const x1 = x - (ss.frame.width / 2) * scaleX;
  const x2 = -x - (ss.frame.width / 2) * scaleX;
  const y1 = y - (ss.frame.height / 2) * scaleY;
  const y2 = -y - (ss.frame.height / 2) * scaleY;
  const w = ss.frame.width * scaleX;
  const h = ss.frame.height * scaleY;
  let drawX = x1;
  let drawY = y1;
  let drawScaleX = scaleX;
  let drawScaleY = scaleY;
  if (hFlipped && !vFlipped) {
    drawScaleX = -1 * scaleX;
    drawX = x2;
    drawY = y1;
  } else if (vFlipped && !hFlipped) {
    drawScaleY = -1 * scaleY;
    drawX = x1;
    drawY = y2;
  } else if (vFlipped && hFlipped) {
    drawScaleX = -1 * scaleX;
    drawScaleY = -1 * scaleY;
    drawX = x2;
    drawY = y2;
  }
  ctx.save();
  ctx.scale(drawScaleX, drawScaleY);
  ctx.drawImage(
    image,
    frameX,
    frameY,
    ss.frame.width,
    ss.frame.height,
    drawX,
    drawY,
    w,
    h
  );
  ctx.restore();
};
