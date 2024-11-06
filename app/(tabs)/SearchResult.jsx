import { View, Text, ScrollView, TextInput, TouchableOpacity, FlatList, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import Icon from '../../constants/Icon'
import Button from '../../components/Button'
import SearchComponent from '../../components/SearchComponent'
import courses from '../../assets/data/Course'
import ResultSearchComponent from '../../components/ResultSearchComponent'

const SearchResult = ({navigation, route}) => {
    const [initCourses, setInitCourses] = useState(courses)
    const [txtSearch, setTxtSearch] = useState(route.params.txtSearch)

    const [coursesResult, setCoursesResult] = useState("")

    useEffect(() => {
        setCoursesResult(initCourses.filter((course) => {
 
            return course.title.toLowerCase().includes(route.params.txtSearch.toLowerCase());
         }))
    },[route.params.txtSearch])

  return (
    <View className={`bg-white pl-5 pr-5 flex-1`}>
      <View className={`flex-row justify-between mt-2`}>
        <SearchComponent placeholder={"Graphic illustration"} img={Icon.searchNormal} onChange={(val)=>{
            setTxtSearch(val)
        }} valTxt={route.params.txtSearch?route.params.txtSearch:""}/>
        <View>
          <Button bgColor='#265AE8' width='60%' height={40} size={20} valTxt='Search' onPress={()=>{
            navigation.navigate('SearchResult', {txtSearch: txtSearch})
          }} />
        </View>
      </View>
      <Text className={`mt-6 text-[#666666] mb-4`}>Your search result</Text>
      <FlatList
        data={coursesResult}
        renderItem={({item}) => <ResultSearchComponent item={item} onPress={() => {
          navigation.navigate('CourseDetail', {item})
        }}/>}
      />
    </View>
  )
}

export default SearchResult