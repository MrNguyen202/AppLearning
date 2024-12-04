import { Text, View, Image, TouchableOpacity, ImageBackground } from "react-native";
import React from "react";

const CategoryPopularComponent = ({ item }) => {
  return (
    <TouchableOpacity key={item.id} className={"my-2 mr-[11] h-28 w-44 flex-row items-center justify-center border-gray-300 border bg-slate-300"}>
      <ImageBackground source={{/* uri: "https://picsum.photos/200" */}} className={"w-44 h-28"} >
        <Text className={"text-white text-base absolute left-0 right-0 bottom-5 text-center"}>{item.name}</Text>
      </ImageBackground>
      
    </TouchableOpacity>
  );
};

export default CategoryPopularComponent;

