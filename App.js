import React from 'react';
import Start from './components/Start';
import Chat from './components/Chat';

import 'react-native-gesture-handler';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function App() {
  const Stack = createStackNavigator();
  return (
    // Navigates between the two imported screens
    <NavigationContainer>
   <Stack.Navigator initialRouteName="Start" >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
        />
      </Stack.Navigator>
  </NavigationContainer>
  );
}