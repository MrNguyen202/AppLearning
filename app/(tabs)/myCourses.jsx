import { View, Text, TextInput, Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import Icon from '../../constants/Icon'
import { useState } from 'react'
import { router } from 'expo-router'
import User_courses from '../../assets/data/User_course'
import MyCourseCompletedComponent from '../../components/MyCourseCompletedComponent'

const MyCourses = () => {

  const [myCoursesCompleted, setMyCoursesCompleted] = useState(User_courses.filter((course) => course.progress === 'completed'));

  return (
    <View>
      <View className="justify-center items-center h-12">
        <Text className="text-[21px] font-bold">My Course</Text>
      </View>
      <View className="items-center">
        <View className="flex-row justify-between items-center w-[360] h-[60] px-3 bg-white shadow-xl rounded-2xl">
          <TextInput placeholder='Search for ...' className="text-[17px]"></TextInput>
          <TouchableOpacity className="w-9 h-9 bg-[#0961F5] justify-center items-center rounded-lg">
            <Image source={Icon.searchFillWhite}></Image>
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex-row justify-between m-6">
        <TouchableOpacity className="bg-[#0961F5] w-[170] h-[48] rounded-full items-center justify-center">
          <Text className="text-white text-[17px] font-bold">Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-[#E8F1FF] w-[170] h-[48] rounded-full items-center justify-center">
          <Text className="text-black text-[17px] font-bold">Ongoing</Text>
        </TouchableOpacity>
      </View>
      <View className="h-[575] items-center">
        <FlatList
        data={myCoursesCompleted}
        keyExtractor={(item) => item.course_id}
        renderItem={({ item }) => (
          <MyCourseCompletedComponent item={item}/>
        )}
        />
      </View>
    </View>
  )
}

export default MyCourses