import  React from 'react';
import { View, StyleSheet} from 'react-native';
import {  Button, Text } from 'react-native-elements';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Ionicons, AntDesign , Entypo, MaterialIcons } from '@expo/vector-icons';

class QRCodeScanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  
      hasPermission : null,
      scanned: false
    };
    this.navigation = props.navigation;
  }
  componentDidMount() {
    const me = this;
    BarCodeScanner.getPermissionsAsync().then((status) => {
      console.log(status);
      if (status.status !== 'granted') {
        BarCodeScanner.requestPermissionsAsync().then((status)=>{
          me.setState({'hasPermission' : (status.status === 'granted')});
        })
      } else {
        me.setState({'hasPermission':true});
      }
    })
  }
  componentWillUnmount() {
    this.setState({hasPermission: false});
  }
  handleBarCodeScanned = ({ type, data }) => {
    this.setState({scanned: true});
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };
  render() {
    return (this.state.hasPermission === null) ? (<></>) :
    (this.state.hasPermission === false) ? (<Text>No access to camera</Text>) :
    (
      <View style={{flex: 1}}>
        {(<BarCodeScanner
          onBarCodeScanned={this.state.scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />)
        }
        {this.state.scanned && <Button title={'Tap to Scan Again'} onPress={() => this.setState({scanned: false})} />}
          <View style={styles.buttonContainer}>
            {/*}
            <Text style={styles.cameraReverseButton}>
              <MaterialIcons style={{justifyContent: 'flex-end'}} name="camera" size={36} color="green" 
                onPress={takePicture}/>
      </Text>*/}
            
            <Text style={styles.cameraReverseButton}></Text>
            <Text style={styles.cameraReverseButton}></Text>
            <Text style={styles.cameraReverseButton}>
              <MaterialIcons style={{justifyContent: 'flex-end'}} name="home" size={36} color="red" 
                  onPress={ 
                    ()=> {   this.navigation.navigate('Home'); }
                  }
              />
            </Text>
        </View>
      </View>
    );
  }
}

export default QRCodeScanner;

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
