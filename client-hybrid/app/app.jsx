import React from 'react';
import ReactDOM from 'react-dom';

function startApp() {
  ReactDOM.render(
    <div className="view">
      <p>Hello, helow</p>
    </div>, document.querySelector('.app'),
  );
}

if (window.cordova) {
  document.addEventListener('deviceready', startApp, false);
} else {
  startApp();
}
