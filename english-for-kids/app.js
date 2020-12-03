const menuButton = document.querySelector(".menu-button");
const overlay = document.querySelector(".overlay");
const navbar = document.querySelector(".menu");
const switchButton = document.querySelector("#check");
const trainPart = document.querySelector(".train");
const playPart = document.querySelector("span:first-child");
const rootDiv = document.getElementById("root");
const contentWrapper = document.createElement("div");
const circleTrain = document.querySelector('.circle-train');

let isTrain = true;
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
    image: "assets/images/cards/swim.jpg",
  },

  {
    id: "actionC",
    title: "Action (set C)",
    image: "assets/images/cards/draw.jpg",
  },

  {
    id: "adjective",
    title: "Adjective",
    image: "assets/images/cards/cry.jpg",
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
    image: "assets/images/cards/pants.jpg",
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
    audioSrc: "audio/cry.mp3",
  },
  {
    id: "actionA",
    word: "dance",
    translation: "танцевать",
    image: "assets/images/cards/dance.jpg",
    audioSrc: "audio/dance.mp3",
  },
  {
    id: "actionA",
    word: "dive",
    translation: "нырять",
    image: "assets/images/cards/dive.jpg",
    audioSrc: "audio/dive.mp3",
  },
  {
    id: "actionA",
    word: "draw",
    translation: "рисовать",
    image: "assets/images/cards/draw.jpg",
    audioSrc: "audio/draw.mp3",
  },
  {
    id: "actionA",
    word: "fish",
    translation: "ловить рыбу",
    image: "assets/images/cards/fish.jpg",
    audioSrc: "audio/fish.mp3",
  },
  {
    id: "actionA",
    word: "fly",
    translation: "летать",
    image: "assets/images/cards/fly.jpg",
    audioSrc: "audio/fly.mp3",
  },
  {
    id: "actionA",
    word: "hug",
    translation: "обнимать",
    image: "assets/images/cards/hug.jpg",
    audioSrc: "audio/hug.mp3",
  },
  {
    id: "actionA",
    word: "jump",
    translation: "прыгать",
    image: "assets/images/cards/jump.jpg",
    audioSrc: "audio/jump.mp3",
  },
  {
    id: "actionB",
    word: "open",
    translation: "открывать",
    image: "assets/images/cards/open.jpg",
    audioSrc: "audio/open.mp3",
  },
  {
    id: "actionB",
    word: "play",
    translation: "играть",
    image: "assets/images/cards/play.jpg",
    audioSrc: "audio/play.mp3",
  },
  {
    id: "actionB",
    word: "point",
    translation: "указывать",
    image: "assets/images/cards/point.jpg",
    audioSrc: "audio/point.mp3",
  },
  {
    id: "actionB",
    word: "ride",
    translation: "ездить",
    image: "assets/images/cards/ride.jpg",
    audioSrc: "audio/ride.mp3",
  },
  {
    id: "actionB",
    word: "run",
    translation: "бегать",
    image: "assets/images/cards/run.jpg",
    audioSrc: "audio/run.mp3",
  },
  {
    id: "actionB",
    word: "sing",
    translation: "петь",
    image: "assets/images/cards/sing.jpg",
    audioSrc: "audio/sing.mp3",
  },
  {
    id: "actionB",
    word: "skip",
    translation: "пропускать, прыгать",
    image: "assets/images/cards/skip.jpg",
    audioSrc: "audio/skip.mp3",
  },
  {
    id: "actionB",
    word: "swim",
    translation: "плавать",
    image: "assets/images/cards/swim.jpg",
    audioSrc: "audio/swim.mp3",
  },

  {
    id: "animalA",
    word: "cat",
    translation: "кот",
    image: "assets/images/cards/cat.jpg",
    audioSrc: "audio/cat.mp3",
  },
  {
    id: "animalA",
    word: "chick",
    translation: "цыплёнок",
    image: "assets/images/cards/chick.jpg",
    audioSrc: "audio/chick.mp3",
  },
  {
    id: "animalA",
    word: "chicken",
    translation: "курица",
    image: "assets/images/cards/chicken.jpg",
    audioSrc: "audio/chicken.mp3",
  },
  {
    id: "animalA",
    word: "dog",
    translation: "собака",
    image: "assets/images/cards/dog.jpg",
    audioSrc: "audio/dog.mp3",
  },
  {
    id: "animalA",
    word: "horse",
    translation: "лошадь",
    image: "assets/images/cards/horse.jpg",
    audioSrc: "audio/horse.mp3",
  },
  {
    id: "animalA",
    word: "pig",
    translation: "свинья",
    image: "assets/images/cards/pig.jpg",
    audioSrc: "audio/pig.mp3",
  },
  {
    id: "animalA",
    word: "rabbit",
    translation: "кролик",
    image: "assets/images/cards/rabbit.jpg",
    audioSrc: "audio/rabbit.mp3",
  },
  {
    id: "animalA",
    word: "sheep",
    translation: "овца",
    image: "assets/images/cards/sheep.jpg",
    audioSrc: "audio/sheep.mp3",
  },

  {
    id: "animalB",
    word: "bird",
    translation: "птица",
    image: "assets/images/cards/bird.jpg",
    audioSrc: "audio/bird.mp3",
  },
  {
    id: "animalB",
    word: "fish",
    translation: "рыба",
    image: "assets/images/cards/fish1.jpg",
    audioSrc: "audio/fish.mp3",
  },
  {
    id: "animalB",
    word: "frog",
    translation: "жаба",
    image: "assets/images/cards/frog.jpg",
    audioSrc: "audio/frog.mp3",
  },
  {
    id: "animalB",
    word: "giraffe",
    translation: "жирафа",
    image: "assets/images/cards/giraffe.jpg",
    audioSrc: "audio/giraffe.mp3",
  },
  {
    id: "animalB",
    word: "lion",
    translation: "лев",
    image: "assets/images/cards/lion.jpg",
    audioSrc: "audio/lion.mp3",
  },
  {
    id: "animalB",
    word: "mouse",
    translation: "мышь",
    image: "assets/images/cards/mouse.jpg",
    audioSrc: "audio/mouse.mp3",
  },
  {
    id: "animalB",
    word: "turtle",
    translation: "черепаха",
    image: "assets/images/cards/turtle.jpg",
    audioSrc: "audio/turtle.mp3",
  },
  {
    id: "animalB",
    word: "dolphin",
    translation: "дельфин",
    image: "assets/images/cards/dolphin.jpg",
    audioSrc: "audio/dolphin.mp3",
  },

  {
    id: "clothes",
    word: "skirt",
    translation: "юбка",
    image: "assets/images/cards/skirt.jpg",
    audioSrc: "audio/skirt.mp3",
  },
  {
    id: "clothes",
    word: "pants",
    translation: "брюки",
    image: "assets/images/cards/pants.jpg",
    audioSrc: "audio/pants.mp3",
  },
  {
    id: "clothes",
    word: "blouse",
    translation: "блузка",
    image: "assets/images/cards/blouse.jpg",
    audioSrc: "audio/blouse.mp3",
  },
  {
    id: "clothes",
    word: "dress",
    translation: "платье",
    image: "assets/images/cards/dress.jpg",
    audioSrc: "audio/dress.mp3",
  },
  {
    id: "clothes",
    word: "boot",
    translation: "ботинок",
    image: "assets/images/cards/boot.jpg",
    audioSrc: "audio/boot.mp3",
  },
  {
    id: "clothes",
    word: "shirt",
    translation: "рубашка",
    image: "assets/images/cards/shirt.jpg",
    audioSrc: "audio/shirt.mp3",
  },
  {
    id: "clothes",
    word: "coat",
    translation: "пальто",
    image: "assets/images/cards/coat.jpg",
    audioSrc: "audio/coat.mp3",
  },
  {
    id: "clothes",
    word: "shoe",
    translation: "туфли",
    image: "assets/images/cards/shoe.jpg",
    audioSrc: "audio/shoe.mp3",
  },

  {
    id: "emotions",
    word: "sad",
    translation: "грустный",
    image: "assets/images/cards/sad.jpg",
    audioSrc: "audio/sad.mp3",
  },
  {
    id: "emotions",
    word: "angry",
    translation: "сердитый",
    image: "assets/images/cards/angry.jpg",
    audioSrc: "audio/angry.mp3",
  },
  {
    id: "emotions",
    word: "happy",
    translation: "счастливый",
    image: "assets/images/cards/happy.jpg",
    audioSrc: "audio/happy.mp3",
  },
  {
    id: "emotions",
    word: "tired",
    translation: "уставший",
    image: "assets/images/cards/tired.jpg",
    audioSrc: "audio/tired.mp3",
  },
  {
    id: "emotions",
    word: "surprised",
    translation: "удивлённый",
    image: "assets/images/cards/surprised.jpg",
    audioSrc: "audio/surprised.mp3",
  },
  {
    id: "emotions",
    word: "scared",
    translation: "испуганный",
    image: "assets/images/cards/scared.jpg",
    audioSrc: "audio/scared.mp3",
  },
  {
    id: "emotions",
    word: "smile",
    translation: "улыбка",
    image: "assets/images/cards/smile.jpg",
    audioSrc: "audio/smile.mp3",
  },
  {
    id: "emotions",
    word: "laugh",
    translation: "смех",
    image: "assets/images/cards/laugh.jpg",
    audioSrc: "audio/laugh.mp3",
  },
];



function renderContent(param) {
  if (param) {
    contentWrapper.innerHTML = "";
    contentWrapper.classList.add("content-wrapper");

    const cardsOfCategory = cards.filter(card => card.id === param);
    const cardsElements = getCardsElements(cardsOfCategory);

    cardsElements.forEach(item => {
      contentWrapper.append(item);
    })
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
      categoryElement.innerHTML = `
        <img src="${item.image}" alt ="${item.title}" class="categories__image">
        <div class="categoryFooter"> 
          <div class="circle-train"></div>
          <h3 class="categories__title">${item.title}</h3>
        </div>
        `;
      contentWrapper.append(categoryElement);
    });
  }
  return contentWrapper;

};


function getCardsElements(cardsOfCategory) {
  const cardsElements = cardsOfCategory.map(card => {
    let cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.innerHTML = `
      <img src="${card.image}" alt ="${card.word}" class="card__image">
      <h3 class="card__word">${card.word}</h3>
        <div class="circle-train"></div>
        <img src="assets/images/cards/rotate.svg" alt="Icon Rotate" class="image-rotate">
    `;
    return cardElement;
  });
  return cardsElements;
};


const routes = {
  "/": () => renderContent(),
  "/actionA": () => renderContent("actionA"),
  "/actionB": () => renderContent("actionB"),
  "/actionC": () => renderContent("actionC"),
  "/adjective": () => renderContent("adjective"),
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
