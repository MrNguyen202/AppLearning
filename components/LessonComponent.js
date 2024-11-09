import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from '../constants/Icon'

const LessonComponent = (...props) => {
    // console.log(props[0].txtValue)
  return (
    <View className={`mt-5 ml-4 bg-white mr-4`}>
        <View>
            <Text>Section ? - <Text> title</Text></Text>
            <Text>? minutes</Text>
        </View>
        <TouchableOpacity>
            <View>
                <Text>01</Text>
                <View>
                    <Text>Why Using Graphic De..</Text>
                    <Text>? Mins</Text>
                </View>

            </View>
            <TouchableOpacity>
                <Image source={Icon.play} />
            </TouchableOpacity>
        </TouchableOpacity>
    </View>
  )
}

export default LessonComponent