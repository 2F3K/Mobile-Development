import React from 'react';
import { Button, Text, View } from 'react-native';

const SecondScreen = props => {
  return (
    <View>
      <Text>Screen Two</Text>
      <Button title="Go Back" onPress={() => { props.navigation.goBack(); }} />
    </View>
  );
}

SecondScreen.navigationOptions = {
  headerTitle: 'Add Place'
}

export default SecondScreen;