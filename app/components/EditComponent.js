import React, { Component } from 'react';

import {
  Dimensions,
  Image,
  StyleSheet,
  View,
} from 'react-native';

import Button from 'react-native-button';

export default class EditComponent extends Component {

  state = {
    encodedSignature: null,
  };

  constructor(props) {
      super(props);
      this.sketch = null;
  }

  _onAccept = () => {
  }

  render() {
    return (
      <View
        style={styles.container}>
        <Image
          style={styles.baseImage}
          source={{uri: this.props.baseImage}}/>
        <View
          style={styles.groupContainer}>
          <Button
            containerStyle={styles.buttonAcceptContainer}
            style={styles.button}
            onPress={this._onAccept}>
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
  button: {
    color: 'white',
    fontSize: 20,
    flex: 1,
  },
  groupContainer: {
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
