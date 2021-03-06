module.exports = {
  //eslint-disable-next-line
  parseAirQualityData(airQualityData) {
    console.log('parsing air quality', airQualityData.current.pollution.aqius);
    const aqius = airQualityData.current.pollution.aqius;
    switch (true) {
      case (aqius >= 51 && aqius <= 100):
        console.log('MODERATE AIR QUALITY');
        return {
          title: `Moderate Air Quality - ${aqius}`,
          message: 'Air Quality around you is acceptable :)',
        };
      case (aqius >= 101 && aqius <= 150):
        console.log('UNHEALTY FOR SENSITIVE GROUPS');
        return {
          title: `Subpar Air Quality - ${aqius}`,
          message: 'Sensitive groups such as people affected by lung diseases or elders might be affected',
        };
      case (aqius >= 151 && aqius <= 200):
        console.log('UNHEALTY');
        return {
          title: `Unhealthy Air Quality - ${aqius}`,
          message: 'Consider avoiding being exposed to the air - everyone can get affected',
        };
      case (aqius >= 201 && aqius <= 300):
        console.log('VERY UNHEALTHY');
        return {
          title: `VERY Unhealthy Air Quality - ${aqius}`,
          message: 'This is a health alert - everyone can experience severe effects',
        };
      case (aqius >= 301):
        console.log('HAZARDOUS AIR QUALITY');
        return {
          title: `HAZARDOUS Air Quality - ${aqius}`,
          message: 'Run, Forest, Run!',
        };
      default:
        console.log('safe bro');
        break;
    }
  },

  //eslint-disable-next-line
  parseUVData(uvData) {
    const uv = uvData.weather[0].uvIndex;
    switch (true) {
      case (uv >= 3 && uv <= 5):
        return {
          title: `Moderate UV index - ${uv}`,
          message: 'Stay indor during midday',
        };
      case (uv >= 6 && uv <= 7):
        return {
          title: `High UV index - ${uv}`,
          message: 'High risk of harm from unprotected sun exposure',
        };
      case (uv >= 8 && uv <= 10):
        return {
          title: `Very High UV index - ${uv}`,
          message: 'Very high risk of harm from unprotected sun exposure',
        };
      case (uv === 11):
        return {
          title: `EXTREME UV index - ${uv}`,
          message: 'Not cool',
        };
      default:
        console.log('safe bro');
        break;
    }
  },
};
