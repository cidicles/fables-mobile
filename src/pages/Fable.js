import React, { Component } from 'react';
import {
  Platform,
  Text,
  View,
  ScrollView,
  Button
} from 'react-native';
import { goFetch } from '../utils';
import { base } from '../style/core.js';
import { apiBase } from '../const';
import Message from '../inputs/message/message';

export default class Fable extends Component<{}> {
  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.name,
    id: navigation.state.params.id
  });
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      fable: {}
    };
    this.populatePost = this.populatePost.bind(this);
  }
  componentWillMount() {
    console.log(this.props.navigation.state.params)
    this.populatePost();
  }
  populatePost(){
    let feedUrl = `${apiBase}fable/${this.props.navigation.state.params.id}`;
    goFetch('get', feedUrl).then((res) => {
      if(res.error){
        console.error(res.message);
      } else {
        this.setState({
          fable: res
        });
      }
    });
  }
  render() {
    const { navigate } = this.props.navigation;
    let { fable } = this.state;
    return (
      <ScrollView style={base.view}>
        <Message />
        {fable.messages && <View style={base.scrollView}>
          {fable.messages.map((message, index) => (
            <View style={base.message} key={`message-${index}`}>
              <Text>
                {message.body}
                {message.messageType[0]}
                {message.date}
              </Text>
            </View>
          ))}
        </View>}
      </ScrollView>
    );
  }
}
