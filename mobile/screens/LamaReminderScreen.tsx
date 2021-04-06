import * as React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';



import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function LamaReminderScreen() {
  return (
    <View >
        <Text>Reminder works !</Text>
  </View>
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
    fontWeight: 'bold'
  }
});
