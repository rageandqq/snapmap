import React, { Component } from 'react';

import {
  Dimensions,
  Image,
  StyleSheet,
  View,
} from 'react-native';

import Button from 'react-native-button';
import Sketch from 'react-native-sketch';

export default class SketchComponent extends Component {

  state = {
    encodedSignature: null,
  };

  constructor(props) {
      super(props);
      this.sketch = null;
  }

  _onReset = () => {
    console.log("Drawing cleared!");
  }

  _onUpdate = base64Image => {
    this.setState({ encodedSignature: base64Image });
  }

  _onSave = () => {
    this.sketch.saveImage(this.state.encodedSignature)
      .then((data) => alert(data.toString()))
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <View
        style={styles.container}>
        <Image
          style={styles.baseImage}
          source={{uri: this.props.baseImage}}/>
        <Sketch
          fillColor="#f5f5f5"
          strokeColor="#111111"
          strokeThickness={2}
          onReset={this._onReset}
          onUpdate={this._onUpdate}
          ref={sketch => { this.sketch = sketch; }}
          style={styles.sketch}/>
        <View
          style={styles.buttonGroupContainer}>
          <Button
            containerStyle={styles.buttonAcceptContainer}
            style={styles.button}
            onPress={this._onSave}>
            Accept
          </Button>
          <Button
            containerStyle={styles.buttonRejectContainer}
            onPress={this.props.onReject}
            style={styles.button}>
            Retake
          </Button>
        </View>
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
  baseImage: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  sketch: {
    height: 200,
  },
  button: {
    color: 'white',
    fontSize: 20,
    flex: 1,
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
  },
});
