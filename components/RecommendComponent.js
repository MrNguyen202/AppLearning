import { View, Text, Image, ScrollView, Touchable, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import Icon from '../constants/Icon'
import enroll_courses from '../assets/data/enroll_course'
import sections from '../assets/data/Section'
import lessons from '../assets/data/Lesson'

const RecommendComponent = ({item}) => {
  const [count, setCount] = useState(0)
  const [status, setStatus] = useState(false)
  var course_sections = sections.filter(value => {return value.course_id == item.course_id})


  useEffect(() =>{
    var sum = 0
    course_sections.map((value, index) => {
      lessons.map(lessons => {
        sum += lessons.section_id==value.section_id?1:0
      })
    })
    setCount(count+sum)
  },[])
  
  
  return (
    <TouchableOpacity className={`mr-2 mt-2 rounded border pl-2 pr-2 pt-2 pb-2  border-[#6666663b]`}>
      <View >
        <Image source={item.image} className={`w-[165] h-[75] rounded `}/>
        <Text className={`absolute ml-2 mt-1 text-white bg-[#26C4E8] rounded text-xs pl-2 pr-2 pt-1 pb-1 font-bold `}>{item.status}</Text>
      </View> 
      <View className={`flex-row justify-between mt-1 pl-1 pr-1`}>
        <View>
          <Text className={`font-bold`}>{item.title}</Text>
          <Text className={`text-xs text-[#70747E]`}>{item.teacher}</Text>
          <Text className = {`text-[#0961F5] font-bold`}>${item.price}</Text>
          <View className={`flex-row items-center`}>
            <Image source={Icon.star} />
            <Text className={`ml-1 font-bold`}>{item.rating}</Text>
            <Text className={`ml-1 text-[#666666cc] text-xs`}>({enroll_courses.filter(value => {return value.course == item.course_id}).length})</Text>
            <View className={`w-[2] h-[18] bg-black ml-2`}></View>
            <Text className={`ml-2 font-bold`}>{count}</Text>
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