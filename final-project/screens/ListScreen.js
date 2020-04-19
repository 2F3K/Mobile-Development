import React, { useState } from "react";
import { View, FlatList, Button } from "react-native";
import ListItem from "./ListItem";
import { TextInput } from "react-native-gesture-handler";
import { db, auth } from "../FirebaseConfig";
import { styles } from "../styles/styles";

const ListScreen = ({ route }) => {
  const { userId, userName } = route.params;
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

  function saveToDB() {
    //var userId = auth.currentUser.uid;
    if (userId != null) {
      db.ref("users/" + userId).set({
        list: itemsList,
        title: listTitle
      });
    } else {
      console.log("please login");
    }
  }

  function retrieveFromDB() {
    //var userId = auth.currentUser.uid;
    // Load from realtime DB
    if (userId != null) {
      db.ref('/users/' + userId).once('value').then(function (snapshot) {
        setItems(snapshot.val().list);
        setListTitle(snapshot.val().title);
      });
    } else {
      console.log("please login");
    }
  }

  return (
    <View style={styles.audioscreen}>
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
        <View style={styles.buttonContainer}>
          <Button title="Save" onPress={saveToDB} color="blue" />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Load" onPress={retrieveFromDB} color="blue" />
        </View>
      </View>
    </View>
  );
};
export default ListScreen;
