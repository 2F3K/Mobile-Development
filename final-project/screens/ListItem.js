import React, { useState } from "react";
import { CheckBox, Text, View } from "react-native";
import { styles } from "../styles/styles";

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
