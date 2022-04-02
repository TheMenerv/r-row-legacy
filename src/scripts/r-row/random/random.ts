import randomSeed from "random-seed";
import { Seed } from "../types";

let rand: randomSeed.RandomSeed = null;
let lastSeed: Seed = null;
let created: boolean = false;

const getRandom = (seed: Seed): randomSeed.RandomSeed => {
  if (rand !== null && lastSeed === seed && created) return rand;
  lastSeed = seed;
  created = true;
  rand = randomSeed.create();
  if (seed !== null) {
    rand = randomSeed.create(seed);
  }
  return rand;
};

export const random = (seed: Seed | null) => {
  const r = getRandom(seed).random();
  return r;
};

export const randomRange = (seed: Seed, min: number, max: number) => {
  if (max < min) throw new Error("min value must be lower that max value");
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(random(seed) * (max - min + 1)) + min;
};
