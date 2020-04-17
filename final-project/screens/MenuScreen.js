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
        title="Audio List"
        color="#3D5168"
        // NOTE(CK): Thing1 - this is the name of the screen we named it in AppNavigator.js
        onPress={() => props.navigation.navigate("AudioScreen", things[0])}
      />
      <Button
        title="Confirm Pick Up"
        color="#3D5168" 
        onPress={() => props.navigation.navigate("SMSScreen", things[1])}
      />
    </View>
  );
};

export default MenuScreen;