import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {Layout} from '../screens/Layout';
import Settings from '../screens/contents/Settings';

const SettingsStackNavigator = createStackNavigator();

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: '#25385d',
  },
  headerTitleAlign: 'center',
  headerTintColor: 'white',
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

export const SettingsNavigator = () => {
  return (
    <>
      <SettingsStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <SettingsStackNavigator.Screen
          name="Settings"
          component={Layout(Settings)}
          options={{headerShown: false}}
        />
      </SettingsStackNavigator.Navigator>
    </>
  );
};
