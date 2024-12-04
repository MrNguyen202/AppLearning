import { Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "../constants/Icon";

const TeacherPopularComponent = ({ item, getTeacherId }) => {

    const handleTeacherId = (id) => {
        getTeacherId(id);
    };

    return (
        <TouchableOpacity onPress={() => handleTeacherId(item.teacherId)} key={item.id} className={"my-2 p-2 mr-[11] h-56 w-44 justify-between bg-white rounded-lg"}>
            <Image source={{uri: item.teacherAvatar}} className="w-40 h-28 rounded-lg" />
            <View>
                <Text className="font-bold">{item.teacherName}</Text>
                <Text className="text-gray-400">{item.school}</Text>
            </View>
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
            </View>
        </TouchableOpacity>
    );
};

export default TeacherPopularComponent;

