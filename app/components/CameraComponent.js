import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import Camera from 'react-native-camera';
import Button from 'react-native-button';

export default class CameraComponent extends Component {

  state = {
    image: null,
  };

  _takePicture() {
    this.camera.capture()
      .then((data) => {
        console.log(data.path);
        console.log(typeof(data.path));
        this.setState({image: data.path});
      }) // TODO(@rageandqq): Process image
      .catch(err => console.error(err));
  }

  render() {
    const { image } = this.state;
    if (image != null) {
      return (
        <View
          style={styles.container}>
          <Image
            style={styles.camera}
            source={{uri: image}}/>
            <View
              style={styles.buttonGroupContainer}>
              <Button
                containerStyle={styles.buttonAcceptContainer}
                style={styles.button}>
                Accept
              </Button>
              <Button
                containerStyle={styles.buttonRejectContainer}
                onPress = {()=>{ this.setState({image: null})}}
                style={styles.button}>
                Retake
              </Button>
            </View>
        </View>
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
            onPress={this._takePicture.bind(this)}>
            Capture
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
  buttonInfoContainer: {
    backgroundColor: 'deepskyblue',
    ...buttonStyles,
  },
  buttonGroupContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    right: 30,
    marginBottom: 50,
    marginRight: 50,
    ...buttonStyles,
  },
  buttonAcceptContainer: {
    flex: 1,
    backgroundColor: 'limegreen',
    ...buttonStyles,
  },
  buttonRejectContainer: {
    flex: 1,
    backgroundColor: 'red',
    ...buttonStyles,
  }
});
