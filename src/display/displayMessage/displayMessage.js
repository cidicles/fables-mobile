import React, { Component } from 'react';
import {
  Animated,
  Text,
  View
} from 'react-native';
import { goFetch } from '../../utils';
import { base } from '../../style/core.js';
import { apiBase } from '../../const';

export default class DisplayMessage extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      fadeAnim: new Animated.Value(0)
    };
  }
  componentDidMount(){
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 1000
      }
    ).start();
  }
  getMessage(){
    let output = [];
    let content = [];
    let {message} = this.props;
    let name = <Text>{message.character}</Text>;
    switch (message.messageType[0]){
      case 'video':
        content.push(
          <View style={base.message} key={`message`}>
            <Text>
              {message.body}
              {message.messageType[0]}
              {message.date}
            </Text>
          </View>
        );
        break;
      case 'image':
        content.push(
          <View style={base.message} key={`message`}>
            <Image
              source={message.body}
            />
          </View>
        );
        break;
      case 'narration':
        content.push(
          <View style={base.message} key={`message`}>
            <Text>
              {message.body}
              {message.messageType[0]}
              {message.date}
            </Text>
          </View>
        );
        break;
      default:
        content.push(
          <View style={base.message} key={`message`}>
            <Text>
              {message.body}
              {message.messageType[0]}
              {message.date}
            </Text>
          </View>
        );
    }
    output.push(
      <View key={`message`}>
        {content}
        {name}
      </View>
    );
    return output;
  }
  render() {
    const { ident, fable } = this.props;
    let { fadeAnim } = this.state;
    return (
      <Animated.View
        style={{
          ...this.props.style,
          opacity: fadeAnim
        }}
      >
        {this.getMessage()}
      </Animated.View>
    );
  }
}
