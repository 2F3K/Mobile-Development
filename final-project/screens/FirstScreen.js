import React, { useState } from 'react';
import { View, Text, Platform, TextInput, Button } from 'react-native';

const FirstScreen = ({ route }) => {
  const { thing, text } = route.params;

  return (
    <View>
      <Text>{thing}</Text>
      <Text>{text}</Text>
    </View>
  );
}
export default FirstScreen;