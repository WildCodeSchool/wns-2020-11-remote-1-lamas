import * as React from 'react';
import { StyleSheet, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Button, Input } from 'react-native-elements';
import { Formik } from 'formik'
import { Text, View } from '../components/Themed';

export default function LoginScreen() {
  const [inputLoginText, setInputLoginText] = React.useState({
    email: '',
    password: ''
  });
  
  const handleConnection =()=>{
    console.log('Connection cliqued !')
    console.log('input login text : ', inputLoginText)
  }
  
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logowhite.png')} style={styles.logo}/> 
      <View style={styles.containerLogin}>
        <Text style={styles.title}>Retrouve tes Lamas Tools </Text>
          
          <View style={styles.containerInput}>
            <Text style={styles.label}>E-mail</Text>
            <Input placeholder="votre e-mail" onChangeText={email => setInputLoginText({...inputLoginText, email})} value={inputLoginText.email}/>
          </View>
          <View style={styles.containerInput}>
            <Text style={styles.label}>Mot de passe</Text>
            <Input placeholder="votre password" onChangeText={password => setInputLoginText({...inputLoginText, password})} value={inputLoginText.password}/>
          </View>
          <Button title="Se connecter" onPress={handleConnection} style={styles.button}/>


      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#00396A',
    paddingTop: 70,
  },
  containerLogin: {
    backgroundColor: 'white',
    borderRadius: 20,
    height: 400,
    width: 350,
    paddingTop: 20,
    marginTop: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00396A',
    textAlign:'center'
  },
  containerInput: {

  },
  label: {

  },
  logo:{
      height: 200,
      resizeMode:"contain",

  },
  button:{
    width: 150,
    alignSelf: 'center'
  }
});
