import Reflux from 'reflux';
import store from 'store2';
import actions from './actions';
import notifs from '../../common/notificationsIds';

/* eslint-disable no-param-reassign */

function updateLocalStorage(toAdd) {
  const scenario = Object.keys(toAdd)[0];
  store(scenario.toString(), toAdd[scenario]);
}

function getFromLocalStorage() {
  return Object.keys(notifs).reduce((acc, cur) => {
    acc[cur] = !(!store.has(cur) || store(cur) === false);
    return acc;
  }, {});
}

class ToggleStore extends Reflux.Store {
  constructor(props) {
    super(props);
    this.state = getFromLocalStorage();
    this.listenables = actions;
  }
  toggleAirQuality(value) {
    this.setState({
      airQuality: value,
    });
    updateLocalStorage({ airQuality: value });
  }
  toggleUvRadiations(value) {
    this.setState({
      uvRadiations: value,
    }, updateLocalStorage({ uvRadiations: value }));
  }
  toggleWeather(value) {
    this.setState({
      weather: value,
    }, updateLocalStorage({ weather: value }));
  }
  toggleTraffic(value) {
    this.setState({
      traffic: value,
    }, updateLocalStorage({ traffic: value }));
  }
}


export default ToggleStore;
