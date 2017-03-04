const router = require('express').Router();
const wrap = require('co-express');
const request = require('superagent');
const keys = require('../keys');
const { parseLocationData } = require('../helpers');

function* getAirQualityData(latitude, longitude) {
  const response = yield request.get(`http://api.airvisual.com/v1/nearest?lat=${latitude.toPrecision(7)}&lon=${longitude.toPrecision(7)}&key=${keys.airQuality}`);
  if (response.body.status === 'success') {
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
    console.log('all data: ', airQualityData);
    if (!('err' in airQualityData)) {
      const parsedData = parseLocationData(airQualityData);
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
