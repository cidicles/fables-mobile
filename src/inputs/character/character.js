import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  Button,
  Picker,
  Modal,
  TouchableHighlight
} from 'react-native';
import { goFetch } from '../../utils';
import { base } from '../../style/core.js';
import { apiBase } from '../../const';
import Icon from 'react-native-ionicons';

export default class Character extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      fableCharacter: '',
      fableType: 'text',
      message: '',
      modalVisible: false,
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
  setModalVisible(visible) {
    this.setState({
      modalVisible: visible
    });
  }
  render() {
    const { ident, fable } = this.props;
    //console.log(ident, fable)
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Text style={{marginTop: 22}}>Add a New Character</Text>
              <Text>
                Name
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
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <View>
            <Icon name="person-add" />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
