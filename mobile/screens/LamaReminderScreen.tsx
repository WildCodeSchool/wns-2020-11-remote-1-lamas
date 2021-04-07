import React, { useEffect, useState } from "react";
import { StyleSheet, Modal, Pressable } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { LinearGradient } from "expo-linear-gradient";
import { Fab, Icon } from "native-base";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { Input } from "react-native-elements";
import { ScrollView } from "react-native";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_TODO,
  DELETE_TODO,
  GET_TODOS,
  UPDATE_TODO,
} from "../graphql/TodoGraph";

// Fab button qui ouvre une modal avec un input pour insérer une nouvelle todo
// state pour gérer
// .map des todo items (ScrollView) avec checkbox
//
export default function LamaReminderScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState();
  const [createTodo] = useMutation(CREATE_TODO, {
    errorPolicy: "all",
  });

  const handleSubmit = () => {
    const values = { todo_name: "je suis todo", isChecked: true };
    createTodo({ variables: { ...values } });
    setTodo("");
    setIsModalOpen(false);
  };

  const { data } = useQuery(GET_TODOS);
  console.warn(data);

  useEffect(() => {
    setTodoList(data);
  }, []);

  const [updateTodo] = useMutation(UPDATE_TODO, {
    errorPolicy: "all",
  });

  const [deleteTodo] = useMutation(DELETE_TODO, {
    errorPolicy: "all",
  });

  // const renderTodoItems = () => {
  //   return todoList.map((todo) => {
  //     return (
  //       <View>
  //         <CheckBox value={todo.isChecked} />
  //         <Text>{todo.todo_name}</Text>
  //       </View>
  //     );
  //   });
  // };

  return (
    <View style={styles.container}>
      <CheckBox value={false} />
      <Text>Reminder !</Text>
      <Fab
        direction="up"
        containerStyle={{}}
        position="bottomRight"
        onPress={() => setIsModalOpen(true)}
      >
        <Icon name="add" />
      </Fab>
      {/* <ScrollView>

      </ScrollView> */}

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
                placeholder="Write your todo"
                onChangeText={setTodo}
                value={todo}
                style={styles.input}
              />
            </View>
            <Pressable
              onPress={() => handleSubmit()}
              style={[styles.button, styles.buttonClose]}
            >
              <Text>Ajouter la todo</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 56,
    position: "absolute",
    left: "15%",
    top: "40%",
    fontWeight: "bold",
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
  button: {
    borderRadius: 20,
    padding: 12,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
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
});
