import React, { Component } from 'react';
import {
  Platform,
  Text,
  View,
  Button,
  TextInput
} from 'react-native';
import { base } from '../style/core.js';
import { apiBase } from '../const';
import { goFetch } from '../utils';

export default class Register extends Component<{}> {
  static navigationOptions = {
    title: 'Register',
  }
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      username: '',
      password: '',
      status: ''
    };
  }
  sendAuth(){
    let feedUrl = `${apiBase}user`;
    let { username, password } = this.state;
    const { navigate } = this.props.navigation;
    goFetch('post', feedUrl, { username, password }).then((res) => {
      if(res.error){
        this.setState({
          status: res.error.message
        });
      } else {
        this.setState({
          status: res.message
        });
        navigate('Home');
      }
    });
  }
  render() {
    const { navigate } = this.props.navigation;
    let { status } = this.state;
    return (
      <View style={base.view}>

        { status != '' && <Text>{ status }</Text> }

        <Text style={base.red}>
          Username
        </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(username) => this.setState({username})}
          value={this.state.username}
        />

        <Text style={base.red}>
          Password
        </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
        />

        <Button
          title="Submit"
          onPress={() => this.sendAuth()}
        />

      </View>
    );
  }
}
