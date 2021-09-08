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
    /**
     * Navigates between the two imported screens
     * (NavigationContainer} This container moniters the app state change
     * Stack.Navigator This Navigator transitions between the two screens dictated in Stack.Screen
     * initalRouteName  The name of the route to render on first load of the navigator
     * @Method Stack.Screen
     * @prop name The name of the screan
     * @prop compoment This takes the imported component. 
     */
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