import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Button from 'react-native-button';
import Emoji from 'react-native-emoji';
import MapView from 'react-native-maps';
import DataManager from '../data/DataManager';
import Spinner from 'react-native-loading-spinner-overlay';

const REFRESH_INTERVAL = 30000; // 30 seconds

const RADIUS = 500;

export default class MapComponent extends Component {

  state = {
    position: null,
    photos: [],
  };

  watchID: ?number = null;
  timeout = null;
  initializedScanner = false;

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const position = JSON.stringify(pos);
        this.setState({position});

        this.position = position;
        this._initializeScanner();
      },
      // TODO (@rageandqq): Better error handling?
      // Will want to clear the spinner.
      (error) => alert(JSON.stringify(error)),
      {timeout: 20000, maximumAge: 1000},
    );
    this.watchID = navigator.geolocation.watchPosition(pos => {
      const position = JSON.stringify(pos);
      this.setState({position});

      this.position = position;
      this._initializeScanner();
    });
  }

  componentWillUnmount() {
    clearInterval(this.timeout);
  }

  _initializeScanner() {
    if (this.initializedScanner) {
      return;
    }
    this.initializedScanner = true;
    this._scan();
    this.timeout = setInterval(() => {
      this._scan();
    }, REFRESH_INTERVAL);
  }

  _scan() {
    if (!this.position) {
      console.warn('Tried to scan nearby area for photos, but position is null');
      return;
    }
    const { coords } = JSON.parse(this.position);
    const { latitude, longitude } = coords;
    DataManager.getNearbyPhotos(latitude, longitude).then((photos) => {
      this.setState({
        photos,
      });
      // console.log('Setting state.photos', photos);
    });
  }

  _handlePress(): void {
    Actions.camera();
  }

  render() {
    const {
      position,
    } = this.state;

    if (position == null) {
      return (
        <View style={styles.container}>
          <Spinner visible={true}/>
        </View>
      );
    }

    const { coords } = JSON.parse(position);
    const { latitude, longitude } = coords;
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
           latitude,
           longitude,
           latitudeDelta: 0.0150,
           longitudeDelta: 0.0150,
          }}>
          <MapView.Circle
            center={{latitude, longitude}}
            radius={RADIUS}
            fillColor="rgba(0, 0, 100, 0.03)"
            strokeColor="rgba(0,0,0,0.3)"
          />
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

const absoluteFill = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    ...absoluteFill,
  },
  cameraButtonText: {
    fontSize: 50,
  },
  map: {
    ...absoluteFill,
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
