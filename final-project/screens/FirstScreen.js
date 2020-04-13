import React, { useState } from 'react';
import { View, Text, Platform, TextInput, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../CustomHeaderButton';

const FirstScreen = props => {
  const [titleValue, setTitleValue] = useState('');
  const titleChangeHandler = text => {
    setTitleValue(text);
  };

  return (
    <View>
      <Text>[PLACEHOLDER] Screen One</Text>
      <Text>[PLACEHOLDER] Button navigates to page 2</Text>
      <TextInput
        onChangeText={titleChangeHandler}
        value={titleValue}
        placeHolder="Enter title for next screen">
      </TextInput>
      <Button
        title="Go To Screen 2"
        onPress={ () => props.navigation.navigate('ScreenTwo', { screenTitle: titleValue }) }
      />
    </View>
  );
}

FirstScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Screen One Title',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Screen 2"
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add' }
          onPress={() => nacData.navigation.navigate('ScreenTwo') }
        />
      </HeaderButtons>
    )
  }
}

export default FirstScreen;