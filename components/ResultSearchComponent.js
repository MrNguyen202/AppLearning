import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "../constants/Icon";
import enroll_courses from "../assets/data/enroll_course";

const ResultSearchComponent = ({ item, onPress }) => {
  return (
    <TouchableOpacity className={`flex-row mt-3`} onPress={onPress}>
      <Image source={item.image} className={`w-[106] h-[92] rounded-md`} />
      <View className={`justify-between ml-4 w-3/5`}>
        <Text className={`font-bold text-lg`}>{item.title}</Text>
        <Text>{item.teacher}</Text>
        <View className={`flex-row items-center justify-between`}>
          <View className={`flex-row`}>
            <Image source={Icon.user1}></Image>
            <Text className={`ml-1 text-[#666666cc] text-xs`}>
              {
                enroll_courses.filter((value) => {
                  return value.course == item.course_id;
                }).length
              }{" "}
              student
            </Text>
          </View>
          <View className={`flex-row `}>
            <Image source={Icon.star}></Image>
            <Text className={`ml-1 text-[#666666cc] text-xs`}>
              {item.rating}
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
