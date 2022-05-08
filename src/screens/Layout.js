/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';
import {Colors} from 'react-native-ui-lib';

export const Layout = WrappedComponent => {
  return function (props) {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.backgroundColor}}>
        <StatusBar
          backgroundColor={Colors.backgroundColor}
          barStyle={'dark-content'}
        />
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <WrappedComponent {...props} />
        </ScrollView>
      </SafeAreaView>
    );
  };
};
