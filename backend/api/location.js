const router = require('express').Router();
const wrap = require('co-express');
const request = require('superagent');
const keys = require('../keys');

function* getAirQualityData(latitude, longitude) {
  console.log('calling with',
    `https://api.breezometer.com/baqi/?lat=${latitude.toFixed(7)}&lon=${longitude.toFixed(7)}&key=${keys.airQuality}`);
  const response = yield request.get(`http://api.airvisual.com/v1/nearest?lat=${latitude.toPrecision(7)}&lon=${longitude.toPrecision(7)}&key=${keys.airQuality}`);
  if (response.body.data) {
    return response.body.data;
  }
  return {
    err: 'Something went wrong :(',
  };
}

function* handleLocation(req, res) {
  console.log(req.body);
  const toNotify = {};
  const { location, scenarios } = req.body;
  if (scenarios.indexOf('airQuality') !== -1) {
    toNotify.airQuality = yield getAirQualityData(location.latitude, location.longitude);
  }
  console.log('toNotify', toNotify);
  console.log('airQuality', toNotify.airQuality);
  res.json({
    status: 200,
    ok: true,
  });
}

router.put('/', wrap(handleLocation));

module.exports = router;
