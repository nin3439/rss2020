// import './styles/style.scss';
// import { dataCountries, titleSlider } from './dataCountries.js';

// const contentWrapper = document.querySelector('.content-wrapper');

// const createImageElement = (src, alt, classValue) => {
//   const imgElement = document.createElement('img');
//   imgElement.setAttribute('src', src);
//   imgElement.setAttribute('alt', alt);
//   imgElement.classList.add(classValue);
//   return imgElement;
// };

// const createLinkElement = (href, text) => {
//   const linkElement = document.createElement('a');
//   linkElement.classList.add('link');
//   linkElement.setAttribute('href', href);
//   linkElement.textContent = text;
//   return linkElement;
// };

// const createButtonOpenBlockOnFullScreen = () => {
//   const buttonElement = document.createElement('button');
//   buttonElement.classList.add('button-onfullScreen');
//   const imgElement = createImageElement(
//     './assets/expand.svg',
//     'Expand Icon',
//     'image-expand',
//   );
//   buttonElement.append(imgElement);
//   return buttonElement;
// };

// const createSliderElement = () => {
//   const sliderBlockElement = document.createElement('div');
//   sliderBlockElement.classList.add('slider');
//   const imgLeftArrowElement = createImageElement(
//     './assets/left-arrow.svg',
//     'Left Arrow',
//     'arrows',
//   );
//   const nameElement = document.createElement('span');
//   nameElement.textContent = titleSlider[0];
//   const imgRightArrowElement = createImageElement(
//     './assets/right-arrow.svg',
//     'Right Arrow',
//     'arrows',
//   );
//   sliderBlockElement.append(
//     imgLeftArrowElement,
//     nameElement,
//     imgRightArrowElement,
//   );
//   return sliderBlockElement;
// };

// const createToggleElement = (
//   totallyOrABS,
//   dailyOrPer100k,
//   secondToggleText1,
//   secondToggleText2,
// ) => {
//   const toggleElement = document.createElement('label');
//   toggleElement.classList.add('switch');
//   const inputElement = document.createElement('input');
//   inputElement.setAttribute('type', 'checkbox');
//   const knobElement = document.createElement('span');
//   knobElement.classList.add('knob');
//   const textTotallyOrABSElement = document.createElement('span');
//   textTotallyOrABSElement.classList.add('toggle-text', secondToggleText1);
//   textTotallyOrABSElement.textContent = totallyOrABS;
//   const textDailyOrPer100kElement = document.createElement('span');
//   textDailyOrPer100kElement.classList.add(
//     'toggle-text',
//     'right-text',
//     secondToggleText2,
//   );
//   textDailyOrPer100kElement.textContent = dailyOrPer100k;
//   toggleElement.append(
//     textTotallyOrABSElement,
//     textDailyOrPer100kElement,
//     inputElement,
//     knobElement,
//   );
//   return toggleElement;
// };

// const createGlobalCasesBlock = dataGlobal => {
//   const globalCasesBlock = document.createElement('div');
//   globalCasesBlock.classList.add('global-cases-block');
//   const globalCasesTitleElement = document.createElement('span');
//   globalCasesTitleElement.classList.add('global-cases-title');
//   globalCasesTitleElement.textContent = 'Global Cases';
//   const globalCasesNumberElement = document.createElement('span');
//   globalCasesNumberElement.classList.add('global-cases-number');
//   globalCasesNumberElement.textContent = dataGlobal.TotalConfirmed;
//   const buttonOnFullScreen = createButtonOpenBlockOnFullScreen();
//   globalCasesBlock.append(
//     globalCasesTitleElement,
//     globalCasesNumberElement,
//     buttonOnFullScreen,
//   );
//   return globalCasesBlock;
// };

// const createlistCountriesBlock = dataCountri => {
//   const listCountriesBlock = document.createElement('div');
//   listCountriesBlock.classList.add('list-countries-block');
//   const listCountriesTitleElement = document.createElement('span');
//   listCountriesTitleElement.classList.add('list-countries-title');
//   listCountriesTitleElement.textContent = 'Cases by Country/Region/Sovereignty';
//   const searchBlock = document.createElement('form');
//   searchBlock.classList.add('search-form');
//   const searchInputElement = document.createElement('input');
//   searchInputElement.classList.add('search-input');
//   searchInputElement.setAttribute('type', 'text');
//   searchInputElement.setAttribute('placeholder', 'Enter Country');
//   const searchButtonElement = document.createElement('button');
//   searchButtonElement.classList.add('search-button');
//   searchButtonElement.setAttribute('type', 'submit');
//   searchBlock.append(searchInputElement, searchButtonElement);
//   const toggleBlock = document.createElement('div');
//   const toggleLeftElement = createToggleElement('Totally', 'Daily');
//   const toggleRightElement = createToggleElement(
//     'ABS',
//     'Per100k',
//     'text1',
//     'text2',
//   );
//   toggleBlock.append(toggleLeftElement, toggleRightElement);
//   const listCountriesElement = document.createElement('ul');
//   listCountriesElement.classList.add('list-countries');
//   dataCountri.forEach(el => {
//     const listCountriesItemElement = document.createElement('li');
//     listCountriesItemElement.classList.add('list-countries-item');
//     const oneCountryNumberElement = document.createElement('span');
//     oneCountryNumberElement.classList.add('onecountry-number-cases');
//     oneCountryNumberElement.textContent = el.cases;
//     const countryNameElement = document.createElement('span');
//     countryNameElement.classList.add('country-name');
//     countryNameElement.textContent = el.country;
//     const countryFlagElement = createImageElement(
//       `${el.flag}`,
//       `Flag ${el.countryInfo.country}`,
//       `country-flag ${el.country}`,
//     );
//     listCountriesItemElement.append(
//       oneCountryNumberElement,
//       countryNameElement,
//       countryFlagElement,
//     );
//     listCountriesElement.append(listCountriesItemElement);
//   });
//   const buttonOnFullScreen = createButtonOpenBlockOnFullScreen();
//   listCountriesBlock.append(
//     listCountriesTitleElement,
//     searchBlock,
//     toggleBlock,
//     listCountriesElement,
//     buttonOnFullScreen,
//   );
//   return listCountriesBlock;
// };

// const createDateBlock = () => {
//   const dateBlock = document.createElement('div');
//   dateBlock.classList.add('date-block');
//   const dateTextElement = document.createElement('p');
//   dateTextElement.classList.add('date-text');
//   dateTextElement.textContent = 'Last Updated at (M/D/YYYY)';
//   const dateElement = document.createElement('span');
//   dateElement.classList.add('date');
//   dateElement.textContent = `12/17/2020, 11:28 AM`;
//   const buttonOnFullScreen = createButtonOpenBlockOnFullScreen();
//   dateBlock.append(dateTextElement, dateElement, buttonOnFullScreen);
//   return dateBlock;
// };

// const createMapBlock = () => {
//   const mapBlock = document.createElement('div');
//   mapBlock.classList.add('map-block');
//   const toggleBlock = document.createElement('div');
//   toggleBlock.classList.add('map-toggles');
//   const toggleLeftElement = createToggleElement('Totally', 'Daily');
//   const toggleRightElement = createToggleElement(
//     'ABS',
//     'Per100k',
//     'text1',
//     'text2',
//   );
//   toggleBlock.append(toggleLeftElement, toggleRightElement);
//   const mapImageElement = document.createElement('div');
//   mapImageElement.id = 'mapid';
//   mapImageElement.classList.add('map-image');
//   const mapButtonsBlock = document.createElement('div');
//   mapButtonsBlock.classList.add('map-buttons');
//   const mapButtonCases = document.createElement('div');
//   mapButtonCases.classList.add('map-button', 'active-button');
//   mapButtonCases.textContent = 'Cases';
//   const mapButtonDeaths = document.createElement('div');
//   mapButtonDeaths.classList.add('map-button');
//   mapButtonDeaths.textContent = 'Deaths';
//   const mapButtonRecovered = document.createElement('div');
//   mapButtonRecovered.classList.add('map-button');
//   mapButtonRecovered.textContent = 'Recovered';
//   mapButtonsBlock.append(mapButtonCases, mapButtonDeaths, mapButtonRecovered);
//   const buttonOnFullScreen = createButtonOpenBlockOnFullScreen();
//   mapBlock.append(
//     toggleBlock,
//     mapImageElement,
//     mapButtonsBlock,
//     buttonOnFullScreen,
//   );
//   return mapBlock;
// };

// const createInfoBlock = () => {
//   const infoBlock = document.createElement('div');
//   infoBlock.classList.add('info-block');
//   const linkRSSElement = createLinkElement('https://rs.school/js/', '');
//   const imgRSSElement = createImageElement(
//     '/assets/rs_school_js.svg',
//     'RSS Icon',
//     'rss-image',
//   );
//   linkRSSElement.append(imgRSSElement);
//   const createdPersonsElement = document.createElement('div');
//   createdPersonsElement.classList.add('created-person');
//   createdPersonsElement.textContent = '2020 Created by';
//   const link1Element = createLinkElement(
//     'https://github.com/kubana6',
//     'kubana-6',
//   );
//   const link2Element = createLinkElement(
//     'https://github.com/andrei-roh',
//     'andrei-roh',
//   );
//   const link3Element = createLinkElement(
//     'https://github.com/nin3439',
//     'nin3439',
//   );
//   createdPersonsElement.append(link1Element, link2Element, link3Element);
//   infoBlock.append(linkRSSElement, createdPersonsElement);
//   return infoBlock;
// };

// const createTableBlock = () => {
//   const tableBlock = document.createElement('div');
//   tableBlock.classList.add('table-block');
//   const nameCountryElemet = document.createElement('span');
//   nameCountryElemet.classList.add('table-country-name');
//   nameCountryElemet.textContent = 'Global';
//   const toggleBlock = document.createElement('div');
//   const toggleLeftElement = createToggleElement('Totally', 'Daily');
//   const toggleRightElement = createToggleElement(
//     'ABS',
//     'Per100k',
//     'text1',
//     'text2',
//   );
//   toggleBlock.append(toggleLeftElement, toggleRightElement);
//   const tableElement = document.createElement('table');
//   const trHeadElement = document.createElement('tr');
//   titleSlider.forEach(item => {
//     const thElement = document.createElement('th');
//     thElement.textContent = item;
//     trHeadElement.append(thElement);
//   });
//   const trBodyElement = document.createElement('tr');
//   const casesNumberElement = document.createElement('td');
//   casesNumberElement.classList.add('red');
//   casesNumberElement.textContent = '1234534728';
//   const deathsNumberElement = document.createElement('td');
//   deathsNumberElement.classList.add('white');
//   deathsNumberElement.textContent = '4534728';
//   const recoveredNumberElement = document.createElement('td');
//   recoveredNumberElement.classList.add('green');
//   recoveredNumberElement.textContent = '638799728';
//   trBodyElement.append(
//     casesNumberElement,
//     deathsNumberElement,
//     recoveredNumberElement,
//   );
//   tableElement.append(trHeadElement, trBodyElement);
//   const buttonOnFullScreen = createButtonOpenBlockOnFullScreen();
//   tableBlock.append(
//     nameCountryElemet,
//     toggleBlock,
//     tableElement,
//     buttonOnFullScreen,
//   );
//   return tableBlock;
// };

// const createChartBlock = () => {
//   const chartBlock = document.createElement('div');
//   chartBlock.classList.add('chart');
//   chartBlock.textContent = 'Chart';
//   const toggleBlock = document.createElement('div');
//   const toggleLeftElement = createToggleElement('Totally', 'Daily');
//   const toggleRightElement = createToggleElement(
//     'ABS',
//     'Per100k',
//     'text1',
//     'text2',
//   );
//   toggleBlock.append(toggleLeftElement, toggleRightElement);
//   const buttonOnFullScreen = createButtonOpenBlockOnFullScreen();
//   const chartImageElement = createImageElement(
//     './assets/chart.jpg',
//     'Chart',
//     'chart-image',
//   );
//   chartBlock.append(toggleBlock, chartImageElement, buttonOnFullScreen);
//   return chartBlock;
// };

// const renderContent = (dataCountri, dataGlobal) => {
//   const leftBlock = document.createElement('div');
//   leftBlock.classList.add('left-block');
//   const globalCasesBlock = createGlobalCasesBlock(dataGlobal);
//   const listCountriesBlock = createlistCountriesBlock(dataCountri);
//   const dateBlock = createDateBlock();
//   const sliderInListBlock = createSliderElement();
//   leftBlock.append(
//     globalCasesBlock,
//     listCountriesBlock,
//     sliderInListBlock,
//     dateBlock,
//   );
//   const middleBlock = document.createElement('div');
//   middleBlock.classList.add('middle-block');
//   const mapBlock = createMapBlock();
//   const infoBlock = createInfoBlock();
//   middleBlock.append(mapBlock, infoBlock);
//   const rightBlock = document.createElement('div');
//   rightBlock.classList.add('right-block');
//   const tableBlock = createTableBlock();
//   const chartBlock = createChartBlock();
//   const sliderInChartBlock = createSliderElement();
//   rightBlock.append(tableBlock, chartBlock, sliderInChartBlock);
//   contentWrapper.append(leftBlock, middleBlock, rightBlock);
//   this.loadedMap(dataCountri);
//   return contentWrapper;
// };

// window.addEventListener('DOMContentLoaded', renderContent);
