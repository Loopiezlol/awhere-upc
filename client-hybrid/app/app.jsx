import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import View from './view';

function startApp() {
  ReactDOM.render(
    <div className="view">
      <View />
    </div>, document.querySelector('.app'),
  );

  const bgLocation = window.backgroundGeolocation;

  const locationCallback = function (location) {
    console.log('[js] BackgroundGeolocation callback:  ', location.latitude, ',', location.longitude);

    request.get('https://awhere.scalingo.io/')
    .end((err, res) => {
      if (err) {
        console.log(err);
        bgLocation.finish();
      } else {
        console.log(res);
        bgLocation.finish();
      }
    });
  };

  const failureCallback = function (error) {
    console.log('BackgroundGeolocation error', error);
  };

  bgLocation.configure(locationCallback, failureCallback, {
    desiredAccuracy: 10,
    stationaryRadius: 20,
    distanceFilter: 30,
    locationProvider: bgLocation.provider.ANDROID_ACTIVITY_PROVIDER,
    notificationTitle: 'Background tracking',
    notificationText: 'swag',
    notificationIconColor: '#FEDD1E',
    notificationIconLarge: 'mappointer_large',
    notificationIconSmall: 'mappointer_small',
  });

  bgLocation.start();
}

if (window.cordova) {
  document.addEventListener('deviceready', startApp, false);
} else {
  startApp();
}
