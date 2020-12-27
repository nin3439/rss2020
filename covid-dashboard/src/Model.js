import axios from 'axios';
import getGlobalInfo from './services/getGlobalInfo.js';
import getCountriesInfo from './services/getCountriesInfo.js';
import getTimelineInfo from './services/getTimelineInfo.js';
import EventEmmiter from './EventEmmiter.js';

export default class Model extends EventEmmiter {
  constructor() {
    super();
    this.globalInfo = [];
    this.countriesInfo = [];
    this.totalCases = [];
    this.totalDeaths = [];
    this.totalRecovered = [];
    this.recoveredByCountry = [];
    this.deathsByCountry = [];
    this.casesByCountry = [];
    this.timelineInfo = [];
    this.timelineData = [];
    this.timelineCases = [];
    this.arrListCategories = [];
  }

  getTotalCountriesCategories = nameCategory => {
    switch (nameCategory) {
      case 'Cases':
        return this.casesByCountry;

      case 'Deaths':
        return this.deathsByCountry;

      case 'Recorved':
        return this.recorvedByCountry;

      default:
        return this.casesByCountry;
    }
  };

  getGlobalDate = async () => {
    this.globalInfo = await getGlobalInfo();
    await this.addDataCountriesInfo();
    this.emit('defaultDateGLobalAndCounties', [
      this.casesByCountry,
      this.globalInfo,
    ]);
  };

  getTodayDate = filterCategory => {
    return this.countriesInfo
      .slice()
      .sort(
        (a, b) => parseFloat(b[filterCategory]) - parseFloat(a[filterCategory]),
      );
  };

  getDeviceCountry = async filterCategory => {
    function device(n) {
      if (n === 0) {
        return 0;
      }
      return (n / 10 ** 5).toFixed(3);
    }

    const dateArr = await getCountriesInfo();
    return dateArr
      .slice()
      .map(it => {
        const date = it[filterCategory];
        const newDate = device(date);
        const obj = it;
        obj[filterCategory] = newDate;
        return it;
      })
      .sort(
        (a, b) => parseFloat(b[filterCategory]) - parseFloat(a[filterCategory]),
      );
  };
  // addDataGlobalInfo = async () => {
  //   this.globalInfo = await getGlobalInfo();
  //   this.totalCases = this.globalInfo.cases;
  //   this.totalDeaths = this.globalInfo.deaths;
  //   this.totalRecovered = this.globalInfo.recovered;
  //   // console.log(this.globalInfo);
  // };

  addDataCountriesInfo = async () => {
    this.countriesInfo = await getCountriesInfo();
    this.casesByCountry = this.countriesInfo
      .slice()
      .sort((a, b) => parseFloat(b.cases) - parseFloat(a.cases));

    this.deathsByCountry = this.countriesInfo
      .slice()
      .sort((a, b) => parseFloat(b.deaths) - parseFloat(a.deaths));

    this.recoveredByCountry = this.countriesInfo
      .slice()
      .sort((a, b) => parseFloat(b.recovered) - parseFloat(a.recovered));
    this.casesTodayByCountry = this.countriesInfo
      .slice()
      .sort((a, b) => parseFloat(b.todayCases) - parseFloat(a.todayCases));
  };

  addDataTimelineInfo = async () => {
    this.timelineInfo = await getTimelineInfo();
    for (let i = 0; i < this.timelineInfo.length; i += 1) {
      this.timelineData.push(this.timelineInfo[i].last_update.slice(0, 10));
    }
    this.timelineData = this.timelineData.reverse();

    for (let i = 0; i < this.timelineInfo.length; i += 1) {
      this.timelineCases.push(this.timelineInfo[i].total_cases);
    }
    this.timelineCases = this.timelineCases.reverse();
  };
}
