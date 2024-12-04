import { View, Text, Image } from 'react-native'
import React, {useState, useEffect} from 'react'

const CommentComponent = ({item}) => {


  return (
    <View className={`flex-row mt-4 mb-2`}>
        <Image source={{uri: item.user.avatar}} className={`w-[40] h-[40]`}/>
        <View className={`ml-3`}>
            <Text className={`font-bold`}>{item.user.name}</Text>
            <Text className={`mb-1 text-[#666666] opacity-60`}>{item.createdDate.slice(0,10)}</Text>
            <Text>{item.comment.length<44?item.comment:item.comment.slice(0,44)+"\n"+item.comment.slice(44)}</Text>
        </View>
    </View>
  )
}

export default CommentComponent