import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import Icon from "../constants/Icon";
import userLessonController from '../controllers/userLesson_controller'
import lessons from "../assets/data/Lesson";

const LessonComponent = (...props) => {
  const [section, setSection] = useState(props[0].item);
  const[loading, setLoading] = useState(false)
  
  useEffect(() => {
    if(props[0].page == "MyCourseDetail"){
      const fetchLessonStatuses = async () => {
        const updatedSectionsData = await Promise.all(
          section.map(async (section) => {
            const updatedLessons = await Promise.all(
              section.lessons.map(async (lesson) => {
                const res = await userLessonController.checkStatus(props[0].userId, lesson.id);
                lesson.status = res;
                return lesson;
              })
            );
            section.lessons = updatedLessons; // Cập nhật lại lessons trong section
            return section; // Trả về section đã cập nhật
          })
        );
    
        // Cập nhật state với dữ liệu mới
        setSection(updatedSectionsData);
      };
    
      fetchLessonStatuses();
    }
  }, []);

  const handlePress = useCallback((item) => {
    if (props[0].page === "MyCourseDetail") {
      props[0].onPress(item);
    } else {
      alert("You can't access this lesson");
    }
  }, [props]);

  return  (
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
                      onPress={() => props[0].page=="MyCourseDetail"? handlePress(item):alert("You can't access this lesson")}
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
                              props[0].page == "MyCourseDetail"
                                ? item.status == "completed" ? Icon.check : Icon.play
                                : Icon.lock
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

export default React.memo(LessonComponent);