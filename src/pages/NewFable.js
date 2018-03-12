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
import { apiBase } from '../const';
import { goFetch } from '../utils';
import { NavigationActions } from 'react-navigation'

class NewFable extends Component<{}> {
  static navigationOptions = {
    title: 'New Fable',
  }
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      fableName: 'test'
    };
  }
  newFable(){
    let feedUrl = `${apiBase}fable`;
    let { fableName } = this.state;
    let {token} = this.props.ident;
    const { navigate } = this.props.navigation;
    goFetch('post', feedUrl, { name: fableName }, token).then((res) => {
      if(res.error){
        console.error(res);
        this.setState({
          status: res.error.message
        });
      } else {
        navigate('Fable', {
          id: res._id,
          name: res.name
        });
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
          Fable Name
        </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(fableName) => this.setState({fableName})}
          value={this.state.fableName}
        />


        <Button
          title="Submit"
          onPress={() => this.newFable()}
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

export default connect(mapStateToProps)(NewFable);
