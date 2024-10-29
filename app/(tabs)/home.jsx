import { View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native'
import React from 'react'
import Icon from '../../constants/Icon'
import { Link } from 'expo-router'
import CategoryComponent from '../../components/CategoryComponent'


const Home = () => {

  const categories = [
    {
      title: "Business",
      typeIcon: "fontawesome5",
      nameIcon: "chart-line",
      bgColor: "#00BDD6"
    },
    {
      title: "Design",
      typeIcon: "feather",
      nameIcon: "pen-tool",
      bgColor: "#8353E2"
    },
    {
      title: "Code",
      typeIcon: "feather",
      nameIcon: "code",
      bgColor: "#E05858"
    },
    {
      title: "Writing",
      typeIcon: "materialcommunityicons",
      nameIcon: "note-text-outline",
      bgColor: "#4069E5"
    },
    {
      title: "Movie",
      typeIcon: "feather",
      nameIcon: "video",
      bgColor: "#8353E2"
    },
    {
      title: "Language",
      typeIcon: "ionicons",
      nameIcon: "earth-outline",
      bgColor: "#ED7D2D"
    }
  ]



  return (
    <View>
      <View className={"bg-[#00BDD6] h-24 justify-center p-5"}>
        <View className={"flex-row justify-between items-center"}>
          <Text className={"text-2xl font-semibold text-white"}>Hello, Roise!</Text>
          <View className={"flex-row justify-between items-center w-20"}>
            <Icon type={"feather"} name={"shopping-cart"} size={24} color={"white"}></Icon>
            <Icon type={"octicons"} name={"bell"} size={24} color={"white"}></Icon>
          </View>
        </View>
        <Text className={"text-white text-base"}>What do you want to learn today?</Text>
      </View>

      <ScrollView>
        <View className={"bg-violet-500 m-5 h-44 rounded"}>
          <View>
            <Text className={"text-white uppercase text-base ml-5 mt-6"}>Project management</Text>
            <Text className={"text-3xl text-white uppercase font-bold ml-5 mt-2"}>20% off</Text>
            <TouchableOpacity className={"bg-[#00BDD6] h-10 w-28 rounded justify-center items-center ml-5 mt-2"}>
              <Text className={"uppercase text-white font-semibold"}>join now</Text>
            </TouchableOpacity>
          </View>

          <Image source={require("../../assets/images/teacher.png")} className={"w-28 h-40 object-contain absolute right-6 bottom-0"}></Image>
        </View>

        <View className={"mb-3"}>
          <View className={"flex-row justify-between m-5"}>
            <Text className={"font-bold text-lg"}>Categories</Text>
            <Link className={"text-[#16C2D9] text-lg"} href={"https://github.com/"} >View more</Link>
          </View>

          <View>
            <FlatList
              numColumns={2}
              nestedScrollEnabled={true}
              data={categories}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => <CategoryComponent item={item} />}
              justifyContent={"center"}
              contentContainerStyle={{ alignItems: 'center' }}
            />
          </View>
        </View>

        <View className={""}>
          <View className={"flex-row justify-between m-5"}>
            <Text className={"font-bold text-lg"}>Popular courses</Text>
            <Link className={"text-[#16C2D9] text-lg"} href={"https://github.com/"} >View more</Link>
          </View>

        </View>
      </ScrollView>
    </View>
  )
}

export default Home