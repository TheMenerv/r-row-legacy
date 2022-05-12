export { logger } from './logger';

export {
  canvas,
  context,
  gameScale,
  WIDTH,
  HEIGHT,
  getCanvas,
  getContext,
  getCanvasPosition,
  setFullScreen,
} from './canvas';

export {
  dt,
  addUpdatableToGameLoop,
  removeUpdatableToGameLoop,
  addDrawableToGameLoop,
  removeDrawableToGameLoop,
  addUIDrawableToGameLoop,
  removeUIDrawableToGameLoop,
} from './gameLoop';

export { addStage, switchStage, popStage } from './stageDirector';

export {
  drawSprite,
  createSprite,
  drawSpriteSheet,
  createSpriteSheet,
  setAnimation,
  updateSpriteSheet,
  createSound,
  playSound,
  setVolume,
  stopSound,
  pauseSound,
  pauseAllSounds,
  stopAllSounds,
  destroySound,
  destroyAllSounds,
  createTileSet,
  drawTile,
} from './assets';

export * from './types';

export { getStore, loadAssets } from './store';

export {
  getMouse,
  mouseRecCollide,
  setCursor,
  getKeyboard,
  getTouch,
  isTouchScreen,
  touchRecCollide,
} from './devices';

export {
  getClickable,
  getAllClickable,
  createClickable,
  destroyClickable,
  destroyAllClickables,
  createButton,
  destroyButton,
  destroyAllButtons,
  drawButton,
  getButton,
  getAllButtons,
  createInputField,
  destroyInputField,
  createNineSlice,
  drawNineSlice,
  drawText,
} from './ui';

export { random, randomRange } from './random';

export {
  drawRoundedRect,
  drawLinePoint,
  drawLineVector,
  drawCirclePoint,
  drawCircleVector,
} from './primitives';

export { setServerURL, getSocket, isServerConnected } from './network';

export {
  normalizeVector2,
  distancePoint,
  distanceVector2,
  radian,
} from './math';
