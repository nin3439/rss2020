import axios from 'axios';

const getGlobalInfo = () => {
  return axios
    .get('https://disease.sh/v3/covid-19/all')
    .then(function (response) {
      return response.data;
    });
};

export default getGlobalInfo;
