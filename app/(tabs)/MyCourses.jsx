import { View, Text, TextInput, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'
import Icon from '../../constants/Icon'
import { useState } from 'react'
import MyCourseCompletedComponent from '../../components/MyCourseCompletedComponent'
import courseController from '../../controllers/course_controller'
import { useSelector } from 'react-redux'

const MyCourses = ({ navigation, route }) => {

  //user đang đăng nhập
  const user = useSelector((state) => state.user.user);

  //Trang thái khóa học
  const [status, setStatus] = useState('completed');

  //Kiểm tra màn hình có được focus không
  const isFocused = useIsFocused();

  //Dữ liệu khóa học đã hoàn thành
  const [myCoursesCompleted, setMyCoursesCompleted] = useState([]);

  // console.log(myCoursesCompleted)

  //Dữ liệu khóa học đang học
  const [myCoursesOngoing, setMyCoursesOngoing] = useState([]);

  //Lấy dữ liệu khóa học đã hoàn thành và đang học
  useEffect(() => {
    const fetchData = async () => {
      const foundUser = await courseController.getMyCourses(user.id)
      setMyCoursesCompleted(foundUser.filter((item) => (item.totalLessonComplete*100)/item.totalLesson===100))
    }
    fetchData();
    if (isFocused) { // Chỉ fetch khi màn hình được focus
      fetchData();
    }
  }, [isFocused, user, status])

  useEffect(() => {
    const fetchData = async () => {
      const foundUser = await courseController.getMyCourses(user.id)
      setMyCoursesOngoing(foundUser.filter((item) => (item.totalLessonComplete*100)/item.totalLesson<100))
    }
    fetchData();
    if (isFocused) { // Chỉ fetch khi
      fetchData();
    }
  }, [isFocused, user, status])

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
          keyExtractor={(item) => item.courseId}
          renderItem={({ item }) => (
            <MyCourseCompletedComponent item={item} status={status} getMyCourse={handleMyCourse} />
          )}
        />
      </View>
    </View>
  )
}

export default MyCourses