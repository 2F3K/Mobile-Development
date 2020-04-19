import React, { useState } from "react";
import { View, FlatList } from "react-native";
import ListItem from "./ListItem";
import { styles } from "../styles/styles";
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
