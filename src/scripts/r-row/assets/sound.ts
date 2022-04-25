import { Sound } from '../types';
import { getStore } from '../store';

let soundsPlaying: Record<string, Sound> = {};

export const createSound = (
  name: string,
  sound: string,
  looped: boolean = false
): Sound => {
  const store = getStore();
  const s = store.sounds[sound];
  if (s === undefined) throw new Error(`Sound "${sound}" not exist!`);
  s.loop = looped;
  if (!looped)
    s.onended = () => {
      snd.state = 'stopped';
    };
  const snd: Sound = { name, sound: s, state: 'stopped' };
  soundsPlaying[name] = snd;
  return snd;
};

export const playSound = (sound: Sound) => {
  sound.sound.play();
  sound.state = 'playing';
};

export const setVolume = (sound: Sound, volume: number) => {
  sound.sound.volume = volume;
};

export const stopSound = (sound: Sound) => {
  sound.sound.pause();
  sound.sound.currentTime = 0;
  sound.state = 'stopped';
};

export const pauseSound = (sound: Sound) => {
  sound.sound.pause();
  sound.state = 'paused';
};

export const pauseAllSounds = () => {
  Object.entries(soundsPlaying).forEach(([_, sound]) => {
    sound.sound.pause();
    sound.state = 'paused';
  });
};

export const stopAllSounds = () => {
  Object.entries(soundsPlaying).forEach(([_, sound]) => {
    sound.sound.pause();
    sound.sound.currentTime = 0;
    sound.state = 'stopped';
  });
};

export const destroySound = (sound: Sound) => {
  delete soundsPlaying[sound.name];
};

export const destroyAllSounds = () => {
  soundsPlaying = {};
};
