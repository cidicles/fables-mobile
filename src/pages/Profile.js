/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  Text,
  View,
  Button
} from 'react-native';
import { base } from '../style/core.js';

export default class Profile extends Component<{}> {
  static navigationOptions = {
    title: 'Profile',
  }
  render() {
    return (
      <View>
        <Text style={base.red}>
          Welcome to Profile
        </Text>
      </View>
    );
  }
}
