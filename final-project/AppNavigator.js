import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MenuScreen from './screens/MenuScreen';
import FirstScreen from './screens/FirstScreen';
import SecondScreen from './screens/SecondScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Menu"
                      component={MenuScreen}
                      options={{
                        title: 'Grocery Time',
                        headerStyle: {
                          backgroundColor: '#333A46'
                        },
                        headerTintColor: '#DCE7FA',
                        headerTitleStyle: {
                          fontWeight: 'bold',
                        },
                        headerTitleAlign: 'center'
                      }}
        />
        <Stack.Screen name="Thing1"
                      component={FirstScreen}
                      options={{
                        title: 'Thing #1',
                        headerStyle: {
                          backgroundColor: '#333A46'
                        },
                        headerTintColor: '#DCE7FA',
                        headerTitleStyle: {
                          fontWeight: 'bold'
                        },
                        headerTitleAlign: 'center'
                      }}
        />
        <Stack.Screen name="Thing2"
                      component={SecondScreen}
                      options={{
                        title: 'Thing #2',
                        headerStyle: {
                          backgroundColor: '#333A46'
                        },
                        headerTintColor: '#DCE7FA',
                        headerTitleStyle: {
                          fontWeight: 'bold'
                        },
                        headerTitleAlign: 'center'
                      }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;