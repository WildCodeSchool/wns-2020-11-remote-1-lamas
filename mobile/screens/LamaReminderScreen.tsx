import React, { useEffect, useState } from "react";
import { StyleSheet, Modal, Pressable, Image } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { LinearGradient } from "expo-linear-gradient";
import {
  Fab,
  Icon,
  Container,
  Header,
  Content,
  List,
  ListItem,
} from "native-base";

import IconAnt from "react-native-vector-icons/AntDesign";
import { Text, View } from "../components/Themed";
import { Input } from "react-native-elements";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_TODO,
  DELETE_TODO,
  GET_TODOS,
  UPDATE_TODO,
} from "../graphql/TodoGraph";

interface ItodoText {
  _id: string;
  todo_name: string;
  isChecked: boolean;
}

interface Itodo {
  getTodos: ItodoText[];
}

interface ItodoEdited {
  name: string;
  _id?: string;
}

export default function LamaReminderScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [todo, setTodo] = useState("");
  const [todoEdited, setTodoEdited] = useState<ItodoEdited>();

  const [todoList, setTodoList] = useState<Itodo>();
  const [createTodo] = useMutation(CREATE_TODO, {
    errorPolicy: "all",
    refetchQueries: [{ query: GET_TODOS }],
  });

  const { data } = useQuery(GET_TODOS);

  useEffect(() => {
    if (data) {
      setTodoList(data);
    }
  }, [data]);

  const [updateTodo, { error }] = useMutation(UPDATE_TODO, {
    errorPolicy: "all",
    refetchQueries: [{ query: GET_TODOS }],
  });

  const [deleteTodo] = useMutation(DELETE_TODO, {
    errorPolicy: "all",
    refetchQueries: [{ query: GET_TODOS }],
  });

  const handleSubmit = () => {
    const values = { todo_name: todo, isChecked: false };
    createTodo({ variables: { ...values } });
    setTodo("");
    setIsModalOpen(false);
  };

  const handleSubmitEditing = () => {
    const values = { _id: todoEdited?._id, todo_name: todoEdited?.name };
    updateTodo({ variables: { ...values } });
    setTodoEdited({ _id: "", name: "" });
    setIsEditing(false);
  };

  const handleEditing = (_id: string, name: string) => {
    const data = { _id, name };
    setIsEditing(true);
    setTodoEdited((prevstate) => ({ ...prevstate, ...data }));
  };

  const renderTodoItems = () => {
    return todoList?.getTodos?.map((todo) => {
      return (
        <>
          <ListItem style={styles.itemsContainer}>
            <View style={styles.items}>
            <CheckBox
              value={todo.isChecked}
              onValueChange={(isChecked) =>
                updateTodo({ variables: { _id: todo._id, isChecked } })
              }
              tintColors={{true:'#00396A', false:'#00396A'}}

            />
            <Text>{todo.todo_name}</Text>
            </View>
            <View style={styles.items}>
            <IconAnt
              style={styles.editIcon}
              name="edit"
              size={18}
              color="#00396A"
              onPress={() => handleEditing(todo._id, todo.todo_name)}
            />
            <IconAnt
              name="delete"
              size={18}
              color="#EA2E2E"
              onPress={() => deleteTodo({ variables: { _id: todo._id } })}
            />
            </View>
          </ListItem>
        </>
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
      <Image
        source={require("../assets/images/logowhite.png")}
        style={styles.logo}
      />
        <Text style={styles.headerText}>N'oublies pas, petit lama</Text>
      </View>
      <Content>
        <List>{todoList && renderTodoItems()}</List>
      </Content>

      <Fab
        style={styles.fab}
        direction="up"
        containerStyle={{}}
        position="bottomRight"
        onPress={() => setIsModalOpen(true)}
      >
        <Icon name="add" />
      </Fab>
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={isEditing}
        onRequestClose={() => {
          setIsEditing(false);
        }}
      >
        <View style={styles.centeredView}>
        <View style={styles.modalView}>
        <View style={styles.containerInput}>
          <Input
            onChangeText={(text) =>
              setTodoEdited((prevstate) => ({ ...prevstate, name: text }))
            }
            value={todoEdited?.name}
            style={styles.input}
          />
          </View>
        <Pressable
          onPress={() => handleSubmitEditing()}
          style={[styles.button, styles.buttonClose]}
        >
          <Text>Update la todo</Text>
        </Pressable>
        </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  editIcon: {
    marginRight: 20
  },
  itemsContainer: {
    justifyContent: 'space-between'
  },
  items: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  fab: {
    backgroundColor: '#00396A'
  },
  headerContainer: {
    paddingBottom: 60,
    backgroundColor: '#00396A',
    alignItems: 'center'
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 23,
    paddingTop: 50
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  container: {
    flex: 1
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
  logo: {
    height: 200,
    resizeMode: "contain",
  },
});
