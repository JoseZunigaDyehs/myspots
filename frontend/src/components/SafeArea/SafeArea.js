import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import tw from "twrnc";

const SafeArea = ({ children }) => {
  return (
    <SafeAreaView
      style={[
        tw`android:pt-10 ios:pt-2 pl-4 pr-4 bg-white h-full`,
        styles.container,
      ]}
    >
      {children}
    </SafeAreaView>
  );
};

export default SafeArea;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
});
