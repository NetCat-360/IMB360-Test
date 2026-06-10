import 'react-native-gesture-handler';
import 'react-native-reanimated';

import React from 'react';

import {
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';

import {
  NavigationContainer,
} from '@react-navigation/native';

import {
  Provider,
} from 'react-redux';

import { store } from './src/store/store';

import RootNavigator from './src/navigation/RootNavigator';

import {
  ToastProvider,
} from './src/context/ToastContext';

const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView
        style={{ flex: 1 }}
      >
        <SafeAreaProvider>
          <ToastProvider>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </ToastProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App