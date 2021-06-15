import React from 'react'
import { StyleSheet, ActivityIndicator, View , Text } from 'react-native'

export default function Overlay(props) {
    const styles = StyleSheet.create({
        overlayer: {
          flex: 1,
          position:'absolute', 
          zIndex:8888,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%'
        }
    });
    return (
        <View style={styles.overlayer}>
            <Text>-{props.title}-</Text>
            <ActivityIndicator size="large" color="darkred"/>
        </View>
    )
}
