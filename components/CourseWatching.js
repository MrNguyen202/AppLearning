import { Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "../constants/Icon";

const CourseWatching= ({ item, getCourse }) => {

  const handleGetCourse = (it) => {
    getCourse(it);
  };

  return (
    <TouchableOpacity onPress={() => handleGetCourse(item)} key={item.id} className={"my-2 px-2 mr-[11] h-56 w-44 justify-evenly bg-white rounded-lg"}>
      <Image source={{uri: item.image}} className="w-40 h-28 rounded-lg"/>
      <Text className="font-bold">{item.title}</Text>
      <Text>{item.teacher.name}</Text>
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
        <Text>({item.feedbacks.length})</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CourseWatching;

