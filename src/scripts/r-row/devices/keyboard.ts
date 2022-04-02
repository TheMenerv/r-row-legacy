import { addUpdatableToGameLoop, getCanvas } from "..";
import { Keyboard } from "../types";

let keyboard: Keyboard = null;

export const getKeyboard = (): Keyboard => {
  if (keyboard === null) keyboard = createKeyboard();
  return keyboard;
};

const createKeyboard = (): Keyboard => {
  return {
    _state: {},
    state: {},
    keyDown: {},
    keyUp: {},
  };
};

const onKeyDown = (event: KeyboardEvent) => {
  event.preventDefault();
  keyboard.keyDown[event.code] = true;
  keyboard.keyUp[event.code] = false;
  keyboard._state[event.code] = "down";
  if (keyboard.state[event.code] === undefined)
    keyboard.state[event.code] = "up";
};

const onKeyUp = (event: KeyboardEvent) => {
  event.preventDefault();
  keyboard.keyDown[event.code] = false;
  keyboard.keyUp[event.code] = true;
  keyboard._state[event.code] = "up";
};

const update = (dt: number) => {
  let keyboard = getKeyboard();
  const oldState = keyboard.state;
  for (const key in keyboard._state) {
    const state = keyboard._state[key];
    if (oldState[key].includes("up") && state === "down")
      keyboard.state[key] = "new_down";
    else if (oldState[key].includes("down") && state === "up")
      keyboard.state[key] = "new_up";
    else keyboard.state[key] = keyboard._state[key];
  }
};

addUpdatableToGameLoop({ update, order: -1000 });

const canvas = getCanvas();
canvas.addEventListener("keydown", onKeyDown);
canvas.addEventListener("keyup", onKeyUp);
