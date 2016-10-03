import React, { Component } from 'react';

import {
  Dimensions,
  Image,
  Picker,
  StyleSheet,
  View,
} from 'react-native';

import Button from 'react-native-button';
import DataManager from '../data/DataManager';
import ModalPicker from 'react-native-modal-picker'

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
  };

  _onAccept = () => {
    // TODO (rageandqq): something useful
    DataManager.postNewPhoto(this.props.baseImage, 37.785834, -122.406417);
    // console.log(DataManager.getNearbyPhotos(80, 80));
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
