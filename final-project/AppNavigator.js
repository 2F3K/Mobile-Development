import { Platform } from 'react-native'
import { createAppContainer, createStackNavigator } from 'react-navigation';
import FirstScreen from './screens/FirstScreen';
import SecondScreen from './screens/SecondScreen';

const AppNavigator = createStackNavigator(
  {
    ScreenOne: { screen: FirstScreen },
    ScreenTwo: { screen: SecondScreen }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? 'green' : ''
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : 'blue'
    }
  }
);

export default createAppContainer(AppNavigator);