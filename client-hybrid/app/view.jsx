import React from 'react';
import Reflux from 'reflux';
import Belle from 'belle';
import toggleStore from './toggleStore';
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
    this.store = toggleStore;
  }
  render() {
    return (
      <div className="main-page">
        <div className="item air-polution">
          <div className="top-wrapper">
            <p className="title air-description">Air quality</p>
            <Toggle
              className="toggle air-toggle"
              defaultValue={this.state.airQuality}
              onUpdate={value => this.handleAirQualityToggle(value)}
            >
              <Choice value>On</Choice>
              <Choice value={false}>Off</Choice>
            </Toggle>
          </div>
          <p className="explanation">
            Get notified about pollution levels and air quality around you.
            Recommended for people suffering from lung diseases, elders and children.
          </p>
        </div>
        <div className="item uv-radiations">
          <div className="top-wrapper">
            <p className="title uv-description">Ultra Violet Radiation</p>
            <Toggle
              className="toggle uv-toggle"
              defaultValue={this.state.uvRadiations}
              onUpdate={value => this.handleUvRadiationsToggle(value)}
            >
              <Choice value>On</Choice>
              <Choice value={false}>Off</Choice>
            </Toggle>
          </div>
          <p className="explanation">
            Got sensitive skin? This might help you not get red as any rose in July.
          </p>
        </div>
        <div className="item weather">
          <div className="top-wrapper">
            <p className="title weather-description">Unpleasent forecast</p>
            <Toggle
              className="toggle weather-toggle"
              defaultValue={this.state.weather}
              onUpdate={value => this.handleWeatherToggle(value)}
            >
              <Choice value>On</Choice>
              <Choice value={false}>Off</Choice>
            </Toggle>
          </div>
          <p className="explanation">
            Especially useful for Londoners.
            Coming soon - promise!
          </p>
        </div>
        <div className="item traffic">
          <div className="top-wrapper">
            <p className="title traffic-description">Avoid traffic jams</p>
            <Toggle
              className="toggle traffic-toggle"
              defaultValue={this.state.traffic}
              onUpdate={value => this.handleTrafficToggle(value)}
            >
              <Choice value>On</Choice>
              <Choice value={false}>Off</Choice>
            </Toggle>
          </div>
          <p className="explanation">
            # TODO: deprecate when Elon Musk solves this one
          </p>
        </div>
      </div>
    );
  }


}

export default View;
