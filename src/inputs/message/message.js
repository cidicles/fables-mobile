import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View
} from 'react-native';
import { goFetch } from '../../utils';
import { base } from '../../style/core.js';
import { apiBase } from '../../const';

export default class Message extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      message: ''
    };
  }
  render() {
    return (
      <View>
        <Text>
          Message
        </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(message) => this.setState({message})}
          value={this.state.message}
        />
      </View>
    );
  }
}
