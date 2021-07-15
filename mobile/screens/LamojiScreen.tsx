import React, {useEffect, useState} from "react";
import { View } from "../components/Themed";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import {HeaderContainer} from '../components/HeaderContainer';
import {
  List,
} from "native-base";
import {NavigationProps} from './LamasToolsScreen';
import socket from '../socket/socket';

export interface User {
  id: string;
  mood: string;
  actions: string[];
}

export default function LamojiScreen({ route, navigation }: NavigationProps) {
  const [studentInfos, setStudentInfos] = useState<User>({
    id: '',
    mood: '',
    actions: [],
  });
  
  const { roomId, userId } = route.params;

  useEffect(() => {
    if (roomId) {
      socket.emit('studentJoinTheRoom', roomId);
    }
  }, [roomId]);

  socket.on('userInfos', (userInfo: User) => {
    setStudentInfos(userInfo);
  });

  const handleClick = (name: string, category: string): void => {
    if (roomId) {
      socket.emit('changeMood', roomId, userId, name, category);
    }
  };

  const activeButton = (emojiName: string): any => {
    if (
      emojiName === studentInfos?.mood ||
      studentInfos?.actions?.includes(emojiName)
    ){
      return styles.activeLogo
    };
    return styles.logo;
  };

  return (
    <View style={styles.container}>
      <HeaderContainer text="Partages nous ton mood" />
      <List style={styles.list}>
        <View style={styles.imagesContainer}>
          <TouchableOpacity
              onPress={() => handleClick('happy', 'Emotion' )}
          >
            <Image
              source={require("../assets/images/icons_happy.png")}
              style={[styles.logo, activeButton('happy')]}
            />
          </TouchableOpacity>
          <TouchableOpacity
              onPress={() => handleClick('thinking', 'Emotion' )}
          >
            <Image
              source={require("../assets/images/icons_thinking.png")}
              style={[styles.logo, activeButton('thinking')]}
            />
          </TouchableOpacity>
          <TouchableOpacity
              onPress={() => handleClick('dead', 'Emotion' )}
          >
            <Image
              source={require("../assets/images/icons_dead.png")}
              style={[styles.logo, activeButton('dead')]}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.imagesContainer}>
          <TouchableOpacity onPress={() => handleClick('slowDown', 'Action' )}>
            <Image
              source={require("../assets/images/icons_slowdown.png")}
              style={[styles.logo, activeButton('slowDown')]}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleClick('question', 'Action' )}>
            <Image
              source={require("../assets/images/icons_question.png")}
              style={[styles.logo, activeButton('question')]}

            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleClick('coffee', 'Action' )}>
            <Image
              source={require("../assets/images/icons_break.png")}
              style={[styles.logo, activeButton('coffee')]}
            />
          </TouchableOpacity>
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
  },
  activeLogo: {
    opacity: 0.6,
    borderRadius:50,
    borderBottomWidth: 0,
    borderColor: "#fff",
    borderWidth: 55,
    padding:0,
  }
});
