import React, { useState } from "react";
import { View, FlatList, Button } from "react-native";
import ListItem from "./ListItem";
import { TextInput } from "react-native-gesture-handler";
import { styles } from "../styles/styles";

const ListScreen = ({ route }) => {
  const { thing, text } = route.params;
  const [listTitle, setListTitle] = useState("");
  const [itemsList, setItems] = useState([]);
  const [itemName, setItemName] = useState("");

  const listTitleHandler = (title) => {
    setListTitle(title);
  };

  const addItemHandler = () => {
    if (itemName !== "") {
      setItems((itemsList) => [
        ...itemsList,
        {
          key: (Math.random() * 100).toString(),
          value: itemName,
          isChecked: false,
        },
      ]);
    }
  };

  const listItemNameHandler = (value) => {
    setItemName(value);
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
          renderItem={(itemData) => <ListItem item={itemData.item} />}
        />
        <View style={styles.inputText}>
          <TextInput
            placeholder="Item"
            onChangeText={listItemNameHandler}
            value={itemName}
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
