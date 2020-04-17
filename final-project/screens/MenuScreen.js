import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { db, firestore, auth } from '../FirebaseConfig';
import { styles } from '../styles/styles';


const things = [
  { thing: "a thing here", text: "here is some text" },
  { thing: "another thing", text: "more text" }
];

const MenuScreen = props => {
  // firebase auth states 
  [registrationEmail, setRegistrationEmail] = useState('');
  [registrationPass, setRegistrationPass] = useState('');
  [loginEmail, setLoginEmail] = useState('');
  [loginPass, setLoginPass] = useState('');
  [loggedIn, setLoggedIn] = useState(false);
  [databaseData, setDatabaseData] = useState('');

  registerWithFirebase = () => {
    if (registrationEmail.length < 4) {
      Alert.alert('Please enter an email address.');
      return;
    }

    if (registrationPass.length < 4) {
      Alert.alert('Please enter a password.');
      return;
    }

    auth.createUserWithEmailAndPassword(registrationEmail, registrationPass)
      .then(function (_firebaseUser) {
        Alert.alert('user registered');

        setRegistrationEmail('');
        setRegistrationPass('');
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode == 'auth/weak-password') {
          Alert.alert('The password is too weak.');
        } 
        else {
          Alert.alert(errorMessage);
        }
        console.log(error);
      });
  };

  loginWithFirebase = () => {
    if (loginEmail.length < 4) {
      Alert.alert('Please enter an email address');
      return;
    }

    if (loginPass.length < 4) {
      Alert.alert('Please enter a password.');
      return;
    }

    auth.signInWithEmailAndPassword(loginEmail, loginPass)
      .then(function (_firebaseUser) {
        Alert.alert('user logged in!');
        setLoggedIn(true);
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          Alert.alert('Wrong password');
        }
        else {
          Alert.alert(errorMEssage)
        }
      });
  };

  signoutWithFirebase = () => {
    auth.signOut().then(function () {
      if (!auth.currentUser) {
        Alert.alert('user was logged out!');
        setLoggedIn(false);
      }
    });
  };

  function saveDataWithFirebase() {
    // when saving data to create a new collection you can use SET
    // and wehn updating you can use UPDATE (refer to docs)
    // https://firebase.google.com/docs/firestore/manage-data/add-data

    var userId = auth.currentUser.uid;

    db.ref('users/' + userId).set({
      text: databaseData
    });

    // SAVE DATA TO FIRESTORE
    firestore.collection('users').doc(userId).set(
      {
        text: databaseData,
      },
      {
        merge: true // set with merge set to true to make sure we don't remove data we didn't intend to
      }
    )
    .then(function () {
      Alert.alert('Document successfully written!');
    })
    .catch(function (error) {
      Alert.alert('Error writing document');
      console.log('Error writing document: ', error);
    })
  };

  function retrieveDataFromFirebase() {
    // when loading data, you can either fetch the data once like in these examples
    //  https://firebase.google.com/docs/firestore/query-data/get-data
    // or you can listen to the collection and whenever it is updated on server it can
    // be handled automatically by your code
    // http://firebase.google.com/docs/firestore/query-data/listen

    var userId = auth.currentUser.uid;

    /*
   // read once from data store
    firestore.collection("users").doc(userId).get()
      .then(function(doc) {
        if (doc.exists) {
          setDatabaseData(doc.data().text);
          console.log("Document data:", doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("no such doc!");
        }
      })
      .catch(function(error) {
        console.log("Error getting doc:", error);
      });
    */

   
   // real time updates 
   firestore.collection("users").doc(userId).onSnapshot(function (doc) {
     setDatabaseData(doc.data().text);
     console.log("Document data:", doc.data());
    });
  };

  return (
    <View style={styles.mainscreen}>
      <Text>Navigation buttons</Text>
      <Button
        title="Audio List"
        color="#3D5168"
        // NOTE(CK): Thing1 - this is the name of the screen we named it in AppNavigator.js
        onPress={() => props.navigation.navigate("AudioScreen", things[0])}
      />
      <Button
        title="Confirm Pick Up"
        color="#3D5168" 
        onPress={() => props.navigation.navigate("SMSScreen", things[1])}
      />
      {!loggedIn &&
        <View>
          <Text>Login</Text>
          <TextInput
            onChangeText={(value) => setRegistrationEmail(value) }
            autoCapitalize="none"
            autoCorrect={false}
            autoCompleteType="email"
            keyboardType="email-address"
            placeholder="email"
          />
          <TextInput
            onChangeText={(value) => setRegistrationPass(value) }
            autoCapitalize="none"
            autoCorrect={false}
            autoCompleteType="password"
            keyboardType="visible-password"
            placeholder="password"
          />
          <Button title="Register" onPress={registerWithFirebase} />
          <Text>Sign in</Text>
          <TextInput
            onChangeText={(value) => setLoginEmail(value) }
            autoCapitalize="none"
            autoCorrect={false}
            autoCompleteType="email"
            keyboardType="email-address"
            placeholder="email"
          />
          <TextInput
            onChangeText={(value) => setLoginPass(value) }
            autoCapitalize="none"
            autoCorrect={false}
            autoCompleteType="password"
            keyboardType="visible-password"
            placeholder="password"
          />
          <Button title="Login" onPress={loginWithFirebase} />
        </View>
      }
      {loggedIn &&
        <View>
          <TextInput
            multiline={true}
            numberOfLines={4}
            onChangeText={(value) => setDatabaseData(value) }
            value={databaseData}
            style={{ borderBottomWidth: 2, borderBottomColor: 'black' }}
          />
          <Button title="Save Data" onPress={saveDataWithFirebase} />
          <Button title="Load Data" onPress={retrieveDataFromFirebase} />
          <Button title="Sign Out" onPress={signoutWithFirebase} />
        </View>
      }
    </View>
  );
};

export default MenuScreen;