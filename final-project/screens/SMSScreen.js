import React, { useState } from "react";
import { Button, Text, View, Alert } from "react-native";
import * as SMS from "expo-sms";
import { TextInput } from "react-native-gesture-handler";
import { styles } from "../styles/styles";

const SMSScreen = () => {
  const [recipient, setRecipient] = useState("");
  const [number, setNumber] = useState("");

  const recipientHanlder = (value) => {
    setRecipient(value);
  };

  const numberHandler = (number) => {
    setNumber(number);
  };

  sendSMS = async () => {
    const isAvaliable = await SMS.isAvailableAsync(); // Implmementation of SMS
    if (isAvaliable) {
      const { result } = await SMS.sendSMSAsync(
        [number],
        "Hello, " + recipient + " I got the grocceries"
      );
    } else {
      Alert.alert("Error", "Message not sent"); // Implementation of alert
    }
  };

  return (
    <View style={styles.audioscreen}>
      <View>
        <Text style={{ color: "white", fontSize: 30, paddingBottom: 30 }}>
          Text Sender
        </Text>
      </View>
      <TextInput
        style={styles.inputText}
        placeholder="Name"
        onChangeText={recipientHanlder}
        value={recipient}
      />
      <TextInput
        style={styles.inputText}
        placeholder="Number"
        onChangeText={numberHandler}
        value={number}
      />
      <View style={styles.textButton}>
        <Button title="Send text" color="#00FF00" onPress={sendSMS} />
      </View>
    </View>
  );
};

export default SMSScreen;
