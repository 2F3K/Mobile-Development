import React, { useState } from "react";

import { View, TextInput, Button } from "react-native";
import { styles } from "../styles/styles";

const ListItemInput = (props) => {
  const [listName, setListName] = useState("");

  const listItemNameHandler = (value) => {
    setListName(value);
  };

  const addItemHandler = () => {
    props.onAddItem([listName]);
  };

  return (
    <View style={styles.listContainer}>
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
  );
};

export default ListItemInput;
