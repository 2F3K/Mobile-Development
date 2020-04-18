import React from "react";
import { Button, Text, View, Alert } from "react-native";
import * as SMS from "expo-sms";

const SMSScreen = ({ route }) => {
  sendSMS = async () => {
    const isAvaliable = await SMS.isAvailableAsync(); // Implmementation of SMS
    if (isAvaliable) {
      const { result } = await SMS.sendSMSAsync(
        ["0987654321"],
        "Hello, I got the grocceries"
      );
    } else {
      Alert.alert("Error", "Message not sent"); // Implementation of alert
    }
  };

  return (
    <View>
      <Button title="Send text" color="#3D5168" onPress={sendSMS} />
    </View>
  );
};

export default SMSScreen;
