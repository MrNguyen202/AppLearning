import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "../../constants/Icon";
import Course from "../../assets/data/Course";
import Payment from "../../assets/data/Payment";
import RadioButton from "../../components/RadioButton";


const PaymentMethod = ({ navigation, route }) => {

    const [course, setCourse] = useState(Course[3]);
    const [indexSelect, setIndexSelect] = useState(0);

    const handleSelect = (index) => {
        setIndexSelect(index);
    };

    const handleBuyNow = () => {
        navigation.navigate('PaymentSuccess', {course: course, payment: Payment[indexSelect]});
    }

    return (
        <View className="container">
            <View className='h-16 justify-end mx-6'>
                <View className='flex-row items-center'>
                    <TouchableOpacity>
                        <Image source={Icon.goBack} className='mr-4' resizeMode='contain' />
                    </TouchableOpacity>
                    <Text className='text-xl font-bold'>Payment Method</Text>
                </View>
            </View>
            <View className="mx-6 my-6">
                <View className="flex-row justify-between">
                    <Image source={course.image} className='w-28 h-24 rounded-md' />
                    <View className="w-60 justify-between">
                        <Text numberOfLines={1} ellipsizeMode="tail" className='text-lg font-bold'>{course.title}</Text>
                        <Text className='text-sm'>{course.teacher}</Text>
                        <View className="items-end"><Text className='text-lg font-bold'>$ {course.price.toFixed(2)}</Text></View>
                    </View>
                </View>
            </View>
            <View className="mx-6 my-6">
                <Text className="text-base">Select the Payment Methods you want to use</Text>
                <View>
                    {Payment.map((item, index) => (
                        <TouchableOpacity
                            onPress={() => handleSelect(index)}
                            className="flex-row justify-between items-center my-4 px-4 h-14 shadow-2xl bg-white rounded-lg"
                            key={index}>
                            <Image source={item.image} />
                            <View className="flex-row items-center">
                                <Text className='font-bold text-base'>{item.name}</Text>
                                <View className="ml-4 justify-center items-center">
                                    <RadioButton
                                        width={24}
                                        height={24}
                                        color={'gray'}
                                        select={indexSelect === index}
                                        click={() => handleSelect(index)}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <View className="mx-6">
                <TouchableOpacity onPress={handleBuyNow} className="bg-[#265AE8] rounded-md h-14 justify-center items-center">
                    <Text className="text-white font-bold text-2xl">Buy now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PaymentMethod;
