// import * as React from 'react';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, ScrollView, RefreshControl, View, Text, SafeAreaView, Image, StatusBar, TouchableOpacity  } from 'react-native';
import * as FileSystem from 'expo-file-system';
import ListCom from '../comm/lists/GridList.js';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
// import IpfsSync from '../pages/IpfsSync';
import PhotoView from '../comm/PhotoView'

const PhotosScreen = () => {
  const [list, setList] = useState([]);
  const [photoViewId, setPhotoViewId ] = useState(null);

  const deleteFile = (fn) => {
    ;
    FileSystem.deleteAsync(FileSystem.cacheDirectory+'Camera/' + fn + ((/\.jpg$/.test(fn)) ? '' : '.ipfs'), {idempotent:false});
    readFiles();
  }
  const refresh = () => {
    readFiles();
  }
  const viewPhoto = (url) => {
     setPhotoViewId(url);
  }
  const readFiles = async () => {
    const list = await FileSystem.readDirectoryAsync(FileSystem.cacheDirectory+'Camera/').catch((err)=> { }) || [];
    const promiseList = [];
    const result = [];

    list.map((v, k) => {
      const id = v.replace(/\.ipfs$/, '');
      promiseList[k] = new Promise((resolve, reject) => {
        if (!/\.ipfs$/.test(v)) {
          resolve({id:id, ipfs:'0', data:FileSystem.cacheDirectory+'Camera/' + v});
        } else {
          fetch('https://ipfs.io/ipfs/' + id).then((result) => result.text())
            .then((responseText) => {
              resolve({id:id, ipfs:'1',  data:responseText});
            }).catch(function (err) {
              reject(err);
            });
        }
      })
    })

    Promise.all(promiseList).then((data) => {
      data.map((v) => {
        result.push(v);
      });
      setList(result);
    }).catch((err)=>{});
  }

  useEffect(() => {
    (async () => {
      // readFiles();
    })();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      readFiles();
      return () => {
      };
    }, [])
  );

  return (!photoViewId) ? (
    <SafeAreaView style={{ flex: 1 }} >
      <View style={{ flex: 1, padding: 3 }} >
        <ListCom items={list} type="grid"  shared={{deleteFile: deleteFile, viewPhoto : viewPhoto}}/>
      </View>
    </SafeAreaView>
  ): (<PhotoView url={photoViewId} shared={{deleteFile: deleteFile, viewPhoto : viewPhoto}}/>);
  
  const me = this;
  return (!photoViewId) ? (
    <SafeAreaView style={{ flex: 1 }} >
      {/*<IpfsSync/>*/}
      <ScrollView refreshControl={
          <RefreshControl
            onRefresh={refresh}
          />}>

        <View style={{ flex: 1, padding: 3 }} >
          <ListCom items={list} type="grid"  shared={{deleteFile: deleteFile, viewPhoto : viewPhoto}}/>
        </View>

      </ScrollView>
    </SafeAreaView>
  ) : (<Text>{photoViewId}</Text>);
};

// (<PhotoView url={photoViewId} shared={{deleteFile: deleteFile, viewPhoto : viewPhoto}}/>)
export default PhotosScreen;

const styles = StyleSheet.create({
  cameraFrame: {
    flex: 1,
  },
  image : {
    width: 80,
    height:80
  },
  camera: {
    flex: 1,
    height: '190%',
    width: '100%'
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  VirtualizedListItem: {
    backgroundColor: '#ccc',
    height: 80,
    justifyContent: 'center',
    marginVertical: 6,
    marginHorizontal: 6,
    padding: 10,
  },
  title: {
    fontSize: 32,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    margin: 3
  },
});
