import React, { useEffect, useState } from "react";
import { FlatList, Text, View, TouchableOpacity } from "react-native";
import Moment from "moment";
function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

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
    setStatus("Delete successful");
  }

  // empty dependency array means this effect will only run once (like componentDidMount in classes)

  function dateFormat(variable) {
    var dateTime = variable;
    return Moment(dateTime).format("DD-MM-YYYY"); //basically you can do all sorts of the formatting and others
  }

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
    </View>
  );
}
export default App;
