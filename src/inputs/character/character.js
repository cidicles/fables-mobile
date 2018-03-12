import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  Button,
  Picker
} from 'react-native';
import { goFetch } from '../../utils';
import { base } from '../../style/core.js';
import { apiBase } from '../../const';

export default class Character extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      fableCharacter: '',
      fableType: 'text',
      message: '',
      ...props
    };
  }
  sendCharacter(){
    const { fableMessage, fableCharacter, fableType } = this.state;
    const { fable, populateMessages } = this.props;
    const feedUrl = `${apiBase}fable/characters/${fable._id}`;
    const { token } = this.props.ident;
    console.log(populateMessages)
    console.log(token)
    goFetch('post', feedUrl, {
      name: fableCharacter
    }, token).then((res) => {
      if(res.error){
        console.log(res.message)
        this.setState({
          status: res.error.message
        });
      } else {
        //success();
        console.log(res)
        populateMessages(res);
        this.setState({
          fableMessage: ''
        });
      }
    });
  }
  render() {
    const { ident, fable } = this.props;
    //console.log(ident, fable)
    return (
      <View>
        <Text>
          Character
        </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(fableCharacter) => this.setState({fableCharacter})}
          value={this.state.fableCharacter}
        />
        <Button
          title="Add Character"
          onPress={() => this.sendCharacter()}
        />
      </View>
    );
  }
}
