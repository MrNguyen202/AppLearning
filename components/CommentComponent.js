import { View, Text, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import users from '../assets/data/User'

const CommentComponent = ({item}) => {
    const [initUser, setInitUser] = useState({})

    useEffect(() => {
        setInitUser(users.find(user => user.user_id === item.user))
    })


  return (
    <View className={`flex-row mt-4 mb-2`}>
        <Image source={require('../assets/images/avatar.png')}/>
        <View className={`ml-3`}>
            <Text className={`font-bold`}>{initUser.fullname}</Text>
            <Text className={`mb-1 text-[#666666] opacity-60`}>{item.comment_date}</Text>
            <Text>{item.comment.length<44?item.comment:item.comment.slice(0,44)+"\n"+item.comment.slice(44)}</Text>
        </View>
    </View>
  )
}

export default CommentComponent