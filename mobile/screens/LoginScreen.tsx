import * as React from "react";
import { StyleSheet, Image, AsyncStorage } from "react-native";
import { useMutation } from "@apollo/client";
import { Button, Input } from "react-native-elements";
import { Formik } from "formik";
import { Text, View } from "../components/Themed";
import loginValidationSchema from "./loginValidationSchema";
import IconAnt from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";

import { LOGIN_USER } from "../graphql/loginUser";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, LamasReminderParamList } from "../types";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../navigation";

export interface Login {
  email: string;
  password: string;
}

export type LoginScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "LamasToolsScreen">;
};

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const { signIn } = React.useContext(AuthContext);

  const [loginUser, { data, error }] = useMutation(LOGIN_USER, {
    onCompleted: async (data) => {
      const token = data?.loginUser?.token;
      if (token) {
        await SecureStore.setItemAsync("userToken", data.loginUser.token);
        signIn();
        navigation.navigate("LamasToolsScreen");
      }
    },
    errorPolicy: "all",
  });

  return (
    <LinearGradient
      style={styles.container}
      colors={["#00396A", "#0371c8", "#00396A"]}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 0.7, y: 0.5 }}
    >
      <Image
        source={require("../assets/images/logowhite.png")}
        style={styles.logo}
      />
      <View style={styles.containerLogin}>
        <Text style={styles.title}>Retrouve tes Lamas Tools </Text>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => loginUser({ variables: { ...values } })}
          validationSchema={loginValidationSchema}
        >
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
          }) => (
            <>
              <View style={styles.containerInput}>
                <Input
                  placeholder="E-mail"
                  onChangeText={handleChange("email")}
                  value={values.email}
                  style={styles.input}
                  leftIcon={<Icon style={styles.icons} name="mail" size={18} />}
                />
                {errors.email && touched.email && (
                  <Text style={styles.errors}>{errors.email}</Text>
                )}
              </View>
              <View style={styles.containerInput}>
                <Input
                  placeholder="Mot de passe"
                  onChangeText={handleChange("password")}
                  value={values.password}
                  style={styles.input}
                  secureTextEntry
                  leftIcon={<Icon style={styles.icons} name="lock" size={18} />}
                />
                {errors.password && touched.password && (
                  <Text style={styles.errors}>{errors.password}</Text>
                )}
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
          Made with <IconAnt name="heart" size={18} color="red" /> by Lamas
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#00396A",
    paddingTop: 70,
    justifyContent: "space-around",
  },
  containerLogin: {
    marginBottom: 100,
    borderRadius: 10,
    height: "auto",
    width: 350,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00396A",
    textAlign: "center",
    paddingTop: 30,
    paddingBottom: 20,
  },
  containerInput: {
    paddingHorizontal: 25,
  },
  label: {
    color: "#00396A",
  },
  logo: {
    height: 200,
    resizeMode: "contain",
  },
  button: {
    width: 150,
    alignSelf: "center",
    marginTop: 20,
    backgroundColor: "#00396A",
    marginBottom: 40,
    borderRadius: 10,
  },
  input: {
    fontSize: 14,
  },
  errors: {
    color: "red",
    marginBottom: 8,
    marginLeft: 10,
  },
  icons: {
    color: "#00396A",
    paddingRight: 10,
  },
  footer: {
    flexDirection: "column",
    alignItems: "flex-end",
    alignContent: "flex-end",
    backgroundColor: "transparent",
  },
  footertext: {
    color: "white",
    alignSelf: "flex-end",
  },
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
