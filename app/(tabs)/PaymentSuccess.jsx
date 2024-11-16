import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import Icon from "../../constants/Icon";

const PaymentSuccess = ({ navigation, route }) => {

    const [course, setCourse] = useState(route.params.course);
    const [payment, setPayment] = useState(route.params.payment);

    return (
        <View className="container">
            <View className='h-16 justify-end mx-6'>
                <View className='flex-row items-center'>
                    <TouchableOpacity>
                        <Image source={Icon.goBack} className='mr-4' resizeMode='contain' />
                    </TouchableOpacity>
                    <Text className='text-xl font-bold'>Payment Success</Text>
                </View>
            </View>
            <View className="justify-center items-center m-6">
                <Image source={require('../../assets/images/paymentSuccess.png')} />
            </View>
            <View className="mx-6 my-10">
                <View className="flex-row justify-between items-center my-2">
                    <Text className="text-base font-bold">Name:</Text>
                    <Text className="text-base"></Text>
                </View>
                <View className="flex-row justify-between items-center my-2">
                    <Text className="text-base font-bold">Email:</Text>
                    <Text className="text-base"></Text>
                </View>
                <View className="flex-row justify-between items-center my-2">
                    <Text className="text-base font-bold">Course:</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail" className="text-base w-3/4 text-right">{course.title}</Text>
                </View>
                <View className="flex-row justify-between items-center my-2">
                    <Text className="text-base font-bold">Category:</Text>
                    <Text className="text-base">{course.category}</Text>
                </View>
            </View>

            <View className="mx-6 my-10">
                <View className="flex-row justify-between items-center my-2">
                    <Text className="text-base font-bold">Price:</Text>
                    <Text className="text-base">${course.price}</Text>
                </View>
                <View className="flex-row justify-between items-center my-2">
                    <Text className="text-base font-bold">Date:</Text>
                    <Text>{new Date(Date.now()).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        timeZoneName: "short",
                    })}</Text>
                </View>
                <View className="flex-row justify-between items-center my-2">
                    <Text className="text-base font-bold">Status:</Text>
                    <View className="bg-[#167F71] w-14 h-6 justify-center items-center">
                        <Text className="text-white">Paid</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default PaymentSuccess;
