import Chart from 'chart.js';
import axios from 'axios';

export default function createCountryChart(element, number, conditionSumm) {
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

    function removeData(chart) {
      chart.data.labels.pop();
      chart.data.datasets.forEach(dataset => {
        dataset.data.pop();
      });
      chart.update();
    }

    this.timelineInfo = await getTimelineInfo();
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
    }

    if (conditionSumm === true) {
      if (number === 0) {
        createChart(this.timelineData, this.timelineCases, 'number of cases');
      }
      if (number === 1) {
        createChart(this.timelineData, this.timelineDeaths, 'number of deaths');
      }
      if (number === 2) {
        createChart(
          this.timelineData,
          this.timelineRecovered,
          'number of recovered',
        );
      }
    }
    if (conditionSumm === false) {
      if (number === 0) {
        this.timelineCases = this.timelineCases.map(
          currentValue => currentValue / 100000,
        );
        createChart(this.timelineData, this.timelineCases, 'number of cases');
      }
      if (number === 1) {
        this.timelineDeaths = this.timelineDeaths.map(
          currentValue => currentValue / 100000,
        );
        createChart(this.timelineData, this.timelineDeaths, 'number of deaths');
      }
      if (number === 2) {
        this.timelineRecovered = this.timelineRecovered.map(
          currentValue => currentValue / 100000,
        );
        createChart(
          this.timelineData,
          this.timelineRecovered,
          'number of recovered',
        );
      }
    }
  })();
}
