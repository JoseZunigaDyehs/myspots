import React, { useEffect, useState } from "react";
import { Button, Text, View, TextInput } from "react-native";
import tw from "twrnc";
import { useUser } from "../../../../context";

const MarkForm = ({ route: { params } }) => {
  const { addMarker } = useUser();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    setTitle("");
    setDescription("");
  }, [params]);
  return (
    <View style={[tw`h-full p-8 bg-blue-100 justify-between`]}>
      <Text style={tw`pb-4 text-xl`}>Create a marker</Text>
      <TextInput
        style={tw`pb-6 bg-white`}
        label="Description"
        placeholder="Description"
        onChangeText={(e) => setDescription(e)}
        value={description}
      />
      <TextInput
        onChangeText={(e) => setTitle(e)}
        style={tw`pb-6 bg-white`}
        label="Title"
        placeholder="Title"
        value={title}
      />
      <Button
        style={tw`p-8 bg-purple-800`}
        title="Create"
        onPress={() =>
          addMarker({
            latitude: params.latitude,
            longitude: params.longitude,
            title,
            description,
          })
        }
      ></Button>
    </View>
  );
};

export default MarkForm;
