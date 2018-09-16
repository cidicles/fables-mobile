import React, { Component } from 'react';
import {
  Platform,
  Text,
  View,
  Button
} from 'react-native';
import { connect } from 'react-redux';
import { base } from '../style/core.js';
import { apiBase } from '../const';
import { goFetch } from '../utils';
import { changeUser } from '../redux/actions';

class Home extends Component<{}> {
  static navigationOptions = {
    title: 'Home',
    header: null
  }
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      status: ''
    };
  }
  logOut(){
    let feedUrl = `${apiBase}user/logout`;
    let {token} = this.props.ident.user;
    goFetch('post', feedUrl, {}, token).then((res) => {
      if(res.error){
        this.setState({
          status: res.message
        });
      } else {
        this.props.dispatch(changeUser({
          username: '',
          token: ''
        }));
      }
    });
  }
  render() {
    const { navigate } = this.props.navigation;
    const { ident } = this.props;
    let { status } = this.state;
    return (
      <View style={base.view}>
        { status != '' && <Text>{ status }</Text> }
        <Button
          title="Fables"
          onPress={() => navigate('Fables')}
        />
        {
          !ident.token &&
          <View>
            <Button
              title="Register"
              onPress={() => navigate('Register')}
            />
            <Button
              title="Login"
              onPress={() => navigate('Login')}
            />
          </View>
        }

        {
          ident.token !== '' &&
          <View>
            <Button
              title="New Fable"
              onPress={() => navigate('NewFable')}
            />
            <Button
              title="Logout"
              onPress={() => this.logOut()}
            />
          </View>
        }
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

export default connect(mapStateToProps)(Home);
