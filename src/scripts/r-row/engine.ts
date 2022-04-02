import { logger } from "./logger";
import { getCanvas } from "./canvas";
import { startGameLoop } from "./gameLoop";
import { load, main } from "..";

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
  getCanvas();
  startGameLoop();
  main();
};

run();
