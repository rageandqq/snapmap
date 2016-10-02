import React, { Component } from 'react';

import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Button from 'react-native-button';
import Camera from 'react-native-camera';
import Emoji from 'react-native-emoji';

import EditComponent from './EditComponent';

export default class CameraComponent extends Component {

  state = {
    image: null,
  };

  constructor(props) {
    super(props);
  }

  _takePicture = () => {
    const setState = this.setState.bind(this);
    this.camera.capture()
      .then((data) => {
        this.setState({image: data.path});
      })
      .catch(err => {
        Alert.alert(
          'An error occurred.',
          err,
          [
            {
              text: 'OK',
              onPress: () => { this.setState({image: null}); }
            },
          ],
        );
        console.error(err);
      });
  }

  render() {
    if (this.state.image != null) {
      return (
        <EditComponent
          baseImage={this.state.image}
          onReject={() => { this.setState({image: null}); }}
        />
      );
    }
    return (
      <View style={styles.container}>
        <Camera
          ref={ camera => {
            this.camera = camera;
          }}
          style={styles.camera}
          aspect={Camera.constants.Aspect.fill}
          captureTarget={Camera.constants.CaptureTarget.temp}>
          <Button
            containerStyle={styles.buttonInfoContainer}
            style={styles.button}
            onPress={this._takePicture}>
            <Text style={styles.cameraButtonText}>
              <Emoji name="camera_with_flash"/>
            </Text>
          </Button>
        </Camera>
      </View>
    );
  }
}

const buttonStyles = {
  padding: 10,
  margin: 20,
  overflow: 'hidden',
  borderRadius: 10,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  button: {
    color: 'white',
    fontSize: 20,
    flex: 1,
  },
  cameraButtonText: {
    fontSize: 50,
  },
  buttonInfoContainer: {
    backgroundColor: 'deepskyblue',
    ...buttonStyles,
  },
});
