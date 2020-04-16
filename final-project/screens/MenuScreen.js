import React from 'react';
import { View, Text, Button } from 'react-native';
import { styles } from '../styles/styles';
const things = [
  { thing: "a thing here", text: "here is some text" },
  { thing: "another thing", text: "more text" }
];

const MenuScreen = props => {
  return (
    <View style={styles.mainscreen}>
      <Text>Our Final</Text>
      <Button
        title="Thing #1"
        color="#3D5168"
        // NOTE(CK): Thing1 - this is the name of the screen we named it in AppNavigator.js
        onPress={() => props.navigation.navigate("Thing1", things[0])}
      />
      <Button
        title="Thing #2"
        color="#3D5168"
        onPress={() => props.navigation.navigate("Thing2", things[1])}
      />
    </View>
  );
};

export default MenuScreen;