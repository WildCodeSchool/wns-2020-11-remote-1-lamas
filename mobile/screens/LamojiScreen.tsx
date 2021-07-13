import React from "react";
import { View } from "../components/Themed";
import { StyleSheet, Image } from "react-native";
import {HeaderContainer} from '../components/HeaderContainer';
import {
  List,
} from "native-base";
import {NavigationProps} from './LamasToolsScreen';

export default function LamojiScreen({ route, navigation }: NavigationProps) {
  const { roomId, userId } = route.params;
  console.log('récupération de roomId, userId : ', roomId, userId)

  return (
    <View style={styles.container}>
      <HeaderContainer text="Lamoji blabla" />
      <List style={styles.list}>
        <View style={styles.imagesContainer}>
          <Image
            //onPress={() => }
            source={require("../assets/images/icons_happy.png")}
            style={styles.logo}
          />
          <Image
            //onPress={() => }
            source={require("../assets/images/icons_thinking.png")}
            style={styles.logo}
          />
          <Image
            //onPress={() => }
            source={require("../assets/images/icons_dead.png")}
            style={styles.logo}
          />
        </View>
        <View style={styles.imagesContainer}>
          <Image
            //onPress={() => }
            source={require("../assets/images/icons_slowdown.png")}
            style={styles.logo}
          />
          <Image
            //onPress={() => }
            source={require("../assets/images/icons_question.png")}
            style={styles.logo}
          />
          <Image
            //onPress={() => }
            source={require("../assets/images/icons_break.png")}
            style={styles.logo}
          />
        </View>
      </List>
    </View>
  );
}
const styles = StyleSheet.create({
  itemsContainer: {
    justifyContent: 'space-between'
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#00396A",
    justifyContent: "space-around",
  },
  text: {
    fontSize: 56,
    position: "absolute",
    left: "15%",
    top: "40%",
    fontWeight: "bold",
  },
  button: {
    borderRadius: 20,
    padding: 12,
    elevation: 2,
  },
  logo: {
    height: 100,
    width:100,
    resizeMode: "contain",
    margin:10
  },
  imagesContainer: {    
    backgroundColor: "#00396A",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    marginBottom: "40%",
  }
});
