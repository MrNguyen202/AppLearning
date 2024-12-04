import { View, Text, ScrollView, TextInput, TouchableOpacity, FlatList, Image, StatusBar } from 'react-native'
import React, {useEffect, useState} from 'react'
import Icon from '../../constants/Icon'
import Button from '../../components/Button'
import Course from '../../assets/data/Course'
import Category from '../../assets/data/Category'
import SearchComponent from '../../components/SearchComponent'
import RecommendComponent from '../../components/RecommendComponent'
import categoryController from '../../controllers/category_controller'
import courseController from '../../controllers/course_controller'
import { useSelector } from 'react-redux'



const Search = ({navigation}) => {
  const hotTopics = ['Java', 'SQL', 'Javascript', 'Python', 'Digital Marketing', 'Photoshop', 'Watercolor']
  const [txtSearch, setTxtSearch] = useState('')
  const [lstCategory, setLstCategory] = useState([])
  const [lstCourse, setLstCourse] = useState([])
  const user = useSelector((state) => state.user.user);



  const renderHotTopics = (lstTopic) => {
    return lstTopic.map((topic, index) => (
        <TouchableOpacity key={index} className={`rounded-md pl-3 pr-3 pt-2 pb-2 mr-1 mt-2 bg-[#EDEEF0]`}>
          <Text className={`font-bold opacity-95`}>{topic}</Text>
        </TouchableOpacity>
      ))

  }

  useEffect(() => {
    const fetchData = async () => {
      const categories = await categoryController.getCategories()
      setLstCategory(categories)
      const courses = await courseController.getRecommendCourses(user.id)
      setLstCourse(courses)
    }
    fetchData()
  }, [])


  return (
    <ScrollView className={`bg-white pl-5 pr-5 flex-1`}>

      <View className={`flex-row justify-between mt-2`}>
        <SearchComponent placeholder={"Graphic illustration"} img={Icon.searchNormal} onChange={(val)=>{
          setTxtSearch(val)
        }} />
        <View>
        
          <Button bgColor='#265AE8' width='60%' height={40} size={20} valTxt='Search' txtColor={"text-white"} onPress={() => {
            navigation.navigate('SearchResult',{txtSearch: txtSearch})
          }}/>
        </View>
      </View>
      <View className={`mt-6`}>
        <Text className={`font-bold text-lg`}>Hot topics</Text>
        <View className={`flex-row flex-wrap`}>
          {renderHotTopics(hotTopics)}
        </View>
      </View>
      <View>
        <View className={`flex-row items-center justify-between mt-6`}>
          <Text className={`font-bold text-lg`}>Categories</Text>

        </View>
        <FlatList
          data={lstCategory}
          renderItem={({item})=>{
            // console.log(item)
            return (
              <TouchableOpacity className={`flex-row items-end justify-between border border-gray-200 mt-2 pl-2 pr-2 pb-2 rounded-md`}
                onPress={() => {
                  
                  navigation.navigate('SearchResult',{txtSearch: item.name})
                }}
              >
                <View className={`flex-row items-center mt-3`}>
                  <Image source={{uri: item.image}} className={`w-7 h-7`} />
                  <Text className={`pl-4 text-lg font-light`}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )
          }}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      </View>
      <ScrollView>
        <View className={`flex-row items-center justify-between mt-6`}>
          <Text className={`font-bold text-lg`}>Recommend for you</Text>
        </View>
        <FlatList
          data={lstCourse}
          renderItem={({item})=>{
            return (
              <RecommendComponent item={item} onPress={() => {
                navigation.navigate('CourseDetail', {course:item.course.id})
              }}/>
            )
          }}
          nestedScrollEnabled={true}
          horizontal={true}
        />
      </ScrollView>
    </ScrollView>
  )
}

export default Search