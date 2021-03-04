import * as React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';



import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function ProfiLamaScreen() {
  return (
    <LinearGradient
    colors={['blue', 'green', 'red', 'yellow']}
    style={{flex: 1}}
    //  Linear Gradient 
    start={{ x: 0, y: 0 }}
    end={{ x: 0, y: 1 }}   
  >
  </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 56,
    position: 'absolute',
    left: '15%',
    top: '40%',
    color: 'white',
    fontWeight: 'bold'
  }
});
