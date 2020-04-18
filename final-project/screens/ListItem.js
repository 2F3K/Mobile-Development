import React, { useState } from "react";
import { CheckBox, StyleSheet, Text, View } from "react-native";
const Message = (props) => {
  const [itemChecked, setChecked] = useState(false);
  return (
    <View style={styles.listItemRow}>
      <View style={styles.listItemCheckbox}>
        <CheckBox
          checked={itemChecked}
          onPress={() => setChecked({ checked: !itemChecked })}
        />
      </View>
      <View style={styles.listItemName}>
        <Text>{props.name}</Text>
      </View>
    </View>
  );
};
export default Message;

const styles = StyleSheet.create({
  listItemRow: {
    position: "relative",
    padding: "12",
    margin: "4",
    height: "40px",
    backgroundColor: "rgba(100,100,100, 0.25)",
  },

  listItemCheckbox: { width: "20px", height: "20px" },

  listItemName: {
    overflow: "hidden",
  },
});
