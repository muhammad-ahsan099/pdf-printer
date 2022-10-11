/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
} from 'react-native';


import Printer from './src/printer/Printer';


const App = () => {

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{backgroundColor:"rgb(11,46,76)"}} />
      <StatusBar backgroundColor="rgb(11,46,76)" barStyle={'light-content'} />
      <Printer />
    </View>
  );
};


export default App;
