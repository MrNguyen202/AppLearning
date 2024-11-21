import { Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "../constants/Icon";

const CourseWatching = ({ item, status, getMyCourse }) => {

    const handleMyCourse = (it) => {
        getMyCourse(it);
    }

    return (
        <TouchableOpacity onPress={() => handleMyCourse(item)} className={"w-[360] bg-white h-[130] my-4 flex-row rounded-2xl shadow-xl"}>
            <View className="w-[130] bg-black rounded-l-2xl">
                <Image source={{ uri: item.id.course.image }} className="w-full h-full object-contain rounded-l-2xl"></Image>
            </View>
            <View className="bg-white pl-3">
                <View className="my-3">
                    <Text className="text-[#FF6B00]">{item.id.course.category.name}</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail" className="font-bold text-[17px] w-48">{item.id.course.title}</Text>
                </View>
                <View className="flex-row items-center">
                    <Image source={Icon.star} className="w-4 h-4 mr-1"></Image>
                    <Text>{item.id.course.rating.toFixed(1)}</Text>
                    <Text className="mx-6">|</Text>
                    {/* <Text>{Math.floor(item.total_time_spent / 60)} Hrs {item.total_time_spent % 60} Mins</Text> */}
                </View>
                {status === 'ongoing' ? (
                    <View className="flex-row items-center justify-between">
                        <View className="w-[140] bg-[#E8F1FF] border-cyan-200 border h-3 rounded-full my-4 justify-center">
                            <View className="bg-[#0961F5] h-2 rounded-full " style={{ width: `${item.progress}%` }}></View>
                        </View>
                        <Text className="text-[#FF6B00] mr-2">
                            {item.id.course.sections.reduce((total, section) => {
                                return (
                                    total +
                                    section.lessons.filter(lesson =>
                                        lesson.lessonUsers.some(user =>
                                            user.status === 'COMPLETED' && user.id.student.id === 3
                                        )
                                    ).length
                                );
                            }, 0)}/
                            {item.id.course.sections.reduce((total, section) => total + section.lessons.length, 0)}
                        </Text>
                    </View>
                ) : ""}
            </View>
            {status === 'completed' ? (
                <View className="absolute right-3 -top-3">
                    <Image source={Icon.check} className="w-7 h-7 rounded-full"></Image>
                </View>
            ) : ""}
        </TouchableOpacity>
    );
};

export default CourseWatching;

