import React from 'react';
import { Button, Text, View } from 'react-native';

const SMSScreen = ({ route }) => {
  const { thing, text } = route.params;

  return (
    <View>
      <Text>{thing}</Text>
      <Text>{text}</Text>
    </View>
  );
}

export default SMSScreen;