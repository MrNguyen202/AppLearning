import { Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "../constants/Icon";

const CourseWatching= ({ item }) => {
  return (
    <TouchableOpacity className={"my-2 mr-[11] h-56 w-44 justify-evenly"}>
      <Image source={item.image} className="w-44 h-28 rounded-lg"/>
      <Text className="font-bold">{item.title}</Text>
      <Text>{item.teacher}</Text>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Text>{(item.rating).toFixed(1)}</Text>
          <View className="flex-row ml-2">
            <Image source={Icon.star} />
            <Image source={Icon.star} />
            <Image source={Icon.star} />
            <Image source={Icon.star} />
            <Image source={Icon.star} />
          </View>
        </View>
        <Text>({item.totalReview})</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CourseWatching;

