![R-ROW](/favicon.ico 'R-ROW')

R-ROW (pronounced arrow) is a 2D game engine written in TypeScript.

---

## Installation

1. Clone this repository
2. Open the file `/index.html`
3. Change the title between `<title>` tag
4. Open the file `/package.json`
5. Change all field that you want like `name`, `description`, `repository`, etc...
6. Replace `/favicon.ico` file with yours.
7. Edit `/src/config.json` file.

---

## Features

- Create and fully manage the game canvas
  - Work with your native resolution and engine can adapt the canvas scaling to take advantage of the full size available on the window
  - or work on your fixed resolution
- Automatic game loop with 3 steps (_update_, _draw_ and _drawUI_)
- Simplest way to read the keyboard and mouse states.
  - Four states for each button/key (_up_, _new_up_, _down_ and _new_down_)
- A simple logger to log everything you want in development environment with different level (_debug_, _info_, _warn_ and _error_) and keep your production environment safe with auto remove log trace
- Integrated development server
- Compile your game on optimized javascript ES5 to run in all browsers
- Automatically load assets on the browser and avoid the browser cache problems each time you build a new version of your project
- Create and manage sounds, sprites and tile sets/sprite sheets with animations
- Create and manage different scenes do you need
- Random generator with seed capability
- Provide a light websocket to communicate with any server for networking games
- Draw rounded rectangle easier

---

## Structure of project

The minimal folders in `/src/` folder is:

```text
/
└── src/
    ├── scripts/
    │   ├── r-row/  /!\-DO-NOT-MODIFY-/!\
    │   ├── index.ts  -> Entry point of your code.
    │   └── <your script files here...>
    └── styles/
        └── <your style files here...>
```

but we recommand to add theses folders for your assets:

```text
/
└── src/
    ├── fonts/
    │   └── <your font files here...>
    ├── images/
    │   └── <your image files here...>
    ├── scripts/
    │   ├── r-row/  /!\-DO-NOT-MODIFY-/!\
    │   ├── index.ts  -> Entry point of your code.
    │   └── <your script files here...>
    ├── sounds/
    │   └── <your sound files here...>
    └── styles/
        └── <your style files here...>
```

---

## Manual

See the [wiki](https://github.com/TheMenerv/r-row/wiki) to learn how to use the engine.
