import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "../constants/Icon";
import enroll_courses from "../assets/data/enroll_course";

const ResultSearchComponent = ({ item, onPress }) => {
  return (
    <TouchableOpacity className={`flex-row mt-3`} onPress={onPress}>
      <Image source={{uri: item.course.image}} className={`w-[106] h-[92] rounded-md`} />
      <View className={`justify-between ml-4 w-3/5`}>
        <Text className={`font-bold text-lg`}>{item.course.title}</Text>
        <Text>{item.teacherName}</Text>
        <View className={`flex-row items-center justify-between`}>
          <View className={`flex-row`}>
            <Image source={Icon.user1}></Image>
            <Text className={`ml-1 text-[#666666cc] text-xs`}>
              {item.totalRegister} {" "}
              student
            </Text>
          </View>
          <View className={`flex-row `}>
            <Image source={Icon.star}></Image>
            <Text className={`ml-1 text-[#666666cc] text-xs`}>
              {item.course.rating}
            </Text>
          </View>
          <View >
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ResultSearchComponent;
