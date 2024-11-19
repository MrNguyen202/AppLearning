import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React,{useState, useEffect} from 'react'
import { Link } from 'expo-router'
import Icon from '../../constants/Icon'
import userController from '../../controllers/user_controller'

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [userLogin, setUserLogin] = useState("")


  useEffect(() => {
    if (userLogin) {
      // console.log(userLogin)
      navigation.navigate("Tabs", { user: userLogin });
    } else if (userLogin === null) {
      alert("Invalid username or password");
    }
  }, [userLogin]);
  
  const handleLogin = async () => {
    const user = await userController.checkLogin(username, password);
    setUserLogin(user || null);
  };
  
  return (
    <View className="bg-[#F5F9FF] flex-1">
      <View className="justify-center items-center h-[184] mx-[34]">
        <Image source={require('../../assets/images/logo IUH.png')} />
      </View>
      <View className="justify-evenly h-24 mx-[34]">
        <Text className="text-[24px] font-semibold text-[#202244]">Let’s Sign In.!</Text>
        <Text className="text-[14px] font-bold text-[#545454]">Login to Your Account to Continue your Courses</Text>
      </View>
      <View className="justify-evenly items-center h-80">
        <View className="w-[360] h-[60] flex-row items-center rounded-lg bg-white px-4">
          <View className="w-7 h-7 justify-center items-center"><Image source={Icon.mail} className="w-[24] h-[19]" /></View>
          <TextInput placeholder='Email' className="text-[14] ml-2 font-bold text-[#545454] w-4/5" onChangeText={(val) => {
            setUsername(val)
          }}></TextInput>
        </View>
        <View className="w-[360] h-[60] flex-row items-center rounded-lg bg-white px-4">
          <View className="flex-row items-center">
            <View className="w-7 h-7 justify-center items-center"><Image source={Icon.lock} className="w-[19] h-[24]" /></View>
            <TextInput placeholder='Password' secureTextEntry={true} className="text-[14] ml-2 font-bold text-[#545454] w-4/5" onChangeText={(val) =>{
              setPassword(val)
            }}></TextInput>
          </View>
          <TouchableOpacity>
            <Image source={Icon.eye} className="w-5 h-5"></Image>
          </TouchableOpacity>
        </View>
        <TouchableOpacity className="flex-row items-center justify-end w-[360] h-[60]">
          <Text className="font-bold">Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-[#0961F5] w-[350] h-[60] rounded-full justify-center items-center" onPress={handleLogin} >
          <Text className="text-[18px] text-white font-bold">Sign In</Text>
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
        <TouchableOpacity onPress={() => {navigation.navigate("Signup")}}>
          <Text className="text-[#0961F5] text-[14px] font-bold uppercase underline">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Login