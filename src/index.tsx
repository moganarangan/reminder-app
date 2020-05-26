import React, { Component } from "react";
import { Dimensions, SafeAreaView } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux'

import { store, persistor } from './store/configureStore';

import SafeAreaStyle from './utilities/safeareastyle';
import Home from './screens/home';
import Configuration from './screens/configuration';
import History from './screens/history';
import NewReminder from './screens/newReminder';

import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

const AppTabNavigator = createMaterialTopTabNavigator();
const initialLayout = { width: Dimensions.get('window').width };

const RootStack = createStackNavigator();

function MainTabNavigator() {
  return (
    <AppTabNavigator.Navigator initialRouteName="Home" initialLayout={initialLayout}
      tabBarOptions={{
        activeTintColor: '#e91e63',
        labelStyle: { fontSize: 12 },
        inactiveTintColor: 'grey',
        style: { backgroundColor: 'powderblue' },
        showIcon: true
      }}>
      <AppTabNavigator.Screen name="Home" component={Home} options={{
        tabBarIcon: ({ focused, color }) => (
          <Icon name="md-home" color={color} size={24} />
        )
      }} />
      <AppTabNavigator.Screen name="Configuration" component={Configuration} options={{
        tabBarIcon: ({ focused, color }) => (
          <Icon name="md-settings" color={color} size={24} />
        )
      }} />
      <AppTabNavigator.Screen name="History" component={History} options={{
        tabBarIcon: ({ focused, color }) => (
          <MaterialIcon name="history" color={color} size={24} />
        )
      }} />
    </AppTabNavigator.Navigator>
  )
}

const askNotification = async () => {
  const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  if (Constants.isDevice && finalStatus === 'granted') {
    Notifications.addListener(handleNotification);
  }
};

const handleNotification = () => {
  console.warn('ok! got your notification');
}

export default class App extends Component {

  async componentDidMount() {
    await askNotification();
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaView style={SafeAreaStyle.SafeArea}>
            <NavigationContainer>
              <RootStack.Navigator mode="modal" initialRouteName='HomeMain'>
                <RootStack.Screen name='HomeMain' component={MainTabNavigator} options={{ headerShown: false }} />
                <RootStack.Screen name="NewReminder" component={NewReminder}
                  options={{
                    title: 'Create new Reminder',
                    headerStyle: {
                      backgroundColor: 'powderblue',
                    }
                  }}
                />
              </RootStack.Navigator>
            </NavigationContainer>
          </SafeAreaView>
        </PersistGate>
      </Provider>
    );
  }
}
