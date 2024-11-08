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
      
    </ScrollView>
  )
}

export default Search