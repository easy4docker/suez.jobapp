/* 
  sync local file to ipfs system and rename new file name
*/
import React from 'react';
import { Text } from 'react-native';
import * as FileSystem from 'expo-file-system';
import IPFS from 'ipfs-mini';

class IpfsSync extends React.Component {
  constructor(props) {
    super(props);
    this.state = {cnt : 0, cfile : null, ctm : null};
   }
  syncFile() {
    const me = this;
    const fn = me.state.cfile;
    if (!fn) {
      return true;
    }
    const _localFolder = FileSystem.cacheDirectory+'Camera/';
    const localFn = FileSystem.cacheDirectory+'Camera/' + fn;
    const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
    FileSystem.readAsStringAsync(localFn,  
      { encoding: FileSystem.EncodingType.Base64 }).then((content) => {
        ipfs.add('data:image/jpeg;base64,'+ content).then((code)=> {
          FileSystem.deleteAsync(localFn, {}).then(() => {
            FileSystem.writeAsStringAsync(_localFolder + code + '.ipfs', new Date().getTime().toString(), {});
            }).then(() => {
              me.setState({ cfile : null, ctm : null});
            });
          }).catch(err => { console.log('write file', err) })
          .catch(err => { console.log('delete file error', err) });
   })
  }
  scanFile() {
    const me = this;
    if (!!me.state.ctm && (new Date().getTime() - me.state.ctm > 30000)) {
        me.setState({cfile: null, ctm : null})
    }
    if (!!me.state.cfile) {
    //  console.log('skip==>');
      return true;
    }
  //  console.log(new Date().getTime().toString());

    FileSystem.readDirectoryAsync(FileSystem.cacheDirectory+'Camera/').then((list) => {
      const items = list.filter((v) => {
        return /\.jpg$/.test(v);
      });
      me.setState({ cnt : items.length});
      if (!me.state.cfile && !!items.length) {
        me.setState({cfile: items[0], ctm : new Date().getTime()});
        me.syncFile();
      } 
      
    });
  }
  componentDidUpdate (prevProps, prevState) {
    
  }
  componentWillUnmount() {
    clearInterval(this._inv);
  }
  componentDidMount () {
    const me = this;
    this.scanFile();
    this._inv = setInterval(() => {
      me.scanFile();
    }, 1000);
    return true;
  }
  render() {
    return (<Text style={{color:'lightgreen'}}> IPFSQ({this.state.cnt.toString()}) </Text>)
  }
};
export default IpfsSync;