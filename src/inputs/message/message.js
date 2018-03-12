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

export default class Message extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      fableCharacter: 'Self',
      fableType: 'text',
      message: '',
      ...props
    };
  }
  sendMessage(){
    const { fableMessage, fableCharacter, fableType } = this.state;
    const { fable, populateMessages } = this.props;
    const feedUrl = `${apiBase}fable/messages/${fable._id}`;
    const { token } = this.props.ident;
    console.log(token)
    goFetch('post', feedUrl, {
      messages: fableMessage,
      character: fableCharacter,
      type: fableType
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
    console.log(fable.characters)
    return (
      <View>
        <Text>
          Message
        </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(fableMessage) => this.setState({fableMessage})}
          value={this.state.fableMessage}
        />

        <Picker selectedValue={this.state.fableCharacter} onValueChange={(v, i) => {
          this.setState({ fableCharacter: v })
        }}>
          <Picker.Item label="Self" value="Self" />
          {fable.characters.map((character, index) => (
            <Picker.Item key={`message-character-${index}`} label={character.name} value={character.name} />
          ))}
        </Picker>

        <Picker selectedValue={this.state.fableType} onValueChange={(v, i) => {
          this.setState({ fableType: v })
        }}>
          <Picker.Item value="text" label="Text" />
          <Picker.Item value="image" label="Image (direct link only atm)" />
          <Picker.Item value="video" label="Video (youtube only atm)" />
          <Picker.Item value="narration" label="Narration (characterless post to help set the scene)" />
        </Picker>

        <Button
          title="Post Message"
          onPress={() => this.sendMessage()}
        />
      </View>
    );
  }
}
