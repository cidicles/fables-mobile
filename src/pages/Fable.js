import React, { Component } from 'react';
import {
  Animated,
  Platform,
  Text,
  View,
  ScrollView,
  Button,
  Image,
  TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import { changeMessages } from '../redux/actions';
import { goFetch, AuthenticatedOwner } from '../utils';
import { base } from '../style/core.js';
import { apiBase } from '../const';
import Message from '../inputs/message/message';
import Character from '../inputs/character/character';
import DisplayMessage from '../display/displayMessage/displayMessage';
import Icon from 'react-native-ionicons';

class Fable extends Component<{}> {
  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.name,
    id: navigation.state.params.id
  });
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      fable: {},
      count: 0,
      length: 0
    };
    this.populatePost = this.populatePost.bind(this);
    this.populateMessages = this.populateMessages.bind(this);
    this.dispatchChangeMessages = this.dispatchChangeMessages.bind(this);
  }
  componentWillMount() {
    this.populatePost();
  }
  populatePost = () => {
    const feedUrl = `${apiBase}fable/${this.props.navigation.state.params.id}`;
    goFetch('get', feedUrl).then((res) => {
      if(res.error){
        console.error(res.message);
      } else {
        this.setState({
          fable: res,
          length: res.messages.length
        });
      }
    });
  }
  populateMessages = (res) => {
    this.populatePost(dispatchChangeMessages);
  }
  dispatchChangeMessages(){
    this.props.dispatch();
  }
  ui_GetSend(){
    if(this.state.count < this.state.length){
      return(
        <Button
          onPress={this.nextMessage}
          title="Next Message"
          color="#841584"
        />
      )
    }
  }
  nextMessage = () => {
    let {length, count} = this.state;
    console.log(length,count+1, 'nextMessage');
    if(this.state.count < this.state.length){
      this.setState({
        count: this.state.count < this.state.length ? this.state.count + 1 : this.state.length
      });
    }
  }
  getMessages(){    let {messages} = this.state.fable;
    let {count} = this.state;
    let content = [];
    for(let i = 0; i < count; i++){
      console.log(messages[i]);
      content.push(<DisplayMessage key={`message-${i}`} message={messages[i]} />);
    }
    return content;
  }
  render() {
    const { navigate } = this.props.navigation;
    const { fable, count, length } = this.state;
    const { ident } = this.props;
    return (
      <View style={{flex: 1, backgroundColor:'grey'}}>
        <View style={{flex: 1, backgroundColor: 'red'}}>
          <ScrollView
            style={base.view}
            ref={ref => this.scrollView = ref}
            onContentSizeChange={(contentWidth, contentHeight)=>{
                this.scrollView.scrollToEnd({animated: true});
            }}>
            <Text>{count}</Text>
            {fable.messages && <View style={base.scrollView}>
              {this.getMessages()}
              {this.ui_GetSend()}
            </View>}
          </ScrollView>
        </View>
        <View style={{height: 100, backgroundColor: 'green'}}>
          { ident.user && AuthenticatedOwner(fable.creator, ident.user.username) &&
            <View>
              { fable &&
                <View>
                  <Message ident={ident} fable={fable} populateMessages={this.populatePost} />
                </View>
              }
              <Character ident={ident} fable={fable} populateMessages={this.populatePost} />
            </View>
          }
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { ident } = state;
  return {
    ident
  };
}

export default connect(mapStateToProps)(Fable);
