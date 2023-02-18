import { logger } from './logger';
import { getCanvas } from './canvas';
import { startGameLoop } from './gameLoop';
import { load, main } from '..';
import { getStore } from './store';

const logo = `    Powered by
        ██████╗       ██████╗  ██████╗ ██╗    ██╗  █╗
        ██╔══██╗      ██╔══██╗██╔═══██╗██║    ██║  ██╗
    ███╗██████╔╝█████╗██████╔╝██║   ██║██║ █╗ ██║█████╗
    ╚══╝██╔══██╗╚════╝██╔══██╗██║   ██║██║███╗██║╚═██╔╝
        ██║  ██║      ██║  ██║╚██████╔╝╚███╔███╔╝  █╔╝
        ╚═╝  ╚═╝      ╚═╝  ╚═╝ ╚═════╝  ╚══╝╚══╝   ╚╝
    Developed with ♥️ by Yoan B. (Menerv)`;

const run = async () => {
  logger.info(logo);
  await load();
  iOsUnlockSound();
  getCanvas();
  startGameLoop();
  main();
};

run();

const iOsUnlockSound = () => {
  document.body.addEventListener(
    'touchstart',
    () => {
      if (audiosToUnlock) {
        for (let audio of audiosToUnlock) {
          audio.play();
          audio.pause();
          audio.currentTime = 0;
        }
        audiosToUnlock = [];
      }
    },
    false
  );
  let audiosToUnlock: HTMLAudioElement[] = [];
  Object.entries(getStore().sounds).forEach(([_, sound]) => {
    audiosToUnlock.push(sound);
  });
};
