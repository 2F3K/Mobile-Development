import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { db, auth } from "../FirebaseConfig";
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
          Alert.alert(errorMessage);
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

  useKeepAwake();

  return (
    <View style={styles.mainscreen}>
      <Button
        title="Audio List"
        color="#3D5168"
        // NOTE(CK): Thing1 - this is the name of the screen we named it in AppNavigator.js
        onPress={() => props.navigation.navigate("AudioScreen", things[0])}
      />
      <Button
        title="Create List"
        color="#3D5168"
        onPress={() => props.navigation.navigate("ListScreen", { userId: auth.currentUser.uid, userName: auth.currentUser.displayName })}
      />
      <Button
        title="Confirm Pick Up"
        color="#3D5168"
        onPress={() => props.navigation.navigate("SMSScreen", things[1])}
      />
      {userLists.length > 0 && <View>{}</View>}
      {!loggedIn && (
        <View>
          <Text>Sign Up</Text>
          <TextInput
            onChangeText={(value) => setRegistrationEmail(value)}
            autoCapitalize="none"
            autoCorrect={false}
            autocompletetype="email"
            keyboardType="email-address"
            placeholder="email"
          />
          <TextInput
            onChangeText={(value) => setRegistrationPass(value)}
            autoCapitalize="none"
            autoCorrect={false}
            autocompletetype="password"
            // keyboardType="visible-password"
            placeholder="password"
          />
          <Button title="Register" onPress={registerWithFirebase} />
          <Text>Sign in</Text>
          <TextInput
            onChangeText={(value) => setLoginEmail(value)}
            autoCapitalize="none"
            autoCorrect={false}
            autocompletetype="email"
            keyboardType="email-address"
            placeholder="email"
          />
          <TextInput
            onChangeText={(value) => setLoginPass(value)}
            autoCapitalize="none"
            autoCorrect={false}
            autocompletetype="password"
            // keyboardType="visible-password"
            placeholder="password"
          />
          <Button title="Login" onPress={loginWithFirebase} />
        </View>
      )}
      {loggedIn && (
        <View>
          <Button title="Sign Out" onPress={signoutWithFirebase} />
        </View>
      )}
    </View>
  );
};

export default MenuScreen;
