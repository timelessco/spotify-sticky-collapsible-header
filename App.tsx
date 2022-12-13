/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {SpotifyScreen} from './src/screens';

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'light-content'} />
      <SpotifyScreen />
    </SafeAreaProvider>
  );
};

export default App;
