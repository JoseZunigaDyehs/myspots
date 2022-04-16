import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SearchLocation } from "../../components";
import { usePoints, useUser } from "../../context";
import MapView, { Marker } from "react-native-maps";
import tw from "twrnc";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MarkForm } from "./components";

const Stack = createNativeStackNavigator();

const Map = ({ navigation }) => {
  const { point, addMarker } = usePoints();
  const { user } = useUser();
  const [openForm, setOpenForm] = useState(false);
  console.log(user.markers);
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <SearchLocation />
      <MapView
        style={tw`${openForm ? "h-1/2" : "h-full"} bg-purple-900`}
        initialRegion={{
          ...user.currentMarker.latlng,
        }}
        region={{
          ...user.currentMarker.latlng,
        }}
        mapType="mutedStandard"
        onLongPress={({
          nativeEvent: {
            coordinate: { latitude, longitude },
          },
        }) => {
          setOpenForm(true);
          
          navigation.navigate("MarkForm", {
            latitude,
            longitude,
          });
        }}
      >
        {user.markers?.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
      <Stack.Navigator>
        <Stack.Screen
          name="MarkForm"
          component={MarkForm}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
