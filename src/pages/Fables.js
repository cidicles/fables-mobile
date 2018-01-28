import React, { Component } from 'react';
import {
  Platform,
  Text,
  View,
  Button
} from 'react-native';
import { goFetch } from '../utils';
import { base } from '../style/core.js';
import { apiBase } from '../const';

export default class Fables extends Component<{}> {
  static navigationOptions = {
    title: 'Fables',
  }
  constructor(props) {
    super(props);
    this.state = {
      fables: {
        fables: []
      },
      filters: {
        page: 1,
        count: 8,
        attributes: {}
      },
      ...props
    };
    this.populatePosts = this.populatePosts.bind(this);
  }
  componentWillMount() {
    this.populatePosts();
  }
  populatePosts() {
    let {filters} = this.state;
    let feedUrl = `${apiBase}fable/en_us/${filters.page}/${filters.count}`;
    console.log(feedUrl);
    goFetch('get', feedUrl).then((res) => {
      console.log(res)
      if(res.error){
        console.error(res.message);
      } else {
        this.setState({
          fables: res
        });
      }
    });
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={base.view}>
        {this.state.fables.fables.map((fable, index) => (
          <Button
            key={`fable-${index}`}
            title={fable.name}
            onPress={() => navigate('Fable', {
              id: fable._id,
              name: fable.name
            })}
          />
        ))}
      </View>
    );
  }
}
