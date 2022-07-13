import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
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

  function dateFormat(variable) {
    var dateTime = variable;
    return Moment(dateTime).format("DD-MM-YYYY"); //basically you can do all sorts of the formatting and others
  }

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? (
        <Text>Chargement...</Text>
      ) : (
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: "green",
              textAlign: "center",
              paddingBottom: 10,
            }}
          >
            En cours de réparation:
          </Text>
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <Text>
                {item.identifiant +
                  " : " +
                  item.modele +
                  " : " +
                  dateFormat(item.date_entree)}
              </Text>
            )}
          />
          <Text
            style={{
              fontSize: 14,
              color: "green",
              textAlign: "center",
              paddingBottom: 10,
            }}
          >
            Prêts à être exportés:
          </Text>
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <Text>{item.name + " : " + item.email}</Text>
            )}
          />
        </View>
      )}
    </View>
  );
}
export default App;
