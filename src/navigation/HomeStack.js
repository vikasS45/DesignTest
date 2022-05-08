/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {StyleSheet, View} from 'react-native';
import {Colors, Image} from 'react-native-ui-lib';
import Home from '../screens/contents/Home';
import {Layout} from '../screens/Layout';

const HomeStackNavigator = createStackNavigator();

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.white,
  },
  headerTitleAlign: 'center',
  headerTintColor: Colors.black,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

export const HomeNavigator = ({navigation}) => {
  return (
    <>
      <HomeStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <HomeStackNavigator.Screen
          name="Home"
          component={Layout(Home)}
          options={{
            headerTitle: 'Dubai',
            headerLeft: () => (
              <Image
                assetName={'logo'}
                style={styles.logo}
                resizeMode={'contain'}
              />
            ),
            headerRight: () => (
              <View style={styles.row}>
                <Image
                  assetName={'heart'}
                  style={styles.icon}
                  resizeMode={'contain'}
                />
                <Image
                  assetName={'notification'}
                  style={styles.icon}
                  resizeMode={'contain'}
                />
              </View>
            ),
          }}
        />
      </HomeStackNavigator.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  logo: {
    height: 38,
    width: 38,
    marginLeft: 20,
  },
  icon: {
    height: 25,
    width: 25,
    marginRight: 20,
  },
  row: {
    flexDirection: 'row',
  },
});
