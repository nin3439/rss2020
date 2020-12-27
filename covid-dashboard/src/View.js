import './styles/style.scss';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/marker-shadow.png';
import moment from 'moment';
import Chart from 'chart.js';
import axios from 'axios';
import EventEmitter from './EventEmmiter.js';
import recommendationLinks from './constant.js';
import getCountriesInfo from './services/getCountriesInfo.js';

export default class View extends EventEmitter {
  constructor(model) {
    super();
    this.tableCountryName = '';
    this.tableCases = '';
    this.tableDeaths = '';
    this.tableRecorvered = '';
    this.map = '';
    this.arr = [];
    this.titleSlider = ['Cases', 'Deaths', 'Recovered'];
    this.contentWrapper = document.querySelector('.content-wrapper');
    this.numberTitleSlider = 0;
    this.globalCasesNumber = '';
    this.nameCategorySlider = '';
    this.listCounties = '';
    this.leftArrowElement = '';
    this.rightArrowElement = '';
    this.totalDailyCountry = false;
    this.NowArrCounriCategory = [];
    this.model = model;
    this.dailyListCountries = false;
    this.filterCategory = '';
    this.devicedBtn = false;
    this.markerArr = [];
    model.on('defaultDateGLobalAndCounties', arrDate =>
      this.renderContent(arrDate),
    );

    // model.on('categorySort', date => {
    //   return date;
    // });
  }

  show = () => {
    this.emit('renderDate');
  };

  createImageElement = (src, alt, classValue) => {
    const imgElement = document.createElement('img');
    imgElement.setAttribute('src', src);
    imgElement.setAttribute('alt', alt);
    imgElement.classList.add(classValue);
    return imgElement;
  };

  createLinkElement = (href, text) => {
    const linkElement = document.createElement('a');
    linkElement.classList.add('link');
    linkElement.setAttribute('href', href);
    linkElement.textContent = text;
    return linkElement;
  };

  createButtonOpenBlockOnFullScreen = () => {
    const buttonElement = document.createElement('button');
    buttonElement.classList.add('button-onfullScreen');
    const imgElement = this.createImageElement(
      './assets/expand.svg',
      'Expand Icon',
      'image-expand',
    );
    buttonElement.addEventListener('click', event => {
      const blockElement = event.target.closest('div');
      if (document.fullscreenElement === null) {
        blockElement.requestFullscreen();
        blockElement.setAttribute('id', 'full-screen');
      } else {
        document.exitFullscreen();
        blockElement.removeAttribute('id', 'full-screen');
      }
    });
    buttonElement.append(imgElement);
    return buttonElement;
  };

  createSliderElement = arrTotalInformation => {
    const sliderBlockElement = document.createElement('div');
    sliderBlockElement.classList.add('slider');
    const imgLeftArrowElement = this.createImageElement(
      './assets/left-arrow.svg',
      'Left Arrow',
      'arrows',
    );
    imgLeftArrowElement.addEventListener(
      'click',
      this.prevCategory.bind(this, arrTotalInformation),
    );
    this.leftArrowElement = imgLeftArrowElement;
    const nameElement = document.createElement('span');
    nameElement.textContent = this.titleSlider[this.numberTitleSlider];
    const imgRightArrowElement = this.createImageElement(
      './assets/right-arrow.svg',
      'Right Arrow',
      'arrow-right',
    );
    // сделать по-человечески
    this.nameCategorySlider = nameElement;
    this.rightArrowElement = imgRightArrowElement;
    imgRightArrowElement.addEventListener(
      'click',
      this.nextСategory.bind(this),
    );
    sliderBlockElement.append(
      imgLeftArrowElement,
      nameElement,
      imgRightArrowElement,
    );
    return sliderBlockElement;
  };

  //  сделать фукции по-человечески
  createSliderElementChart = arrTotalInformation => {
    const sliderBlockElement = document.createElement('div');
    sliderBlockElement.classList.add('slider');
    const imgLeftArrowElement = this.createImageElement(
      './assets/left-arrow.svg',
      'Left Arrow',
      'arrows',
    );
    imgLeftArrowElement.id = 'arrows';
    this.leftArrowElement = imgLeftArrowElement;
    const nameElement = document.createElement('span');
    nameElement.textContent = this.titleSlider[this.numberTitleSlider];
    const imgRightArrowElement = this.createImageElement(
      './assets/right-arrow.svg',
      'Right Arrow Chart',
      'arrow-right',
    );
    imgRightArrowElement.id = 'arrow-right';
    this.rightArrowElement = imgRightArrowElement;
    // imgRightArrowElement.addEventListener(
    //   'click',
    //   this.NextСategory.bind(this, dataCountri),
    // );
    sliderBlockElement.append(
      imgLeftArrowElement,
      nameElement,
      imgRightArrowElement,
    );
    return sliderBlockElement;
  };

  nextСategory = e => {
    if (this.numberTitleSlider === this.titleSlider.length - 1) return;

    this.numberTitleSlider += 1;
    const nameCategory = this.titleSlider[this.numberTitleSlider];

    const categoriCountri = this.model.getTotalCountriesCategories(
      nameCategory,
    );
    this.nameCategorySlider.textContent = nameCategory;
    this.listCounties.innerHTML = '';
    this.NowArrCounriCategory = categoriCountri;
    categoriCountri.forEach(el => {
      const listCountriesItemElement = document.createElement('li');
      listCountriesItemElement.classList.add('list-countries-item');
      listCountriesItemElement.addEventListener(
        'click',
        this.processingClick.bind(this, el),
      );
      const oneCountryNumberElement = document.createElement('span');
      oneCountryNumberElement.classList.add('onecountry-number-cases');
      if (this.numberTitleSlider === 0)
        oneCountryNumberElement.classList.add('red');
      if (this.numberTitleSlider === 1)
        oneCountryNumberElement.classList.add('white');
      if (this.numberTitleSlider === 2)
        oneCountryNumberElement.classList.add('green');
      oneCountryNumberElement.textContent = el[nameCategory.toLowerCase()];
      const countryNameElement = document.createElement('span');
      countryNameElement.classList.add('country-name');
      countryNameElement.textContent = el.country;
      const countryFlagElement = this.createImageElement(
        `${el.countryInfo.flag}`,
        `Flag ${el.country}`,
        `country-flag`,
      );
      listCountriesItemElement.append(
        oneCountryNumberElement,
        countryNameElement,
        countryFlagElement,
      );
      this.listCounties.append(listCountriesItemElement);
    });
  };

  prevCategory = () => {
    if (this.numberTitleSlider === 0) return;
    this.numberTitleSlider -= 1;
    const nameCategory = this.titleSlider[this.numberTitleSlider];
    this.nameCategorySlider.textContent = nameCategory;
    const categoriCountri = this.model.getTotalCountriesCategories(
      nameCategory,
    );
    this.listCounties.innerHTML = '';
    this.NowArrCounriCategory = categoriCountri;
    categoriCountri.forEach(el => {
      const listCountriesItemElement = document.createElement('li');
      listCountriesItemElement.classList.add('list-countries-item');
      listCountriesItemElement.addEventListener(
        'click',
        this.processingClick.bind(this, el),
      );
      const oneCountryNumberElement = document.createElement('span');
      oneCountryNumberElement.classList.add('onecountry-number-cases');
      if (this.numberTitleSlider === 0)
        oneCountryNumberElement.classList.add('red');
      if (this.numberTitleSlider === 1)
        oneCountryNumberElement.classList.add('white');
      if (this.numberTitleSlider === 2)
        oneCountryNumberElement.classList.add('green');
      oneCountryNumberElement.textContent = el[nameCategory.toLowerCase()];
      const countryNameElement = document.createElement('span');
      countryNameElement.classList.add('country-name');
      countryNameElement.textContent = el.country;
      const countryFlagElement = this.createImageElement(
        `${el.countryInfo.flag}`,
        `Flag ${el.country}`,
        `country-flag`,
      );
      listCountriesItemElement.append(
        oneCountryNumberElement,
        countryNameElement,
        countryFlagElement,
      );
      this.listCounties.append(listCountriesItemElement);
    });
  };

  createToggleElementTable = (
    totallyOrABS,
    dailyOrPer100k,
    secondToggleText1,
    secondToggleText2,
  ) => {
    const toggleElement = document.createElement('label');
    toggleElement.classList.add('switch');
    toggleElement.addEventListener('click', this.changeDateCountry.bind(this));
    const inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'checkbox');
    const knobElement = document.createElement('span');
    knobElement.classList.add('knob');
    const textTotallyOrABSElement = document.createElement('span');
    textTotallyOrABSElement.classList.add('toggle-text', secondToggleText1);
    textTotallyOrABSElement.textContent = totallyOrABS;
    const textDailyOrPer100kElement = document.createElement('span');
    textDailyOrPer100kElement.classList.add(
      'toggle-text',
      'right-text',
      secondToggleText2,
    );
    textDailyOrPer100kElement.textContent = dailyOrPer100k;
    toggleElement.append(
      textTotallyOrABSElement,
      textDailyOrPer100kElement,
      inputElement,
      knobElement,
    );
    // toggleElement.addEventListener('click');
    return toggleElement;
  };

  createToggleElement = (
    totallyOrABS,
    dailyOrPer100k,
    secondToggleText1,
    secondToggleText2,
  ) => {
    const toggleElement = document.createElement('label');
    toggleElement.classList.add('switch');

    const inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'checkbox');
    const knobElement = document.createElement('span');
    knobElement.classList.add('knob');
    const textTotallyOrABSElement = document.createElement('span');
    textTotallyOrABSElement.classList.add('toggle-text', secondToggleText1);
    textTotallyOrABSElement.textContent = totallyOrABS;
    const textDailyOrPer100kElement = document.createElement('span');
    textDailyOrPer100kElement.classList.add(
      'toggle-text',
      'right-text',
      secondToggleText2,
    );
    textDailyOrPer100kElement.textContent = dailyOrPer100k;
    toggleElement.append(
      textTotallyOrABSElement,
      textDailyOrPer100kElement,
      inputElement,
      knobElement,
    );
    // toggleElement.addEventListener('click');
    return toggleElement;
  };

  createToggleElementDev = (
    totallyOrABS,
    dailyOrPer100k,
    secondToggleText1,
    secondToggleText2,
  ) => {
    const toggleElement = document.createElement('label');
    toggleElement.classList.add('switch');
    toggleElement.addEventListener('click', this.deviceCountryValue.bind(this));
    const inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'checkbox');
    const knobElement = document.createElement('span');
    knobElement.classList.add('knob');
    const textTotallyOrABSElement = document.createElement('span');
    textTotallyOrABSElement.classList.add('toggle-text', secondToggleText1);
    textTotallyOrABSElement.textContent = totallyOrABS;
    const textDailyOrPer100kElement = document.createElement('span');
    textDailyOrPer100kElement.classList.add(
      'toggle-text',
      'right-text',
      secondToggleText2,
    );
    textDailyOrPer100kElement.textContent = dailyOrPer100k;
    toggleElement.append(
      textTotallyOrABSElement,
      textDailyOrPer100kElement,
      inputElement,
      knobElement,
    );
    // toggleElement.addEventListener('click');
    return toggleElement;
  };

  async deviceCountryValue(e) {
    if (e.detail === 0) return;
    const nameCategory = this.titleSlider[this.numberTitleSlider];
    let categoriCountri;
    let nowCotegori;
    this.devicedBtn = !this.devicedBtn;
    if (this.devicedBtn) {
      if (this.filterCategory) {
        categoriCountri = await this.model.getDeviceCountry(
          this.filterCategory,
        );
        nowCotegori = this.filterCategory;
      } else {
        categoriCountri = await this.model.getDeviceCountry(
          nameCategory.toLowerCase(),
        );
        nowCotegori = nameCategory.toLowerCase();
      }
    } else if (this.filterCategory) {
      categoriCountri = this.model.getTodayDate(this.filterCategory);
      nowCotegori = this.filterCategory;
    } else {
      categoriCountri = this.model.getTodayDate(nameCategory.toLowerCase());
      nowCotegori = nameCategory.toLowerCase();
    }

    this.nameCategorySlider.textContent = nameCategory;
    this.listCounties.innerHTML = '';
    this.NowArrCounriCategory = categoriCountri;
    categoriCountri.forEach(el => {
      const listCountriesItemElement = document.createElement('li');
      listCountriesItemElement.classList.add('list-countries-item');
      listCountriesItemElement.addEventListener(
        'click',
        this.processingClick.bind(this, el),
      );
      const oneCountryNumberElement = document.createElement('span');
      oneCountryNumberElement.classList.add('onecountry-number-cases');
      oneCountryNumberElement.textContent = el[nowCotegori];
      const countryNameElement = document.createElement('span');
      countryNameElement.classList.add('country-name');
      countryNameElement.textContent = el.country;
      const countryFlagElement = this.createImageElement(
        `${el.countryInfo.flag}`,
        `Flag ${el.country}`,
        `country-flag`,
      );
      listCountriesItemElement.append(
        oneCountryNumberElement,
        countryNameElement,
        countryFlagElement,
      );
      this.listCounties.append(listCountriesItemElement);
    });
  }

  changeDateCountry(e) {
    if (e.detail === 0) return;
    this.dailyListCountries = !this.dailyListCountries;
    const daily = this.dailyListCountries ? 'today' : '';
    this.updateCategory(daily);
  }

  updateCategory(daily) {
    const nameCategory = this.titleSlider[this.numberTitleSlider];
    const filterCategory = daily
      ? daily + nameCategory
      : nameCategory.toLowerCase();
    this.filterCategory = filterCategory;
    const categoriCountri = daily
      ? this.model.getTodayDate(filterCategory)
      : this.model.getTotalCountriesCategories(nameCategory);
    this.nameCategorySlider.textContent = nameCategory;
    this.listCounties.innerHTML = '';
    this.NowArrCounriCategory = categoriCountri;
    categoriCountri.forEach(el => {
      const listCountriesItemElement = document.createElement('li');
      listCountriesItemElement.classList.add('list-countries-item');
      listCountriesItemElement.addEventListener(
        'click',
        this.processingClick.bind(this, el),
      );
      const oneCountryNumberElement = document.createElement('span');
      oneCountryNumberElement.classList.add('onecountry-number-cases');
      oneCountryNumberElement.textContent = el[filterCategory];
      const countryNameElement = document.createElement('span');
      countryNameElement.classList.add('country-name');
      countryNameElement.textContent = el.country;
      const countryFlagElement = this.createImageElement(
        `${el.countryInfo.flag}`,
        `Flag ${el.country}`,
        `country-flag`,
      );
      listCountriesItemElement.append(
        oneCountryNumberElement,
        countryNameElement,
        countryFlagElement,
      );
      this.listCounties.append(listCountriesItemElement);
    });
  }

  createlistCountriesBlock = dataCountri => {
    const listCountriesBlock = document.createElement('div');
    listCountriesBlock.classList.add('list-countries-block');
    const listCountriesTitleElement = document.createElement('span');
    listCountriesTitleElement.classList.add('list-countries-title');
    listCountriesTitleElement.textContent = 'Country/Region/Sovereignty';
    const searchBlock = document.createElement('form');
    searchBlock.classList.add('search-form');
    const searchInputElement = document.createElement('input');
    searchInputElement.classList.add('search-input');
    searchInputElement.setAttribute('type', 'text');
    searchInputElement.setAttribute('placeholder', 'Enter Country');
    const searchButtonElement = document.createElement('button');
    searchButtonElement.classList.add('search-button');
    searchButtonElement.setAttribute('type', 'submit');
    searchBlock.append(searchInputElement, searchButtonElement);
    const toggleBlock = document.createElement('div');
    toggleBlock.classList.add('toggle-block');
    // решить проблему с разными toggle должны быть едины но листенеры раздельно
    const toggleLeftElement = this.createToggleElementTable('Totally', 'Daily');
    const toggleRightElement = this.createToggleElementDev(
      'ABS',
      'Per100k',
      'text1',
      'text2',
    );
    toggleBlock.append(toggleLeftElement, toggleRightElement);
    const listCountriesElement = document.createElement('ul');
    listCountriesElement.classList.add('list-countries');
    this.listCounties = listCountriesElement;
    this.NowArrCounriCategory = dataCountri;
    dataCountri.forEach(el => {
      const listCountriesItemElement = document.createElement('li');
      listCountriesItemElement.classList.add('list-countries-item');
      listCountriesItemElement.addEventListener(
        'click',
        this.processingClick.bind(this, el),
      );
      const oneCountryNumberElement = document.createElement('span');
      oneCountryNumberElement.classList.add('onecountry-number-cases');
      oneCountryNumberElement.textContent = el.cases;
      const countryNameElement = document.createElement('span');
      countryNameElement.classList.add('country-name');
      countryNameElement.textContent = el.country;
      const countryFlagElement = this.createImageElement(
        `${el.countryInfo.flag}`,
        `Flag ${el.country}`,
        `country-flag`,
      );
      listCountriesItemElement.append(
        oneCountryNumberElement,
        countryNameElement,
        countryFlagElement,
      );
      listCountriesElement.append(listCountriesItemElement);
    });
    const sliderInListBlock = this.createSliderElement([1, 4]);
    const buttonOnFullScreen = this.createButtonOpenBlockOnFullScreen();
    listCountriesBlock.append(
      listCountriesTitleElement,
      searchBlock,
      toggleBlock,
      listCountriesElement,
      sliderInListBlock,
      buttonOnFullScreen,
    );
    return listCountriesBlock;
  };

  findCountry = e => {
    const nameCategory = this.titleSlider[this.numberTitleSlider];
    this.listCounties.innerHTML = '';
    const categoriCountri = this.model.getTotalCountriesCategories(
      nameCategory,
    );
    categoriCountri.forEach(el => {
      if (
        el.country.toLowerCase().indexOf(e.currentTarget.value.toLowerCase()) <
        0
      )
        return;
      const listCountriesItemElement = document.createElement('li');
      listCountriesItemElement.classList.add('list-countries-item');
      listCountriesItemElement.addEventListener(
        'click',
        this.processingClick.bind(this, el),
      );
      const oneCountryNumberElement = document.createElement('span');
      oneCountryNumberElement.classList.add('onecountry-number-cases');
      oneCountryNumberElement.textContent = el[nameCategory.toLowerCase()];
      const countryNameElement = document.createElement('span');
      countryNameElement.classList.add('country-name');
      countryNameElement.textContent = el.country;
      const countryFlagElement = this.createImageElement(
        `${el.countryInfo.flag}`,
        `Flag ${el.country}`,
        `country-flag`,
      );
      listCountriesItemElement.append(
        oneCountryNumberElement,
        countryNameElement,
        countryFlagElement,
      );
      this.listCounties.append(listCountriesItemElement);
    });
  };

  processingClick = (dataElement, e) => {
    document
      .querySelectorAll('.list-countries-item--active')
      .forEach(elemList => {
        if (elemList !== e.currentTarget) {
          elemList.classList.remove('list-countries-item--active');
        }
      });
    // console.log(e.currentTarget);
    let date;
    if (e.currentTarget.className.indexOf('list-countries-item--active') > -1) {
      date = this.model.globalInfo;
      e.currentTarget.classList.toggle('list-countries-item--active');
    } else {
      date = dataElement;
      e.currentTarget.classList.toggle('list-countries-item--active');
    }
    this.tableCountryName.textContent = date.country || 'Global';
    this.tableCases.textContent = date.cases;
    this.tableDeaths.textContent = date.deaths;
    this.tableRecorvered.textContent = date.recovered;
    this.globalCasesNumber.textContent = date.cases;
    let chartNumber = 0;
    function getCountryChart() {
      const getCountryTimelineInfo = () => {
        return axios
          .get(`https://covid19-api.org/api/timeline/${date.countryInfo.iso2}`)
          .then(function (response) {
            return response.data;
          });
      };
      (async function () {
        const getTimelineInfo = () => {
          return axios
            .get('https://covid19-api.org/api/timeline')
            .then(function (response) {
              return response.data;
            });
        };
        this.timelineInfo = await getTimelineInfo();
        for (let i = 0; i < this.timelineInfo.length; i += 1) {
          this.timelineData.push(this.timelineInfo[i].last_update.slice(0, 10));
        }
        this.timelineData = this.timelineData.reverse();

        this.countryTimelineInfo = [];
        this.countryTimelineCases = [];
        this.countryTimelineDeaths = [];
        this.countryTimelineRecovered = [];

        this.countryTimelineInfo = await getCountryTimelineInfo();
        for (let i = 0; i < this.countryTimelineInfo.length; i += 1) {
          this.countryTimelineCases.push(this.countryTimelineInfo[i].cases);
        }
        this.countryTimelineCases = this.countryTimelineCases.reverse();
        for (let i = 0; i < this.countryTimelineInfo.length; i += 1) {
          this.countryTimelineDeaths.push(this.countryTimelineInfo[i].deaths);
        }
        this.countryTimelineDeaths = this.countryTimelineDeaths.reverse();
        for (let i = 0; i < this.countryTimelineInfo.length; i += 1) {
          this.countryTimelineRecovered.push(
            this.countryTimelineInfo[i].recovered,
          );
        }
        this.countryTimelineRecovered = this.countryTimelineRecovered.reverse();

        const element = document.getElementById('chart');

        function createChart(elementLabel, elementData, chartLabel) {
          const myChart = new Chart(element, {
            type: 'line',
            data: {
              labels: elementLabel,
              datasets: [
                {
                  backgroundColor: 'rgba(144,238,144 , 0.9 )',
                  label: chartLabel,
                  data: elementData,
                  borderWidth: 1,
                },
              ],
            },
            options: {
              scales: {
                xAxes: [
                  {
                    type: 'time',
                    distribution: 'series',
                  },
                ],
              },
            },
          });
          document.getElementById('arrow-right').onclick = () => {
            myChart.destroy();
            chartNumber += 1;
            getCountryChart(element, chartNumber);
            if (chartNumber > 2) {
              chartNumber = 0;
              getCountryChart(element, chartNumber);
            }
          };
          document.getElementById('arrows').onclick = () => {
            myChart.destroy();
            chartNumber -= 1;
            getCountryChart(element, chartNumber);
            if (chartNumber < 0) {
              chartNumber = 2;
              getCountryChart(element, chartNumber);
            }
          };
        }
        if (chartNumber === 0) {
          createChart(
            this.timelineData,
            this.countryTimelineCases,
            `number of cases in ${date.country}`,
          );
        }
        if (chartNumber === 1) {
          createChart(
            this.timelineData,
            this.countryTimelineDeaths,
            `number of deaths in ${date.country}`,
          );
        }
        if (chartNumber === 2) {
          createChart(
            this.timelineData,
            this.countryTimelineRecovered,
            `number of recovered in ${date.country}`,
          );
        }
      })();
    }
    getCountryChart();
  };

  createGlobalCasesBlock = dataGlobal => {
    const globalCasesBlock = document.createElement('div');
    globalCasesBlock.classList.add('global-cases-block');
    const globalCasesTitleElement = document.createElement('span');
    globalCasesTitleElement.classList.add('global-cases-title');
    globalCasesTitleElement.textContent = 'Global Cases';
    const globalCasesNumberElement = document.createElement('span');
    globalCasesNumberElement.classList.add('global-cases-number');
    globalCasesNumberElement.textContent = dataGlobal.cases;
    this.globalCasesNumber = globalCasesNumberElement;
    const buttonOnFullScreen = this.createButtonOpenBlockOnFullScreen();
    globalCasesBlock.append(
      globalCasesTitleElement,
      globalCasesNumberElement,
      buttonOnFullScreen,
    );
    return globalCasesBlock;
  };

  createChartBlock = () => {
    const chartBlock = document.createElement('div');
    chartBlock.classList.add('chart');
    chartBlock.textContent = 'Global';
    const toggleBlock = document.createElement('div');
    toggleBlock.classList.add('toggle-block');
    const toggleLeftElement = this.createToggleElement('Totally', 'Daily');
    const toggleRightElement = this.createToggleElement(
      'ABS',
      'Per100k',
      'text1',
      'text2',
    );
    toggleBlock.append(toggleLeftElement, toggleRightElement);
    const buttonOnFullScreen = this.createButtonOpenBlockOnFullScreen();
    const chartElement = document.createElement('canvas');
    chartElement.id = 'chart';
    chartElement.classList.add('chart-image');
    const ctx = chartElement;
    let chartNumber = 0;
    let chartAbs = true;
    let chartDaily = false;
    const sliderInChartBlock = this.createSliderElementChart();

    function getChart(element, number, conditionSumm, conditionDaily) {
      const getTimelineInfo = () => {
        return axios
          .get('https://covid19-api.org/api/timeline')
          .then(function (response) {
            return response.data;
          });
      };
      (async function () {
        this.timelineInfo = [];
        this.timelineData = [];
        this.timelineCases = [];
        this.timelineDeaths = [];
        this.timelineRecovered = [];
        this.dailyCases = [];
        this.dailyDeaths = [];
        this.dailyRecovered = [];
        this.countriesInfo = [];
        this.countriesPopulationInfo = [];
        this.globalPopulationInfo = [];

        this.timelineInfo = await getTimelineInfo();
        this.countriesInfo = await getCountriesInfo();
        for (let i = 0; i < this.countriesInfo.length; i += 1) {
          this.countriesPopulationInfo.push(this.countriesInfo[i].population);
        }
        this.globalPopulationInfo = this.countriesPopulationInfo.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
        );
        for (let i = 0; i < this.timelineInfo.length; i += 1) {
          this.timelineData.push(this.timelineInfo[i].last_update.slice(0, 10));
        }
        for (let i = 0; i < this.timelineInfo.length; i += 1) {
          this.timelineData.push(this.timelineInfo[i].last_update.slice(0, 10));
        }
        this.timelineData = this.timelineData.reverse();
        for (let i = 0; i < this.timelineInfo.length; i += 1) {
          this.timelineCases.push(this.timelineInfo[i].total_cases);
        }
        this.timelineCases = this.timelineCases.reverse();
        for (let i = 0; i < this.timelineInfo.length; i += 1) {
          this.timelineDeaths.push(this.timelineInfo[i].total_deaths);
        }
        this.timelineDeaths = this.timelineDeaths.reverse();
        for (let i = 0; i < this.timelineInfo.length; i += 1) {
          this.timelineRecovered.push(this.timelineInfo[i].total_recovered);
        }
        this.timelineRecovered = this.timelineRecovered.reverse();

        for (let i = 1; i < this.timelineInfo.length; i += 1) {
          this.dailyCases.push(
            Math.abs(
              this.timelineInfo[i].total_recovered -
                this.timelineInfo[i - 1].total_recovered,
            ),
          );
        }
        this.dailyCases = this.dailyCases.reverse();

        for (let i = 1; i < this.timelineInfo.length; i += 1) {
          this.dailyDeaths.push(
            Math.abs(
              this.timelineInfo[i].total_deaths -
                this.timelineInfo[i - 1].total_deaths,
            ),
          );
        }
        this.dailyDeaths = this.dailyDeaths.reverse();

        for (let i = 1; i < this.timelineInfo.length; i += 1) {
          this.dailyRecovered.push(
            Math.abs(
              this.timelineInfo[i].total_recovered -
                this.timelineInfo[i - 1].total_recovered,
            ),
          );
        }
        this.dailyRecovered = this.dailyRecovered.reverse();

        function createChart(elementLabel, elementData, chartLabel) {
          const myChart = new Chart(element, {
            type: 'line',
            data: {
              labels: elementLabel,
              datasets: [
                {
                  backgroundColor: 'rgba(144,238,144 , 0.9 )',
                  label: chartLabel,
                  data: elementData,
                  borderWidth: 1,
                },
              ],
            },
            options: {
              scales: {
                xAxes: [
                  {
                    type: 'time',
                    distribution: 'series',
                  },
                ],
              },
            },
          });
          sliderInChartBlock.getElementsByClassName(
            'arrow-right',
          )[0].onclick = () => {
            myChart.destroy();
            chartNumber += 1;
            getChart(ctx, chartNumber, chartAbs, chartDaily);
            if (chartNumber > 2) {
              chartNumber = 0;
              getChart(ctx, chartNumber, chartAbs, chartDaily);
            }
          };
          sliderInChartBlock.getElementsByClassName(
            'arrows',
          )[0].onclick = () => {
            myChart.destroy();
            chartNumber -= 1;
            getChart(ctx, chartNumber, chartAbs, chartDaily);
            if (chartNumber < 0) {
              chartNumber = 2;
              getChart(ctx, chartNumber, chartAbs, chartDaily);
            }
          };
          toggleRightElement.oninput = () => {
            myChart.destroy();
            chartAbs = !chartAbs;
            chartNumber = 0;
            getChart(ctx, chartNumber, chartAbs, chartDaily);
          };
          toggleLeftElement.oninput = () => {
            myChart.destroy();
            chartDaily = !chartDaily;
            chartNumber = 0;
            getChart(ctx, chartNumber, chartAbs, chartDaily);
          };
        }

        if (number === 0) {
          if (conditionSumm === false) {
            if (conditionDaily === false) {
              this.timelineCases = this.timelineCases.map(currentValue =>
                Math.round((currentValue / this.globalPopulationInfo) * 100000),
              );
              createChart(
                this.timelineData,
                this.timelineCases,
                'number of cases',
              );
            }
            if (conditionDaily === true) {
              this.dailyCases = this.dailyCases.map(currentValue =>
                Math.round((currentValue / this.globalPopulationInfo) * 100000),
              );
              createChart(
                this.timelineData,
                this.dailyCases,
                'number of daily cases',
              );
            }
          }
          if (conditionSumm === true) {
            if (conditionDaily === false) {
              createChart(
                this.timelineData,
                this.timelineCases,
                'number of cases',
              );
            }
            if (conditionDaily === true) {
              createChart(
                this.timelineData,
                this.dailyCases,
                'number of daily cases',
              );
            }
          }
        }
        if (number === 1) {
          if (conditionSumm === false) {
            if (conditionDaily === false) {
              this.timelineDeaths = this.timelineDeaths.map(currentValue =>
                Math.round((currentValue / this.globalPopulationInfo) * 100000),
              );
              createChart(
                this.timelineData,
                this.timelineDeaths,
                'number of deaths',
              );
            }
            if (conditionDaily === true) {
              this.dailyDeaths = this.dailyDeaths.map(
                currentValue =>
                  (currentValue / this.globalPopulationInfo) * 100000,
              );
              createChart(
                this.timelineData,
                this.dailyDeaths,
                'number of daily deaths',
              );
            }
          }
          if (conditionSumm === true) {
            if (conditionDaily === false) {
              createChart(
                this.timelineData,
                this.timelineDeaths,
                'number of deaths',
              );
            }
            if (conditionDaily === true) {
              createChart(
                this.timelineData,
                this.dailyDeaths,
                'number of daily deaths',
              );
            }
          }
        }
        if (number === 2) {
          if (conditionSumm === false) {
            if (conditionDaily === false) {
              this.timelineRecovered = this.timelineRecovered.map(
                currentValue =>
                  Math.round(
                    (currentValue / this.globalPopulationInfo) * 100000,
                  ),
              );
              createChart(
                this.timelineData,
                this.timelineRecovered,
                'number of recovered',
              );
            }
            if (conditionDaily === true) {
              this.dailyRecovered = this.dailyRecovered.map(currentValue =>
                Math.round((currentValue / this.globalPopulationInfo) * 100000),
              );
              createChart(
                this.timelineData,
                this.dailyRecovered,
                'number of daily recovered',
              );
            }
          }
          if (conditionSumm === true) {
            if (conditionDaily === false) {
              createChart(
                this.timelineData,
                this.timelineRecovered,
                'number of recovered',
              );
            }
            if (conditionDaily === true) {
              createChart(
                this.timelineData,
                this.dailyRecovered,
                'number of daily recovered',
              );
            }
          }
        }
      })();
    }

    getChart(ctx, chartNumber, chartAbs, chartDaily);

    chartBlock.append(
      toggleBlock,
      chartElement,
      sliderInChartBlock,
      buttonOnFullScreen,
    );
    return chartBlock;
  };

  createDateBlock = () => {
    const dateBlock = document.createElement('div');
    dateBlock.classList.add('date-block');
    const dateTextElement = document.createElement('p');
    dateTextElement.classList.add('date-text');
    dateTextElement.textContent = 'Last Updated at (M/D/YYYY)';
    const dateElement = document.createElement('span');
    dateElement.classList.add('date');
    dateElement.textContent = moment().format('LLL');
    const buttonOnFullScreen = this.createButtonOpenBlockOnFullScreen();
    dateBlock.append(dateTextElement, dateElement, buttonOnFullScreen);
    return dateBlock;
  };

  createMapBlock = () => {
    const mapBlock = document.createElement('div');
    mapBlock.classList.add('map-block');
    const toggleBlock = document.createElement('div');
    toggleBlock.classList.add('map-toggles');
    const toggleLeftElement = this.createToggleElement('Totally', 'Daily');
    const toggleRightElement = this.createToggleElement(
      'ABS',
      'Per100k',
      'text1',
      'text2',
    );
    toggleBlock.append(toggleLeftElement, toggleRightElement);
    const mapImageElement = document.createElement('div');
    mapImageElement.id = 'mapid';
    mapImageElement.classList.add('map-image');
    const mapButtonsBlock = document.createElement('div');
    mapButtonsBlock.classList.add('map-buttons');
    const mapButtonCases = document.createElement('div');
    mapButtonCases.classList.add('map-button', 'active-button');
    mapButtonCases.textContent = 'Cases';
    const mapButtonDeaths = document.createElement('div');
    mapButtonDeaths.classList.add('map-button');
    mapButtonDeaths.textContent = 'Deaths';
    const mapButtonRecovered = document.createElement('div');
    mapButtonRecovered.classList.add('map-button');
    mapButtonRecovered.textContent = 'Recovered';
    mapButtonsBlock.append(mapButtonCases, mapButtonDeaths, mapButtonRecovered);
    const buttonOnFullScreen = this.createButtonOpenBlockOnFullScreen();
    mapBlock.append(
      toggleBlock,
      mapImageElement,
      mapButtonsBlock,
      buttonOnFullScreen,
    );
    return mapBlock;
  };

  createInfoAboutAuthorsBlock = () => {
    const infoBlock = document.createElement('div');
    infoBlock.classList.add('info-block');
    const linkRSSElement = this.createLinkElement('https://rs.school/js/', '');
    const imgRSSElement = this.createImageElement(
      './assets/rs_school_js.svg',
      'RSS Icon',
      'rss-image',
    );
    linkRSSElement.append(imgRSSElement);
    const createdPersonsElement = document.createElement('div');
    createdPersonsElement.classList.add('created-person');
    createdPersonsElement.textContent = '2020 Created by';
    const link1Element = this.createLinkElement(
      'https://github.com/kubana6',
      'kubana-6',
    );
    const link2Element = this.createLinkElement(
      'https://github.com/andrei-roh',
      'andrei-roh',
    );
    const link3Element = this.createLinkElement(
      'https://github.com/nin3439',
      'nin3439',
    );
    createdPersonsElement.append(link1Element, link2Element, link3Element);
    infoBlock.append(linkRSSElement, createdPersonsElement);
    return infoBlock;
  };

  createTableBlock = dataGlobal => {
    const tableBlock = document.createElement('div');
    tableBlock.classList.add('table-block');
    const nameCountryElement = document.createElement('span');
    nameCountryElement.classList.add('table-country-name');
    nameCountryElement.textContent = 'Global';
    this.tableCountryName = nameCountryElement;
    const toggleBlock = document.createElement('div');
    toggleBlock.classList.add('toggle-block');
    const toggleLeftElement = this.createToggleElement('Totally', 'Daily');
    const toggleRightElement = this.createToggleElement(
      'ABS',
      'Per100k',
      'text1',
      'text2',
    );
    toggleBlock.append(toggleLeftElement, toggleRightElement);
    const tableElement = document.createElement('table');
    const trHeadElement = document.createElement('tr');
    this.titleSlider.forEach(item => {
      const thElement = document.createElement('th');
      thElement.textContent = item;
      trHeadElement.append(thElement);
    });
    const trBodyElement = document.createElement('tr');
    const casesNumberElement = document.createElement('td');
    casesNumberElement.classList.add('red', 'Cases');
    casesNumberElement.textContent = dataGlobal.cases;
    this.tableCases = casesNumberElement;
    const deathsNumberElement = document.createElement('td');
    deathsNumberElement.classList.add('white', 'Deaths');
    deathsNumberElement.textContent = dataGlobal.deaths;
    this.tableDeaths = deathsNumberElement;
    const recoveredNumberElement = document.createElement('td');
    recoveredNumberElement.classList.add('green', 'Recorved');
    recoveredNumberElement.textContent = dataGlobal.recovered;
    this.tableRecorvered = recoveredNumberElement;
    trBodyElement.append(
      casesNumberElement,
      deathsNumberElement,
      recoveredNumberElement,
    );
    tableElement.append(trHeadElement, trBodyElement);
    const buttonOnFullScreen = this.createButtonOpenBlockOnFullScreen();
    tableBlock.append(
      nameCountryElement,
      toggleBlock,
      tableElement,
      buttonOnFullScreen,
    );
    return tableBlock;
  };

  createRecommendationBlock = () => {
    const recommendationBlock = document.createElement('div');
    recommendationBlock.classList.add('recommendation-block');
    const titleElement = document.createElement('ol');
    titleElement.classList.add('list');
    titleElement.textContent = 'Рекомендации ВОЗ:';

    recommendationLinks.forEach(item => {
      const listElement = document.createElement('li');
      listElement.classList.add('list-item');
      const linkElement = this.createLinkElement(item.url, item.name);
      listElement.append(linkElement);
      titleElement.append(listElement);
    });
    const buttonOnFullScreen = this.createButtonOpenBlockOnFullScreen();
    recommendationBlock.append(titleElement, buttonOnFullScreen);
    return recommendationBlock;
  };

  renderContent = arr => {
    const dataCountri = arr[0];
    const dataGlobal = arr[1];
    const leftBlock = document.createElement('div');
    leftBlock.classList.add('left-block');
    const globalCasesBlock = this.createGlobalCasesBlock(dataGlobal);
    const listCountriesBlock = this.createlistCountriesBlock(dataCountri);
    const dateBlock = this.createDateBlock(dataGlobal);
    leftBlock.append(globalCasesBlock, listCountriesBlock, dateBlock);
    const middleBlock = document.createElement('div');
    middleBlock.classList.add('middle-block');
    const mapBlock = this.createMapBlock();
    const infoBlock = this.createInfoAboutAuthorsBlock();
    middleBlock.append(mapBlock, infoBlock);
    const rightBlock = document.createElement('div');
    rightBlock.classList.add('right-block');
    const tableBlock = this.createTableBlock(dataGlobal);
    const chartBlock = this.createChartBlock();
    const recommendationBlock = this.createRecommendationBlock();
    rightBlock.append(tableBlock, chartBlock, recommendationBlock);
    this.contentWrapper.append(leftBlock, middleBlock, rightBlock);
    const inputSearch = document.querySelector('.search-input');
    inputSearch.addEventListener('keyup', this.findCountry);
    this.loadedMap();
    this.addChart();
    return this.conаtentWrapper;
  };

  loadedMap = event => {
    const map = document.querySelector('#mapid');
    map.innerHTML = '';
    const dataCountri = this.model.countriesInfo;
    const categoryMap = document.querySelectorAll('.map-button');
    categoryMap.forEach(element =>
      element.addEventListener('click', this.addMarker.bind(this, dataCountri)),
    );
    this.map = L.map('mapid', {
      worldCopyJump: true,
    }).setView([51.505, -0.09], 4);

    const legend = L.control({ position: 'bottomleft' });
    legend.onAdd = function () {
      const div = L.DomUtil.create('div', 'info legend');
      div.innerHTML += '<i style="background: #f00"></i><span>Cases</span><br>';
      div.innerHTML +=
        '<i style="background: #fff"></i><span>Deaths</span><br>';
      div.innerHTML +=
        '<i style="background: #0f0"></i><span>Recovered</span><br>';
      return div;
    };
    legend.addTo(this.map);
    const spinalLayer = L.tileLayer(
      'https://{s}.tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?apikey=db5ae1f5778a448ca662554581f283c5',
      {
        attribution: '&copy; <a href="copyright">Openstreetmap</a>',
      },
    );
    const osmLayer = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    );
    const darkLayer = L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    ).addTo(this.map);
    const baseMaps = {
      OSM: osmLayer,
      Spinal: spinalLayer,
      Dark: darkLayer,
    };

    this.addMarker(dataCountri);
    L.control.layers(baseMaps, {}).addTo(this.map);
  };

  addMarker = (dataCountri, event) => {
    let category;
    if (event) {
      const prevCat = document.querySelector('.active-button');
      prevCat.classList.remove('active-button');
      event.currentTarget.classList.add('active-button');
      category = event.currentTarget.textContent.toLowerCase();
      this.markerArr.forEach(elemMap => this.map.removeLayer(elemMap));
      this.markerArr = [];
    } else {
      category = 'cases';
    }
    return dataCountri.forEach(dataElement => {
      // console.log(dataElement.countryInfo.lat);
      const radius = this.findRadius(dataElement[category]);
      const myIcon = L.divIcon({
        className: 'marker-icon',
        html: `<svg viewBox="0 0 170 170" xmlns="http://www.w3.org/2000/svg"> <circle class= "circle__small" cx="90" cy="90" r='${radius}' fill="${
          category === 'deaths'
            ? 'white'
            : category === 'recovered'
            ? 'green'
            : 'red'
        }"/> </svg >`,
      });
      // myicon можно прокинуть в функцию чтобы потом при  изменении  фильтра параметров менять точки и  иконку еще можно добавить 'dataset чтобы проще было обрабатывать клик'
      const marker = L.marker(
        [dataElement.countryInfo.lat, dataElement.countryInfo.long],
        { icon: myIcon },
      )
        .bindPopup(
          `<p class='popup_categori'> ${
            dataElement.country
          }</p> ${category.toUpperCase()}:${dataElement[category]}`,
        )
        .addTo(this.map);
      this.markerArr.push(marker);
    });
  };

  findRadius = dateEl => {
    const date = +dateEl;
    // записать  значение в отлельный файл с константами
    if (date < 1000) {
      return 15;
    }
    if (date > 1000 && date < 10000) {
      return 20;
    }
    if (date < 50000) {
      return 25;
    }
    if (date < 100000) {
      return 30;
    }
    if (date < 500000) {
      return 35;
    }
    if (date < 1000000) {
      return 40;
    }
    if (date < 3000000) {
      return 45;
    }
    if (date > 10000000) {
      return 60;
    }
    return 70;
  };
}
