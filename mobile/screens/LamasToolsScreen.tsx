import * as React from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { Text, View } from "../components/Themed";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { RootStackParamList, LamasReminderParamList } from "../types";
import { LinearGradient } from "expo-linear-gradient";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export type NavigationProps = {
  navigation: StackNavigationProp<RootStackParamList, "LamaReminderScreen">;
};

export default function LamasToolsScreen({ navigation }: NavigationProps) {
  return (
    <LinearGradient
      style={styles.container}
      colors={["#0371c8", "#015ba2", "#00396A"]}
      start={{ x: 0.9, y: 0 }}
      end={{ x: 0.7, y: 0.9 }}
    >
      <Image
        source={require("../assets/images/logowhite.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>Lamas tools</Text>

      <View style={styles.menu}>
        <TouchableOpacity
          onPress={() => navigation.navigate("LamaReminderScreen")}
          style={styles.buttonTool}
        >
          <Image
            style={styles.iconImage}
            source={require("../assets/images/icons_happy.png")}
          />
          <View style={styles.buttonShape}>
            <Text style={styles.titleButton}>Laminder</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonTool}
          onPress={() => navigation.navigate("LamadoroScreen")}
        >
          <View style={styles.buttonShape}>
            <Text style={styles.titleButton}>Lamodoro</Text>
          </View>
          <Image
            style={styles.iconImage}
            source={require("../assets/images/icons_happy.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonTool}
          onPress={() => navigation.navigate("LamojiScreen")}
        >
          <Image
            style={styles.iconImage}
            source={require("../assets/images/icons_happy.png")}
          />
          <View style={styles.buttonShape}>
            <Text style={styles.titleButton}>Lamoji</Text>
          </View>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#00396A",
    justifyContent: "space-around",
  },
  menu: {
    backgroundColor: "transparent",
    // height: hp("60%"),
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    width: wp("100%"),
    textAlign: "center",
  },
  button: {
    backgroundColor: "#00396A",
  },
  buttonShape: {
    backgroundColor: "white",
    paddingRight: 10,
    alignItems: "center",
    //margin: 20,
    width: 200,
    height: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1.23,
    shadowRadius: 3.62,
  },
  titleButton: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00396A",
    marginTop: 5,
    fontFamily: "Chalkduster",
  },
  icons: {
    backgroundColor: "transparent",
    //color: 'white',
  },
  iconImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1.23,
    shadowRadius: 3.62,
  },
  buttonTool: {
    height: 120,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    transform: [{ rotate: "-5deg" }],
    marginBottom: 40,
  },
  logo: {
    height: 100,
    resizeMode: "contain",
  },
});
