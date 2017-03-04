const router = require('express').Router();
const wrap = require('co-express');
const request = require('superagent');
const keys = require('../keys');

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
  // console.log(req.body);
  const toNotify = {};
  const { location, scenarios } = req.body;
  if (scenarios.indexOf('airQuality') !== -1) {
    const airQualityData = yield getAirQualityData(location.latitude, location.longitude);
    console.log('all data: ', airQualityData);
    if (!('err' in airQualityData)) {
      const aqius = airQualityData.current.pollution.aqius;
      switch (true) {
        case (aqius >= 51 && aqius <= 100):
          console.log('MODERATE AIR QUALITY');
          // TODO: add to toNotify
          break;
        case (aqius >= 101 && aqius <= 150):
          console.log('UNHEALTY FOR SENSITIVE GROUPS');
          break;
        case (aqius >= 151 && aqius <= 200):
          console.log('UNHEALTY');
          break;
        case (aqius >= 201 && aqius <= 300):
          console.log('VERY UNHEALTHY');
          break;
        case (aqius >= 301):
          console.log('dude...');
          break;
        default:
          console.log('safe bro');
          break;
      }
    }
  }
  res.json({
    status: 200,
    ok: true,
  });
}

router.put('/', wrap(handleLocation));

module.exports = router;
