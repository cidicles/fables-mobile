import {
	StackNavigator
} from 'react-navigation';
import React, { Component } from 'react';
import throttle from 'lodash/throttle';

// Redux
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import { PersistGate } from 'redux-persist/lib/integration/react'

// Pages

import Home from './pages/Home';
import Profile from './pages/Profile';
import Fables from './pages/Fables';
import Fable from './pages/Fable';
import NewFable from './pages/NewFable';
import Register from './pages/Register';
import Login from './pages/Login';

// Create the Store

let { store, persistor } = configureStore();

// Create the Navigator

const AppNavigator = StackNavigator({
	Home: { screen: Home },
	Profile: { screen: Profile },
	Fables: { screen: Fables },
	Fable: { screen: Fable },
	NewFable: { screen: NewFable },
	Register: { screen: Register },
	Login: { screen: Login }
});

// Create the App

export default class App extends Component<{}> {
	render() {
    return (
      <Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
	        <AppNavigator />
	      </PersistGate>
      </Provider>
    );
  }
}
