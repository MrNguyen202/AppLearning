import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from '../constants/Icon'

const Button = ({bgColor, width, height, nameIcon, size, valTxt, type}) => {
  return (
    <>
        <TouchableOpacity className={`flex-row justify-evenly items-center rounded`} style={{
          backgroundColor:bgColor, 
          width:width, 
          height:height,
          }}>
            <Text className={`text-white font-bold`}>{valTxt}</Text>
        </TouchableOpacity>
    </>
  )
}

export default Button