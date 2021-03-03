import * as React from 'react';
import { StyleSheet, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Button, Input } from 'react-native-elements';
import { Formik } from 'formik';
import { Text, View } from '../components/Themed';
import loginValidationSchema from './loginValidationSchema'
import IconAnt from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Feather';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
        <Image source={require('../assets/images/logowhite.png')} style={styles.logo}/> 
        <View style={styles.containerLogin}>
          <Text style={styles.title}>Retrouve tes Lamas Tools </Text>
            <Formik 
              initialValues={{ email: '', password: ''}}
              onSubmit={values => console.log(values)}
              validationSchema={loginValidationSchema}
            >
              {({handleChange, handleSubmit, values, errors, touched, isValid})=>(
                <>
                  <View style={styles.containerInput}>
                    <Input 
                      placeholder="E-mail"
                      onChangeText={handleChange('email')}
                      value={values.email}
                      style={styles.input}
                      leftIcon={
                        <Icon 
                          style={styles.icons}
                          name='mail'
                          size={18}
                        />
                      }
                    />
                    {(errors.email && touched.email) &&
                      <Text style={styles.errors}>{errors.email}</Text>
                    }
                  </View>
                  <View style={styles.containerInput}>
                    <Input 
                      placeholder="Mot de passe" 
                      onChangeText={handleChange('password')}
                      value={values.password}
                      style={styles.input}
                      secureTextEntry
                      leftIcon={
                        <Icon
                          style={styles.icons}
                          name='lock'
                          size={18}
                        />
                      }
                    />
                    {(errors.password && touched.password) &&
                      <Text style={styles.errors}>{errors.password}</Text>
                    }
                  </View>
                  <Button 
                    title="Se connecter" 
                    onPress={() => handleSubmit()}
                    buttonStyle={styles.button}
                  />
                </>
              )}
            </Formik>
      </View>      
      <View style={styles.footer}>
        <Text style={styles.footertext}>
          Made with <IconAnt
                      name='heart'
                      size={18}
                      color="red"
                      /> by Lamas
        </Text>
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
    justifyContent: "space-around"
  },
  containerLogin: {
    marginBottom:100,
    borderRadius: 10,
    height: 'auto',
    width: 350,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00396A',
    textAlign:'center',
    paddingTop: 30,
    paddingBottom: 20
  },
  containerInput: {
    paddingHorizontal:25,
  },
  label: {
    color: '#00396A',
  },
  logo:{
    height: 200,
    resizeMode:"contain",
  },
  button:{
    width: 150,
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: '#00396A',
    marginBottom:40,
    borderRadius: 10
  },
  input: {
    fontSize: 14,
  },
  errors: {
    color: "red",
    marginBottom:8,
    marginLeft:10
  },
  icons: {
    color:'#00396A',
    paddingRight: 10
  },
  footer:{
    flexDirection: 'column',
    alignItems: 'flex-end',
    alignContent:'flex-end',
    backgroundColor: 'transparent',
  },
  footertext: {
    color: 'white',
    alignSelf:'flex-end',
  }
});



// onSubmit={async (values, actions) => {
//   this.setState({ nouveauMail: values.nouveauMail });
//   try {
//     await AuthentificationApi.envoieMailModificationMail(values);
//     actions.setSubmitting(false);

//     this.props.addSnackbar(
//       'ok',
//       "L'email de confirmation de modification a bien été envoyé.",
//       3000,
//     );
//     this.setState({ alertOpen: true });
//   } catch (err) {
//     this.props.addSnackbar(
//       'warning',
//       "Une erreur est survenue lors de l'envoi du email de confirmation.",
//       3000,
//     );
//   }
// }}