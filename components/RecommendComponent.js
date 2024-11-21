import { View, Text, Image, ScrollView, Touchable, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import Icon from '../constants/Icon'
import enroll_courses from '../assets/data/enroll_course'
import sections from '../assets/data/Section'
import lessons from '../assets/data/Lesson'

const RecommendComponent = ({item, onPress}) => {
  const [status, setStatus] = useState(false)
  
  return (
    <TouchableOpacity className={`mr-2 mt-2 rounded border pl-2 pr-2 pt-2 pb-2  border-[#6666663b]`} onPress={onPress}>
      <View >
        <Image source={{uri: item.course.image}} className={`w-[165] h-[75] rounded `}/>
        <Text className={`absolute ml-2 mt-1 text-white bg-[#26C4E8] rounded text-xs pl-2 pr-2 pt-1 pb-1 font-bold `}>{item.course.status}</Text>
      </View> 
      <View className={`flex-row justify-between mt-1 pl-1 pr-1`}>
        <View>
          <Text className={`font-bold`}>{item.course.title.length>17?item.course.title.slice(0,17)+"...":item.course.title}</Text>
          <Text className={`text-xs text-[#70747E]`}>{item.teacherName}</Text>
          <Text className = {`text-[#0961F5] font-bold`}>${item.course.price}</Text>
          <View className={`flex-row items-center`}>
            <Image source={Icon.star} />
            <Text className={`ml-1 font-bold`}>{item.course.rating}</Text>
            <Text className={`ml-1 text-[#666666cc] text-xs`}>({item.totalRegister})</Text>
            <View className={`w-[2] h-[18] bg-black ml-2`}></View>
            <Text className={`ml-2 font-bold`}>{item.totalLesson}</Text>
            <Text className={`ml-1 text-[#666666cc] text-xs`}>lessons</Text>
          </View>
        </View>
        <TouchableOpacity onPress={()=>{setStatus(!status)}}>
          <Image source={status?Icon.savedFill:Icon.saved} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

export default RecommendComponent