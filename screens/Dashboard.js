import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
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
  const [model, setModel] = useState("");
  const FETCH_URL = "http://192.168.50.19:3000/users/";
  useEffect(() => {
    const getData = async () => {
      const apiResponse = await fetch(FETCH_URL);
      const data = await apiResponse.json();
      setData(data);
    };
    getData();
  }, []);
  async function postScooter(modelParam) {
    await fetch(FETCH_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(modelParam),
    })
      .then((response) => response.json())
      .then((responseJson) => {})
      .catch((error) => {
        console.warn(error);
      });

    const getData = async () => {
      const apiResponse = await fetch(FETCH_URL);
      const data = await apiResponse.json();
      setData(data);
    };
    getData();
  }

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
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      <Text style={[styles.connecte]}>
        Connecté avec : {auth.currentUser?.email}
      </Text>

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
            <TextInput
              onChangeText={(text) => setModel({ model: text })}
              placeholder="Modèle"
              placeholderTextColor="#6b6767"
              style={styles.input}
            />
            <TouchableOpacity
              onPress={() => postScooter(model)}
              style={{
                borderRadius: 20,
                padding: 10,
                elevation: 2,
                marginBottom: "10px",
                backgroundColor: "#2196F3",
              }}
            >
              <Text style={styles.textStyle}>Créer</Text>
            </TouchableOpacity>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Fermer</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Enregistrer un scooter</Text>
      </Pressable>
      <TouchableOpacity
        onPress={handleSignOut}
        style={[styles.button, styles.buttonClose]}
      >
        <Text style={styles.textStyle}>Se déconnecter</Text>
      </TouchableOpacity>

      <List
        setData={setData}
        searchPhrase={searchPhrase}
        data={data}
        setClicked={setClicked}
      />
    </SafeAreaView>
  );
}
export default Dashboard;
const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "100px",
  },

  connecte: {
    margin: "10px",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: "20px",
    borderColor: "black",
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
    marginBottom: "10px",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },

  buttonOutline: {
    backgroundColor: "black",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: { color: "black", fontWeight: "700", fontSize: 16 },
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
