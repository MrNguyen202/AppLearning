import { View, Text } from 'react-native'
import React from 'react'

const Button = () => {
  return (
    <>
        <TouchableOpacity>
            <Ionicons name="filter" size={24} color="black" />
            <Text>Filter</Text>
        </TouchableOpacity>
    </>
  )
}

export default Button