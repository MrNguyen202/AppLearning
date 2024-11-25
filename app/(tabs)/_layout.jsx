import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import Icon from '../../constants/Icon'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home'
import MyCourses from './MyCourses'
import Profile from './Profile'
import Search from './Search'
import SearchResult from './SearchResult';
import PaymentMethod from './PaymentMethod'
import PaymentSuccess from '././PaymentSuccess'
import ProfileTeacher from './ProfileTeacher';

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className={'justify-center items-center'}>
      <Image source={icon} style={{ width: 24, height: 24 }} resizeMode='contain' />
      <Text className={`translate-x-1 text-zinc-400 ${focused ? 'font-bold' : 'font-normal'}`} style={{ color: color }}>{name}</Text>
    </View>
  )
}



const Tab = createBottomTabNavigator();

const TabsLayout = ({ navigation, route }) => {
  return (
    <Tab.Navigator initialRouteName='Search' screenOptions={{
      tabBarShowLabel: false,
      tabBarActiveTintColor: '#265AE8',
      tabBarStyle: {
        height: 60,
      },

    }}>
      <Tab.Screen name="Home" component={Home}
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={focused ? Icon.homeFill : Icon.home}
              color={color}
              name="Home"
              focused={focused}
            />
          )
        }}
      />
      <Tab.Screen name="Search" component={Search}
        options={{
          title: 'search',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={focused ? Icon.searchFill : Icon.searchNormal}
              color={color}
              name="Search"
              focused={focused}
            />
          )
        }}
      />
      <Tab.Screen name="My Courses" component={MyCourses}
        options={{
          title: 'myCourses',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={focused ? Icon.myCourseFill : Icon.myCourse}
              color={color}
              name="My Courses"
              focused={focused}
            />
          )
        }}
      />
      <Tab.Screen name="Profile" component={Profile}
        options={{
          title: 'profile',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={focused ? Icon.userFill : Icon.user2}
              color={color}
              name="Profile"
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen name="PaymentMethod" component={PaymentMethod}
        options={{
          title: 'PaymentMethod',
          headerShown: false,
          tabBarButton: () => null,

        }}
      />
      <Tab.Screen name="PaymentSuccess" component={PaymentSuccess}
        options={{
          title: 'PaymentSuccess',
          headerShown: false,
          tabBarButton: () => null,

        }}
      />
      <Tab.Screen name="ProfileTeacher" component={ProfileTeacher}
        options={{
          title: 'ProfileTeacher',
          headerShown: false,
          tabBarButton: () => null,

        }}
      />
      <Tab.Screen name="SearchResult" component={SearchResult}
        options={{
          title: 'SearchResult',
          headerShown: false,
          tabBarButton: () => null,
        }}
      />
    </Tab.Navigator>
  )
}

// export default function Layout() {
//   return (
//     <NavigationContainer independent={true}>
//       <TabsLayout />
//     </NavigationContainer>
//   );
// }
export default TabsLayout