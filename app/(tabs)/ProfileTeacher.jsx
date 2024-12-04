import { View, Text, TouchableOpacity, Image, Animated, Dimensions, ScrollView, FlatList } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import Icon from '../../constants/Icon'
import User from '../../assets/data/User'
import EnrolCourse from '../../assets/data/enroll_course'
import Course from '../../assets/data/Course'
import Lesson from '../../assets/data/Lesson'
import Section from '../../assets/data/Section'
import courseController from '../../controllers/course_controller'
import teacherController from '../../controllers/teacher_controller'

const ProfileTeacher = ({ navigation, route }) => {
  const [user, setUser] = useState({});
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const findUser = await teacherController.getTeacherById(parseInt(route.params.id))
      setUser(findUser)
    }
    fetchData()
  }, [route.params.id])

  const [progress_status, setProgressStatus] = useState("all");

  const handleProgressStatus = (status) => {
    setProgressStatus(status);
  }

  return (
    <ScrollView>
      <View className="container items-center">
        <View className="bg-[#3F79EB] h-28 justify-between items-center flex-row px-6 w-[100%]">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={Icon.arrowLeftWhite}/>
          </TouchableOpacity>
          <TouchableOpacity >
            <Image source={Icon.share} />
          </TouchableOpacity>
        </View>
        <View className="w-[100%] items-center justify-end h-24">
          <Text className="text-3xl font-bold">{user.name}</Text>
        </View>
        <View>
          <Text className="text-center w-72 my-4 text-gray-500">{user.description === "" ? "No decription" : user.description}</Text>
        </View>
        <View>
          <Text className="text-center w-16 h-6 my-4 text-white bg-[#F97066]">Teacher</Text>
        </View>
        <View className="flex-row justify-evenly w-[100%] mx-6">
          <TouchableOpacity
            onPress={() => handleProgressStatus("all")}
            className={`items-center justify-evenly w-1/4 ${progress_status === "all" ? "border-b-2 border-blue-500" : ""} `}>
            <Text className="text-base">{ }</Text>
            <Text className="text-base">Overview</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleProgressStatus("ongoing")}
            className={`items-center justify-evenly w-1/4 ${progress_status === "ongoing" ? "border-b-2 border-blue-500" : ""} `}>
            <Text className="text-base">{ }</Text>
            <Text className="text-base">Courses</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleProgressStatus("completed")}
            className={`items-center justify-evenly w-1/4 ${progress_status === "completed" ? "border-b-2 border-blue-500" : ""} `}>
            <Text className="text-base">{ }</Text>
            <Text className="text-base">Review</Text>
          </TouchableOpacity>
        </View>
        <View className="w-[112] h-28 rounded-full bg-slate-400 absolute top-[52] justify-center items-center">
          <Image source={{ uri: user.avatar }} className="w-28 h-28 rounded-full" />
        </View>
      </View>

    </ScrollView>
  )
}

export default ProfileTeacher