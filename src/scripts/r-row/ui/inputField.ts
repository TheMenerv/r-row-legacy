import config from "../../../config.json";
import { gameScale, getCanvasPosition } from "../canvas";
import { addUpdatableToGameLoop } from "../gameLoop";
import { InputField } from "../types";

let inputFields: InputField[] = [];

export const createInputField = (
  x: number,
  y: number,
  type?: string,
  placeholder?: string,
  style?: CSSStyleDeclaration
): InputField => {
  const position = { x, y };
  const input = document.createElement("input");
  input.type = type === null ? "text" : type;
  input.placeholder = placeholder === null ? "" : placeholder;
  input.style.position = "fixed";
  if (style !== null)
    for (const key in style) {
      input.style[key] = style[key];
    }
  input.autocomplete = "off";
  input.style.left = "-1000px";
  input.style.top = "-1000px";
  const node = document.getElementById(config.canvas.node);
  let form = document.createElement("form");
  form.classList.add("gameForm");
  node.appendChild(form);
  form.appendChild(input);
  let i = {
    position,
    type: type === null ? "text" : type,
    placeholder: placeholder === null ? "" : placeholder,
    style: style,
    input,
    width: input.offsetWidth,
    height: input.offsetHeight,
    fontSize: input.style.fontSize,
    submitted: false,
    _oldSubmitted: false,
    value: "",
  };
  positionInputField(i);
  inputFields.push(i);
  return i;
};

const positionInputField = (inputField: InputField) => {
  const canvasPosition = getCanvasPosition();
  const w = inputField.input.offsetWidth;
  const h = inputField.input.offsetHeight;
  const x = Math.round(
    canvasPosition.x + inputField.position.x * gameScale - w / 2
  );
  const y = Math.round(
    canvasPosition.y + inputField.position.y * gameScale - h / 2
  );
  inputField.input.style.left = `${x}px`;
  inputField.input.style.top = `${y}px`;
};

const update = (dt: number) => {
  inputFields.forEach((inputField) => {
    positionInputField(inputField);
    resizeInputField(inputField);
    updateSubmit(inputField);
    inputField.value = inputField.input.value;
  });
};

addUpdatableToGameLoop({ update, order: -100 });

const resizeInputField = (inputField: InputField) => {
  inputField.input.style.width = `${inputField.width * gameScale}px`;
  inputField.input.style.height = `${inputField.height * gameScale}px`;
  if (inputField.fontSize.slice(-2) === "em") {
    const size = parseFloat(inputField.fontSize.slice(0, -2));
    inputField.input.style.fontSize = `${size * gameScale}em`;
  } else if (inputField.fontSize.slice(-2) === "px") {
    const size = parseFloat(inputField.fontSize.slice(0, -2));
    inputField.input.style.fontSize = `${size * gameScale}px`;
  }
};

const updateSubmit = (inputField: InputField) => {
  if (inputField._oldSubmitted) inputField.submitted = false;
  inputField._oldSubmitted = inputField.submitted;
};

const onClick = (event: Event) => {
  event.preventDefault();
  inputFields.forEach((inputField) => {
    if (event.target !== inputField.input) inputField.input.blur();
  });
};

document.addEventListener("click", onClick);

const onEnter = (event: KeyboardEvent) => {
  if (event.code === "Enter") event.preventDefault();
  inputFields.forEach((inputField) => {
    if (event.code === "Enter") {
      if (
        document.activeElement === inputField.input &&
        inputField.input.value !== ""
      ) {
        inputField.submitted = true;
      }
    } else inputField.submitted = false;
  });
};

document.addEventListener("keydown", onEnter);

export const destroyInputField = (inputField: InputField) => {
  const node = document.getElementById(config.canvas.node);
  const forms = document.getElementsByClassName("gameForm");
  for (let i = 0; i < forms.length; i++) {
    const form = forms[i];
    const iF = form.getElementsByTagName("input")[0];
    if (iF === inputField.input) {
      node.removeChild(form);
    }
  }
  inputFields = inputFields.filter((i) => i !== inputField);
};
