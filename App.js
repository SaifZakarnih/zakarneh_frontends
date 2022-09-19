import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Context, Provider} from './components/globalContext';
import Navigator from './components/navigation';
import React from 'react';

function App() {
  return (
    <Provider>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
