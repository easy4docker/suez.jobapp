import React, { useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import CameraCatch from '../comm/CameraCatch';
import { useFocusEffect } from '@react-navigation/native';
import { BackHandler } from 'react-native';

const CameraScreen = ({ navigation }) => {
  const [isObj, setIsObj] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      setIsObj(true);
      return () => {
        setIsObj(false);
      };
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
        {(!isObj) ? (<></>) : (<CameraCatch navigation={navigation} />)}
    </SafeAreaView>
  );
};
export default CameraScreen;
