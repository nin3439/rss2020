import axios from 'axios';

const getCountriesInfo = () => {
  return axios
    .get('https://corona.lmao.ninja/v2/countries')
    .then(function (response) {
      return response.data;
    });
};

export default getCountriesInfo;
