import { Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

const CategoryPopularComponent = ({item}) => {
  return (
    <TouchableOpacity key={item.id} className={"my-2 mr-[11] h-28 w-44 pl-2 flex-row items-center border-gray-300 border bg-slate-300"}>
      <Text className={"text-white text-base ml-2 absolute left-0 right-0 bottom-5 text-center"}>{item.name}</Text>
    </TouchableOpacity>
  );
};

export default CategoryPopularComponent;

