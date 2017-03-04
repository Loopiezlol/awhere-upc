import Reflux from 'reflux';
import actions from './actions';

class AirPolution extends Reflux.Store {
  constructor(props) {
    super(props);
    this.state = {
      airQuality: false,
    };
    this.listenables = actions;
  }
  toggleAirQuality(value) {
    this.setState({
      airQuality: value,
    });
  }
  toggleUvRadiations(value) {
    this.setState({
      uvRadiations: value,
    });
  }
  toggleWeather(value) {
    this.setState({
      weather: value,
    });
  }
  toggleTraffic(value) {
    this.setState({
      trafic: value,
    });
  }
}

export default AirPolution;
