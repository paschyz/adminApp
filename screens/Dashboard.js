import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import List from "../components/List";
import SearchBar from "../components/SearchBar";
import Moment from "moment";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";
function Dashboard() {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const apiResponse = await fetch("http://192.168.50.19:3000/users");
      const data = await apiResponse.json();
      setData(data);
    };
    getData();
  }, []);

  // DELETE request using fetch with async/await
  async function deleteScooter(id) {
    await fetch("http://192.168.50.19:3000/users/" + id, { method: "DELETE" });
  }

  // empty dependency array means this effect will only run once (like componentDidMount in classes)

  function dateFormat(variable) {
    var dateTime = variable;
    return Moment(dateTime).format("DD-MM-YYYY"); //basically you can do all sorts of the formatting and others
  }
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
      {<List searchPhrase={searchPhrase} data={data} setClicked={setClicked} />}
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
});
