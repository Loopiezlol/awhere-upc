const router = require('express').Router();
const wrap = require('co-express');
const request = require('superagent');
const keys = require('../keys');

function getAirQualityData(latitude, longitude) {
  console.log('calling with',
    `https://api.breezometer.com/baqi/?lat={${latitude}}&lon={${longitude}}&key=${keys.airQuality}`);
  request.get(`https://api.breezometer.com/baqi/?lat={${latitude}}&lon={${longitude}}&key=${keys.airQuality}`)
  .end((err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log('got', res);
    }
  });
}

function* handleLocation(req, res) {
  console.log(req.body);
  const toNotify = {};
  const { location, scenarios } = req.body;
  if (scenarios.indexOf('airQuality') !== -1) {
    toNotify.airQuality = yield getAirQualityData(location.latitude, location.longitude);
  }
  res.json({
    ok: true,
  });
}

router.put('/', wrap(handleLocation));

module.exports = router;
