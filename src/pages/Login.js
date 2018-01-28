import React, { Component } from 'react';
import {
  Platform,
  Text,
  View,
  Button,
  TextInput,
  AsyncStorage
} from 'react-native';
import { base } from '../style/core.js';
import { connect } from 'react-redux';
import { changeUser } from '../redux/actions';
import { apiBase } from '../const';
import { goFetch } from '../utils';

class Login extends Component<{}> {
  static navigationOptions = {
    title: 'Login',
  }
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      username: 'test',
      password: 'test',
      status: ''
    };
  }
  sendAuth(){
    let feedUrl = `${apiBase}user/login`;
    let { username, password } = this.state;
    const { navigate } = this.props.navigation;
    goFetch('post', feedUrl, { username, password }).then((res) => {
      if(res.error){
        this.setState({
          status: res.error.message
        });
      } else {
        this.setState({
          status: `${res.user.username} is now logged in`
        });
        this.props.dispatch(changeUser(res));
        navigate('Home');
      }
    });
  }
  render() {
    const { navigate } = this.props.navigation;
    let { status } = this.state;
    const { ident } = this.props;

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

function mapStateToProps(state) {
  let { ident } = state;
  return {
    ident
  };
}

export default connect(mapStateToProps)(Login);
