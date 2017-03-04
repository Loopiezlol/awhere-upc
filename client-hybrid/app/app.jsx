import React from 'react';
import ReactDOM from 'react-dom';

function startApp() {
  ReactDOM.render(
    <div className="view">
      <p>Hello, there</p>
    </div>, document.querySelector('.app'),
  );
  const bgLocation = window.backgroundGeolocation;

  const callbackFn = function (location) {
    console.log('[js] BackgroundGeolocation callback:  ', location.latitude, ',', location.longitude);
    bgLocation.finish();
  };

  const failureFn = function (error) {
    console.log('BackgroundGeolocation error', error);
  };

  bgLocation.configure(callbackFn, failureFn, {
    desiredAccuracy: 10,
    stationaryRadius: 20,
    distanceFilter: 30,
    interval: 60000,
  });

  bgLocation.start();
}

if (window.cordova) {
  document.addEventListener('deviceready', startApp, false);
} else {
  startApp();
}
