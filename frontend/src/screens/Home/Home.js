import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeArea } from "../../components";

const Home = ({ navigation }) => {
  return (
    <SafeArea>
      <Text>I'm on HOme</Text>
      <Text onPress={() => navigation.navigate("Login")}>GO TO LOGIN</Text>
      <Text onPress={() => navigation.navigate("Map")}>GO TO MAP</Text>
    </SafeArea>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
