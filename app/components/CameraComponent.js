import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';
import Camera from 'react-native-camera';
import Button from 'react-native-button';

export default class CameraComponent extends Component {

  _takePicture() {
    this.camera.capture()
      .then((data) => console.log(data)) // TODO(@rageandqq): Process image
      .catch(err => console.error(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={ camera => {
            this.camera = camera;
          }}
          style={styles.camera}
          aspect={Camera.constants.Aspect.fill}>
          <Button
            containerStyle={styles.buttonContainer}
            style={styles.button}
            onPress={this._takePicture.bind(this)}>
            Capture
          </Button>
        </Camera>
      </View>
    );
  }
}

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
  capture: {
   flex: 0,
   backgroundColor: '#fff',
   borderRadius: 5,
   color: '#000',
   padding: 10,
   margin: 40,
  },
  button: {
    color: 'white',
    fontSize: 20,
    flex: 1,
  },
  buttonContainer: {
    padding: 10,
    margin: 20,
    height: 45,
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: 'deepskyblue',
  },
});
