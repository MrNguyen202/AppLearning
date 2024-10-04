import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const TabIcon = ({icon, color, name, focused}) => {
    return (
        <View className={'justify-center items-center'}>
            {icon}
            <Text className={`translate-x-1 text-zinc-400 ${focused?'font-bold':'font-normal'}`} style={{color:color}}>{name}</Text>
        </View>
    )
}

const TabsLayout = () => {
  return (
    <>
    <Tabs
        screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor:'#11cbd1',
          }}
    >
        <Tabs.Screen
          name='home'
          options={{
            title: 'home',
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon
                icon={<AntDesign name="home" size={24}  color={color} />}
                color={color}
                name="Home"
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name='search'
          options={{
            title: 'search',
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon
                icon={<AntDesign name="search1" size={24} color={color}/>}
                color={color}
                name="Search"
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name='myCourses'
          options={{
            title: 'myCourses',
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon
                icon={<Feather name="book-open" size={24}  color={color} />}
                color={color}
                name="My Courses"
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name='profile'
          options={{
            title: 'profile',
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon
                icon={<FontAwesome6 name="user" size={22} color={color} />}
                color={color}
                name="Profile"
                focused={focused}
              />
            )
          }}
        />
        </Tabs>
    </>
  )
}

export default TabsLayout