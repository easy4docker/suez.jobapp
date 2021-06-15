import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {  Button,  Icon } from 'react-native-elements';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Env from '../setting/Env.ts';

export default function CameraCatch(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [photoTaken, setPhotoTaken] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef();

  const env= new Env();
  const folders = env.folders;

  console.log('emv=>', env);

  useEffect((props) => {
    (async () => {
      Camera.getPermissionsAsync().then((status) => {
        if (status.status !== 'granted') {
          Camera.requestPermissionsAsync().then((status)=>{
            setHasPermission(status.status === 'granted');
          })
        } else {
          setHasPermission(true);
        }
      });
    })();
  }, []);

  const takePicture = async  () => {
    if (cameraRef.current) {
      const options = { quality: 0.1, base64: true, skipProcessing: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.uri;
      // props.navigation.navigate('Photos')
      setPhotoTaken(source);
    }
  }
  return (hasPermission === null) ? (<></>) : (hasPermission === false) ? (<Text>No access to camera?</Text>) : 
  (
    <TouchableOpacity style={StyleSheet.absoluteFillObject}>
      <Camera style={StyleSheet.absoluteFillObject} type={type} ref={cameraRef}>
 
      </Camera>
      
      <View style={styles.buttonContainer}>
          <Text style={styles.cameraReverseButton}>
            <MaterialIcons style={{justifyContent: 'flex-end'}} name="camera" size={36} color="green" 
              onPress={takePicture}/>
          </Text>
          
          <Text style={styles.cameraReverseButton}>
            <Ionicons  name="camera-reverse-outline" size={36} color="white" onPress={()=> {
                setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}/>
           </Text>

           <Text style={styles.cameraReverseButton}></Text>
           <Text style={styles.cameraReverseButton}></Text>
           <Text style={styles.cameraReverseButton}>
            <MaterialIcons style={{justifyContent: 'flex-end'}} name="home" size={36} color="red" 
                onPress={() => {
                    props.navigation.navigate('Home')
                  }}/>

           </Text>
       </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center', //Centered vertically
    flexDirection: 'row', 
    marginBottom: 16
  },
  cameraButton: {
    flex: 1,
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    margin:6,
    marginBottom: 16
  },
  cameraReverseButton: {
    flex: 1,
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    margin:6,
    marginBottom: 16
  }
});
