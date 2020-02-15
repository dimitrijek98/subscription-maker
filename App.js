/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import LoginScreen from './src/components/auth/LoginScreen';
import Dashboard from './src/components/dashboard/Dashboard';
import {createStackNavigator} from '@react-navigation/stack';
import SubscriptionList from './src/components/subscriptions/SubscriptionList';
import AllExtras from './src/components/extras/AllExtras';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'Login'}>
          <Stack.Screen
            name={'Login'}
            options={{
              title: 'Login',
              headerStyle: {
                backgroundColor: '#37415C',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}>
            {props => <LoginScreen {...props} />}
          </Stack.Screen>
          <Stack.Screen
            name={'Subscriptions'}
            options={{
              title: 'All Subscriptions',
              headerStyle: {
                backgroundColor: '#37415C',
              },
              headerLeft: null,
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
                textAlign: 'center',
              },
            }}
          >
            {props => <SubscriptionList {...props} />}
          </Stack.Screen>
          <Stack.Screen
            name={'Dashboard'}
            options={{
              title: 'Dashboard',
              headerStyle: {
                backgroundColor: '#37415C',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
                textAlign: 'center',
              },
            }}
          >
            {props => <Dashboard {...props} />}
          </Stack.Screen>
          <Stack.Screen
            name={'AllExtras'}
            options={{
              title: 'All Extras',
              headerStyle: {
                backgroundColor: '#37415C',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
                textAlign: 'center',
              },
            }}
          >
            {props => <AllExtras {...props} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
