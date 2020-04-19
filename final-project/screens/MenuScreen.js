import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { db, firestore, auth } from "../FirebaseConfig";
import { styles } from "../styles/styles";
import { useKeepAwake } from "expo-keep-awake";

const things = [
  { thing: "a thing here", text: "here is some text" },
  { thing: "another thing", text: "more text" },
];

const MenuScreen = (props) => {
  // firebase auth states
  const [registrationEmail, setRegistrationEmail] = useState("");
  const [registrationPass, setRegistrationPass] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [databaseData, setDatabaseData] = useState("");
  const [userLists, setUserLists] = useState([]);

  const registerWithFirebase = () => {
    if (registrationEmail.length < 4) {
      Alert.alert("Please enter an email address.");
      return;
    }

    if (registrationPass.length < 4) {
      Alert.alert("Please enter a password.");
      return;
    }

    auth
      .createUserWithEmailAndPassword(registrationEmail, registrationPass)
      .then(function (_firebaseUser) {
        Alert.alert("user registered");

        setRegistrationEmail("");
        setRegistrationPass("");
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode == "auth/weak-password") {
          Alert.alert("The password is too weak.");
        } else {
          Alert.alert(errorMessage);
        }
        console.log(error);
      });
  };

  const loginWithFirebase = () => {
    if (loginEmail.length < 4) {
      Alert.alert("Please enter an email address");
      return;
    }

    if (loginPass.length < 4) {
      Alert.alert("Please enter a password.");
      return;
    }

    auth
      .signInWithEmailAndPassword(loginEmail, loginPass)
      .then(function (_firebaseUser) {
        Alert.alert("user logged in!");
        setLoggedIn(true);
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === "auth/wrong-password") {
          Alert.alert("Wrong password");
        } else {
          Alert.alert(errorMEssage);
        }
      });
  };

  const signoutWithFirebase = () => {
    auth.signOut().then(function () {
      if (!auth.currentUser) {
        Alert.alert("user was logged out!");
        setLoggedIn(false);
      }
    });
  };

  function saveDataWithFirebase() {
    // when saving data to create a new collection you can use SET
    // and wehn updating you can use UPDATE (refer to docs)
    // https://firebase.google.com/docs/firestore/manage-data/add-data
    var userId = auth.currentUser.uid;

    db.ref("users/" + userId).set({
      text: databaseData,
    });
  }

  function retrieveDataFromFirebase() {
    // when loading data, you can either fetch the data once like in these examples
    //  https://firebase.google.com/docs/firestore/query-data/get-data
    // or you can listen to the collection and whenever it is updated on server it can
    // be handled automatically by your code
    // http://firebase.google.com/docs/firestore/query-data/listen
    var userId = auth.currentUser.uid;

    // Load from realtime DB
    db.ref("/users/" + userId)
      .once("value")
      .then(function (snapshot) {
        setDatabaseData(snapshot.val().text);
      });
  }
  useKeepAwake();

  return (
    <View style={styles.audioscreen}>
      <Text style={{ color: "white", fontSize: 30 }}>Navigation buttons</Text>
      <Button
        title="Audio List"
        color="#3D5168"
        // NOTE(CK): Thing1 - this is the name of the screen we named it in AppNavigator.js
        onPress={() => props.navigation.navigate("AudioScreen", things[0])}
      />
      <Button
        title="Create List"
        color="#3D5168"
        onPress={() => props.navigation.navigate("ListScreen", things[0])}
      />
      <Button
        title="Confirm Pick Up"
        color="#3D5168"
        onPress={() => props.navigation.navigate("SMSScreen", things[1])}
      />
      {userLists.length > 0 && <View>{}</View>}
      {!loggedIn && (
        <View>
          <Text style={{ color: "#FFFFFF" }}>Login</Text>
          <TextInput
            onChangeText={(value) => setRegistrationEmail(value)}
            autoCapitalize="none"
            autoCorrect={false}
            autocompletetype="email"
            keyboardType="email-address"
            placeholder="email"
            style={styles.inputText}
          />
          <TextInput
            onChangeText={(value) => setRegistrationPass(value)}
            autoCapitalize="none"
            autoCorrect={false}
            autocompletetype="password"
            // keyboardType="visible-password"
            placeholder="password"
            style={styles.inputText}
          />
          <Button title="Register" onPress={registerWithFirebase} />
          <Text style={{ color: "#FFFFFF" }}>Sign in</Text>
          <TextInput
            onChangeText={(value) => setLoginEmail(value)}
            autoCapitalize="none"
            autoCorrect={false}
            autocompletetype="email"
            keyboardType="email-address"
            placeholder="email"
            style={styles.inputText}
          />
          <TextInput
            onChangeText={(value) => setLoginPass(value)}
            autoCapitalize="none"
            autoCorrect={false}
            autocompletetype="password"
            // keyboardType="visible-password"
            placeholder="password"
            style={styles.inputText}
          />
          <Button title="Login" onPress={loginWithFirebase} color="#00FF00" />
        </View>
      )}
      {loggedIn && (
        <View>
          <TextInput
            multiline={true}
            numberOfLines={4}
            onChangeText={(value) => setDatabaseData(value)}
            value={databaseData}
            style={{ borderBottomWidth: 2, borderBottomColor: "black" }}
            style={styles.inputText}
          />
          <Button
            title="Save Data"
            onPress={saveDataWithFirebase}
            color="#00FF00"
          />
          <Button
            title="Load Data"
            onPress={retrieveDataFromFirebase}
            color="#00FF00"
          />
          <Button
            title="Sign Out"
            onPress={signoutWithFirebase}
            color="#00FF00"
          />
        </View>
      )}
    </View>
  );
};

export default MenuScreen;
