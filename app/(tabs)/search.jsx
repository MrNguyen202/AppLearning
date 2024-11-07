import { View, Text, ScrollView, TextInput, TouchableOpacity, FlatList, Image, StatusBar } from 'react-native'
import React, {useState} from 'react'
import Icon from '../../constants/Icon'
import Button from '../../components/Button'
import Course from '../../assets/data/Course'
import Category from '../../assets/data/Category'
import SearchComponent from '../../components/SearchComponent'
import RecommendComponent from '../../components/RecommendComponent'


const Search = ({navigation}) => {
  const hotTopics = ['Java', 'SQL', 'Javascript', 'Python', 'Digital Marketing', 'Photoshop', 'Watercolor']
  const [txtSearch, setTxtSearch] = useState('')


  const renderHotTopics = (lstTopic) => {
    return lstTopic.map((topic, index) => (
        <TouchableOpacity key={index} className={`rounded-md pl-3 pr-3 pt-2 pb-2 mr-1 mt-2 bg-[#EDEEF0]`}>
          <Text className={`font-bold opacity-95`}>{topic}</Text>
        </TouchableOpacity>
      ))

  }

  return (
    <View className={`bg-white pl-5 pr-5 flex-1`}>

      <View className={`flex-row justify-between mt-2`}>
        <SearchComponent placeholder={"Graphic illustration"} img={Icon.searchNormal} onChange={(val)=>{
          setTxtSearch(val)
        }} />
        <View>
        
          <Button bgColor='#265AE8' width='60%' height={40} size={20} valTxt='Search' txtColor={"text-white"} onPress={() => {
            navigation.navigate('SearchResult',{txtSearch})
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
          <TouchableOpacity >
            <Text className={`text-cyan-500`}>
            View more
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={Category}
          renderItem={({item})=>{
            return (
              <TouchableOpacity className={`flex-row items-end justify-between border border-gray-200 mt-2 pl-2 pr-2 pb-2 rounded-md`}>
                <View className={`flex-row items-center mt-3`}>
                  <Image source={item.image} className={`w-7 h-7`} />
                  <Text className={`pl-4 text-lg font-light`}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )
          }}
        />
      </View>
      <ScrollView>
        <View className={`flex-row items-center justify-between mt-6`}>
          <Text className={`font-bold text-lg`}>Recommend for you</Text>
          <TouchableOpacity >
            <Text className={`text-cyan-500`}>
            View more
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={Course}
          renderItem={({item})=>{
            return (
              <RecommendComponent item={item} onPress={() => {
                navigation.navigate('CourseDetail', {item})
              }}/>
            )
          }}
          horizontal={true}
        />
      </ScrollView>
    </View>
  )
}

export default Search