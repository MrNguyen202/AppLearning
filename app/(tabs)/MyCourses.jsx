import { View, Text, TextInput, Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import Icon from '../../constants/Icon'
import { useState } from 'react'
import { router } from 'expo-router'
import User_courses from '../../assets/data/User_course'
import MyCourseCompletedComponent from '../../components/MyCourseCompletedComponent'
import User from '../../assets/data/User'

const MyCourses = ({navigation, route}) => {

  //Dữ liệu user đang đăng nhập
  const [user, setUser] = useState(User[7])

  //Trang thái khóa học
  const [status, setStatus] = useState('completed');

  //Dữ liệu khóa học đã hoàn thành
  const [myCoursesCompleted, setMyCoursesCompleted] = useState("");

  //Dữ liệu khóa học đang học
  const [myCoursesOngoing, setMyCoursesOngoing] = useState("");


  //Ghi nhận trạng thái khóa học
  const handleStatus = (newStatus) => {
    setStatus(newStatus);
  }

  //Chuyển hướng đến trang MyCourseDetail kèm theo khóa học được chọn
  const handleMyCourse = (it) => {
    navigation.navigate('MyCourseDetail', { course: it });
  }

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
        <TouchableOpacity onPress={() => handleStatus('completed')} className={`${status === 'completed' ? 'bg-[#0961F5]' : 'bg-[#E8F1FF]'} w-[170] h-[48] rounded-full items-center justify-center`}>
          <Text className={`${status === 'completed' ? 'text-white' : 'text-black'} text-[17px] font-bold`}>Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleStatus('ongoing')} className={`${status === 'ongoing' ? 'bg-[#0961F5]' : 'bg-[#E8F1FF]'} w-[170] h-[48] rounded-full items-center justify-center`}>
          <Text className={`${status === 'ongoing' ? 'text-white' : 'text-black'} text-[17px] font-bold`}>Ongoing</Text>
        </TouchableOpacity>
      </View>
      <View className="h-[575] items-center">
        <FlatList
          data={status === 'completed' ? myCoursesCompleted : myCoursesOngoing}
          keyExtractor={(item) => item.course_id}
          renderItem={({ item }) => (
            <MyCourseCompletedComponent item={item} status={status} getMyCourse={handleMyCourse} />
          )}
        />
      </View>
    </View>
  )
}

export default MyCourses