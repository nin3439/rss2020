const menuButton = document.querySelector(".menu-button");
const overlay = document.querySelector(".overlay");
const navbar = document.querySelector(".menu");
const switchButton = document.querySelector("#check");
const trainPart = document.querySelector(".train");
const playPart = document.querySelector("span:first-child");
const rootDiv = document.getElementById("root");
const contentWrapper = document.createElement("div");

const menuLinkList = document.querySelectorAll('.menu-item');

let isTrain = true;

// let menuLinks = Array.from(menuLinkList).map(item => {
//   item.addEventListener('click', () => {
//     console.log('cl')
//     item.classList.toggle('.active')
//   })
// })

menuButton.addEventListener("click", () => {
  navbar.classList.toggle("toggle");
  overlay.classList.toggle("none");
  document.body.classList.toggle("disable-body");
});

overlay.addEventListener("click", () => {
  navbar.classList.toggle("toggle");
  document.body.classList.toggle("disable-body");
  overlay.classList.toggle("none");
});

const categories = [
  {
    id: "actionA",
    title: "Action (set A)",
    image: "assets/images/cards/actionA.jpg",
  },

  {
    id: "actionB",
    title: "Action (set B)",
    image: "assets/images/cards/play.jpg",
  },

  {
    id: "nature",
    title: "Nature",
    image: "assets/images/cards/tree.jpg",
  },

  {
    id: "food",
    title: "Food",
    image: "assets/images/cards/cake.jpg",
  },

  {
    id: "animalA",
    title: "Animal (set A)",
    image: "assets/images/cards/pig.jpg",
  },

  {
    id: "animalB",
    title: "Animal (set B)",
    image: "assets/images/cards/lion.jpg",
  },

  {
    id: "clothes",
    title: "Clothes",
    image: "assets/images/cards/blouse.jpg",
  },

  {
    id: "emotions",
    title: "Emotions",
    image: "assets/images/cards/happy.jpg",
  },
];

const cards = [
  {
    id: "actionA",
    word: "cry",
    translation: "плакать",
    image: "assets/images/cards/cry.jpg",
    audioSrc: "assets/audio/cry.mp3",
  },
  {
    id: "actionA",
    word: "dance",
    translation: "танцевать",
    image: "assets/images/cards/dance.jpg",
    audioSrc: "assets/audio/dance.mp3",
  },
  {
    id: "actionA",
    word: "dive",
    translation: "нырять",
    image: "assets/images/cards/dive.jpg",
    audioSrc: "assets/audio/dive.mp3",
  },
  {
    id: "actionA",
    word: "draw",
    translation: "рисовать",
    image: "assets/images/cards/draw.jpg",
    audioSrc: "assets/audio/draw.mp3",
  },
  {
    id: "actionA",
    word: "fish",
    translation: "ловить рыбу",
    image: "assets/images/cards/fish.jpg",
    audioSrc: "assets/audio/fish.mp3",
  },
  {
    id: "actionA",
    word: "fly",
    translation: "летать",
    image: "assets/images/cards/fly.jpg",
    audioSrc: "assets/audio/fly.mp3",
  },
  {
    id: "actionA",
    word: "hug",
    translation: "обнимать",
    image: "assets/images/cards/hug.jpg",
    audioSrc: "assets/audio/hug.mp3",
  },
  {
    id: "actionA",
    word: "jump",
    translation: "прыгать",
    image: "assets/images/cards/jump.jpg",
    audioSrc: "assets/audio/jump.mp3",
  },
  {
    id: "actionB",
    word: "open",
    translation: "открывать",
    image: "assets/images/cards/open.jpg",
    audioSrc: "assets/audio/open.mp3",
  },
  {
    id: "actionB",
    word: "play",
    translation: "играть",
    image: "assets/images/cards/play.jpg",
    audioSrc: "assets/audio/play.mp3",
  },
  {
    id: "actionB",
    word: "point",
    translation: "указывать",
    image: "assets/images/cards/point.jpg",
    audioSrc: "assets/audio/point.mp3",
  },
  {
    id: "actionB",
    word: "ride",
    translation: "ездить",
    image: "assets/images/cards/ride.jpg",
    audioSrc: "assets/audio/ride.mp3",
  },
  {
    id: "actionB",
    word: "run",
    translation: "бегать",
    image: "assets/images/cards/run.jpg",
    audioSrc: "assets/audio/run.mp3",
  },
  {
    id: "actionB",
    word: "sing",
    translation: "петь",
    image: "assets/images/cards/sing.jpg",
    audioSrc: "assets/audio/sing.mp3",
  },
  {
    id: "actionB",
    word: "skip",
    translation: "пропускать, прыгать",
    image: "assets/images/cards/skip.jpg",
    audioSrc: "assets/audio/skip.mp3",
  },
  {
    id: "actionB",
    word: "swim",
    translation: "плавать",
    image: "assets/images/cards/swim.jpg",
    audioSrc: "assets/audio/swim.mp3",
  },
  {
    id: "food",
    word: "cake",
    translation: "торт",
    image: "assets/images/cards/cake.jpg",
    audioSrc: "assets/audio/cake.mp3",
  },
  {
    id: "food",
    word: "ice-cream",
    translation: "мороженое",
    image: "assets/images/cards/ice-cream.jpg",
    audioSrc: "assets/audio/ice-cream.mp3",
  },
  {
    id: "food",
    word: "porridge",
    translation: "каша",
    image: "assets/images/cards/porridge.jpg",
    audioSrc: "assets/audio/porridge.mp3",
  },
  {
    id: "food",
    word: "apple",
    translation: "яблоко",
    image: "assets/images/cards/apple.jpg",
    audioSrc: "assets/audio/apple.mp3",
  },
  {
    id: "food",
    word: "pumpkin",
    translation: "тыква",
    image: "assets/images/cards/pumpkin.jpg",
    audioSrc: "assets/audio/pumpkin.mp3",
  },
  {
    id: "food",
    word: "pizza",
    translation: "пицца",
    image: "assets/images/cards/pizza.jpg",
    audioSrc: "assets/audio/pizza.mp3",
  },
  {
    id: "food",
    word: "cheese",
    translation: "сыр",
    image: "assets/images/cards/cheese.jpg",
    audioSrc: "assets/audio/cheese.mp3",
  },
  {
    id: "food",
    word: "bread",
    translation: "хлеб",
    image: "assets/images/cards/bread.jpg",
    audioSrc: "assets/audio/bread.mp3",
  },
  {
    id: "nature",
    word: "tree",
    translation: "дерево",
    image: "assets/images/cards/tree.jpg",
    audioSrc: "assets/audio/tree.mp3",
  },
  {
    id: "nature",
    word: "flower",
    translation: "цветок",
    image: "assets/images/cards/flower.jpg",
    audioSrc: "assets/audio/flower.mp3",
  },
  {
    id: "nature",
    word: "grass",
    translation: "трава",
    image: "assets/images/cards/grass.jpg",
    audioSrc: "assets/audio/grass.mp3",
  },
  {
    id: "nature",
    word: "river",
    translation: "река",
    image: "assets/images/cards/river.jpg",
    audioSrc: "assets/audio/river.mp3",
  },
  {
    id: "nature",
    word: "mountain",
    translation: "гора",
    image: "assets/images/cards/mountain.jpg",
    audioSrc: "assets/audio/mountain.mp3",
  },
  {
    id: "nature",
    word: "forest",
    translation: "лес",
    image: "assets/images/cards/forest.jpg",
    audioSrc: "assets/audio/forest.mp3",
  },
  {
    id: "nature",
    word: "sun",
    translation: "солнце",
    image: "assets/images/cards/sun.jpg",
    audioSrc: "assets/audio/sun.mp3",
  },
  {
    id: "nature",
    word: "cloud",
    translation: "облако",
    image: "assets/images/cards/cloud.jpg",
    audioSrc: "assets/audio/cloud.mp3",
  },
  {
    id: "animalA",
    word: "cat",
    translation: "кот",
    image: "assets/images/cards/cat.jpg",
    audioSrc: "assets/audio/cat.mp3",
  },
  {
    id: "animalA",
    word: "chick",
    translation: "цыплёнок",
    image: "assets/images/cards/chick.jpg",
    audioSrc: "assets/audio/chick.mp3",
  },
  {
    id: "animalA",
    word: "chicken",
    translation: "курица",
    image: "assets/images/cards/chicken.jpg",
    audioSrc: "assets/audio/chicken.mp3",
  },
  {
    id: "animalA",
    word: "dog",
    translation: "собака",
    image: "assets/images/cards/dog.jpg",
    audioSrc: "assets/audio/dog.mp3",
  },
  {
    id: "animalA",
    word: "horse",
    translation: "лошадь",
    image: "assets/images/cards/horse.jpg",
    audioSrc: "assets/audio/horse.mp3",
  },
  {
    id: "animalA",
    word: "pig",
    translation: "свинья",
    image: "assets/images/cards/pig.jpg",
    audioSrc: "assets/audio/pig.mp3",
  },
  {
    id: "animalA",
    word: "rabbit",
    translation: "кролик",
    image: "assets/images/cards/rabbit.jpg",
    audioSrc: "assets/audio/rabbit.mp3",
  },
  {
    id: "animalA",
    word: "sheep",
    translation: "овца",
    image: "assets/images/cards/sheep.jpg",
    audioSrc: "assets/audio/sheep.mp3",
  },

  {
    id: "animalB",
    word: "bird",
    translation: "птица",
    image: "assets/images/cards/bird.jpg",
    audioSrc: "assets/audio/bird.mp3",
  },
  {
    id: "animalB",
    word: "fish",
    translation: "рыба",
    image: "assets/images/cards/fish1.jpg",
    audioSrc: "assets/audio/fish.mp3",
  },
  {
    id: "animalB",
    word: "frog",
    translation: "жаба",
    image: "assets/images/cards/frog.jpg",
    audioSrc: "assets/audio/frog.mp3",
  },
  {
    id: "animalB",
    word: "giraffe",
    translation: "жирафа",
    image: "assets/images/cards/giraffe.jpg",
    audioSrc: "assets/audio/giraffe.mp3",
  },
  {
    id: "animalB",
    word: "lion",
    translation: "лев",
    image: "assets/images/cards/lion.jpg",
    audioSrc: "assets/audio/lion.mp3",
  },
  {
    id: "animalB",
    word: "mouse",
    translation: "мышь",
    image: "assets/images/cards/mouse.jpg",
    audioSrc: "assets/audio/mouse.mp3",
  },
  {
    id: "animalB",
    word: "turtle",
    translation: "черепаха",
    image: "assets/images/cards/turtle.jpg",
    audioSrc: "assets/audio/turtle.mp3",
  },
  {
    id: "animalB",
    word: "dolphin",
    translation: "дельфин",
    image: "assets/images/cards/dolphin.jpg",
    audioSrc: "assets/audio/dolphin.mp3",
  },

  {
    id: "clothes",
    word: "skirt",
    translation: "юбка",
    image: "assets/images/cards/skirt.jpg",
    audioSrc: "assets/audio/skirt.mp3",
  },
  {
    id: "clothes",
    word: "pants",
    translation: "брюки",
    image: "assets/images/cards/pants.jpg",
    audioSrc: "assets/audio/pants.mp3",
  },
  {
    id: "clothes",
    word: "blouse",
    translation: "блузка",
    image: "assets/images/cards/blouse.jpg",
    audioSrc: "assets/audio/blouse.mp3",
  },
  {
    id: "clothes",
    word: "dress",
    translation: "платье",
    image: "assets/images/cards/dress.jpg",
    audioSrc: "assets/audio/dress.mp3",
  },
  {
    id: "clothes",
    word: "boot",
    translation: "ботинок",
    image: "assets/images/cards/boot.jpg",
    audioSrc: "assets/audio/boot.mp3",
  },
  {
    id: "clothes",
    word: "shirt",
    translation: "рубашка",
    image: "assets/images/cards/shirt.jpg",
    audioSrc: "assets/audio/shirt.mp3",
  },
  {
    id: "clothes",
    word: "coat",
    translation: "пальто",
    image: "assets/images/cards/coat.jpg",
    audioSrc: "assets/audio/coat.mp3",
  },
  {
    id: "clothes",
    word: "shoe",
    translation: "туфли",
    image: "assets/images/cards/shoe.jpg",
    audioSrc: "assets/audio/shoe.mp3",
  },

  {
    id: "emotions",
    word: "sad",
    translation: "грустный",
    image: "assets/images/cards/sad.jpg",
    audioSrc: "assets/audio/sad.mp3",
  },
  {
    id: "emotions",
    word: "angry",
    translation: "сердитый",
    image: "assets/images/cards/angry.jpg",
    audioSrc: "assets/audio/angry.mp3",
  },
  {
    id: "emotions",
    word: "happy",
    translation: "счастливый",
    image: "assets/images/cards/happy.jpg",
    audioSrc: "assets/audio/happy.mp3",
  },
  {
    id: "emotions",
    word: "tired",
    translation: "уставший",
    image: "assets/images/cards/tired.jpg",
    audioSrc: "assets/audio/tired.mp3",
  },
  {
    id: "emotions",
    word: "surprised",
    translation: "удивлённый",
    image: "assets/images/cards/surprised.jpg",
    audioSrc: "assets/audio/surprised.mp3",
  },
  {
    id: "emotions",
    word: "scared",
    translation: "испуганный",
    image: "assets/images/cards/scared.jpg",
    audioSrc: "assets/audio/scared.mp3",
  },
  {
    id: "emotions",
    word: "smile",
    translation: "улыбка",
    image: "assets/images/cards/smile.jpg",
    audioSrc: "assets/audio/smile.mp3",
  },
  {
    id: "emotions",
    word: "laugh",
    translation: "смех",
    image: "assets/images/cards/laugh.jpg",
    audioSrc: "assets/audio/laugh.mp3",
  },
];

function renderContent(param) {
  if (param) {
    contentWrapper.innerHTML = "";
    contentWrapper.classList.add("content-wrapper");

    const cardsOfCategory = cards.filter((card) => card.id === param);
    const cardsElements = getCardsElements(cardsOfCategory);

    cardsElements.forEach((item) => {
      contentWrapper.append(item);
    });
  } else {
    contentWrapper.innerHTML = "";
    contentWrapper.classList.add("content-wrapper");

    categories.map((item) => {
      const categoryElement = document.createElement("div");
      categoryElement.classList.add("categories");
      categoryElement.id = item.id;
      categoryElement.onclick = function () {
        onNavigate(`/${item.id}`);
      };
      const categoryElementImage = document.createElement("img");
      categoryElementImage.setAttribute("src", `${item.image}`);
      categoryElementImage.setAttribute("alt", `${item.word}`);
      categoryElementImage.setAttribute("class", `categories__image`);
      categoryElement.append(categoryElementImage);
      const categoryElementCircle = document.createElement("div");
      categoryElementCircle.setAttribute("class", `${isTrain ? 'circle-train' : 'circle-play'}`);
      categoryElement.append(categoryElementCircle);
      const categoryElementTitle = document.createElement('h3');
      categoryElementTitle.setAttribute("class", `categories__title`);
      categoryElementTitle.textContent = item.title;
      categoryElement.append(categoryElementTitle);

      contentWrapper.append(categoryElement);
    });
  }
  return contentWrapper;
}

function getCardsElements(cardsOfCategory) {
  const cardsElements = cardsOfCategory.map((card) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");

    const cardElemenetFront = document.createElement("div");
    cardElemenetFront.classList.add("card-front");
    cardElement.append(cardElemenetFront);
    const cardElementImage = document.createElement("img");
    cardElementImage.setAttribute("src", `${card.image}`);
    cardElementImage.setAttribute("alt", `${card.word}`);
    cardElementImage.setAttribute("class", `card__image`);
    cardElemenetFront.append(cardElementImage);
    const cardElementWord = document.createElement("h3");
    cardElementWord.setAttribute("class", `card__word`);
    cardElementWord.textContent = card.word;
    cardElemenetFront.append(cardElementWord);
    const cardElementCircle = document.createElement("div");
    cardElementCircle.setAttribute("class", `circle-train`);
    cardElemenetFront.append(cardElementCircle);
    const cardElementRotateImg = document.createElement("img");
    cardElementRotateImg.setAttribute("src", `assets/images/cards/rotate.svg`);
    cardElementRotateImg.setAttribute("alt", `Icon Rotate`);
    cardElementRotateImg.setAttribute("class", `image-rotate`);
    cardElemenetFront.append(cardElementRotateImg);

    const cardElemenetBack = document.createElement("div");
    cardElemenetBack.classList.add("card-back", 'hidden');
    cardElement.append(cardElemenetBack);
    const cardElementImageBack = document.createElement("img");
    cardElementImageBack.setAttribute("src", `${card.image}`);
    cardElementImageBack.setAttribute("alt", `${card.word}`);
    cardElementImageBack.setAttribute("class", `card__image`);
    cardElemenetBack.append(cardElementImageBack);
    const cardElementTranslation = document.createElement("h3");
    cardElementTranslation.setAttribute("class", `card__word`);
    cardElementTranslation.textContent = card.translation;
    cardElemenetBack.append(cardElementTranslation);

    cardElementRotateImg.addEventListener('click', (event) => {
      event.stopPropagation();
      cardElement.classList.add('rotate-true');
      cardElement.classList.remove('rotate-false');
      cardElemenetFront.classList.add('hidden');
      cardElemenetBack.classList.remove('hidden');
    });

    cardElemenetBack.addEventListener('mouseleave', () => {
      cardElement.classList.add('rotate-false');
      cardElement.classList.remove('rotate-true');
      cardElemenetFront.classList.remove('hidden');
      cardElemenetBack.classList.add('hidden');
    })

    cardElemenetFront.addEventListener("click", () => {
      playSound(card.word);
    });
    return cardElement;
  });
  return cardsElements;
}

function playSound(word) {
  const audio = new Audio();

  audio.src = `assets/audio/${word}.mp3`;
  audio.play();
}

const routes = {
  "/": () => renderContent(),
  "/actionA": () => renderContent("actionA"),
  "/actionB": () => renderContent("actionB"),
  "/food": () => renderContent("food"),
  "/nature": () => renderContent("nature"),
  "/animalA": () => renderContent("animalA"),
  "/animalB": () => renderContent("animalB"),
  "/clothes": () => renderContent("clothes"),
  "/emotions": () => renderContent("emotions"),
};

rootDiv.append(routes[window.location.pathname]());

const onNavigate = (pathname) => {
  window.history.pushState({}, pathname, window.location.origin + pathname);
  rootDiv.append(routes[pathname]());
};

window.onpopstate = () => {
  rootDiv.append(routes[window.location.pathname]());
};

switchButton.addEventListener("click", () => {
  if (isTrain) {
    trainPart.classList.add("none");
    playPart.classList.remove("none");
    isTrain = false;
  } else {
    playPart.classList.add("none");
    trainPart.classList.remove("none");
    isTrain = true;
  }
  renderContent(window.location.pathname.slice(1));
});
