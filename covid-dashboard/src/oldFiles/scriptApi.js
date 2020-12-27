import getCountriesInfo from '../services/getCountriesInfo.js';
import getGlobalCasesInfo from '../services/getGlobalInfo.js';

(async function () {
  const globalInfo = await getGlobalCasesInfo();
  const countriesInfo = await getCountriesInfo();

  // Total covid cases
  const totalCases = globalInfo.TotalConfirmed;
  // Total deaths
  const totalDeaths = globalInfo.TotalDeaths;
  // Total recovered
  const totalRecovered = globalInfo.TotalRecovered;

  // Sort covid cases by country
  const casesByCountry = countriesInfo
    .slice()
    .sort((a, b) => parseFloat(b.cases) - parseFloat(a.cases));
  // Sort recovered by country
  const recoveredByCountry = countriesInfo
    .slice()
    .sort((a, b) => parseFloat(b.recovered) - parseFloat(a.recovered));
  // Sort deaths by country
  const deathsByCountry = countriesInfo
    .slice()
    .sort((a, b) => parseFloat(b.deaths) - parseFloat(a.deaths));
})();
