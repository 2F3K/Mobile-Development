import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MenuScreen from "./screens/MenuScreen";
import AudioScreen from "./screens/AudioScreen";
import SMSScreen from "./screens/SMSScreen";
import ListScreen from "./screens/ListScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Menu"
          component={MenuScreen}
          options={{
            title: "Grocery Time",
            headerStyle: {
              backgroundColor: "#333A46",
            },
            headerTintColor: "#DCE7FA",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="AudioScreen"
          component={AudioScreen}
          options={{
            title: "Audio List",
            headerStyle: {
              backgroundColor: "#333A46",
            },
            headerTintColor: "#DCE7FA",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="SMSScreen"
          component={SMSScreen}
          options={{
            title: "SMS Screen",
            headerStyle: {
              backgroundColor: "#333A46",
            },
            headerTintColor: "#DCE7FA",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="ListScreen"
          component={ListScreen}
          options={{
            title: "List",
            headerStyle: {
              backgroundColor: "#333A46",
            },
            headerTintColor: "#DCE7FA",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
