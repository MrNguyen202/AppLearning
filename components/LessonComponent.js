import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "../constants/Icon";
import lessons from "../assets/data/Lesson";

const LessonComponent = (...props) => {
  const [section, setSection] = useState([]);
  const [lesson, setLesson] = useState([]);
  const [lock, setLock] = useState(props[0].status);
  const[loading, setLoading] = useState(false)
  //   console.log(props[0].item)

  
  useEffect(() => {
    setSection(props[0].item);
    setLesson(lessons)
    // console.log(lesson);
  }, [loading]);
//   console.log(props[0])
//   console.log(lesson)


    // return (
    //     <View>

    //     </View>
    // )

  return (
    <View className={`mt-5 ml-4 bg-white mr-4 rounded-2xl `}>
        {loading==false?setLoading(true):null}
      {section.map((section) => {
        return (
          <View key={section.id}>
            <View className={`flex-row justify-between ml-3 mr-3 mt-4`}>
              <Text className={`font-bold`}>
                Section {section.sectionNumber} - <Text className={`text-[#0961F5]`}> {section.title.length > 12?section.title.slice(0,11)+"...":section.title}</Text>
              </Text>
              <Text>? minutes</Text>
            </View>
            {section.lessons
              .map((item) => {
                   return (
                  <View key={item.id}>
                    <TouchableOpacity
                      className={` ml-3 mr-3 mt-4 flex-row justify-between items-center mb-5`}
                    >
                      <View className={`flex-row items-center`}>
                        <View
                          className={`h-[46] w-[46] border border-[#E8F1FF] bg-[#F5F9FF] justify-center rounded-full items-center mr-3`}
                        >
                          <Text className={`font-semibold`}>
                            {item.lessonNumber < 10
                              ? "0" + item.lessonNumber
                              : item.lessonNumber}
                          </Text>
                        </View>
                        <View>
                          <Text className={`font-bold text-base`}>{item.title.length > 20?item.title.slice(0,19)+"...":item.title}</Text>
                          <Text>{item.time} Mins</Text>
                        </View>
                      </View>
                      <TouchableOpacity>
                        <TouchableOpacity>
                          <Image
                            source={
                              lock==0
                                ? Icon.lock
                                : Icon.play
                            }
                          />
                        </TouchableOpacity>
                      </TouchableOpacity>
                    </TouchableOpacity>
                    <View className={`w-full h-[1] bg-[#E8F1FF]`}></View>
                  </View>
                );
              })}
          </View>
        );
      })}
    </View>
  );
};

export default LessonComponent;
