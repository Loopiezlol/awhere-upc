import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';


function sendNotif(notif) {
  notif.schedule({
    id: 4,
    title: 'heyo there',
    text: 'ala bala',
  });
  console.log('called');
}

function startApp() {
  const notif = cordova.plugins.notification.local;
  const bgLocation = window.backgroundGeolocation;

  ReactDOM.render(
    <div className="view">
      <p>Hello, there</p>
      <button onClick={() => sendNotif(notif)}>Click</button>
    </div>, document.querySelector('.app'),
  );

  notif.on('click', () => {
    console.log('meeeeen');
    notif.cancel(4, () => {
      console.log('canceled');
    });
  });

  const locationCallback = function (location) {
    console.log('[js] BackgroundGeolocation callback:  ', location.latitude, ',', location.longitude);

    request.put('https://awhere.scalingo.io/location')
    .send(location)
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
