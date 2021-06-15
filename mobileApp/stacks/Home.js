import React, { useEffect }  from 'react';
import {
  SafeAreaView
} from 'react-native';
import { HomeScreen, DetailsScreen, ProfileScreen, SettingsScreen, CameraScreen, PhotosScreen} from '../modules.js';
import { createStackNavigator } from '@react-navigation/stack';

import Env from '../setting/Env.ts';

import Styles from '../styles/Main.js';

/* import { PhotosStack } from '../stacks.js'; */

const HomeStack = (props) => {
    const Stack = createStackNavigator();
    const env = new Env();
    return (
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#0275d8' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          headerShown: false
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'SuEz Coin' }}
        />
        <Stack.Screen
          name="Photos"
          component={PhotosScreen}
          options={{ title: 'About SuEz Bidc2' }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: 'Details Page A' }}
        />
        <Stack.Screen
          name="Settings"
          component={DetailsScreen}
          options={{ title: 'Details Page B' }}
        />
      </Stack.Navigator>
    );
  }
export default HomeStack;

 