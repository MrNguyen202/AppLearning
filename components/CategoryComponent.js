import { Text, View } from "react-native";
import React from "react";
import Icon from "../constants/Icon";

const CategoryComponent = ({item, index}) => {
  return (
    <View className={"h-14 w-44 m-3 flex-row items-center"}>
      <View style={{backgroundColor: item.bgColor}} className={"w-14 h-14 justify-center items-center rounded-md"}>
        {/* <Icon type={item.typeIcon} name={item.nameIcon} size={24} color={"white"}/> */}
      </View>
      <Text className={"text-xl ml-2"}>{item.title}</Text>
    </View>
  );
};

export default CategoryComponent;

