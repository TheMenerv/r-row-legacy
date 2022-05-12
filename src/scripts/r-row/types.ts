export type Updatable = {
  update: (dt: number) => void;
  order: number;
};

export type Drawable = {
  draw: (ctx: CanvasRenderingContext2D) => void;
  order: number;
};

export interface Stage {
  load: (...params: any[]) => void;
  update: (dt: number) => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
  drawUI: (ctx: CanvasRenderingContext2D) => void;
  clean: () => void;
}

export interface Asset {
  name: string;
  url: string;
}

export interface Sprite {
  image: HTMLImageElement;
  position: Vector2;
  scale: Vector2;
  vFlipped: boolean;
  hFlipped: boolean;
  width: number;
  height: number;
}

export interface SpriteSheet extends Sprite {
  animations: Record<string, Animation>;
  currentAnimation: Animation;
  currentFrame: number;
  timerAnimation: number;
  animationFinished: boolean;
  frame: { width: number; height: number };
}

export interface Animation {
  name: string;
  loop: boolean;
  end: boolean;
  speed: number;
  frames: number[];
}

export interface TileSet {
  image: HTMLImageElement;
  position: { x: number; y: number };
  scale: { x: number; y: number };
  tileSetWidth: number;
  tileSetHeight: number;
  frameWidth: number;
  frameHeight: number;
}

export interface Sound {
  name: string;
  sound: HTMLAudioElement;
  state: 'playing' | 'paused' | 'stopped';
}

export interface Vector2 {
  x: number;
  y: number;
}

export interface Store {
  images: Record<string, HTMLImageElement>;
  sounds: Record<string, HTMLAudioElement>;
}

export interface Clickable {
  name: string;
  clicked: boolean;
  pressed: boolean;
  released: boolean;
  hovered: boolean;
  state: 'normal' | 'disabled' | 'hovered' | 'pressed';
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Button extends Clickable {
  text: string;
  color: {
    normal: string;
    hovered: string;
    pressed: string;
    disabled: string;
  };
  image: {
    normal: Sprite;
    hovered: Sprite;
    pressed: Sprite;
    disabled: Sprite;
  };
  textColor: { normal: string; disabled: string };
  font: string;
}

export interface InputField {
  position: { x: number; y: number };
  type: string;
  placeholder: string;
  style: CSSStyleDeclaration;
  input: HTMLInputElement;
  width: number;
  height: number;
  fontSize: string;
  submitted: boolean;
  _oldSubmitted: boolean;
  value: string;
}

export interface Mouse {
  position: { x: number; y: number };
  state: Record<string, 'up' | 'new_up' | 'down' | 'new_down'>;
  button: Record<string, boolean>;
}

export interface Keyboard {
  state: Record<string, 'up' | 'new_up' | 'down' | 'new_down'>;
  keyDown: Record<string, boolean>;
  keyUp: Record<string, boolean>;
}

export interface Touch {
  position: { x: number; y: number };
  state: 'start' | 'move' | 'end' | 'cancel' | null;
  isDown: boolean;
  isUp: boolean;
  isClic: boolean;
}

export type Seed = string | null;

export interface NineSlice {
  position: { x: number; y: number };
  size: { width: number; height: number };
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  alpha: number;
  image: HTMLImageElement;
  scale: { x: number; y: number };
}
