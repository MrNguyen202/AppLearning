import { Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "../constants/Icon";
import { useState } from "react";
import Course from "../assets/data/Course";
import User from "../assets/data/User";

const CourseWatching = ({ item }) => {

    const [CourseTemp, setCourseTemp] = useState(Course.filter((course) => course.course_id === item.course_id));
    const [UserTemp, setUserTemp] = useState(User.filter((user) => user.user_id === item.user_id));

    return (
        <TouchableOpacity className={"w-[360] bg-white h-[130] my-4 flex-row rounded-2xl shadow-xl"}>
            <View className="w-[130] bg-black rounded-l-2xl">
                <Image source={CourseTemp[0].image} className="w-full h-full object-contain rounded-l-2xl"></Image>
            </View>
            <View className="bg-white pl-3">
                <View className="my-3">
                    <Text className="text-[#FF6B00]">{CourseTemp[0].category}</Text>
                    <Text className="font-bold text-[17px] w-48">{CourseTemp[0].title}</Text>
                </View>
                <View className="flex-row items-center">
                    <Image source={Icon.star} className="w-4 h-4 mr-1"></Image>
                    <Text>{CourseTemp[0].rating.toFixed(1)}</Text>
                    <Text className="mx-6">|</Text>
                    <Text>{Math.floor(item.total_time_spent / 60)} Hrs {item.total_time_spent % 60} Mins</Text>
                </View>
            </View>
            <View className="absolute right-3 -top-3">
                <Image source={Icon.check} className="w-7 h-7 rounded-full"></Image>
            </View>
        </TouchableOpacity>
    );
};

export default CourseWatching;

