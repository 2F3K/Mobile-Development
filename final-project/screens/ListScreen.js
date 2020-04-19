import React, { useState } from "react";
import { View, FlatList, Button } from "react-native";
import ListItem from "./ListItem";
import { TextInput } from "react-native-gesture-handler";
import { styles } from "../styles/styles";

const ListScreen = ({ route }) => {
  const { thing, text } = route.params;
  const [listTitle, setListTitle] = useState("");
  const [itemsList, setItems] = useState([]);
  const [listName, setListName] = useState("");

  const listTitleHandler = (title) => {
    setListTitle(title);
  };
  const addItemHandler = (newItem) => {
    setItems((itemsList) => [
      ...itemsList,
      {
        key: (Math.random() * 100).toString(),
        value: newItem,
      },
    ]);
  };
  const listItemNameHandler = (value) => {
    setListName(value);
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
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputText}
            placeholder="Name"
            onChangeText={listItemNameHandler}
            value={listName}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Add" onPress={addItemHandler} color="green" />
        </View>
      </View>
    </View>
  );
};
export default ListScreen;
