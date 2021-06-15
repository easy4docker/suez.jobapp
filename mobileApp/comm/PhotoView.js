import  React from 'react';
import { StyleSheet, Image, TouchableOpacity} from 'react-native';
import {  Button, Text } from 'react-native-elements';
import * as FileSystem from 'expo-file-system';

class PhotoView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  
      url : props.url,
      data : null
    };
    this.shared = props.shared;
  }
  async loadImage (id) {
    const me = this;
    const fdir = FileSystem.cacheDirectory+'Camera/';
    const promiseData = new Promise((resolve, reject) => {
      if (/\.jpg$/.test(id)) {
        resolve(fdir  + id);
      } else {
        fetch('https://ipfs.io/ipfs/' + id).then((result) => result.text())
          .then((responseText) => {
            resolve(responseText);
          }).catch(function (err) {
            reject(err);
          });
      }
    });
    promiseData.then((data) => {
      me.setState({data:data});
    });
  }
  componentDidMount() {
    this.loadImage (this.state.url);
  }
  componentWillUnmount() {
  }
  render() {
    return  (
    <TouchableOpacity style={{flex: 1}} onPress={()=> { this.shared.viewPhoto(null) }}>
      <Text>==niu==</Text>
      <Image
        style = {StyleSheet.absoluteFillObject}
        source={{uri: this.state.data}}
      />
    </TouchableOpacity>)
  }
}
export default PhotoView;