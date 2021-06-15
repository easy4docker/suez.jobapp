import * as React from 'react';
import { HomeScreen, DetailsScreen, ProfileScreen, SettingsScreen, CameraScreen, PhotosScreen} from '../modules.js';

import { createStackNavigator } from '@react-navigation/stack';

const CameraStack = () => {
   const Stack = createStackNavigator();
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
          name="Camera"
          component={CameraScreen}
          options={{ title: 'Camera',  }}
        />
      </Stack.Navigator>
    );
  }
  export default CameraStack;
  