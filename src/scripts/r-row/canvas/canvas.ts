import config from '../../../config.json';

export let canvas: HTMLCanvasElement = null;
export let context: CanvasRenderingContext2D = null;
export let gameScale: number = 1;
export const WIDTH = config.canvas.width;
export const HEIGHT = config.canvas.height;
export let divFade: HTMLDivElement = null;

export const getCanvas = () => {
  if (canvas === null) createCanvas();
  return canvas;
};

export const getContext = () => {
  if (context === null) {
    context = getCanvas().getContext('2d');
  }
  return context;
};

const createCanvas = () => {
  canvas = document.createElement('canvas');
  canvas.id = 'game';
  canvas.width = config.canvas.width;
  canvas.height = config.canvas.height;
  canvas.style.zIndex = '0';
  if (config.canvas.fullScreen) {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
  }
  canvas.tabIndex = 1;
  const node = document.getElementById(config.canvas.node);
  node.appendChild(canvas);
  context = canvas.getContext('2d');
  context.imageSmoothingEnabled = config.canvas.antiAliasing;
  canvas.focus();
  window.addEventListener('mousedown', focus);
  window.addEventListener('touchstart', focus);
  divFade = document.createElement('div');
  divFade.setAttribute('id', 'fade');
  divFade.style.margin = '0';
  divFade.style.padding = '0';
  divFade.style.top = `${getCanvasPosition().y}px`;
  divFade.style.left = `${getCanvasPosition().x}px`;
  divFade.style.width = `${canvas.width}px`;
  divFade.style.height = `${canvas.height}px`;
  divFade.style.position = 'absolute';
  divFade.style.backgroundColor = 'rgba(0, 0, 0, 1)';
  divFade.style.zIndex = '2';
  // node.appendChild(divFade);
};

const focus = () => {
  const canvas = getCanvas();
  canvas.focus();
};

const resizeCanvas = () => {
  let width, height;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const gameWidth = config.canvas.width;
  const gameHeight = config.canvas.height;
  const ratio = gameWidth / gameHeight;
  if (windowWidth / windowHeight >= ratio) {
    gameScale = windowHeight / gameHeight;
  } else {
    gameScale = windowWidth / gameWidth;
  }
  width = gameWidth * gameScale;
  height = gameHeight * gameScale;
  canvas.width = width;
  canvas.height = height;
  getContext().scale(gameScale, gameScale);
  context.imageSmoothingEnabled = config.canvas.antiAliasing;
  if (divFade) {
    divFade.style.top = `${getCanvasPosition().y}px`;
    divFade.style.left = `${getCanvasPosition().x}px`;
    divFade.style.width = `${canvas.width}px`;
    divFade.style.height = `${canvas.height}px`;
  }
};

export const getCanvasPosition = () => {
  const rect = canvas.getBoundingClientRect();
  return {
    x: rect.x,
    y: rect.y,
  };
};

export const setFullScreen = () => {
  document.getElementById('body').requestFullscreen();
};
