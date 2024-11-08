import { Text, View, Image } from "react-native";
import React from "react";
import Icon from "../constants/Icon";

const CourseWatchingInMonthComponent = ({ item }) => {
  return (
    <View className={"my-2 mr-[11] h-48 w-44"}>
      <Image source={item.image} className="w-auto h-28 bg-slate-400 rounded"/>
      <Text>{item.title}</Text>
      <Text>{item.teacher}</Text>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Text>{item.rating}</Text>
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
    </View>
  );
};

export default CourseWatchingInMonthComponent;

