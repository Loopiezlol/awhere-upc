import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import notificationsIds from '../../common/notificationsIds';
import View from './view';

import './styles/mainPage.scss';

function startApp() {
  const notif = cordova.plugins.notification.local;
  const bgLocation = window.backgroundGeolocation;

  ReactDOM.render(
    <div className="view">
      <View />
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
    .send({
      location,
      scenarios: [
        'uvRadiation',
      ],
    })
    .end((err, res) => {
      if (err) {
        console.log(err);
        // TODO: show error
        bgLocation.finish();
      } else {
        console.log(res);
        const { toNotify } = res.body;
        if (toNotify) {
          notif.schedule(
            Object.keys(toNotify).map(scenario => ({
              id: notificationsIds[scenario],
              title: toNotify[scenario].title,
              style: 'bigtextview',
              text: toNotify[scenario].message,
              vibration: true,
              headsup: true,
            }),
            ),
          );
        }
        bgLocation.finish();
      }
    });
  };

  const failureCallback = function (error) {
    console.log('BackgroundGeolocation error', error);
  };

  bgLocation.configure(locationCallback, failureCallback, {
    desiredAccuracy: 10,
    stationaryRadius: 1,
    // distanceFilter: 30,
    stopOnTerminate: false,
    startOnBoot: true,
    interval: 1000,
    // locationProvider: bgLocation.provider.ANDROID_ACTIVITY_PROVIDER,
  });

  bgLocation.start();
}

if (window.cordova) {
  document.addEventListener('deviceready', startApp, false);
} else {
  startApp();
}
