import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import Tasks from '../screens/contents/Tasks';
import {Layout} from '../screens/Layout';

const TasksStackNavigator = createStackNavigator();

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: '#25385d',
  },
  headerTitleAlign: 'center',
  headerTintColor: 'white',
  // tabBarVisible: true,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

export const TasksNavigator = () => {
  return (
    <>
      <TasksStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <TasksStackNavigator.Screen
          name="Tasks"
          component={Layout(Tasks)}
          options={{headerShown: false}}
        />
      </TasksStackNavigator.Navigator>
    </>
  );
};
