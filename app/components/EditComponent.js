import React, { Component } from 'react';

import {
  Dimensions,
  Image,
  Picker,
  StyleSheet,
  View,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Button from 'react-native-button';
import DataManager from '../data/DataManager';
import ModalPicker from 'react-native-modal-picker'
import Spinner from 'react-native-loading-spinner-overlay';

const IMAGE_EXPIRATION_LIMIT = 24; // hour

const data = [{
  key: 0,
  section: true,
  label: 'Select Photo Expiration',
}];
for (let i = 1; i <= IMAGE_EXPIRATION_LIMIT; i++) {
  data.push({
    key: i,
    label: `${i}h`, // Number of seconds
  });
}

export default class EditComponent extends Component {

  // Initial State
  state = {
    expiryTime: 12,
    busy: false,
  };

  _switchToMap() {
    Actions.pop();
  }

  _onAccept = () => {
    this.setState({busy: true});
    DataManager.postNewPhoto(
      this.props.baseImage,
      this.props.userPosition.coords.latitude + (Math.random() - 0.5) * 0.001,
      this.props.userPosition.coords.longitude + (Math.random() - 0.5) * 0.001,
      this.state.expiryTime,
    ).then(() => {
      this.setState({busy: false});
      this._switchToMap();
    })
    .catch(error => {
      this.setState({busy: false});
      alert(JSON.stringify(error));
      this._switchToMap();
    });
  }

  render() {
    return (
      <View
        style={styles.container}>
        <Image
          style={styles.baseImage}
          source={{uri: this.props.baseImage}}/>
        <View style={styles.container}>
          <Spinner visible={this.state.busy}/>
        </View>
        <View
          style={styles.groupContainer}>
          <ModalPicker
            style={styles.mdalPickerContainer}
            selectStyle={styles.modalPicker}
            selectTextStyle={styles.button}
            data={data}
            initValue={`${this.state.expiryTime}h`}
            onChange={option => { this.setState({expiryTime: option.key}); }}/>
          <Button
            containerStyle={styles.buttonAcceptContainer}
            style={styles.button}
            onPress={this._onAccept}>
            Accept
          </Button>
          <Button
            containerStyle={styles.buttonRejectContainer}
            style={styles.button}
            onPress={this.props.onReject}>
            Reject
          </Button>
        </View>
      </View>
    );
  }
}

const buttonStyles = {
  margin: 10,
  overflow: 'hidden',
  borderRadius: 10,
  borderColor: 'white',
};

const buttonContainerStyles = {
  flexDirection: 'column',
  justifyContent: 'center',
  ...buttonStyles,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spinnerContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  baseImage: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  button: {
    color: 'white',
    fontSize: 15,
  },
  groupContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    right: 15,
    left: 15,
    ...buttonStyles,
  },
  buttonAcceptContainer: {
    flex: 2,
    backgroundColor: 'limegreen',
    ...buttonContainerStyles,
  },
  buttonRejectContainer: {
    flex: 2,
    backgroundColor: 'red',
    ...buttonContainerStyles,
  },
  mdalPickerContainer: {
    flex: 1,
    backgroundColor: 'deepskyblue',
    ...buttonStyles,
  },
});
