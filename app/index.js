import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import { Router, Scene } from 'react-native-router-flux';

import MapComponent from './components/MapComponent';

export default class Snapmap extends Component {

  render () {
    return (
      <Router>
        <Scene key="root">
          <Scene key="map" component={MapComponent} title="Map" initial={true} />
        </Scene>
      </Router>
    );
  }

}

AppRegistry.registerComponent('Snapmap', () => Snapmap);
