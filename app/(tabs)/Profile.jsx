import { View, Text, TouchableOpacity, Image, Animated, Dimensions, ScrollView, FlatList } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import Icon from '../../constants/Icon'
import courseController from '../../controllers/course_controller'
import { useIsFocused } from '@react-navigation/native'
import { useSelector } from 'react-redux'


const Profile = ({ navigation, route }) => {

  //user đang đăng nhập
  const user = useSelector((state) => state.user.user);

  //Kiểm tra
  const isFocused = useIsFocused();

  //Khóa học mà user đó đã tham gia
  const [courses, setCourses] = useState([]);

  //Khóa học đang học
  const [ongoingCourses, setOngoingCourses] = useState([]);

  //Khóa học đã hoàn thành
  const [completedCourses, setCompletedCourses] = useState([]);

  //Trạng thái của khóa học
  const [progress_status, setProgressStatus] = useState("all");

  //Course profile
  useEffect(() => {
    const fetchData = async () => {
      const course = await courseController.getMyCourses(user.id)
      setCourses(course)
      setCompletedCourses(course.filter((item) => item.progress === 100))
      setOngoingCourses(course.filter((item) => item.progress < 100))
    }
    fetchData()
    if(isFocused){
      fetchData()
    }
  }, [user.id])


  //Ghi nhận trạng thái khóa học
  const handleProgressStatus = (status) => {
    setProgressStatus(status);
  }

  //Chuyển hướng đến trang CourseDetail kèm theo khóa học được chọn
  const handleCourseProfile = (it) => {
    navigation.navigate('MyCourseDetail', { course: it });
  }

  const [isMenuVisible, setMenuVisible] = useState(false);
  const menuAnimation = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    if (isMenuVisible) {
      Animated.timing(menuAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setMenuVisible(false));
    } else {
      setMenuVisible(true);
      Animated.timing(menuAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const translateY = menuAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 0],
  });

  const opacity = menuAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <ScrollView>
      <View className="container items-center">
        {isMenuVisible && (
          <Animated.View
            style={{
              opacity: opacity,
              transform: [{ translateY: translateY }],
            }}
            className="absolute right-14 top-14 bg-white rounded-lg py-2 px-4 z-50 shadow-lg"
          >
            <TouchableOpacity onPress={() => {navigation.navigate("MyProfile", {user: user}); setMenuVisible(false)}}><Text className="text-base py-1">My profile</Text></TouchableOpacity>
            {/* <TouchableOpacity><Text className="text-base py-1">Languages</Text></TouchableOpacity> */}
            <TouchableOpacity onPress={() => {navigation.navigate("Login")}}><Text className="text-base py-1">Log out</Text></TouchableOpacity>
            <TouchableOpacity onPress={toggleMenu}>
              <Text className="text-base text-red-400 py-1">Đóng</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
        <View className="bg-[#B32318] h-28 justify-center items-end px-6 w-[100%]">
          <TouchableOpacity onPress={toggleMenu}>
            <Image source={Icon.setting} />
          </TouchableOpacity>
        </View>
        <View className="w-[100%] items-center justify-end h-24">
          <Text className="text-3xl font-bold">{user.name}</Text>
        </View>
        <View>
          <Text className="text-center w-72 my-4 text-gray-500">{user.description}</Text>
        </View>
        <View className="flex-row justify-evenly w-[100%] mx-6">
          <TouchableOpacity
            onPress={() => handleProgressStatus("all")}
            className={`items-center justify-evenly w-1/4 ${progress_status === "all" ? "border-b-2 border-blue-500" : ""} `}>
            <Text className="text-base">{courses.length < 10 && courses.length > 0
              ? "0" + courses.length
              : courses.length}</Text>
            <Text className="text-base">Course</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleProgressStatus("ongoing")}
            className={`items-center justify-evenly w-1/4 ${progress_status === "ongoing" ? "border-b-2 border-blue-500" : ""} `}>
            <Text className="text-base">{ongoingCourses.length < 10 && ongoingCourses.length > 0
              ? "0" + ongoingCourses.length
              : ongoingCourses.length}</Text>
            <Text className="text-base">On going</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleProgressStatus("completed")}
            className={`items-center justify-evenly w-1/4 ${progress_status === "completed" ? "border-b-2 border-blue-500" : ""} `}>
            <Text className="text-base">{completedCourses.length < 10 && completedCourses.length > 0
              ? "0" + completedCourses.length
              : completedCourses.length}</Text>
            <Text className="text-base">Completed</Text>
          </TouchableOpacity>
        </View>
        <View className="w-[112] h-28 rounded-full bg-slate-400 absolute top-[52] justify-center items-center">
          <Image source={{ uri: !user.avatar ? "https://res.cloudinary.com/dx0blzlhd/image/upload/v1732300438/appELearning/user-new_ahi9wj.jpg" : route.params.user.avatar }} className="w-28 h-28 rounded-full" />
        </View>
      </View>
      <View className="w-[100%]">
        <ScrollView>
          {(progress_status === "all" ? courses : (progress_status === "ongoing" ? ongoingCourses : completedCourses)).map((item, index) => (
            <TouchableOpacity onPress={() => handleCourseProfile(item.courseId)} key={item.courseId} className="flex-row mx-6 mt-4 shadow-2xl bg-white rounded-md">
              <Image source={{ uri: item.courseImage }} className="w-20 h-24 rounded-md m-2" />
              <View className="justify-evenly">
                <Text numberOfLines={1} ellipsizeMode='tail' className="ml-2 w-56 font-bold text-base">{item.courseName}</Text>
                <Text className="ml-2">{item.teacherName}</Text>
                <View className="flex-row items-center">
                  <View className="flex-row items-center">
                    <Image className="ml-2" source={Icon.user3} />
                    <Text className="ml-3">{item.totalStudent > 1000 ? item.totalStudent / 1000 + "k" : item.totalStudent < 10 && item.totalStudent > 0 ? "0" + item.totalStudent : totalStudent} student</Text>
                  </View>
                  <View className="ml-6 flex-row items-center">
                    <Image className="mx-2" source={Icon.star} />
                    <Text>{item.rating.toFixed(1)}</Text>
                  </View>
                </View>
              </View>
              {item.progress_status === "completed" ?
                <View className="absolute right-3 top-3">
                  <Image source={Icon.check} />
                </View>
                :
                (item.progress_status === "ongoing" ?
                  <View className="absolute right-5 bottom-4">
                    <Text className="font-bold text-red-600" >
                      {totalLessonCompleted} / {totalLesson}
                    </Text>
                  </View>
                  : ""
                )
              }
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  )
}

export default Profile