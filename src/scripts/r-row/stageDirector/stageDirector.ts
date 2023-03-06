import config from '../../../config.json';
// import { HEIGHT, WIDTH } from '../canvas/canvas';
import { divFade, HEIGHT, WIDTH } from '../canvas/canvas';
import {
  addDrawableToGameLoop,
  addUIDrawableToGameLoop,
  addUpdatableToGameLoop,
} from '../gameLoop';

interface Stage {
  load: (data?: Record<string, any>) => void;
  update: (dt: number) => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
  drawUI: (ctx: CanvasRenderingContext2D) => void;
  clean: () => void;
}

const stages: Record<string, Stage> = {};

let currentStage: Stage = null;
let previousStage: string = null;
let fade: 'in' | 'out' | 'off' = 'off';
let fadeAlpha: number = 0;
let waitingTransition: boolean = false;

export const addStage = (name: string, stage: Stage) => {
  stages[name] = stage;
};

export const switchStage = (name: string, params?: any) => {
  if (waitingTransition) return;
  if (currentStage === null) {
    changeStage(name, params);
  } else if (config.stage.transition.type === 'fade') {
    fade = 'in';
    const node = document.getElementById(config.canvas.node);
    node.appendChild(divFade);
    waitingTransition = true;
    setTimeout(() => {
      changeStage(name, params);
      fade = 'out';
      setTimeout(() => {
        divFade.remove();
        fade = 'off';
        document.getElementById('game').focus();
      }, config.stage.transition.delay * 1000);
    }, config.stage.transition.delay * 1000);
  } else {
    changeStage(name, params);
  }
};

const changeStage = (name: string, params?: any) => {
  if (currentStage !== null) {
    currentStage.clean();
    previousStage = Object.entries(stages).filter(
      (s) => s[1] === currentStage
    )[0][0];
  }
  currentStage = stages[name];
  currentStage.load(params);
  waitingTransition = false;
};

export const popStage = (data?: Record<string, any>) => {
  if (previousStage === null) return;
  switchStage(previousStage, data);
  previousStage = null;
};

const update = (dt: number) => {
  if (currentStage === null) return;
  currentStage.update(dt);
  if (fade === 'in' && fadeAlpha < 1) {
    fadeAlpha += dt / config.stage.transition.delay;
    if (fadeAlpha > 1) fadeAlpha = 1;
  } else if (fade === 'out' && fadeAlpha > 0) {
    fadeAlpha -= dt / config.stage.transition.delay;
    if (fadeAlpha < 0) fadeAlpha = 0;
  }
  if (fade !== 'off') {
    divFade.style.backgroundColor = `rgba(0, 0, 0, ${fadeAlpha})`;
  }
};

const draw = (ctx: CanvasRenderingContext2D) => {
  if (currentStage === null) return;
  currentStage.draw(ctx);
};

const drawUI = (ctx: CanvasRenderingContext2D) => {
  if (currentStage === null) return;
  currentStage.drawUI(ctx);
};

addUpdatableToGameLoop({ update, order: 0 });
addDrawableToGameLoop({ draw, order: 0 });
addUIDrawableToGameLoop({ draw: drawUI, order: 0 });
