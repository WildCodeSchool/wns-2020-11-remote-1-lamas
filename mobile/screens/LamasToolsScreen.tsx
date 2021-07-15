import * as React from "react";
import { StyleSheet, TouchableOpacity, Modal, Pressable, Image } from "react-native";
import { Text, View } from "../components/Themed";
import {
  StackNavigationProp,
} from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { LinearGradient } from "expo-linear-gradient";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  Icon,
} from "native-base";
import { Input } from "react-native-elements";
import { useQuery } from "@apollo/client";
import { GET_ROOMS } from "../graphql/getRooms";
import { IRoom } from '../types';
import { RouteProp } from '@react-navigation/native';

export type NavigationProps = {
  navigation: StackNavigationProp<RootStackParamList, "LamaReminderScreen">;
  route: RouteProp<{ params: { userId: string, roomId?: string } }, 'params'>
};

export default function LamasToolsScreen({ route, navigation }: NavigationProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [roomId, setRoomId] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const { userId } = route.params;
  const { data } = useQuery(GET_ROOMS);

  const handleSubmit = () => {
    const selectedRoom = data.getRooms.find(
      (item: IRoom) => item._id === roomId
    );

    if (!selectedRoom) {
      setErrorMessage("Cette salle n'existe pas");
    } else {
      navigation.navigate("LamojiScreen", {roomId, userId})
      setRoomId('');
      setErrorMessage('');
      setIsModalOpen(false);
    }
  };

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
          onPress={() => setIsModalOpen(true)}
        >
          <Image
            style={styles.iconImage}
            source={require("../assets/images/icons_happy.png")}
          />
          <View style={styles.buttonShape}>
            <Text style={styles.titleButton}>Lamoji</Text>
          </View>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalOpen}
          onRequestClose={() => {
            setIsModalOpen(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Icon
                style={styles.iconModal}
                ios="close"
                android="close"
                onPress={() => setIsModalOpen(false)}
              />
              <View style={styles.containerInput}>
                <Input
                  placeholder="id de la salle"
                  onChangeText={setRoomId}
                  value={roomId}
                  style={styles.input}
                />
                {errorMessage !== '' && <Text style={styles.errorMessage}>{errorMessage}</Text>}
              </View>
              <Pressable
                onPress={() => handleSubmit()}
                style={[styles.button, styles.buttonClose]}
              >
                <Text>Rejoindre la salle</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
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
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    width: wp("100%"),
    textAlign: "center",
  },
  button: {
    borderRadius: 20,
    padding: 12,
    elevation: 2,
    backgroundColor: "#00396A",
    color: 'white'
  },
  buttonShape: {
    backgroundColor: "white",
    paddingRight: 10,
    alignItems: "center",
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  containerInput: {
    paddingHorizontal: 25,
    width: 300,
  },
  input: {
    fontSize: 11,
  },
  iconModal: {
    marginLeft: 260,
  },
  errorMessage: {
    color: 'red',
    margin:0,
    marginTop: 10,
    marginLeft: 15,
    fontSize:11,
  }
});
