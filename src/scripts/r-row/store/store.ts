import { Asset, Store } from "../types";

let store: Store = null;
let loadedAsset: number = null;

const createStore = (): Store => {
  loadedAsset = 0;
  return {
    images: {},
    sounds: {},
  };
};

export const getStore = () => {
  if (store === null) store = createStore();
  return store;
};

export const loadAssets = async (
  images: Asset[],
  sounds: Asset[],
  fonts: Asset[]
) => {
  await Promise.all([loadImages(images), loadSounds(sounds), loadFonts(fonts)]);
  return;
};

const loadImages = async (images: Asset[]) => {
  const promiseArray: Promise<void>[] = [];
  for (let img of images) {
    promiseArray.push(
      new Promise((resolve) => {
        let image = new Image();
        image.src = img.url;
        image.onload = () => {
          resolve();
        };
        storeAsset(img.name, image);
      })
    );
  }
  await Promise.all(promiseArray);
  return;
};

const loadSounds = async (sounds: Asset[]) => {
  const promiseArray: Promise<void>[] = [];
  for (let snd of sounds) {
    promiseArray.push(
      new Promise((resolve) => {
        let sound = new Audio(snd.url);
        sound.oncanplaythrough = () => {
          resolve();
        };
        storeAsset(snd.name, sound);
      })
    );
  }
  await Promise.all(promiseArray);
  return;
};

const loadFonts = async (fonts: Asset[]) => {
  const promiseArray: Promise<void>[] = [];
  for (let ft of fonts) {
    promiseArray.push(
      new Promise(async (resolve) => {
        let font = await new FontFace(ft.name, `url(${ft.url})`).load();
        document.fonts.add(font);
        resolve();
      })
    );
  }
  await Promise.all(promiseArray);
  return;
};

const storeAsset = <T = HTMLImageElement | HTMLAudioElement | FontFace>(
  name: string,
  asset: T
) => {
  let store = getStore();
  if (asset instanceof HTMLImageElement) store.images[name] = asset;
  else if (asset instanceof HTMLAudioElement) store.sounds[name] = asset;
};
