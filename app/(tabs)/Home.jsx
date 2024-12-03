import { View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import Icon from '../../constants/Icon'
import CategoryComponent from '../../components/CategoryComponent'
import CourseWatching from '../../components/CourseWatching'
import TeacherPopularComponent from '../../components/TeacherPopularComponent'
import { useState } from 'react'
import courseController from '../../controllers/course_controller'
import categoryController from '../../controllers/category_controller'
import teacherController from '../../controllers/teacher_controller'
import { useSelector } from 'react-redux'
import NotificationBanner from '../../components/NotificationBanner'

const Home = ({ navigation, route }) => {

    //Dữ liệu user đang đăng nhập
    const user = useSelector((state) => state.user.user);
    // console.log(user);

    //Dữ liệu category
    const [category, setCategory] = useState([])

    //Dữ liệu khóa học được xem nhiều nhất top 5
    const [courseMostWatching, setCourseMostWatching] = useState([])

    // console.log(courseMostWatching);

    //Dữ liệu giáo viên phổ biến top 5
    const [teacherPopular, setTeacherPopular] = useState([])

    //Dữ liệu khóa học được xem nhiều trong tháng hiện tai "time now" top 5
    const [watchingInApp, setWatchingInApp] = useState([])


    //Hàm lấy dữ liệu category
    useEffect(() => {
        const fetchData = async () => {
            const category = await categoryController.getCategories()
            setCategory(category)
        }
        fetchData()
    }, [])

    //Hàm lấy dữ liệu khóa học
    useEffect(() => {
        const fetchData = async () => {
            const courses = await courseController.getCourses()
            setCourseMostWatching(courses)
            setWatchingInApp(courses)
        }
        fetchData()
    }, [])

    //Hàm lấy dữ liệu teacher phổ biến
    useEffect(() => {
        const fetchData = async () => {
            const teacher = await teacherController.getTeachers()
            setTeacherPopular(teacher)
        }
        fetchData()
    }, [])

    //Hàm chuyển hướng đến trang ProfileTeacher
    const handleGetTeacherId = (id) => {
        console.log(id);
        navigation.navigate('ProfileTeacher', { id: id });
    };


    //Hàm chuyển hướng đến trang CourseDetail
    const handleGetCourse = (it) => {
        // console.log(it);
        navigation.navigate('CourseDetail', { course: it });
    }

    const handleUpdate = () => {
        navigation.navigate('MyProfile');
    };

    return (
        <View>
            {user.status === "NO" ? (
            <View>
                <NotificationBanner onUpdate={handleUpdate} />
            </View>
            ) : ""}
            <View className={"bg-[#00B2FF] h-28 justify-evenly p-5"}>
                <View className={"flex-row justify-between items-center"}>
                    <Text className={"text-2xl font-semibold text-white"}>Hello, {user.name}!</Text>
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
                            data={category}
                            renderItem={({ item }) => (
                                <CategoryComponent item={item} onPress={() => {
                  
                                    navigation.navigate('SearchResult',{txtSearch: item.name})
                                  }} />
                            )}
                            numColumns={2}
                            columnWrapperStyle={{ justifyContent: 'space-between' }}
                            nestedScrollEnabled={true}
                            scrollEnabled={false}
                        />
                    </View>
                </View>

                {/* <View>
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
                </View> */}

                <View>
                    <View className="flex-row justify-between mx-6 my-4 items-end">
                        <Text className="w-40 text-lg font-bold">
                            Most watching
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
                            Most watching in month
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
