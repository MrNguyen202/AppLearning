import { View, Text, ScrollView } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Search from "./Search";
import Home from "./Home";
import { NavigationContainer } from "@react-navigation/native";
import Video, {VideoRef} from 'react-native-video';

const Tab = createMaterialTopTabNavigator();

function OverView() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
    </View>
  );
}

function Lessons() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}
const CourseDetail = ({ navigation, route }) => {
  return (
    <View>
      <View className={`w-full h-[200] bg-slate-500`}></View>
      {/* <Video
        source={{ uri: 'https://www.example.com/path-to-video.mp4' }} // URL hoặc đường dẫn file
        style={{width: '100%', height: '100%'}} // Kích thước video
        resizeMode="contain" // Tùy chọn hiển thị video
      /> */}

      <View>
        <Text>abc</Text>
      </View>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <NavigationContainer independent={true}>
          <Tab.Navigator>
            <Tab.Screen name="Over view" component={OverView} />
            <Tab.Screen name="Lessons" component={Lessons} />
          </Tab.Navigator>
        </NavigationContainer>
      </ScrollView>
    </View>
  );
};

export default CourseDetail;
