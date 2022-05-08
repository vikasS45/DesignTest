import React from 'react';
import {StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SettingsNavigator} from './SettingsStack';
import {TasksNavigator} from './TasksStack';
import {MyJobsNavigator} from './MyJobsStack';
import {ProfileNavigator} from './ProfileStack';
import {HomeNavigator} from './HomeStack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors} from 'react-native-ui-lib';

const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'MyJobs') {
            iconName = 'videocamera';
          } else if (route.name === 'Task') {
            iconName = 'pdffile1';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          } else if (route.name === 'Settings') {
            iconName = 'bulb1';
          }
          return focused ? (
            <>
              <View style={footerTabstyles.indicator} />
              <AntDesign name={iconName} size={21} color={color} />
            </>
          ) : (
            <AntDesign name={iconName} size={21} color={color} />
          );
        },
      })}
      tabBarOptions={{
        labelStyle: footerTabstyles.footerHref,
        activeTintColor: Colors.red,
        tabStyle: {paddingVertical: 10},
        style: {height: 60},
      }}>
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="MyJobs"
        component={MyJobsNavigator}
        options={{
          tabBarLabel: 'MyJobs',
        }}
      />
      <Tab.Screen
        name="Task"
        component={TasksNavigator}
        options={{
          tabBarLabel: 'Task',
          tabBarBadgeStyle: footerTabstyles.footerCount,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{
          // tabBarBadge: '2',
          tabBarLabel: 'Settings',
          tabBarBadgeStyle: footerTabstyles.footerCount,
        }}
      />
    </Tab.Navigator>
  );
};
const footerTabstyles = StyleSheet.create({
  footerHref: {
    fontSize: 9,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  footerIconImg: {
    marginVertical: 0,
    marginHorizontal: 'auto',
    marginBottom: 3,
    position: 'relative',
    height: 23,
  },
  footerCount: {
    width: 18,
    height: 18,
    color: '#FFF',
    borderRadius: 50,
    top: -5,
    right: -10,
    fontSize: 9,
  },
});
