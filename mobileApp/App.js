import React, { useEffect }  from 'react';
import { LogBox } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CameraStack, ScannerStack, PhotosStack, HomeStack  } from './stacks.js';
import Env from './setting/Env.ts';
import { Provider, useDispatch } from 'react-redux'

const Tab = createBottomTabNavigator();
// console.disableYellowBox = true; 
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

function App() {
  const env = new Env();
  env.init();

  const FootNavigator = [
    {
      key : 0,
      module : 'Home',
      name : 'HomeStack',
      tabBarLabel: 'Home',
      tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons name="home" color={color} size={size} />
      ),
      component : HomeStack,
      tabBarVisible: true
    },
    {
      module : 'Photos',
      name : 'PhotosStack',
      tabBarLabel: 'My Coins',
      tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons name="bitcoin" color={color} size={size} />
      ),
      component : PhotosStack,
      tabBarVisible: true
    },
    { /* <MaterialCommunityIcons name="camera" color={color} size={size} /> */
      module : 'Camera',
      name : 'CameraStack',
      tabBarLabel: 'Camera',
      tabBarIcon: ({ color, size }) => (
        <MaterialIcons name="miscellaneous-services" color={color} size={size} />
      ),
      component : CameraStack,
      tabBarVisible: false
    },
    { /* <MaterialCommunityIcons name="qrcode-scan" color={color} size={size} />*/
      module : 'Scanner',
      name : 'ScannerStack',
      tabBarLabel: 'QR Scan',
      tabBarIcon: ({ color, size }) => (
        <MaterialIcons name="event-available" size={size} color={color} />
      ),
      component : ScannerStack,
      tabBarVisible: false
    }
  ];

  useEffect(() => {
  }, []);
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="HomeStack"
        tabBarOptions={{
          activeTintColor: '#0275d8',
          
        }}>
        {FootNavigator.map((v, i) => {
          const comp = v.component;
          return (
            <Tab.Screen
              name={v.name}
              component={comp}
              key={i}
              options={{
                tabBarLabel: v.tabBarLabel,
                tabBarIcon: v.tabBarIcon,
                headerShown: false,
                tabBarVisible: (v.tabBarVisible) ? true: false
              }}
            />
            )})}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
