import { View, Text } from 'react-native'
import React from 'react'
import Icon from '../../constants/Icon'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home'
import MyCourses from './MyCourses'
import Profile from './Profile'
import Search from './Search'

const TabIcon = ({icon, color, name, focused}) => {
    return (
        <View className={'justify-center items-center'}>
            {icon}
            <Text className={`translate-x-1 text-zinc-400 ${focused?'font-bold':'font-normal'}`} style={{color:color}}>{name}</Text>
        </View>
    )
}

const Tab = createBottomTabNavigator();

const TabsLayout = () => {
  return (
    <Tab.Navigator initialRouteName='Home' screenOptions={{
      tabBarShowLabel: false,
      tabBarActiveTintColor:'#11cbd1',
    }}>
      <Tab.Screen name="Home" component={Home} 
        options={{
                  title: 'home',
                  headerShown: false,
                  tabBarIcon: ({color, focused}) => (
                    <TabIcon
                      icon={<Icon type="antdesign" name="home" size={24}  color={color} />}
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
                      icon={<Icon type="antdesign" name="search1" size={24} color={color}/>}
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
                      icon={<Icon type="feather" name="book-open" size={24}  color={color} />}
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
                      icon={<Icon type="fontawesome6" name="user" size={22} color={color} />}
                      color={color}
                      name="Profile"
                      focused={focused}
                    />
                  )
                }}
      />
    </Tab.Navigator>
    // <>
      
    // <Tabs
    //     screenOptions={{
    //         tabBarShowLabel: false,
    //         tabBarActiveTintColor:'#11cbd1',
    //       }}
    // >
    //     <Tabs.Screen
    //       name='Home'
    //       options={{
    //         title: 'home',
    //         headerShown: false,
    //         tabBarIcon: ({color, focused}) => (
    //           <TabIcon
    //             icon={<Icon type="antdesign" name="home" size={24}  color={color} />}
    //             color={color}
    //             name="Home"
    //             focused={focused}
    //           />
    //         )
    //       }}
    //     />
    //     <Tabs.Screen
    //       name='Search'
    //       options={{
    //         title: 'search',
    //         headerShown: false,
    //         tabBarIcon: ({color, focused}) => (
    //           <TabIcon
    //             icon={<Icon type="antdesign" name="search1" size={24} color={color}/>}
    //             color={color}
    //             name="Search"
    //             focused={focused}
    //           />
    //         )
    //       }}
    //     />
    //     <Tabs.Screen
    //       name='MyCourses'
    //       options={{
    //         title: 'myCourses',
    //         headerShown: false,
    //         tabBarIcon: ({color, focused}) => (
    //           <TabIcon
    //             icon={<Icon type="feather" name="book-open" size={24}  color={color} />}
    //             color={color}
    //             name="My Courses"
    //             focused={focused}
    //           />
    //         )
    //       }}
    //     />
    //     <Tabs.Screen
    //       name='Profile'
    //       options={{
    //         title: 'profile',
    //         headerShown: false,
    //         tabBarIcon: ({color, focused}) => (
    //           <TabIcon
    //             icon={<Icon type="fontawesome6" name="user" size={22} color={color} />}
    //             color={color}
    //             name="Profile"
    //             focused={focused}
    //           />
    //         )
    //       }}
    //     />
        
    //     </Tabs>
    // </>
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