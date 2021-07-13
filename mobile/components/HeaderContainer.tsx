import * as React from 'react';
import { Text, View } from "../components/Themed";
import { StyleSheet, Image } from "react-native";

interface IHeaderContainer {
    text: string;
}

export const HeaderContainer = ({text}: IHeaderContainer) => {
    return <View style={styles.headerContainer}>
    <Image
      source={require("../assets/images/logowhite.png")}
      style={styles.logo}
    />
    <Text style={styles.headerText}>{text}</Text>
  </View>
}

export const styles = StyleSheet.create({
    headerContainer: {
      paddingBottom: 50,
      paddingTop: 50,
      backgroundColor: '#00396A',
      alignItems: 'center'
    },
    headerText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 23,
      paddingTop: 20
    },
    logo: {
      height: 100,
      resizeMode: "contain",
    },
  });
  