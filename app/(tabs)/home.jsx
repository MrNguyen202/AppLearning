import { View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native'
import React from 'react'
import Icon from '../../constants/Icon'
import { Link } from 'expo-router'
import CategoryComponent from '../../components/CategoryComponent'
import CategoryPopularComponent from '../../components/CategoryPopularComponent'
import CourseWatching from '../../components/CourseWatching'
import TeacherPopularComponent from '../../components/TeacherPopularComponent'
import Category from '../../assets/data/Category'
import Course from '../../assets/data/Course'
import User from '../../assets/data/User'
import { useState } from 'react'


const Home = () => {

  const [categoryPopular, setCategoryPopular] = useState(Category.slice(0, 2))
  const [courseMostWatching, setCourseMostWatching] = useState(Course.slice(5,7))
  const [teacherPopular, setTeacherPopular] = useState(User.filter((item) => item.role === 'teacher').slice(-2))
  const [watchingInApp, setWatchingInApp] = useState(Course.slice(-2))

  return (
    <View>
      <View className={"bg-[#00B2FF] h-28 justify-evenly p-5"}>
        <View className={"flex-row justify-between items-center"}>
          <Text className={"text-2xl font-semibold text-white"}>Hello, Roise!</Text>
          <View className={"flex-row w-20 justify-evenly"}>
            <TouchableOpacity>
              <Image source={Icon.notification} className={"w-8 h-8"}></Image>
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={Icon.shoppingCart} className={"w-8 h-8"}></Image>
            </TouchableOpacity>
          </View>
        </View>
        <Text className={"text-white text-base"}>
          What do you want to learn today?
        </Text>
      </View>

      <ScrollView className="h-[670]">
        <View className={"bg-[#1A6EFC] my-8 mx-6 h-40 rounded-3xl justify-center pl-6"}>
          <View>
            <Text className="text-white text-xl">25% OFF*</Text>
            <Text className="text-white text-2xl font-bold">Today's Special</Text>
          </View>
          <Text className="text-white font-bold mt-4">
            Get a Discount for Every Course{'\n'}
            Order only Valid for Today.!
          </Text>
        </View>

        <View>
          <Text className="text-lg mx-6 my-4 font-bold">Categories</Text>
          <View>
            <FlatList className="mx-6 h-48"
              key={2}
              data={Category}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <CategoryComponent item={item} />
              )}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              nestedScrollEnabled={true}
            />
          </View>
        </View>

        <View>
          <View className="flex-row justify-between mx-6 my-4 items-end">
            <Text className="w-40 text-lg font-bold">Popular category our in platform</Text>
            <TouchableOpacity>
              <Text className="text-gray-500">See more</Text>
            </TouchableOpacity>
          </View>
          <View className="mx-6">
            <FlatList
              data={categoryPopular}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <CategoryPopularComponent item={item} />
              )}
              horizontal={true}
              scrollEnabled={false}
            />
          </View>
        </View>

        <View>
          <View className="flex-row justify-between mx-6 my-4 items-end">
            <Text className="w-40 text-lg font-bold">Most watching category in month</Text>
            <TouchableOpacity>
              <Text className="text-gray-500">See more</Text>
            </TouchableOpacity>
          </View>
          <View className="mx-6">
            <FlatList
              data={courseMostWatching}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <CourseWatching item={item} />
              )}
              horizontal={true}
              scrollEnabled={false}
            />
          </View>
        </View>

        <View>
          <View className="flex-row justify-between mx-6 my-4 items-end">
            <Text className="w-40 text-lg font-bold">Our top popular teacher this month</Text>
            <TouchableOpacity>
              <Text className="text-gray-500">See more</Text>
            </TouchableOpacity>
          </View>
          <View className="mx-6">
            <FlatList
              data={teacherPopular}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TeacherPopularComponent item={item} />
              )}
              horizontal={true}
              scrollEnabled={false}
            />
          </View>
        </View>

        <View>
          <View className="flex-row justify-between mx-6 my-4 items-end">
            <Text className="w-40 text-lg font-bold">Most watching category in month</Text>
            <TouchableOpacity>
              <Text className="text-gray-500">See more</Text>
            </TouchableOpacity>
          </View>
          <View className="mx-6">
            <FlatList
              data={watchingInApp}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <CourseWatching item={item} />
              )}
              horizontal={true}
              scrollEnabled={false}
            />
          </View>
        </View>

      </ScrollView>
    </View>
  );
};

export default Home;
