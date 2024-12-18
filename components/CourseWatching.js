import { Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "../constants/Icon";

const CourseWatching = ({ item, getCourse }) => {

  const handleGetCourse = (it) => {
    getCourse(it);
  };

  return (
    <TouchableOpacity onPress={() => handleGetCourse(item.courseId)} key={item.courseId} className={"my-2 px-2 mr-[11] h-56 w-44 justify-evenly bg-white rounded-lg"}>
      <View>
        <Image source={{ uri: item.courseImage === null ? "https://res.cloudinary.com/dx0blzlhd/image/upload/v1732300310/appELearning/image-not-found_mdolip.jpg" : item.courseImage  }} className="w-40 h-28 rounded-lg" />
        <Text className={`absolute ml-2 mt-1 text-white bg-[#FD853A] rounded text-xs pl-2 pr-2 pt-1 pb-1 font-bold `}>{item.status}</Text>
      </View>
      <Text className="font-bold">{item.courseName}</Text>
      <Text>{item.teacherName}</Text>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Text>{item.rating ? item.rating.toFixed(1) : ""}</Text>
          <View className="flex-row ml-2">
            <Image source={Icon.star} />
            <Image source={Icon.star} />
            <Image source={Icon.star} />
            <Image source={Icon.star} />
            <Image source={Icon.star} />
          </View>
        </View>
        <Text>({item.totalFeedback})</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CourseWatching;

