import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const RadioButton = ({ color, width, height, select, click}) => {
    return (
        <>
            <TouchableOpacity onPress={click} className={`flex-row justify-evenly items-center rounded-full border-2`} style={{
                borderColor: color,
                width: width,
                height: height,
            }}>
                {select ? <View style={{ width: '80%', height: '80%', backgroundColor: color }} className="rounded-full"></View> 
                : <View style={{ width: '80%', height: '80%', borderColor: color, borderWidth: 2 }} className="rounded-full"></View>}
            </TouchableOpacity>
        </>
    )
}

export default RadioButton