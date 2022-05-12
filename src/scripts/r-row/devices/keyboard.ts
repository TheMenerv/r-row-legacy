import { addUpdatableToGameLoop, getCanvas } from '..';
import { Keyboard } from '../types';

let keyboard: Keyboard = null;
let _state: Record<string, 'up' | 'down'>;

export const getKeyboard = (): Keyboard => {
  if (keyboard === null) keyboard = createKeyboard();
  return keyboard;
};

const createKeyboard = (): Keyboard => {
  _state = {};
  return {
    state: {},
    keyDown: {},
    keyUp: {},
  };
};

const onKeyDown = (event: KeyboardEvent) => {
  event.preventDefault();
  keyboard.keyDown[event.code] = true;
  keyboard.keyUp[event.code] = false;
  _state[event.code] = 'down';
  if (keyboard.state[event.code] === undefined)
    keyboard.state[event.code] = 'up';
};

const onKeyUp = (event: KeyboardEvent) => {
  event.preventDefault();
  keyboard.keyDown[event.code] = false;
  keyboard.keyUp[event.code] = true;
  _state[event.code] = 'up';
};

const update = (dt: number) => {
  let keyboard = getKeyboard();
  const oldState = keyboard.state;
  for (const key in _state) {
    const state = _state[key];
    if (oldState[key].includes('up') && state === 'down')
      keyboard.state[key] = 'new_down';
    else if (oldState[key].includes('down') && state === 'up')
      keyboard.state[key] = 'new_up';
    else keyboard.state[key] = _state[key];
  }
};

addUpdatableToGameLoop({ update, order: -1000 });

const canvas = getCanvas();
canvas.addEventListener('keydown', onKeyDown);
canvas.addEventListener('keyup', onKeyUp);
