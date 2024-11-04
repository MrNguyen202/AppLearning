import { View, Text, ScrollView, TextInput, TouchableOpacity, FlatList, Image } from 'react-native'
import React from 'react'
import Icon from '../../constants/Icon'
import Button from '../../components/Button'
import Category from '../../assets/data/Category'

const Search = () => {
  const hotTopics = ['Java', 'SQL', 'Javascript', 'Python', 'Digital Marketing', 'Photoshop', 'Watercolor']
  
  const renderHotTopics = (lstTopic) => {
    return lstTopic.map((topic, index) => (
        <TouchableOpacity key={index} className={`border-cyan-500 border rounded-3xl pl-3 pr-3 pt-2 pb-2 mr-1 mt-2`}>
          <Text className={`text-cyan-500`}>{topic}</Text>
        </TouchableOpacity>
      ))

  }

  return (
    <ScrollView className={`bg-white pl-5 pr-5`}>
      <View className={`flex-row justify-between mt-3`}>
        <View className={`flex-row pl-3 rounded bg-gray-200 h-10  items-center w-3/4 mr-3`}>
          
          <TextInput className={`pl-2`} placeholder='Search course'/>
        </View>
        <View>
          <Button type='ionicons' bgColor='#11cbd1' width='50%' height={40} nameIcon='filter' size={20} valTxt='Filter'/>
        </View>
      </View>
      <View className={`mt-6`}>
        <Text className={`font-bold text-lg`}>Hot topics</Text>
        <View className={`flex-row flex-wrap mt-3`}>
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
                  <Image source={item.icon} className={`w-7 h-7`} />
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
          data={Category}
          renderItem={({item})=>{
            return (
              <>
              </>
            )
          }}
          horizontal={true}
        />
      </ScrollView>
    </ScrollView>
  )
}

export default Search