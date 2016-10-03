import React, { Component } from 'react';

import {
  Dimensions,
  Image,
  StyleSheet,
  View,
  Text,
} from 'react-native';

import Button from 'react-native-button';

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
    height: Dimensions.get('window').height / 2,
    width: Dimensions.get('window').width / 2,
  },
});
