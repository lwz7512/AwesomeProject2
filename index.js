import React, {Component} from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

import App from './app/App';
import configureStore from './app/Redux';

const { store, persistor } = configureStore();

export default class Bootstrap extends Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <App/>
                </PersistGate>
            </Provider>
        );
    }
}

AppRegistry.registerComponent('AwesomeProject2', () => Bootstrap);
