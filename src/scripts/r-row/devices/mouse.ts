import { addUpdatableToGameLoop, getStore } from "..";
import { gameScale, getCanvas, getCanvasPosition } from "../canvas";
import { Mouse } from "../types";

let mouse: Mouse = null;

export const getMouse = (): Mouse => {
  if (mouse === null) mouse = createMouse();
  return mouse;
};

const createMouse = (): Mouse => {
  return {
    position: { x: 0, y: 0 },
    _state: {},
    state: {},
    button: {},
  };
};

const getButtonName = (event: MouseEvent) => {
  const name = ["left", "middle", "right"];
  return name[event.button];
};

const onMouseMove = (event: MouseEvent) => {
  let mouse = getMouse();
  const canvasPosition = getCanvasPosition();
  mouse.position = {
    x: (event.clientX - canvasPosition.x) / gameScale,
    y: (event.clientY - canvasPosition.y) / gameScale,
  };
};

const onMouseDown = (event: MouseEvent) => {
  event.preventDefault();
  let mouse = getMouse();
  const button = getButtonName(event);
  mouse.button[button] = true;
  mouse._state[button] = "down";
  if (mouse.state[button] === undefined) mouse.state[button] = "up";
};

const onMouseUp = (event: MouseEvent) => {
  event.preventDefault();
  let mouse = getMouse();
  const button = getButtonName(event);
  mouse.button[button] = false;
  mouse._state[button] = "up";
};

const onContextMenu = (event: MouseEvent) => {
  event.preventDefault();
};

export const mouseRecCollision = (
  x: number,
  y: number,
  width: number,
  height: number
) => {
  const mouse = getMouse();
  return (
    mouse.position.x >= x &&
    mouse.position.x <= x + width &&
    mouse.position.y >= y &&
    mouse.position.y <= y + height
  );
};

const update = (dt: number) => {
  let mouse = getMouse();
  const oldState = mouse.state;
  for (const button in mouse._state) {
    const state = mouse._state[button];
    if (oldState[button].includes("up") && state === "down") {
      mouse.state[button] = "new_down";
    } else if (oldState[button].includes("down") && state === "up") {
      mouse.state[button] = "new_up";
    } else {
      mouse.state[button] = mouse._state[button];
    }
  }
};

export const setCursor = (
  image: string,
  offset: { x: number; y: number } | number
) => {
  let canvas = getCanvas();
  const store = getStore();
  const cursorUrl = store.images[image].src;
  let o = { x: 0, y: 0 };
  if (typeof offset === "object") o = offset;
  else o = { x: offset, y: offset };
  canvas.style.cursor = `url(${cursorUrl}) ${o.x} ${o.y}, default`;
};

addUpdatableToGameLoop({ update, order: -1000 });

const canvas = getCanvas();
canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", onMouseUp);
canvas.addEventListener("contextmenu", onContextMenu);
