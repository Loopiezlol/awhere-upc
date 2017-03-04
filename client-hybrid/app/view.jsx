import React from 'react';
import Reflux from 'reflux';
import Belle from 'belle';
import AirPolution from './toggleStore';
import actions from './actions';
import './styles/mainPage.scss';

const Toggle = Belle.Toggle;
const Choice = Belle.Choice;

class View extends Reflux.Component {
  //eslint-disable-next-line
  handleAirQualityToggle(input) {
    actions.toggleAirQuality(input.value);
  }
  //eslint-disable-next-line
  handleUvRadiationsToggle(input) {
    actions.toggleUvRadiations(input.value);
  }
  //eslint-disable-next-line
  handleWeatherToggle(input) {
    actions.toggleWeather(input.value);
  }
  //eslint-disable-next-line
  handleTrafficToggle(input) {
    actions.toggleTraffic(input.value);
  }
  constructor(props) {
    super(props);
    this.state = {};
    this.store = AirPolution;
  }
  render() {
    return (
      <div className="main-page">
        <div className="settings-bar">
          Settings
        </div>
        <div className="air-polution">
          <p className="air-description"> Turn on the air quality toggle</p>
          <Toggle
            className="air-toggle"
            defaultValue={this.state.airQuality}
            onUpdate={value => this.handleAirQualityToggle(value)}
          >
            <Choice value>On</Choice>
            <Choice value={false}>Off</Choice>
          </Toggle>
        </div>
        <div className="uv-radiations">
          <p className="uv-description"> Turn on the UV rad. toggle</p>
          <Toggle
            className="uv-toggle"
            defaultValue={this.state.airQuality}
            onUpdate={value => this.handleUvRadiationsToggle(value)}
          >
            <Choice value>On</Choice>
            <Choice value={false}>Off</Choice>
          </Toggle>
        </div>
        <div className="weather">
          <p className="weather-description"> Turn on the weather toggle</p>
          <Toggle
            className="weather-toggle"
            defaultValue={this.state.airQuality}
            onUpdate={value => this.handleWeatherToggle(value)}
          >
            <Choice value>On</Choice>
            <Choice value={false}>Off</Choice>
          </Toggle>
        </div>
        <div className="traffic">
          <p className="traffic-description"> Turn on the traffic toggle</p>
          <Toggle
            className="traffic-toggle"
            defaultValue={this.state.airQuality}
            onUpdate={value => this.handleTrafficToggle(value)}
          >
            <Choice value>On</Choice>
            <Choice value={false}>Off</Choice>
          </Toggle>
        </div>
      </div>
    );
  }


}

export default View;
