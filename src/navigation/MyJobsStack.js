import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import MyJobs from '../screens/contents/MyJobs';
import {Layout} from '../screens/Layout';

const MyJobsStackNavigator = createStackNavigator();

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: '#25385d',
  },
  headerTitleAlign: 'center',
  headerTintColor: 'white',
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

export const MyJobsNavigator = () => {
  return (
    <>
      <MyJobsStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <MyJobsStackNavigator.Screen
          name="MyJobs"
          component={Layout(MyJobs)}
          options={{headerShown: false}}
        />
      </MyJobsStackNavigator.Navigator>
    </>
  );
};
