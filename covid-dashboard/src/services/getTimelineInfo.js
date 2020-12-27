import axios from 'axios';

const getTimelineInfo = () => {
  return axios
    .get('https://covid19-api.org/api/timeline')
    .then(function (response) {
      return response.data;
    });
};

export default getTimelineInfo;
