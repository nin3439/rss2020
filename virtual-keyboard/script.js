const keyboardInput = document.querySelector(".use-keyboard-input");

const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
  },

  eventHandlers: {
    oninput: null,
    onclose: null,
  },

  properties: {
    value: "",
    capsLock: false,
    shift: false,
    english: true,
    cursorPos: 0,
  },

  keyLayoutEn: [
    "`",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "backspace",
    "caps",
    "q",
    "w",
    "e",
    "r",
    "t",
    "y",
    "u",
    "i",
    "o",
    "p",
    "[",
    "]",
    "shift",
    "a",
    "s",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    ";",
    "'",
    "enter",
    "done",
    "z",
    "x",
    "c",
    "v",
    "b",
    "n",
    "m",
    ",",
    ".",
    "/",
    "language",
    "space",
    "left",
    "right",
  ],

  keyShiftEn: [
    "~",
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "backspace",
    "caps",
    "Q",
    "W",
    "E",
    "R",
    "T",
    "Y",
    "U",
    "I",
    "O",
    "p",
    "{",
    "}",
    "shift",
    "A",
    "S",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    ":",
    '"',
    "enter",
    "done",
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M",
    "<",
    ">",
    "?",
    "language",
    "space",
    "left",
    "right",
  ],

  keyLayoutRu: [
    "ё",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "backspace",
    "caps",
    "й",
    "ц",
    "у",
    "к",
    "е",
    "н",
    "г",
    "ш",
    "щ",
    "з",
    "х",
    "ъ",
    "shift",
    "ф",
    "ы",
    "в",
    "а",
    "п",
    "р",
    "о",
    "л",
    "д",
    "ж",
    "э",
    "enter",
    "done",
    "я",
    "ч",
    "с",
    "м",
    "и",
    "т",
    "ь",
    "б",
    "ю",
    ".",
    "language",
    "space",
    "left",
    "right",
  ],
  keyShiftRu: [
    "Ё",
    "!",
    '"',
    "№",
    ";",
    "%",
    ":",
    "?",
    "*",
    "(",
    ")",
    "backspace",
    "caps",
    "Й",
    "Ц",
    "У",
    "К",
    "Е",
    "Н",
    "Г",
    "Ш",
    "Щ",
    "З",
    "Х",
    "Ъ",
    "shift",
    "Ф",
    "Ы",
    "В",
    "А",
    "П",
    "Р",
    "О",
    "Л",
    "Д",
    "Ж",
    "Э",
    "enter",
    "done",
    "Я",
    "Ч",
    "С",
    "М",
    "И",
    "Т",
    "Ь",
    "Б",
    "Ю",
    ",",
    "language",
    "space",
    "left",
    "right",
  ],

  insertLineBreakEn: ["backspace", "]", "enter", "/"],

  insertLineBreakEnShift: ["backspace", "}", "enter", "?"],

  insertLineBreakRu: ["backspace", "Ъ", "enter", "."],

  insertLineBreakRuShift: ["backspace", "Ъ", "enter", ","],

  mainKeyLayout: [],

  init() {
    // Create main elements
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");

    this.mainKeyLayout = this.keyLayoutEn;

    // Setup main elements
    this.elements.main.classList.add("keyboard", "keyboard--hidden");
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.keysContainer.appendChild(this.createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll(
      ".keyboard__key"
    );

    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    //use keyboard for elements with .use-keyboard-input
    document.querySelectorAll(".use-keyboard-input").forEach((element) => {
      element.addEventListener("focus", () => {
        this.open(element.value, (currentValue) => {
          element.value = currentValue;
        });
      });
    });

    this.keepFocusOnInput();

    document.addEventListener('keydown', (event) => {
      this.elements.keys.forEach((key) => {
        if (key.textContent === event.key) {
          key.classList.add('keyboard__key--highlighted');
        };
        if (key.id === event.code) {
          key.classList.add('keyboard__key--highlighted');
        };
      });

    });

    document.addEventListener('keyup', (event) => {
      this.elements.keys.forEach((key) => {
        console.log(event.key)
        if (key.textContent === event.key) {
          key.classList.remove('keyboard__key--highlighted');
        };
        if (key.id === event.code) {
          key.classList.remove('keyboard__key--highlighted');
        };
      });
    });
  },

  keepFocusOnInput() {
    keyboardInput.addEventListener("blur", (event) => {
      this.properties.cursorPos = keyboardInput.selectionStart;
      keyboardInput.focus();
    });
  },

  createKeys() {
    const fragment = document.createDocumentFragment();
    let mainInsertLineBreak = this.insertLineBreakEn;

    // Creates HTML for an icon
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };

    this.mainKeyLayout.forEach((key) => {
      const keyElement = document.createElement("button");
      const insertLineBreak = mainInsertLineBreak.indexOf(key) !== -1;

      //add attributes
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");

      switch (key) {
        case "backspace":
          keyElement.classList.add("keyboard__key--wide", "special");
          keyElement.setAttribute('id', 'Backspace');
          keyElement.innerHTML = createIconHTML("backspace");


          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.substring(
              0,
              this.properties.value.length - 1
            );
            this.triggerEvent("oninput");
          });

          break;

        case "caps":
          keyElement.classList.add(
            "keyboard__key--wide",
            "keyboard__key--activatable",
            "special"
          );
          keyElement.setAttribute('id', 'CapsLock');
          keyElement.innerHTML = createIconHTML("keyboard_capslock");

          keyElement.addEventListener("click", () => {
            this.toggleCapsLock();
            keyElement.classList.toggle(
              "keyboard__key--active",
              this.properties.capsLock
            );
          });

          break;

        case "shift":
          keyElement.classList.add(
            "keyboard__key--wide",
            "keyboard__key--activatable",
            "special"
          );
          keyElement.innerHTML = "Shift";

          keyElement.addEventListener("click", () => {
            this.toggleShift();
            keyElement.classList.toggle(
              "keyboard__key--active",
              this.properties.shift
            );
          });

          break;

        case "language":
          keyElement.classList.add("special");

          keyElement.innerHTML = "en";

          keyElement.addEventListener("click", () => {
            this.toggleLanguage();
          });

          break;

        case "space":
          keyElement.classList.add("keyboard__key--extra-wide", "special");
          keyElement.setAttribute('id', 'Space');
          keyElement.innerHTML = createIconHTML("space_bar");

          keyElement.addEventListener("click", () => {
            this.properties.value += " ";
            this.triggerEvent("oninput");
          });

          break;

        case "done":
          keyElement.classList.add(
            "keyboard__key--wide",
            "keyboard__key--dark",
            "special"
          );
          keyElement.innerHTML = createIconHTML("check_circle");

          keyElement.addEventListener("click", () => {
            this.close();
            this.triggerEvent("onclose");
          });

          break;

        case "enter":
          keyElement.classList.add("keyboard__key--wide", "special");
          keyElement.setAttribute('id', 'Enter');
          keyElement.innerHTML = createIconHTML("keyboard_return");

          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.substr(0, this.properties.cursorPos) + "\n" + this.properties.value.substr(this.properties.cursorPos, this.properties.value.length);
            this.triggerEvent("oninput");
          });

          break;

        case "left":
          keyElement.classList.add("special");
          keyElement.setAttribute('id', 'ArrowLeft');
          keyElement.innerHTML = createIconHTML("arrow_left");

          keyElement.addEventListener("click", () => {
            this.setCursorPos(keyboardInput, -1);
            this.triggerEvent("oninput");
          });

          break;

        case "right":
          keyElement.classList.add("special");
          keyElement.setAttribute('id', 'ArrowRight');
          keyElement.innerHTML = createIconHTML("arrow_right");

          keyElement.addEventListener("click", () => {
            this.setCursorPos(keyboardInput, 1);
            this.triggerEvent("oninput");
          });

          break;

        default:
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener("click", (event) => {
            const keyContent = event.target.innerText;

            if (this.properties.capsLock && !this.properties.shift) {
              this.properties.value += keyContent.toUpperCase();
            } else if (!this.properties.capsLock && this.properties.shift) {
              this.properties.value += keyContent.toUpperCase();
            } else if (this.properties.capsLock && this.properties.shift) {
              this.properties.value += keyContent.toLowerCase();
            } else {
              this.properties.value = this.properties.value.substr(0, this.properties.cursorPos) + keyContent.toLowerCase() + this.properties.value.substr(this.properties.cursorPos, this.properties.value.length);
            }

            this.properties.cursorPos += 1;
            this.triggerEvent("oninput");
          });

          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  },

  triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  setCursorPos(keyboardInput, addedPosition) {
    keyboardInput.selectionEnd = keyboardInput.selectionStart = keyboardInput.selectionStart + addedPosition;
    this.properties.cursorPos = keyboardInput.selectionStart + addedPosition;
  },

  toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;
    this.changeKeyLayout();
  },

  toggleShift() {
    this.properties.shift = !this.properties.shift;
    this.changeKeyLayout();
  },

  toggleLanguage() {
    this.properties.english = !this.properties.english;
    this.changeKeyLayout();
  },

  changeKeyLayout() {
    if (this.properties.shift && this.properties.english) {
      this.mainKeyLayout = this.keyShiftEn;
    } else if (this.properties.shift && !this.properties.english) {
      this.mainKeyLayout = this.keyShiftRu;
    } else if (!this.properties.shift && !this.properties.english) {
      this.mainKeyLayout = this.keyLayoutRu;
    } else {
      this.mainKeyLayout = this.keyLayoutEn;
    }

    let i = 0;
    for (const key of this.elements.keys) {
      if (!key.classList.contains("special")) {
        key.textContent = this.mainKeyLayout[i];
        if (this.properties.capsLock && !this.properties.shift) {
          key.textContent = this.mainKeyLayout[i].toUpperCase();
        }
        if (this.properties.capsLock && this.properties.shift) {
          key.textContent = this.mainKeyLayout[i].toLowerCase();
        }
        if (this.properties.shift && !this.properties.capsLock) {
          key.textContent = this.mainKeyLayout[i].toUpperCase();
        }
      }
      if (this.mainKeyLayout[i] === "language" && this.properties.english) {
        key.textContent = "en";
      } else if (this.mainKeyLayout[i] === "language") key.textContent = "ru";
      i++;
    }
  },

  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove("keyboard--hidden");
  },

  close() {
    this.properties.value = "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add("keyboard--hidden");
  },
};

window.addEventListener("DOMContentLoaded", function() {
  Keyboard.init();
});
