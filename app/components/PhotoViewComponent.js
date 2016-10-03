import React, { Component } from 'react';

import {
  Dimensions,
  Image,
  StyleSheet,
  View,
  Text,
} from 'react-native';

import Button from 'react-native-button';
import moment from 'moment';

export default class PhotoViewComponent extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={styles.container}>
        <Image
          style={styles.baseImage}
          source={{uri: this.props.baseURI}}/>
        <View style={styles.textContainer}>
          <Text
            style={styles.expiryStyle}>
            Expires {moment().to(this.props.title)}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  baseImage: {
    height: Dimensions.get('window').height / 2,
    width: Dimensions.get('window').width / 2,
  },
  textContainer: {
    width: Dimensions.get('window').width / 2,
    backgroundColor: 'black',
    position: 'absolute', // position this bar at the bottom of the screen
    top: 0,
    right: 0,
    left:0,
    opacity: 0.5,
  },
  expiryStyle: {
    fontSize: 16.5,
    color:'white',
    textAlign: 'center',
  }
});
