import React, { Component } from 'react';
import {
  Platform,
  Text,
  View,
  Button
} from 'react-native';
import { connect } from 'react-redux';
import { base } from '../style/core.js';

class Home extends Component<{}> {
  static navigationOptions = {
    title: 'Home',
  }
  render() {
    const { navigate } = this.props.navigation;
    const { ident } = this.props;
    return (
      <View style={base.view}>
        <Text style={base.red}>
          Welcome to Fables {ident.user.username}
        </Text>
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
        <Button
          title="New Fable"
          onPress={() => navigate('NewFable')}
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

export default connect(mapStateToProps)(Home);
