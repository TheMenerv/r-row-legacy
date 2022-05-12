import { gameScale, getCanvas, getCanvasPosition } from '../canvas';
import { addUpdatableToGameLoop } from '../gameLoop';
import { Touch } from '../types';
import { WIDTH, HEIGHT } from '../canvas';

let touch: Touch = null;
let _state: 'start' | 'move' | 'end' | 'cancel' | null = null;
let clickTimer: number;
let _clicDelay: number;
let oldState: 'start' | 'move' | 'end' | 'cancel' | null = null;

export const getTouch = (): Touch => {
  if (touch === null) touch = createTouch();
  return touch;
};

const createTouch = (clicDelay: number = 0.3): Touch => {
  clickTimer = 0;
  _clicDelay = clicDelay;
  return {
    position: { x: 0, y: 0 },
    state: null,
    isDown: false,
    isUp: true,
    isClic: false,
  };
};

export const isTouchScreen = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

export const touchRecCollide = (
  x: number,
  y: number,
  width: number,
  height: number
) => {
  const touch = getTouch();
  return (
    touch.position.x >= x &&
    touch.position.x <= x + width &&
    touch.position.y >= y &&
    touch.position.y <= y + height
  );
};

const update = (dt: number) => {
  getTouch();
  touch.isClic = false;
  clickTimer += dt;
  if (_state === 'start' && oldState !== 'start') {
    clickTimer = 0;
  }
  if (_state !== 'end') {
    touch.state = _state;
  } else if (touch.state === _state) {
    touch.state = null;
    _state = null;
  } else {
    if (clickTimer <= _clicDelay) {
      touch.isClic = true;
    }
    touch.state = 'end';
  }
  oldState = touch.state;
};

addUpdatableToGameLoop({ update, order: -1000 });

const onTouchCancel = (event: TouchEvent) => {
  event.preventDefault();
  _state = 'cancel';
  touch.isDown = false;
  touch.isUp = true;
};

const onTouchEnd = (event: TouchEvent) => {
  event.preventDefault();
  _state = 'end';
  touch.isDown = false;
  touch.isUp = true;
};

const onTouchMove = (event: TouchEvent) => {
  event.preventDefault();
  _state = 'move';
  updatePosition(event);
  touch.isDown = true;
  touch.isUp = false;
};

const onTouchStart = (event: TouchEvent) => {
  event.preventDefault();
  _state = 'start';
  updatePosition(event);
  touch.isDown = true;
  touch.isUp = false;
};

const updatePosition = (event: TouchEvent) => {
  const canvasPosition = getCanvasPosition();
  let x = (event.changedTouches[0].pageX - canvasPosition.x) / gameScale;
  if (x < 0) x = 0;
  else if (x > WIDTH) x = WIDTH;
  let y = (event.changedTouches[0].pageY - canvasPosition.y) / gameScale;
  if (y < 0) y = 0;
  else if (y > HEIGHT) y = HEIGHT;
  touch.position = { x, y };
};

const canvas = getCanvas();
canvas.addEventListener('touchcancel', onTouchCancel);
canvas.addEventListener('touchend', onTouchEnd);
canvas.addEventListener('touchmove', onTouchMove);
canvas.addEventListener('touchstart', onTouchStart);
