import React, { useState } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";

function Input({ label = "", placeholder = "" }) {
  const [value, setValue] = useState();
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        onChangeText={(text) => setValue(text)}
        placeholder={placeholder}
        style={styles.input}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  container: {
    // justifyContent: "flex-start",
    // flexDirection: "column",
  },
  label: {
    fontSize: 14,
    color: "#555",
    lineHeight: 30,
  },
  input: {
    borderRadius: 20,
    borderColor: "#bebebe",
    // border: "1px solid",
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
});
