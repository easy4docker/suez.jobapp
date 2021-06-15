// import * as React from 'react';
import React, { useEffect }  from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image
} from 'react-native';
import logo from '../assets/logo.png';
import * as Linking from 'expo-linking';
import IpfsSync from '../pages/IpfsSync'

const HomeScreen = ({ navigation }) => {
  useEffect((props) => {
    console.log('home props==>', props)
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0275d8' }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View
            style={{
              flex: 0.3,
              alignItems: 'center',
             // justifyContent: 'center',
              top:30
            }}>
            <Image
              style = {styles.image}
              source={logo}
            />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => 
              navigation.navigate('Settings')
              // navigation.navigate('SettingsScreen', { screen: 'Settings' })
            }>
            <Text>Services</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Photos')}>
            <Text>My coin</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Details')}>
            <Text>Details</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonClean}
            onPress={() => {
                Linking.openURL('exp://exp.host');
            }}>
            <Text style={styles.buttonCleanText}>Clean Application</Text>
           </TouchableOpacity>

        </View>
        <Text style={styles.textMiainTitle}>
          
          Suez.BID App. <Text style={styles.textSubTitle}>&#169;{new Date().getUTCFullYear()} <IpfsSync/></Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image : {
    width: 141,
    height:160
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
  buttonClean: {
    alignItems: 'center',
    backgroundColor: '#aa0000',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
  buttonCleanText: {
    color : 'white',
  },
  textMiainTitle: {
    fontSize: 13, textAlign: 'center', color: 'white'
  },
  textSubTitle: {
    fontSize: 10, textAlign: 'center', color: 'white'
  }
});
export default HomeScreen;
