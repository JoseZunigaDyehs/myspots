import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Home, Login, Map } from "../screens";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const routes = [
  { name: "HOME", component: Home },
  { name: "Login", component: Login },
  { name: "Map", component: Map },
];

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {routes.map((route, index) => (
          <Stack.Screen key={index} {...route} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
