// List.js
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Moment from "moment";
function dateFormat(variable) {
  var dateTime = variable;
  return Moment(dateTime).format("DD-MM-YYYY"); //basically you can do all sorts of the formatting and others
}
// definition of the Item, which will be rendered in the FlatList
const Item = ({ name, details, date, itemId, setData, data }) => {
  async function deleteScooter(id) {
    await fetch("http://192.168.50.19:3000/users/" + id, { method: "DELETE" });
    setData(data.filter((item) => item.id != id));
  }
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.details}>{details}</Text>
      <Text style={styles.details}>{dateFormat(date)}</Text>
      <TouchableOpacity onPress={() => deleteScooter(itemId)}>
        <Text
          style={{
            backgroundColor: "grey",
            padding: 2,
            margin: 2,
            borderWidth: 2,
          }}
        >
          Réparation terminée
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// the filter
const List = ({ searchPhrase, setClicked, data, setData }) => {
  const renderItem = ({ item }) => {
    // when no input, show all
    if (searchPhrase === "") {
      return (
        <Item
          name={item.code}
          details={item.model}
          date={item.started_at}
          itemId={item.id}
          setData={setData}
          data={data}
        />
      );
    }
    // filter of the name
    if (
      item.code
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return (
        <Item
          name={item.code}
          details={item.model}
          date={item.started_at}
          itemId={item.id}
          setData={setData}
          data={data}
        />
      );
    }
    // filter of the description
    if (
      item.model
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return (
        <Item
          name={item.code}
          details={item.model}
          date={item.started_at}
          itemId={item.id}
          setData={setData}
          data={data}
        />
      );
    }
  };

  return (
    <SafeAreaView style={styles.list__container}>
      <View
        onStartShouldSetResponder={() => {
          setClicked(false);
        }}
      >
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default List;

const styles = StyleSheet.create({
  list__container: {
    margin: 10,
    height: "85%",
    width: "100%",
  },
  item: {
    margin: 30,
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    fontStyle: "italic",
  },
});
