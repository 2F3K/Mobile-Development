import React, { useState, Fragment } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import ListItem from "./ListItem";
import ListItemInput from "./ListItemInput";
import { TextInput } from "react-native-gesture-handler";
const ListScreen = ({ route }) => {
  const { thing, text } = route.params;
  const [listTitle, setListTitle] = useState("");
  const [itemsList, setItems] = useState([]);
  const listTitleHandler = (title) => {
    setListTitle(title);
  };
  const AddItemHandler = (newItem) => {
    setItems((itemsList) => [
      ...itemsList,
      {
        key: (Math.random() * 100).toString(),
        value: newItem,
      },
    ]);
  };
  return (
    <View>
      <View>
        <TextInput
          style={styles.inputText}
          placeholder="List Title"
          onChangeText={listTitleHandler}
          value={listTitle}
        />
      </View>
      <View style={styles.List}>
        <FlatList
          data={itemsList}
          renderItem={(itemData) => (
            <ListItem id={itemData.item.key} name={itemData.item.value[0]} />
          )}
        />
        <ListItemInput onAddItem={AddItemHandler} />
      </View>
    </View>
  );
};
export default ListScreen;

const styles = StyleSheet.create({
  List: {
    padding: "4",
    margin: "4",
    alignContent: "center",
    width: "90%",
    minWidth: "90%",
  },
  inputText: {
    borderWidth: 1,
    borderColor: "blue",
    backgroundColor: "#fff",
    borderRadius: 4,
    padding: 10,
    margin: 5,
  },
});
