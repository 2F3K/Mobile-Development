import React, { useState, useEffect } from "react";
import { CheckBox, Text, View } from "react-native";
import { styles } from "../styles/styles";
import { TouchableOpacity } from "react-native-gesture-handler";

const Message = (props) => {
  const [checkedBox, setCheckedBox] = useState(false);
  const CheckHandler = () => {
    setCheckedBox(!checkedBox);
  };
  useEffect(() => {
    setCheckedBox(props.item.isChecked);
  }, []);
  return (
    <TouchableOpacity style={styles.listItemRow} onPress={CheckHandler}>
      <View style={styles.listItemCheckbox}>
        <CheckBox value={checkedBox} />
      </View>
      <View style={styles.listItemName}>
        <Text>{props.item.value}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default Message;
