import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Input, SafeArea } from "../../components";
import tw from "twrnc";

function Login() {
  return (
    <SafeArea>
      <View style={tw``}>
        <Text style={tw``}>Ingresa tus datos</Text>
      </View>
      <View>
        <Input label="Correo" placeholder="Ingresa tu correo" />
      </View>
    </SafeArea>
  );
}

export default Login;
