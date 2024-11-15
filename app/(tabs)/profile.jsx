import { View, Text, TouchableOpacity, Image, Animated, Dimensions, ScrollView, FlatList } from 'react-native'
import React, { useState, useRef } from 'react'
import Icon from '../../constants/Icon'
import User from '../../assets/data/User'
import EnrolCourse from '../../assets/data/enroll_course'
import Course from '../../assets/data/Course'

const Profile = ({ route }) => {
  const [user, setUser] = useState(User[1]);
  const [courses, setCourses] = useState(EnrolCourse.filter((course) => course.user === user.user_id));


  const [progress_status, setProgressStatus] = useState("all");

  const handleProgressStatus = (status) => {
    setProgressStatus(status);
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
          <Text className="text-center w-72 my-4">{user.description}</Text>
        </View>
        <View className="flex-row justify-evenly w-[100%] mx-6">
          <TouchableOpacity
            onPress={() => handleProgressStatus("all")}
            className={`items-center justify-evenly w-1/4 ${progress_status === "all" ? "border-b-2 border-blue-500" : ""} `}>
            <Text className="text-base">{courses.length}</Text>
            <Text className="text-base">Course</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleProgressStatus("ongoing")}
            className={`items-center justify-evenly w-1/4 ${progress_status === "ongoing" ? "border-b-2 border-blue-500" : ""} `}>
            <Text className="text-base">{courses.filter((item) => item.progress_status === "ongoing").length}</Text>
            <Text className="text-base">On going</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleProgressStatus("completed")}
            className={`items-center justify-evenly w-1/4 ${progress_status === "completed" ? "border-b-2 border-blue-500" : ""} `}>
            <Text className="text-base">{courses.filter((item) => item.progress_status === "completed").length}</Text>
            <Text className="text-base">Completed</Text>
          </TouchableOpacity>
        </View>
        <View className="w-[112] h-28 rounded-full bg-slate-400 absolute top-[52] justify-center items-center">
          <Image source={user.avatar} className="w-24 h-24 rounded-full" resizeMode='contain' />
        </View>
      </View>
      <View className="w-[100%]">
        <ScrollView>
          {(progress_status === "all" ? courses : (progress_status === "ongoing" ? courses.filter((item) => item.progress_status === "ongoing") : courses.filter((item) => item.progress_status === "completed"))).map((item, index) => (
            <TouchableOpacity key={index} className="flex-row mx-6 mt-4 shadow-2xl bg-white">
              <Image source={Course.find((a) => a.course_id === item.course).image} className="w-20 h-24 rounded-md" />
              <View className="justify-evenly">
                <Text className="ml-2 font-bold text-base">{Course.find((a) => a.course_id === item.course).title}</Text>
                <Text className="ml-2">{Course.find((a) => a.course_id === item.course).teacher}</Text>
                <View className="flex-row items-center">
                  <View className="flex-row items-center">
                    <Image className="ml-2" source={Icon.user3} />
                    <Text className="ml-3">{EnrolCourse.filter((a) => a.course === item.course).length} student</Text>
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
                  <View>
                    <View
                      className={`relative items-center justify-center`}
                      style={{ width: 50, height: 50 }}>
                      {/* Vòng nền */}
                      <View
                        className="absolute rounded-full"
                        style={{
                          borderWidth: strokeWidth,
                          borderColor: backgroundColor,
                          width: size,
                          height: size,
                        }}
                      />
                      {/* Vòng tiến độ */}
                      <View
                        className="absolute rounded-full"
                        style={{
                          width: size,
                          height: size,
                          borderWidth: strokeWidth,
                          borderRightColor: 'transparent',
                          borderBottomColor: 'transparent',
                          borderLeftColor: color,
                          borderTopColor: color,
                          transform: [{ rotate: `${rotateValue}deg` }],
                        }}
                      />
                      {/* Nội dung bên trong */}
                      <View
                        className="absolute bg-white rounded-full items-center justify-center"
                        style={{
                          width: size - strokeWidth * 2,
                          height: size - strokeWidth * 2,
                        }}>
                        <Text className="text-lg font-bold">{`${percentage}%`}</Text>
                      </View>
                    </View>
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