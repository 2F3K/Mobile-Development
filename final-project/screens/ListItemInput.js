import React, { useState } from "react";

import { View, TextInput, StyleSheet, Button } from "react-native";

const ListItemInput = (props) => {
  const [listName, setListName] = useState("");

  const listItemNameHandler = (value) => {
    setListName(value);
  };

  const addItemHandler = () => {
    props.onAddItem([listName]);
    setListName("");
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
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <Button title="Add" onPress={addItemHandler} color="green" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
    marginVertical: 10,
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  inputText: {
    borderWidth: 1,
    borderColor: "blue",
    backgroundColor: "#fff",
    borderRadius: 4,
    padding: 10,
    margin: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    borderRadius: 4,
    padding: 10,
    margin: 5,
  },
  buttonContainer: {
    padding: 5,
    flex: 1,
  },
});

export default ListItemInput;
