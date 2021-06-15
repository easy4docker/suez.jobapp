import * as React from 'react';
import { CameraScanner } from '../modules.js';
import { createStackNavigator } from '@react-navigation/stack';

const ScannerStack = () => {
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
        name="Scanner"
        component={CameraScanner}
        options={{ title: 'QR Scanner' }}
      />
    </Stack.Navigator>
  );
}
export default ScannerStack;
