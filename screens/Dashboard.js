import React, { useEffect, useState } from "react";
import { FlatList, Text, View, TouchableOpacity } from "react-native";
import Moment from "moment";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";
function Dashboard() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    fetch("http://192.168.50.19:3000/users")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
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
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? (
        <Text>Chargement...</Text>
      ) : (
        <View>
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View
                style={{
                  backgroundColor: "grey",
                  padding: 15,
                  margin: 5,
                  borderWidth: 2,
                }}
              >
                <Text>{item.identifiant}</Text>
                <Text style={{ flex: 1, justifyContent: "flex-end" }}>
                  {dateFormat(item.date_entree)}
                </Text>
                <Text>{item.modele}</Text>
                <TouchableOpacity onPress={() => deleteScooter(item.id)}>
                  <Text
                    style={{
                      backgroundColor: "grey",
                      padding: 2,
                      margin: 2,
                      borderWidth: 2,
                    }}
                  >
                    -
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}
      <View>
        <TouchableOpacity onPress={handleSignOut}>
          <Text>Sign out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default Dashboard;