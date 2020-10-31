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
  },

  keyLayoutEn: [
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
    "?",
    "language",
    "space",
  ],

  keyShiftEn: [
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
    "/",
    "language",
    "space",
  ],

  keyLayoutRu: [
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
  ],
  keyShiftRu: [
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
  ],

  insertLineBreakEn: ["backspace", "]", "enter", "?"],

  insertLineBreakEnShift: ["backspace", "}", "enter", "/"],

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
          keyElement.innerHTML = createIconHTML("keyboard_return");

          keyElement.addEventListener("click", () => {
            this.properties.value += "\n";
            this.triggerEvent("oninput");
          });

          break;

        default:
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener("click", () => {
            console.log(key)
            if (this.properties.capsLock && !this.properties.shift) {
              this.properties.value += key.toUpperCase();
            } else if (!this.properties.capsLock && this.properties.shift) {
              this.properties.value += key.toUpperCase();
            } else if (this.properties.capsLock && this.properties.shift) {
              this.properties.value += key.toLowerCase();
            } else {
              this.properties.value += key.toLowerCase();
            }

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
    console.log(this.mainKeyLayout)
    if (this.properties.shift && this.properties.english) {
      this.mainKeyLayout = this.keyShiftEn;
    } else if (this.properties.shift && !this.properties.english) {
      this.mainKeyLayout = this.keyShiftRu;
    }  else  if (!this.properties.shift && !this.properties.english) {
      this.mainKeyLayout = this.keyLayoutRu; 
    } else {
      this.mainKeyLayout = this.keyLayoutEn;
    }

    let i = 0;
    for (const key of this.elements.keys) {
      if (!key.classList.contains("special")) {
        key.textContent = this.mainKeyLayout[i];
        console.log(this.mainKeyLayout[i]);
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
      if(this.mainKeyLayout[i] === "language" && this.properties.english){
        key.textContent = "en";
      } else if(this.mainKeyLayout[i] === "language") key.textContent = "ru";
      i++;
    }
    this.createKeys();
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

window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init();
});
