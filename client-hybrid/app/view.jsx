import React from 'react';
import Reflux from 'reflux';
import Belle from 'belle';
import AirPolution from './toggleStore';
import actions from './actions';

const Toggle = Belle.Toggle;
const Choice = Belle.Choice;

class View extends Reflux.Component {
  //eslint-disable-next-line
  handleAirQualityToggle(input) {
    console.log(input.value);
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
          <Toggle
            defaultValue={this.state.airQuality}
            onUpdate={value => this.handleAirQualityToggle(value)}
          >
            <Choice value>On</Choice>
            <Choice value={false}>Off</Choice>
          </Toggle>
        </div>
        <div className="uv-radiations">
          <Toggle
            defaultValue={this.state.airQuality}
            onUpdate={value => this.handleUvRadiationsToggle(value)}
          >
            <Choice value>On</Choice>
            <Choice value={false}>Off</Choice>
          </Toggle>
        </div>
        <div className="weather">
          <Toggle
            defaultValue={this.state.airQuality}
            onUpdate={value => this.handleWeatherToggle(value)}
          >
            <Choice value>On</Choice>
            <Choice value={false}>Off</Choice>
          </Toggle>
        </div>
        <div className="trafic">
          <Toggle
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
