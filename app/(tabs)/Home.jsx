import { View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native'
import React from 'react'
import Icon from '../../constants/Icon'
import { Link } from 'expo-router'
import CategoryComponent from '../../components/CategoryComponent'
import CategoryPopularComponent from '../../components/CategoryPopularComponent'
import CourseWatching from '../../components/CourseWatching'
import TeacherPopularComponent from '../../components/TeacherPopularComponent'
import Category from '../../assets/data/Category'
import Course from '../../assets/data/Course'
import User from '../../assets/data/User'
import { useState } from 'react'


const Home = ({ navigation, route }) => {

    //Dữ liệu user đang đăng nhập
    const [user, setUser] = useState(route.params.user)

    //Dữ liệu category phổ biến top 5
    const [categoryPopular, setCategoryPopular] = useState(Category.slice(0, 2))

    //Dữ liệu khóa học được xem nhiều nhất top 5
    const [courseMostWatching, setCourseMostWatching] = useState(Course.slice(5, 7))

    //Dữ liệu giáo viên phổ biến top 5
    const [teacherPopular, setTeacherPopular] = useState(User.filter((item) => item.role === 'teacher').slice(-2))

    //Dữ liệu khóa học được xem nhiều trong tháng hiện tai "time now" top 5
    const [watchingInApp, setWatchingInApp] = useState(Course.slice(-2))

    //Hàm chuyển hướng đến trang ProfileTeacher
    const handleGetTeacherId = (id) => {
        console.log(id);
        navigation.navigate('ProfileTeacher', { id: id });
    };


    //Hàm chuyển hướng đến trang CourseDetail
    const handleGetCourse = (it) => {
        console.log(it);
        navigation.navigate('CourseDetail', { course: it });
    }

    return (
        <View>
            <View className={"bg-[#00B2FF] h-28 justify-evenly p-5"}>
                <View className={"flex-row justify-between items-center"}>
                    <Text className={"text-2xl font-semibold text-white"}>Hello, {user.name.split(' ').pop()}!</Text>
                    <View className={"flex-row w-20 justify-evenly"}>
                        <TouchableOpacity>
                            <Image source={Icon.notification} className={"w-8 h-8"}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={Icon.shoppingCart} className={"w-8 h-8"}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text className={"text-white text-base"}>
                    What do you want to learn today?
                </Text>
            </View>

            <ScrollView className="h-[670]" nestedScrollEnabled={true}>
                <View
                    className={
                        "bg-[#1A6EFC] my-8 mx-6 h-40 rounded-3xl justify-center pl-6"
                    }
                >
                    <View>
                        <Text className="text-white text-xl">25% OFF*</Text>
                        <Text className="text-white text-2xl font-bold">
                            Today's Special
                        </Text>
                    </View>
                    <Text className="text-white font-bold mt-4">
                        Get a Discount for Every Course{"\n"}
                        Order only Valid for Today.!
                    </Text>
                </View>

                <View>
                    <Text className="text-lg mx-6 my-4 font-bold">Categories</Text>
                    <View>
                        <FlatList className="mx-6 h-48"
                            data={Category}
                            renderItem={({ item }) => (
                                <CategoryComponent item={item} />
                            )}
                            numColumns={2}
                            columnWrapperStyle={{ justifyContent: 'space-between' }}
                            nestedScrollEnabled={true}
                            scrollEnabled={false}
                        />
                    </View>
                </View>

                <View>
                    <View className="flex-row justify-between mx-6 my-4 items-end">
                        <Text className="w-40 text-lg font-bold">
                            Popular category our in platform
                        </Text>
                        <TouchableOpacity>
                            <Text className="text-gray-500">See more</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="mx-6">
                        <FlatList
                            data={categoryPopular}
                            renderItem={({ item }) => (
                                <CategoryPopularComponent item={item} />
                            )}
                            horizontal={true}
                        />
                    </View>
                </View>

                <View>
                    <View className="flex-row justify-between mx-6 my-4 items-end">
                        <Text className="w-40 text-lg font-bold">
                            Most watching category in month
                        </Text>
                        <TouchableOpacity>
                            <Text className="text-gray-500">See more</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="mx-6">
                        <FlatList
                            data={courseMostWatching}
                            renderItem={({ item }) => (
                                <CourseWatching item={item} getCourse={handleGetCourse} />
                            )}
                            horizontal={true}
                        />
                    </View>
                </View>

                <View>
                    <View className="flex-row justify-between mx-6 my-4 items-end">
                        <Text className="w-40 text-lg font-bold">
                            Our top popular teacher this month
                        </Text>
                        <TouchableOpacity>
                            <Text className="text-gray-500">See more</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="mx-6">
                        <FlatList
                            data={teacherPopular}
                            renderItem={({ item }) => (
                                <TeacherPopularComponent item={item} getTeacherId={handleGetTeacherId} />
                            )}
                            horizontal={true}
                        />
                    </View>
                </View>

                <View>
                    <View className="flex-row justify-between mx-6 my-4 items-end">
                        <Text className="w-40 text-lg font-bold">
                            Most watching category in month
                        </Text>
                        <TouchableOpacity>
                            <Text className="text-gray-500">See more</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="mx-6">
                        <FlatList
                            data={watchingInApp}
                            renderItem={({ item }) => (
                                <CourseWatching item={item} getCourse={handleGetCourse} />
                            )}
                            horizontal={true}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
export default Home;
