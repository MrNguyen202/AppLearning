import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link } from 'expo-router'
import Icon from '../../constants/Icon'
import users from '../../assets/data/User'
import RadioButton from '../../components/RadioButton'
import userController from '../../controllers/user_controller'

const Signup = ({ navigation }) => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isTeacher, setIsTeacher] = useState(false)


  //Check if user exists
  const handleSignup = async () => {
    const user = await userController.register(username, password, isTeacher);
    console.log(user)
    if (user === "Account already exists") {
      Alert.alert("Error", "User already exists");
    } else {
      Alert.alert(
        "Success",
        "User created successfully. Do you want to proceed to Login?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "OK", onPress: () => navigation.navigate("Login") },
        ]
      );
    }
  };

  return (
    <View>
      <View className="justify-center items-center h-[184] mx-[34]">
        <Image source={require('../../assets/images/logo IUH.png')} />
      </View>
      <View className="justify-evenly h-24 mx-[34]">
        <Text className="text-[24px] font-semibold text-[#202244]">Getting Started.!</Text>
        <Text className="text-[14px] font-bold text-[#545454]">Create an Account to Continue your allCourses</Text>
      </View>
      <View className="justify-evenly items-center h-80">
        <View className="w-[360] h-[60] flex-row items-center rounded-lg bg-white px-4">
          <View className="w-7 h-7 justify-center items-center"><Image source={Icon.mail} className="w-[24] h-[19]" /></View>
          <TextInput onChangeText={(text) => setUsername(text)} placeholder='Email' className="text-[14] ml-2 font-bold text-[#545454] w-4/5"></TextInput>
        </View>
        <View className="w-[360] h-[60] flex-row items-center rounded-lg bg-white px-4">
          <View className="flex-row items-center">
            <View className="w-7 h-7 justify-center items-center"><Image source={Icon.lock} className="w-[19] h-[24]" /></View>
            <TextInput onChangeText={(text) => setPassword(text)} placeholder='Password' secureTextEntry={true} className="text-[14] ml-2 font-bold text-[#545454] w-4/5"></TextInput>
          </View>
          <TouchableOpacity>
            <Image source={Icon.eye} className="w-5 h-5"></Image>
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center w-[360] h-[60] px-4">
          <RadioButton
            width={24}
            height={24}
            color={'#0961F5'}
            select={isTeacher}
            click={() => setIsTeacher(!isTeacher)}
          />
          <Text className="font-bold ml-3">Ara your a teacher?</Text>
        </View>
        <TouchableOpacity onPress={handleSignup} className="bg-[#0961F5] w-[350] h-[60] rounded-full justify-center items-center">
          <Text className="text-[18px] text-white font-bold">Sign Up</Text>
          <View className="w-12 h-12 bg-white rounded-full absolute right-2 justify-center items-center">
            <Image source={Icon.arrowRight} className="w-4 h-4"></Image>
          </View>
        </TouchableOpacity>
      </View>
      <View className="items-center justify-evenly h-32">
        <Text className="font-bold text-[14px]">Or Continue With</Text>
        <View className="flex-row justify-evenly w-48">
          <View className="w-12 h-12 bg-white justify-center items-center rounded-full">
            <Image source={Icon.google} className="w-4 h-4"></Image>
          </View>
          <View className="w-12 h-12 bg-white justify-center items-center rounded-full">
            <Image source={Icon.apple} className="w-4 h-5"></Image>
          </View>
        </View>
      </View>
      <View className="flex-row items-center justify-center my-3">
        <Text className="text-[14px] mr-2">Don't have an Account?</Text>
        <TouchableOpacity onPress={() => { navigation.navigate("Login") }}>
          <Text className="text-[#0961F5] text-[14px] font-bold uppercase underline">Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Signup