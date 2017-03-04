const router = require('express').Router();
const wrap = require('co-express');
const request = require('superagent');
const keys = require('../keys');
const { parseAirQualityData, parseUVData } = require('../helpers');

function* getAirQualityData(latitude, longitude) {
  const response = yield request.get(`http://api.airvisual.com/v1/nearest?lat=${latitude.toFixed(7)}&lon=${longitude.toFixed(7)}&key=${keys.airQuality}`);
  if (response.body.status === 'success') {
    return response.body.data;
  }
  return {
    err: 'Something went wrong :(',
  };
}

function* getUVData(latitude, longitude) {
  const response = yield request.get(`http://api.worldweatheronline.com/premium/v1/weather.ashx?key=${keys.worldWeather}&q=${latitude.toFixed(7)},${longitude.toFixed(7)}&format=json`);
  console.log(response.body.status);
  if (response.body.status === 200) {
    console.log('you must be kidding me');
    return response.body.data;
  }
  return {
    err: 'Something went wrong :(',
  };
}

function* handleLocation(req, res) {
  const toNotify = {};
  const { location, scenarios } = req.body;
  if (scenarios.indexOf('airQuality') !== -1) {
    const airQualityData = yield getAirQualityData(location.latitude, location.longitude);
    if (!('err' in airQualityData)) {
      const parsedData = parseAirQualityData(airQualityData);
      if (parsedData) {
        toNotify.airQuality = parsedData;
      }
    }
  }
  if (scenarios.indexOf('uvRadiation') !== -1) {
    const weatherData = yield getUVData(location.latitude, location.longitude);
    // console.log(weatherData);
    if (!('err' in weatherData)) {
      const parsedData = parseUVData(weatherData);
      if (parsedData) {
        toNotify.airQuality = parsedData;
      }
    }
  }
  if (Object.keys(toNotify).length !== 0) {
    res.json({
      status: 200,
      toNotify,
    });
  } else {
    res.json({
      status: 200,
      message: 'Nothing to return',
    });
  }
}

router.put('/', wrap(handleLocation));

module.exports = router;
