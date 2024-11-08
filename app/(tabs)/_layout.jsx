import { View, Text, Image } from 'react-native'
import React from 'react'
import Icon from '../../constants/Icon'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './home'
import MyCourses from './myCourses'
import Profile from './profile'
import Search from './search'

const TabIcon = ({icon, color, name, focused}) => {
    return (
        <View className={'justify-center items-center'}>
            <Image source={icon} style={{width:24, height: 24}} resizeMode='contain' />
            <Text className={`translate-x-1 text-zinc-400 ${focused?'font-bold':'font-normal'}`} style={{color:color}}>{name}</Text>
        </View>
    )
}

const Tab = createBottomTabNavigator();

const TabsLayout = () => {
  return (
    <Tab.Navigator initialRouteName='Home' screenOptions={{
      tabBarShowLabel: false,
      tabBarActiveTintColor:'#265AE8',
      tabBarStyle:{
        height: 60,
      }
    }}>
      <Tab.Screen name="Home" component={Home} 
        options={{
                  title: 'home',
                  headerShown: false,
                  tabBarIcon: ({color, focused}) => (
                    <TabIcon
                      icon={focused?Icon.homeFill:Icon.home}
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
                  tabBarIcon: ({color, focused}) => (
                    <TabIcon
                      icon={focused?Icon.searchFill:Icon.searchNormal}
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
                  tabBarIcon: ({color, focused}) => (
                    <TabIcon
                      icon={focused?Icon.myCourseFill:Icon.myCourse}
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
                  tabBarIcon: ({color, focused}) => (
                    <TabIcon
                      icon={focused?Icon.userFill:Icon.user2}
                      color={color}
                      name="Profile"
                      focused={focused}
                    />
                  )
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