import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
  Pressable,
} from "react-native";
import List from "../components/List";
import SearchBar from "../components/SearchBar";

import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";
function Dashboard() {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const apiResponse = await fetch("http://192.168.50.19:3000/users");
      const data = await apiResponse.json();
      setData(data);
    };
    getData();
  }, []);

  //   fetch("http://192.168.50.19:3000/users", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       model: "test",
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       //Showing response message coming from serverconsole.warn(responseJson);
  //     })
  //     .catch((error) => {
  //       //display error message
  //       console.warn(error);
  //     });

  // empty dependency array means this effect will only run once (like componentDidMount in classes)

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };
  return (
    <SafeAreaView style={styles.root}>
      <Text>Email: {auth.currentUser?.email}</Text>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      {
        <List
          setData={setData}
          searchPhrase={searchPhrase}
          data={data}
          setClicked={setClicked}
        />
      }
      <TouchableOpacity
        onPress={handleSignOut}
        style={[styles.button, styles.buttonClose]}
      >
        <Text>Sign out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
export default Dashboard;
const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "50px",
  },
  title: {
    width: "100%",
    marginTop: 20,
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: "10%",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
