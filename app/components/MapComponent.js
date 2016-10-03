import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
} from 'react-native';

import Button from 'react-native-button';
import Emoji from 'react-native-emoji';
import MapView from 'react-native-maps';
import { Actions } from 'react-native-router-flux';
import DataManager from '../data/DataManager';

const REFRESH_INTERVAL = 1000; // TODO: Increase to 30 or 60 seconds

export default class MapComponent extends Component {

  state = {
    position: null,
    photos: {},
  };

  watchID: ?number = null;
  timeout = null;

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const position = JSON.stringify(pos);
        this.setState({position});
      },
      (error) => alert(JSON.stringify(error)), // TODO (@rageandqq): Better error handling?
      {timeout: 20000, maximumAge: 1000},
    );
    this.watchID = navigator.geolocation.watchPosition(pos => {
      const position = JSON.stringify(pos);
      this.setState({position});
    });
    this._initializeScanner();
  }

  componentWillUnmount() {
    clearInterval(this.timeout);
  }

  _initializeScanner() {
    this.timeout = setInterval(() => {
      const { coords } = JSON.parse(this.state.position);
      const { latitude, longitude } = coords;
      DataManager.getNearbyPhotos(latitude, longitude).then((photos) => {
        this.setState({
          photos,
        });
        // console.log('Setting state.photos', photos);
      });
    }, REFRESH_INTERVAL);
  }

  _handlePress(): void {
    Actions.camera();
  }

  render() {
    const {
      position,
    } = this.state;
    let latitude = 37.78825; // default is SF because that's what
    let longitude = -122.4324;
    if (position != null) {
      const { coords } = JSON.parse(position);
      latitude = coords.latitude;
      longitude = coords.longitude;
    }
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
           latitude,
           longitude,
           latitudeDelta: 0.0922,
           longitudeDelta: 0.0421,
          }}>
         <MapView.Marker
            coordinate={{latitude, longitude}}
            title={'My Location'}
            description={'Where I currently am.'}
          />
        </MapView>
        <Button
          containerStyle={styles.buttonContainer}
          style={styles.button}
          onPress={this._handlePress.bind(this)}>
          <Text style={styles.cameraButtonText}>
            <Emoji name="camera"/>
          </Text>
        </Button>
     </View>
   );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cameraButtonText: {
    fontSize: 50,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  button: {
    color: 'white',
    fontSize: 20,
    flex: 1,
  },
  buttonContainer: {
    backgroundColor: 'deepskyblue',
    padding: 10,
    margin: 20,
    overflow: 'hidden',
    borderRadius: 10,
  },
});
