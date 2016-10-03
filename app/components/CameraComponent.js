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
    useRearCamera: true,
  };

  _takePicture = () => {
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

  _flipCamera = () => {
    this.setState({
      useRearCamera: !this.state.useRearCamera,
    });
  }

  render() {
    if (this.state.image != null) {
      return (
        <EditComponent
          baseImage={this.state.image}
          onReject={() => { this.setState({image: null}); }}
          userPosition={this.props.userPosition}
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
          type={this.state.useRearCamera ? Camera.constants.Type.back : Camera.constants.Type.front}
          captureTarget={Camera.constants.CaptureTarget.temp}>
          <View
            style={styles.groupContainer}>
            <Button
              containerStyle={styles.buttonContainer}
              style={styles.button}
              onPress={this._flipCamera}>
              <Text style={styles.cameraButtonText}>
                <Emoji name="arrows_counterclockwise"/>
              </Text>
            </Button>
            <Button
              containerStyle={styles.buttonContainer}
              style={styles.button}
              onPress={this._takePicture}>
              <Text style={styles.cameraButtonText}>
                <Emoji name="camera_with_flash"/>
              </Text>
            </Button>
          </View>
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
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  button: {
    color: 'white',
    fontSize: 20,
    flex: 1,
  },
  cameraButtonText: {
    fontSize: 40,
  },
  buttonContainer: {
    backgroundColor: 'deepskyblue',
    ...buttonStyles,
  },
  groupContainer: {
    flexDirection: 'row', // float in center
    justifyContent: 'center',
    position: 'absolute', // position this bar at the bottom of the screen
    right: 0,
    left: 0,
    bottom: 20,
    ...buttonStyles,
  },
});
