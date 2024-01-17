// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTab from './Componants/Navigation/BottomTab';
import AuthControl from './Componants/Navigation/AuthControl';
import { PaperProvider } from 'react-native-paper';
const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        {/* <AuthControl /> */}
        <BottomTab/>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
