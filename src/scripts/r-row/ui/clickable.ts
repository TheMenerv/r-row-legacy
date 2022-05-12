import { addUpdatableToGameLoop } from '..';
import {
  getMouse,
  getTouch,
  mouseRecCollide,
  touchRecCollide,
} from '../devices';
import { Clickable } from '../types';

let clickables: Record<string, Clickable> = {};

export const getAllClickable = () => {
  return clickables;
};

export const getClickable = (name: string): Clickable => {
  return clickables[name];
};

export const createClickable = (
  name: string,
  x: number,
  y: number,
  width: number,
  height: number
): Clickable => {
  const clickable: Clickable = {
    name: name,
    clicked: false,
    pressed: false,
    released: false,
    hovered: false,
    state: 'normal',
    x,
    y,
    width,
    height,
  };
  clickables[name] = clickable;
  return clickable;
};

const update = (dt: number) => {
  Object.entries(clickables).forEach(([_, clickable]) => {
    if (clickable.state === 'disabled') {
      clickable.clicked = false;
      clickable.pressed = false;
      clickable.released = false;
      clickable.hovered = false;
      return;
    }
    updateState(clickable);
  });
};

addUpdatableToGameLoop({ update, order: -1000 });

const updateState = (clickable: Clickable) => {
  const mouse = getMouse();
  const clicM = mouse.button.left;
  const touch = getTouch();
  const clicT = touch.isClic;
  let width = clickable.width;
  let height = clickable.height;
  const x = clickable.x - width / 2;
  const y = clickable.y - height / 2;
  clickable.hovered =
    mouseRecCollide(x, y, width, height) ||
    touchRecCollide(x, y, width, height);
  clickable.pressed = false;
  if (clickable.hovered && !clicM && !clicT) clickable.state = 'hovered';
  else if (clickable.hovered && (clicM || clicT)) {
    clickable.state = 'pressed';
    clickable.pressed = true;
  } else clickable.state = 'normal';
  clickable.released = !clickable.pressed;
  clickable.clicked =
    (mouse.state.left === 'new_down' || touch.isClic) && clickable.hovered;
};

export const destroyClickable = (clickable: Clickable) => {
  delete clickables[clickable.name];
};

export const destroyAllClickables = () => {
  clickables = {};
};
