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
        <Input
          label="Correo/Username"
          placeholder="Ingresa tu correo/username"
        />
      </View>
      <View>
        <Input label="Password" placeholder="Ingresa tu password" />
      </View>
    </SafeArea>
  );
}

export default Login;
