/* eslint no-use-before-define: ["error", { "variables": false }] */
import categories from './categories';
import cards from './cards';

const menuButton = document.querySelector('.menu-button');
const overlay = document.querySelector('.overlay');
const navbar = document.querySelector('.menu');
const switchButton = document.querySelector('#check');
const trainPart = document.querySelector('.train');
const playPart = document.querySelector('span:first-child');
const rootDiv = document.getElementById('root');
const contentWrapper = document.createElement('div');
const menuList = document.querySelector('.menu-list');
const mainPage = document.querySelector('.active-link');

let isTrain = true;
let isGameStart = false;
let selectedLink = mainPage;
let randomCards = [];
let currentCardIndex = 0;
let errors = 0;

const playSound = (word) => {
  const audio = new Audio();
  audio.src = `assets/audio/${word}.mp3`;
  audio.play();
};

const playGame = (currentTarget) => {
  if (currentCardIndex < randomCards.length - 1) {
    if (currentTarget.id !== randomCards[currentCardIndex].word) {
      playSound('error');
      const starErrorElement = document.querySelector('.error-stars');
      const starError = document.createElement('img');
      starError.setAttribute('src', '/assets/images/icons/star.svg');
      starError.setAttribute('alt', 'Star');
      starError.setAttribute('class', 'star');
      starErrorElement.append(starError);
      errors += 1;
    } else {
      playSound('correct');
      const starWinElement = document.querySelector('.win-stars');
      const starWin = document.createElement('img');
      starWin.setAttribute('src', '/assets/images/icons/star-win.svg');
      starWin.setAttribute('alt', 'Star Win');
      starWin.setAttribute('class', 'star');
      starWinElement.append(starWin);
      currentTarget.classList.add('disable-card');
      setTimeout(() => {
        playSound(randomCards[currentCardIndex + 1].word);
        currentCardIndex += 1;
      }, 1000);
    }
  } else {
    contentWrapper.innerHTML = '';
    const finishedGame = document.createElement('div');
    finishedGame.classList.add('finish-game');
    contentWrapper.append(finishedGame);
    const finishedGameText = document.createElement('h3');
    finishedGameText.setAttribute('class', 'finish-text');
    if (errors > 0) {
      finishedGameText.textContent = `Oops! You finished game with ${errors === 1 ? '1 error' : `${errors} errors`}! Try it again!`;
      playSound('failure');
    } else {
      finishedGameText.textContent = 'Congratulations! You finished game without errors!';
      playSound('success');
    }
    finishedGame.append(finishedGameText);
    const finishedGameImage = document.createElement('img');
    finishedGameImage.setAttribute('src', `/assets/images/cards/${errors > 0 ? 'failure' : 'winner'}.jpg`);
    finishedGameImage.setAttribute('alt', `${errors > 0 ? 'failure' : 'winner'}`);
    finishedGameImage.setAttribute('class', 'finish-image');
    finishedGame.append(finishedGameImage);
    setTimeout(() => {
      isGameStart = false;
      errors = 0;
      currentCardIndex = 0;
      randomCards = [];
      renderContent();
    }, 3000);
  }
};

const getCardsElements = (cardsOfCategory) => {
  const cardsElements = cardsOfCategory.map((card) => {
    if (!isTrain) {
      const cardPlayElement = document.createElement('div');
      cardPlayElement.classList.add('card-play');
      cardPlayElement.setAttribute('id', `${card.word}`);
      const cardElementImage = document.createElement('img');
      cardElementImage.setAttribute('src', `${card.image}`);
      cardElementImage.setAttribute('alt', `${card.word}`);
      cardElementImage.setAttribute('class', 'card__image-play');
      cardPlayElement.addEventListener('click', (event) => {
        if (isGameStart) {
          playGame(event.currentTarget);
        }
      });
      cardPlayElement.append(cardElementImage);
      return cardPlayElement;
    }
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    const cardElemenetFront = document.createElement('div');
    cardElemenetFront.classList.add('card-front');
    cardElement.append(cardElemenetFront);
    const cardElementImage = document.createElement('img');
    cardElementImage.setAttribute('src', `${card.image}`);
    cardElementImage.setAttribute('alt', `${card.word}`);
    cardElementImage.setAttribute('class', 'card__image');
    cardElemenetFront.append(cardElementImage);
    const cardElementWord = document.createElement('h3');
    cardElementWord.setAttribute('class', 'card__word');
    cardElementWord.textContent = card.word;
    cardElemenetFront.append(cardElementWord);
    const cardElementCircle = document.createElement('div');
    cardElementCircle.setAttribute('class', 'circle-train');
    cardElemenetFront.append(cardElementCircle);
    const cardElementRotateImg = document.createElement('img');
    cardElementRotateImg.setAttribute('src', 'assets/images/icons/rotate.svg');
    cardElementRotateImg.setAttribute('alt', 'Icon Rotate');
    cardElementRotateImg.setAttribute('class', 'image-rotate');
    cardElemenetFront.append(cardElementRotateImg);

    const cardElemenetBack = document.createElement('div');
    cardElemenetBack.classList.add('card-back', 'hidden');
    cardElement.append(cardElemenetBack);
    const cardElementImageBack = document.createElement('img');
    cardElementImageBack.setAttribute('src', `${card.image}`);
    cardElementImageBack.setAttribute('alt', `${card.word}`);
    cardElementImageBack.setAttribute('class', 'card__image');
    cardElemenetBack.append(cardElementImageBack);
    const cardElementTranslation = document.createElement('h3');
    cardElementTranslation.setAttribute('class', 'card__word');
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
      cardElemenetBack.classList.add('hidden');
      cardElemenetFront.classList.remove('hidden');
    });
    cardElemenetFront.addEventListener('click', () => {
      playSound(card.word);
    });
    return cardElement;
  });
  return cardsElements;
};

const renderContent = (param) => {
  contentWrapper.innerHTML = '';
  contentWrapper.classList.add('content-wrapper');
  const footerElement = document.createElement('footer');
  footerElement.setAttribute('class', 'footer');
  contentWrapper.append(footerElement);
  const footerTextElement = document.createElement('div');
  footerTextElement.setAttribute('class', 'footer-text');
  footerTextElement.innerHTML = `<a class="footer-link" href="https://rs.school/js/" class><img src="/assets/images/icons/rs_school_js.svg" alt="RSS Icon" class="rss-image"></a> 
  <div class="created-person"> 2020 Created by <a class="footer-link" href="https://github.com/nin3439">nin3439</a></div>
  `;
  footerElement.append(footerTextElement);
  if (param) {
    const cardsOfCategory = cards.filter((card) => card.id === param);
    const cardsElements = getCardsElements(cardsOfCategory);
    cardsElements.forEach((item) => contentWrapper.append(item));
    if (!isTrain) {
      footerElement.innerHTML = '';
      footerElement.classList.add('footer-play');
      const playButtonElement = document.createElement('button');
      playButtonElement.setAttribute('class', 'play-button');
      footerElement.append(playButtonElement);
      const starErrorElement = document.createElement('div');
      starErrorElement.setAttribute('class', 'error-stars');
      footerElement.append(starErrorElement);
      const starWinElement = document.createElement('div');
      starWinElement.setAttribute('class', 'win-stars');
      footerElement.append(starWinElement);
      playButtonElement.addEventListener('click', () => {
        if (!isGameStart) {
          playButtonElement.classList.add('repeat-button');
          startGame(param);
        } else {
          playSound(randomCards[currentCardIndex].word);
        }
      });
    }
  } else {
    const categoriesElements = getCategoriesElement();
    categoriesElements.forEach((item) => contentWrapper.append(item));
  }
  return contentWrapper;
};

const routes = {
  '/': () => renderContent(),
  '/actionA': () => renderContent('actionA'),
  '/actionB': () => renderContent('actionB'),
  '/food': () => renderContent('food'),
  '/nature': () => renderContent('nature'),
  '/animalA': () => renderContent('animalA'),
  '/animalB': () => renderContent('animalB'),
  '/clothes': () => renderContent('clothes'),
  '/emotions': () => renderContent('emotions'),
};

const onNavigate = (pathname) => {
  window.history.pushState({}, pathname, window.location.origin + pathname);
  rootDiv.append(routes[pathname]());
};

const getCategoriesElement = () => {
  const categoriesElemets = categories.map((item) => {
    const categoryElement = document.createElement('div');
    categoryElement.classList.add('categories');
    categoryElement.id = item.id;
    categoryElement.onclick = function onNav() {
      onNavigate(`/${item.id}`);
    };
    const categoryElementImage = document.createElement('img');
    categoryElementImage.setAttribute('src', `${item.image}`);
    categoryElementImage.setAttribute('alt', `${item.word}`);
    categoryElementImage.setAttribute('class', 'categories__image');
    categoryElement.append(categoryElementImage);
    const categoryElementCircle = document.createElement('div');
    categoryElementCircle.setAttribute('class', `${isTrain ? 'circle-train' : 'circle-play'}`);
    categoryElement.append(categoryElementCircle);
    const categoryElementTitle = document.createElement('h3');
    categoryElementTitle.setAttribute('class', 'categories__title');
    categoryElementTitle.textContent = item.title;
    categoryElement.append(categoryElementTitle);
    return categoryElement;
  });
  return categoriesElemets;
};

const shuffle = (arr) => {
  let j;
  let template;
  const newArr = arr;
  for (let i = newArr.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    template = newArr[j];
    newArr[j] = newArr[i];
    newArr[i] = template;
  }
  return newArr;
};

const startGame = (param) => {
  const cardsOfCategory = cards.filter((card) => card.id === param);
  randomCards = shuffle(cardsOfCategory);
  playSound(randomCards[currentCardIndex].word);
  isGameStart = true;
};

const highlight = (link) => {
  if (selectedLink) {
    selectedLink.classList.remove('active-link');
    selectedLink = link;
    selectedLink.classList.add('active-link');
  }
};

menuList.addEventListener('click', (event) => {
  const { target } = event;
  if (target.tagName !== 'A') return;
  highlight(target);
  onNavigate(target.id);
  navbar.classList.toggle('toggle');
  overlay.classList.toggle('none');
  document.body.classList.toggle('disable-body');
  isGameStart = false;
  errors = 0;
  currentCardIndex = 0;
  randomCards = [];
});

switchButton.addEventListener('click', () => {
  if (isTrain) {
    trainPart.classList.add('none');
    playPart.classList.remove('none');
    isTrain = false;
  } else {
    playPart.classList.add('none');
    trainPart.classList.remove('none');
    isTrain = true;
  }
  isGameStart = false;
  errors = 0;
  currentCardIndex = 0;
  randomCards = [];
  renderContent(window.location.pathname.slice(1));
});

menuButton.addEventListener('click', () => {
  navbar.classList.toggle('toggle');
  overlay.classList.toggle('none');
  document.body.classList.toggle('disable-body');
});

overlay.addEventListener('click', () => {
  navbar.classList.toggle('toggle');
  document.body.classList.toggle('disable-body');
  overlay.classList.toggle('none');
});

rootDiv.append(routes[window.location.pathname]());

window.onpopstate = () => {
  rootDiv.append(routes[window.location.pathname]());
};
