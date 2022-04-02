import {
  addDrawableToGameLoop,
  addUIDrawableToGameLoop,
  addUpdatableToGameLoop,
} from "../gameLoop";

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

export const addStage = (name: string, stage: Stage) => {
  stages[name] = stage;
};

export const switchStage = (name: string, ...params: any[]) => {
  if (currentStage !== null) {
    currentStage.clean();
    previousStage = Object.entries(stages).filter(
      (s) => s[1] === currentStage
    )[0][0];
  }
  currentStage = stages[name];
  currentStage.load(params);
};

export const popStage = (data?: Record<string, any>) => {
  if (previousStage === null) return;
  switchStage(previousStage, data);
  previousStage = null;
};

const update = (dt: number) => {
  if (currentStage === null) return;
  currentStage.update(dt);
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
