import {View, Text} from 'react-native';
import React from 'react';
import StackNavigation from './src/navigations/StackNavigation';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <>
      <StackNavigation />
      <Toast ref={ref => Toast.setRef(ref)} />
    </>
  );
};

export default App;
