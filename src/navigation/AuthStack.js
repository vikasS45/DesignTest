import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import {BottomTabs} from './BottomStack';
import {Layout} from '../screens/Layout';

const AuthStackNavigator = createStackNavigator();

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: '#25385d',
  },
  headerTitleStyle: {
    fontFamily: 'SofiaProRegular',
  },
  headerTitleAlign: 'center',
  headerTintColor: 'white',
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen
        name="Login"
        component={Layout(Login)}
        options={{headerShown: false}}
      />
      <AuthStackNavigator.Screen
        name="Register"
        component={Layout(Register)}
        options={{headerShown: false}}
      />
      <AuthStackNavigator.Screen
        name="Home"
        component={BottomTabs}
        options={{headerShown: false}}
      />
    </AuthStackNavigator.Navigator>
  );
};
