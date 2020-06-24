import React, { Component } from "react";
import { Dimensions, SafeAreaView } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux'
import { registerRootComponent } from 'expo';

import NotificationHandler from './handlers/notificationHandler';
import { store, persistor } from './store/configureStore';
import SafeAreaStyle from './utilities/safeareastyle';
import Home from './screens/home';
import Configuration from './screens/configuration';
import History from './screens/history';
import NewReminder from './screens/newReminder';

import * as eva from '@eva-design/eva';
import { default as mapping } from './utilities/mapping.json';
import { ApplicationProvider, IconRegistry, TabBar, Tab, Text, Icon } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { FeatherIconsPack } from "./utilities/feather-icons";
import { MaterialIconsPack } from "./utilities/material-icons";
import TaskHandler from "./handlers/taskHandler";

const initialLayout = { width: Dimensions.get('window').width };

const AppTabNavigator = createMaterialTopTabNavigator();
const RootStack = createStackNavigator();

function MainTabNavigator() {
  return (
    <AppTabNavigator.Navigator initialRouteName="Home" initialLayout={initialLayout} style={{ backgroundColor: 'powderblue' }}
      tabBar={(props: any) => <TopTabBar {...props} />}>
      <AppTabNavigator.Screen name="Home" component={Home} />
      <AppTabNavigator.Screen name="Configuration" component={Configuration} />
      <AppTabNavigator.Screen name="History" component={History} />
    </AppTabNavigator.Navigator >
  )
}

const TopTabBar = ({ navigation, state }: { navigation: any, state: any }) => (
  <TabBar style={{ backgroundColor: 'powderblue' }}
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <Tab title={evaProps => <Text {...evaProps}>Home</Text>}
      icon={evaProps => <Icon {...evaProps} name='home' pack="material" />} />

    <Tab title={evaProps => <Text {...evaProps}>Configuration</Text>}
      icon={evaProps => <Icon {...evaProps} name='settings' pack="material" />} />

    <Tab title={evaProps => <Text {...evaProps}>History</Text>}
      icon={evaProps => <Icon {...evaProps} name='history' pack="material" />} />
  </TabBar>
);

export default class App extends Component {

  async componentDidMount() {
    await NotificationHandler.askNotification();
    TaskHandler.startBackGroundTask();
  }

  render() {
    return (
      <>
        <IconRegistry icons={[EvaIconsPack, FeatherIconsPack, MaterialIconsPack]} />
        <ApplicationProvider {...eva} customMapping={mapping} theme={eva.light}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <SafeAreaView style={SafeAreaStyle.SafeArea}>
                <NavigationContainer>
                  <RootStack.Navigator mode='modal' initialRouteName='HomeMain' headerMode='screen' navigationOptions={{ header: { title: 'Reminder' } }} >
                    <RootStack.Screen name='HomeMain' component={MainTabNavigator} options={{ headerShown: false }} />
                    <RootStack.Screen name="NewReminder" component={NewReminder}
                      options={{
                        headerStyle: {
                          backgroundColor: 'powderblue'
                        }
                      }}
                    />
                  </RootStack.Navigator>
                </NavigationContainer>
              </SafeAreaView>
            </PersistGate>
          </Provider>
        </ApplicationProvider>
      </>
    );
  }
}

registerRootComponent(App);