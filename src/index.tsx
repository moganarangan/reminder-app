import React, { Component } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux'
import { registerRootComponent, AppLoading } from 'expo';
import SafeAreaView, { SafeAreaProvider } from 'react-native-safe-area-view';

import NotificationHandler from './handlers/notificationHandler';
import { store, persistor } from './store/configureStore';
import SafeAreaStyle from './utilities/safeareastyle';
import Home from './screens/home';
import Configuration from './screens/configuration';
import History from './screens/history';
import NewReminder from './screens/newReminder';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import * as eva from '@eva-design/eva';
import { default as mapping } from './utilities/mapping.json';
import * as Font from 'expo-font';

import {
  ApplicationProvider, IconRegistry, Text, Icon,
  BottomNavigation, BottomNavigationTab
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { FeatherIconsPack } from "./utilities/feather-icons";
import { MaterialIconsPack } from "./utilities/material-icons";
import { MaterialCommunityIconsPack } from "./utilities/material-community-icons";
import TaskHandler from "./handlers/taskHandler";
import { default as theme } from './utilities/theme.json';
import ReminderActivity from "./screens/reminderActivity";
import More from "./screens/more";

const { Navigator, Screen } = createBottomTabNavigator();
const RootStack = createStackNavigator();

const fonts = {
  "Roboto-Light": require('../assets/fonts/Roboto-Light.ttf')
};

function MainTabNavigator() {
  return (
    <Navigator initialRouteName="Home" tabBar={(props: any) => <BottomTabBar  {...props} />} >
      <Screen name="Home" component={Home} />
      <Screen name="Configuration" component={Configuration} />
      <Screen name="History" component={History} />
      <Screen name="More" component={More} />
    </Navigator >
  )
}

const BottomTabBar = ({ navigation, state }: { navigation: any, state: any }) => (
  <BottomNavigation selectedIndex={state.index} appearance='noIndicator'
    onSelect={index => navigation.navigate(state.routeNames[index])}
    style={{ borderStyle: 'solid', borderTopColor: '#eee', borderColor: '#fff', borderWidth: 1 }}>
    <BottomNavigationTab title={evaProps => <Text {...evaProps}>Home</Text>}
      icon={evaProps => <Icon {...evaProps} name='home' pack="material" />} />

    <BottomNavigationTab title={evaProps => <Text {...evaProps}>Reminders</Text>}
      icon={evaProps => <Icon {...evaProps} name='settings' pack="material" />} />

    <BottomNavigationTab title={evaProps => <Text {...evaProps}>History</Text>}
      icon={evaProps => <Icon {...evaProps} name='history' pack="material" />} />

    <BottomNavigationTab title={evaProps => <Text {...evaProps}>More</Text>}
      icon={evaProps => <Icon {...evaProps} name='more-vertical' pack="feather" />} />
  </BottomNavigation>
);

export default class App extends Component {
  state = {
    isReady: false
  }

  async componentDidMount() {
    TaskHandler.startBackGroundTask();
    await Font.loadAsync(fonts);
    this.setState({ isReady: true });

    await NotificationHandler.askNotification();
    TaskHandler.runTask();
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return (
      <>
        <IconRegistry icons={[EvaIconsPack, FeatherIconsPack, MaterialIconsPack, MaterialCommunityIconsPack]} />
        <ApplicationProvider {...eva} customMapping={mapping} theme={{ ...eva.light, ...theme }}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <SafeAreaProvider>
                <SafeAreaView style={SafeAreaStyle.SafeArea}>
                  <NavigationContainer>
                    <RootStack.Navigator mode='modal' initialRouteName='HomeMain' headerMode='screen' >
                      <RootStack.Screen name='HomeMain' component={MainTabNavigator} options={{ headerShown: false }} />
                      <RootStack.Screen name="NewReminder" component={NewReminder} options={{ headerShown: false }} />
                      <RootStack.Screen name="ReminderActivity" component={ReminderActivity} options={{ headerShown: false }} />
                    </RootStack.Navigator>
                  </NavigationContainer>
                </SafeAreaView>
              </SafeAreaProvider>
            </PersistGate>
          </Provider>
        </ApplicationProvider>
      </>
    );
  }
}

registerRootComponent(App);