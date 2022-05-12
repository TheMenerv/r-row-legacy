import { addUpdatableToGameLoop } from '..';
import { drawSprite } from '../assets';
import {
  getMouse,
  mouseRecCollide,
  getTouch,
  touchRecCollide,
} from '../devices';
import { Button } from '../types';

let buttons: Record<string, Button> = {};

export const getAllButtons = () => {
  return buttons;
};

export const getButton = (name: string): Button => {
  return buttons[name];
};

export const createButton = (
  name: string,
  x: number,
  y: number,
  text?: string
): Button => {
  const button: Button = {
    name: name,
    clicked: false,
    pressed: false,
    released: false,
    hovered: false,
    state: 'normal',
    x,
    y,
    width: 0,
    height: 0,
    text,
    color: null,
    image: null,
    textColor: null,
    font: null,
  };
  buttons[name] = button;
  return button;
};

const update = (dt: number) => {
  Object.entries(buttons).forEach(([_, button]) => {
    updateImagePosition(button);
    if (button.state === 'disabled') {
      button.clicked = false;
      button.pressed = false;
      button.released = false;
      button.hovered = false;
      return;
    }
    updateState(button);
  });
};

addUpdatableToGameLoop({ update, order: -1000 });

const updateImagePosition = (button: Button) => {
  if (button.image === null) return;
  button.image.normal.position.x = button.x;
  button.image.normal.position.y = button.y;
  button.image.hovered.position.x = button.x;
  button.image.hovered.position.y = button.y;
  button.image.pressed.position.x = button.x;
  button.image.pressed.position.y = button.y;
  button.image.disabled.position.x = button.x;
  button.image.disabled.position.y = button.y;
};

const updateState = (button: Button) => {
  const mouse = getMouse();
  const clicM = mouse.button.left;
  const touch = getTouch();
  const clicT = touch.isClic;
  let width = button.width;
  let height = button.height;
  if (button.image !== null) {
    width = button.image.normal.width * button.image.normal.scale.x;
    height = button.image.normal.height * button.image.normal.scale.y;
  }
  const x = button.x - width / 2;
  const y = button.y - height / 2;
  button.hovered =
    mouseRecCollide(x, y, width, height) ||
    touchRecCollide(x, y, width, height);
  button.pressed = false;
  if (button.hovered && !clicM && !clicT) button.state = 'hovered';
  else if (button.hovered && (clicM || clicT)) {
    button.state = 'pressed';
    button.pressed = true;
  } else button.state = 'normal';
  button.released = !button.pressed;
  button.clicked =
    (mouse.state.left === 'new_down' || touch.isClic) && button.hovered;
};

export const drawButton = (ctx: CanvasRenderingContext2D, button: Button) => {
  ctx.save();
  if (button.image !== null) drawSprite(ctx, button.image[button.state]);
  else {
    ctx.fillStyle = button.color[button.state];
    ctx.fillRect(
      button.x - button.width / 2,
      button.y - button.height / 2,
      button.width,
      button.height
    );
  }
  if (button.text !== null && button.text !== undefined) {
    if (button.textColor === null) ctx.fillStyle = 'White';
    else
      ctx.fillStyle =
        button.textColor[button.state === 'disabled' ? 'disabled' : 'normal'];
    if (button.font !== null) ctx.font = button.font;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(button.text, button.x, button.y);
  }
  ctx.restore();
};

export const destroyButton = (button: Button) => {
  delete buttons[button.name];
};

export const destroyAllButtons = () => {
  buttons = {};
};
