import { Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

const CategoryComponent = ({item}) => {
  return (
    <TouchableOpacity className={"my-2 h-12 w-44 pl-2 flex-row items-center border-gray-300 border rounded "}>
      <Image source={item.image} className={"w-7 h-7"}></Image>
      <Text className={"text-base ml-2"}>{item.name}</Text>
    </TouchableOpacity>
  );
};

export default CategoryComponent;

