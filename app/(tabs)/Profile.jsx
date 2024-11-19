import { View, Text, TouchableOpacity, Image, Animated, Dimensions, ScrollView, FlatList } from 'react-native'
import React, { useState, useRef } from 'react'
import Icon from '../../constants/Icon'
import User from '../../assets/data/User'
import EnrolCourse from '../../assets/data/enroll_course'
import Course from '../../assets/data/Course'
import Lesson from '../../assets/data/Lesson'
import Section from '../../assets/data/Section'

const Profile = ({ navigation, route }) => {

  //Dữ liệu user đang đăng nhập
  const [user, setUser] = useState(User[1]);

  //Khóa học mà user đó đã tham gia
  const [courses, setCourses] = useState(EnrolCourse.filter((course) => course.user === user.user_id));

  //Khóa học đang học
  const [ongoingCourses, setOngoingCourses] = useState(courses.filter((item) => item.progress_status === "ongoing"));

  //Khóa học đã hoàn thành
  const [completedCourses, setCompletedCourses] = useState(courses.filter((item) => item.progress_status === "completed"));


  //Trạng thái của khóa học
  const [progress_status, setProgressStatus] = useState("all");

  //Ghi nhận trạng thái khóa học
  const handleProgressStatus = (status) => {
    setProgressStatus(status);
  }

  //Chuyển hướng đến trang CourseDetail kèm theo khóa học được chọn
  const handleCourseProfile = (it) => {
    // console.log(it);
    const course = Course.find((a) => a.course_id === it);
    navigation.navigate('CourseDetail', { course: course });
  }

  
  return (
    <ScrollView>
      <View className="container items-center">
        <View className="bg-[#B32318] h-28 justify-center items-end px-6 w-[100%]">
          <TouchableOpacity >
            <Image source={Icon.setting} />
          </TouchableOpacity>
        </View>
        <View className="w-[100%] items-center justify-end h-24">
          <Text className="text-3xl font-bold">{user.fullname}</Text>
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
          <Image source={user.avatar} className="w-28 h-28 rounded-full" />
        </View>
      </View>
      <View className="w-[100%]">
        <ScrollView>
          {(progress_status === "all" ? courses : (progress_status === "ongoing" ? ongoingCourses : completedCourses)).map((item, index) => (
            <TouchableOpacity onPress={() => handleCourseProfile(item.course)} key={item.enroll_course_id} className="flex-row mx-6 mt-4 shadow-2xl bg-white rounded-md">
              <Image source={Course.find((a) => a.course_id === item.course).image} className="w-20 h-24 rounded-md m-2" />
              <View className="justify-evenly">
                <Text numberOfLines={1} ellipsizeMode='tail' className="ml-2 w-56 font-bold text-base">{Course.find((a) => a.course_id === item.course).title}</Text>
                <Text className="ml-2">{Course.find((a) => a.course_id === item.course).teacher}</Text>
                <View className="flex-row items-center">
                  <View className="flex-row items-center">
                    <Image className="ml-2" source={Icon.user3} />
                    <Text className="ml-3">{EnrolCourse.filter((a) => a.course === item.course).length < 10 ? "0" + EnrolCourse.filter((a) => a.course === item.course).length : EnrolCourse.filter((a) => a.course === item.course).length} student</Text>
                  </View>
                  <View className="ml-6 flex-row items-center">
                    <Image className="mx-2" source={Icon.star} />
                    <Text>{Course.find((a) => a.course_id === item.course).rating.toFixed(1)}</Text>
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
                      {

                      }
                      /
                      {
                        Lesson.filter((l) =>
                          Section.filter((s) => item.course === s.course_id)
                            .map((s) => s.section_id)
                            .includes(l.section_id)
                        ).length
                      }
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