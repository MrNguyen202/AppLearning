import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Icon from '../constants/Icon'

const Button = ({bgColor, width, height, valTxt, txtColor, onPress, border, status, icon}) => {
  return (
    <>
        
        <TouchableOpacity  className={`flex-row justify-evenly items-center rounded ${border}`} style={{
          backgroundColor:bgColor, 
          width:width, 
          height:height,
          }}
          onPress={onPress}
          
          >
            {icon? <Image  source={icon} className={`w-5 h-5`} /> : null}
            <Text className={`${txtColor} font-bold`}>{valTxt}</Text>
        </TouchableOpacity>
    </>
  )
}

export default Button