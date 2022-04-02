import config from "../../../config.json";
import { context, HEIGHT, WIDTH } from "../canvas";
import { Updatable, Drawable } from "../types";

let lastUpdate = 0;
export let dt = 0;

const loop = (time: number) => {
  dt = (time - lastUpdate) / 1000;
  lastUpdate = time;
  update(dt);
  clearScreen();
  draw(context);
  drawUI(context);
  window.requestAnimationFrame(loop);
};

export const startGameLoop = () => {
  window.requestAnimationFrame(loop);
};

let updatables: Updatable[] = [];
let drawables: Drawable[] = [];
let uiDrawables: Drawable[] = [];

const update = (dt: number) => {
  updatables.forEach((u) => {
    u.update(dt);
  });
};

const clearScreen = () => {
  context.clearRect(0, 0, WIDTH, HEIGHT);
};

const draw = (ctx: CanvasRenderingContext2D) => {
  drawables.forEach((d) => {
    ctx.save();
    d.draw(ctx);
    ctx.restore();
  });
};

const drawUI = (ctx: CanvasRenderingContext2D) => {
  uiDrawables.forEach((d) => {
    ctx.save();
    d.draw(ctx);
    ctx.restore();
  });
};

export const addUpdatableToGameLoop = (updatable: Updatable) => {
  updatables.push(updatable);
  updatables.sort((u1, u2) => u1.order - u2.order);
};

export const removeUpdatableToGameLoop = (updatable: Updatable) => {
  updatables = updatables.filter((u) => u !== updatable);
};

export const addDrawableToGameLoop = (drawable: Drawable) => {
  drawables.push(drawable);
  drawables.sort((d1, d2) => d1.order - d2.order);
};

export const removeDrawableToGameLoop = (drawable: Drawable) => {
  drawables = drawables.filter((d) => d !== drawable);
};

export const addUIDrawableToGameLoop = (drawable: Drawable) => {
  uiDrawables.push(drawable);
  uiDrawables.sort((d1, d2) => d1.order - d2.order);
};

export const removeUIDrawableToGameLoop = (drawable: Drawable) => {
  uiDrawables = uiDrawables.filter((d) => d !== drawable);
};
