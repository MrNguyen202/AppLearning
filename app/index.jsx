import { View, Text, TouchableOpacity, Image, StatusBar } from "react-native";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabsLayout from "./(tabs)/_layout";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./(auth)/login";
import Signup from "./(auth)/signup";
import CourseDetail from "./(tabs)/CourseDetail";
import MyCourseDetail from "./(tabs)/MyCourseDetail";
import ProfileTeacher from "./(tabs)/ProfileTeacher";
import Icon from "../constants/Icon";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();

const index = () => {
  const [status, setStatus] = useState(false);

  const Header = ({ navigation }) => {
    return (
      <View className={`flex-row items-center justify-between flex-1 w-full`}>
        <TouchableOpacity
          onPress={() => {
            // console.log(navigation)
            navigation.goBack();
          }}
        >
          <Image source={Icon.arrowLeft} className={``} />
        </TouchableOpacity>
        <Text className={`font-bold text-2xl`}>Details</Text>
        <TouchableOpacity
          onPress={() => {
            setStatus(!status);
          }}
        >
          <Image
            source={status ? Icon.saved : Icon.savedFill}
            className={`mr-11`}
          />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaProvider>
      <NavigationContainer independent={true}>
        <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />

        <Stack.Navigator initialRouteName="Tabs">
          <Stack.Screen
            name="Login"
            component={Login}
            options={({ navigation }) => ({
              headerShown: false,
              // statusBarTranslucent: true
            })}
          />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen
            name="CourseDetail"
            component={CourseDetail}
            options={({ navigation }) => ({
              title: "",
              tabBarButton: () => null,
              // headerShown:false
              // statusBarTranslucent: true,
              statusBarColor: "black",
              statusBarHidden: true,
              headerTitle: () => <Header navigation={navigation} />,
              headerBackVisible: false,
            })}
          />
          <Stack.Screen
            name="MyCourseDetail"
            component={MyCourseDetail}
            options={({ navigation }) => ({
              title: "",
              tabBarButton: () => null,
              // headerShown:false
              // statusBarTranslucent: true,
              statusBarColor: "black",
              statusBarHidden: true,
              headerTitle: () => <Header navigation={navigation} />,
              headerBackVisible: false,
            })}
          />
          <Stack.Screen
            name="ProfileTeacher"
            component={ProfileTeacher}
            options={({ navigation }) => ({
              title: "",
              tabBarButton: () => null,
              // headerShown:false
              // statusBarTranslucent: true,
              statusBarColor: "black",
              statusBarHidden: true,
              headerTitle: () => <Header navigation={navigation} />,
              headerBackVisible: false,
            })}
          />
          <Stack.Screen
            name="Tabs"
            component={TabsLayout}
            options={{
              headerShown: false,
              statusBarColor: "black",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default index;
