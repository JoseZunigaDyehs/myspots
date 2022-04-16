import React from "react";
import { StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAP_API } from "@env";
import { usePoints } from "../../context";
const SearchLocation = () => {
  const { addPoint } = usePoints();
  return (
    <GooglePlacesAutocomplete
      nearbyPlacesAPI="GooglePlacesSearch"
      placeholder="Search"
      onPress={(data, details = null) => {
        addPoint(details?.geometry?.location);
      }}
      query={{
        key: GOOGLE_MAP_API,
        language: "en",
      }}
      fetchDetails={true}
      minLength={2}
      styles={{
        container: { flex: 0 },
        textInput: { fontSize: 18 },
      }}
      debounce={400}
      enablePoweredByContainer={false}
      // textInputProps={{
      //     InputComp: Input,
      //     leftIcon: { type: 'font-awesome', name: 'chevron-left' },
      //     errorStyle: { color: 'red' },
      //   }}
    />
  );
};

export default SearchLocation;

const styles = StyleSheet.create({});
