import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Platform,
  StyleSheet,
  TextInput,
  ActivityIndicator
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import courses from "../../assets/data/Course";
import Icon from "../../constants/Icon";
import sections from "../../assets/data/Section";
import lessons from "../../assets/data/Lesson";
import enroll_courses from "../../assets/data/enroll_course";
import LessonComponent from "../../components/LessonComponent";
import { Video } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import users from "../../assets/data/User";
import YoutubeIframe from "react-native-youtube-iframe";
import userLessonController from "../../controllers/userLesson_controller";
import courseController from "../../controllers/course_controller";
import { useSelector } from 'react-redux'


const Tab = createMaterialTopTabNavigator();

const MyCourseDetail = ({ navigation, route }) => {
  const [section, setSection] = useState(null);
  const user = useSelector((state) => state.user.user);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [questionCourse, setQuestionCourse] = useState([]);
  const [answerQuestion, setAnswerQuestion] = useState([]);
  const [video, setVideo] = useState();
  const [course, setCourse] = useState(null);
  const [playing, setPlaying] = useState(false);


  useEffect(() => {
    const initializeData = async () => {
      try {
        const data = await courseController.getCourseById(route.params.course); 
        setCourse(data);
        console.log(data)
        setVideo(await data.course.sections[0].lessons[0]);
        setQuestionCourse(data.course.questions);
      } catch (error) {
        console.error("Failed to fetch course:", error);
      }
    };

    initializeData();
  }, []);



  // useEffect(() => {
  //   if (video) {
  //     console.log(video)
  //   }
  // }, [video]);

  // useEffect(() => {
  //   const filterQuestion = questions.filter(
  //     (question) => question.course == course.course_id
  //   );
  //   setQuestionCourse(filterQuestion);
  //   // console.log(questionCourse)
  //   const questionIds = questionCourse.map((question) => question.question_id);

  //   if (answers) {
  //     const answer = answers.filter((answer) =>
  //       questionIds.includes(answer.question)
  //     );
  //     setAnswerQuestion(answer);
  //   }
  // }, []);

  const selectFiles = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        multiple: true, // Cho phép chọn nhiều file
      });

      setSelectedFiles(result.assets || [result]); // Sử dụng `assets` nếu chọn nhiều file, hoặc lưu thông tin của file đơn
      console.log("Selected files:", result.assets || [result]);
    } catch (error) {
      console.error("Error picking document:", error);
    }
  };
  // console.log(lesson_course)

  function Project() {
    const [fileResource, setFileResource] = useState("sample.pdf");

    const downloadFromUrl = async () => {
      const filename = "sample.pdf"; // Đổi tên file cho phù hợp
      setFileResource(filename);
      try {
        const result = await FileSystem.downloadAsync(
          "https://pdfobject.com/pdf/sample.pdf",
          FileSystem.documentDirectory + filename
        );
        // Kiểm tra sự tồn tại của Content-Type và sử dụng giá trị mặc định nếu cần
        const mimeType =
          result.headers && result.headers["Content-Type"]
            ? result.headers["Content-Type"]
            : "application/pdf"; // Sử dụng "application/pdf" cho file PDF
        save(result.uri, filename, mimeType);
      } catch (error) {
        console.error("Download failed:", error);
      }
    };

    const save = async (uri, filename, mimetype) => {
      if (Platform.OS === "android") {
        const permissions =
          await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
        if (permissions.granted) {
          const base64 = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          await FileSystem.StorageAccessFramework.createFileAsync(
            permissions.directoryUri,
            filename,
            mimetype
          )
            .then(async (uri) => {
              await FileSystem.writeAsStringAsync(uri, base64, {
                encoding: FileSystem.EncodingType.Base64,
              });
            })
            .catch((e) => console.log("Error saving file:", e));
        } else {
          shareAsync(uri);
        }
      } else {
        shareAsync(uri);
      }
    };

    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}
        style={{ alignSelf: "stretch" }}
        className={`bg-white pl-4 pr-4 pt-6`}
      >
        <TouchableOpacity
          onPress={selectFiles}
          className={`border-dashed justify-center items-center p-6 border-[#1849D6] border-2 `}
        >
          <Image source={Icon.cloud} />
          <Text className={`text-base`}>
            Drag your file(s) or {`\t`}
            <Text className={"text-blue-500 text-lg"}>browse</Text>
          </Text>

          <Text className={"text-gray-500 text-sm"}>
            Max 10 MB files are allowed
          </Text>
        </TouchableOpacity>
        {selectedFiles.map((file, index) => {
          if (index >= 3) {
            return null;
          } else {
            return (
              <View
                key={index}
                className={`flex-row items-center justify-between border border-[#E7E7E7] rounded-md pl-2 pr-2 pt-3 pb-3 mt-2`}
              >
                <View>
                  <Text className={`bold`}>{file.name}</Text>
                  <Text className={`text-[#167F71]`}>Upload success</Text>
                </View>
                <TouchableOpacity>
                  <Image source={Icon.bin} />
                </TouchableOpacity>
              </View>
            );
          }
        })}
        <View className={`mt-3`}>
          <Text className={`font-bold mb-4 text-lg`}>
            Description for project
          </Text>
          <Text className={`text-[#666666] mb-4`}>{course.course.description}</Text>
        </View>
        <View>
          <Text className={`font-bold mb-4 text-lg`}>
            Resources for download
          </Text>
          <TouchableOpacity
            onPress={downloadFromUrl}
            className={`flex-row justify-between items-center mt-1`}
          >
            <View className={`flex-row items-center`}>
              <Image source={Icon.pdf} className={`mr-3`} />
              <View>
                <Text className={`text-base font-bold`}>{fileResource}</Text>
                <View className={`flex-row w-[70] justify-between mt-2`}>
                  <Text className={`text-xs text-[#888C94]`}>.pdf</Text>
                  <Text className={`text-xs text-[#888C94]`}>2Mb</Text>
                </View>
              </View>
            </View>

            <Image source={Icon.download} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={downloadFromUrl}
            className={`flex-row justify-between items-center  mt-3`}
          >
            <View className={`flex-row items-center`}>
              <Image source={Icon.pdf} className={`mr-3`} />
              <View>
                <Text className={`text-base font-bold`}>{fileResource}</Text>
                <View className={`flex-row w-[70] justify-between mt-2`}>
                  <Text className={`text-xs text-[#888C94]`}>.pdf</Text>
                  <Text className={`text-xs text-[#888C94]`}>2Mb</Text>
                </View>
              </View>
            </View>

            <Image source={Icon.download} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={downloadFromUrl}
            className={`flex-row justify-between items-center mt-3`}
          >
            <View className={`flex-row items-center`}>
              <Image source={Icon.pdf} className={`mr-3`} />
              <View>
                <Text className={`text-base font-bold`}>{fileResource}</Text>
                <View className={`flex-row w-[70] justify-between mt-2`}>
                  <Text className={`text-xs text-[#888C94]`}>.pdf</Text>
                  <Text className={`text-xs text-[#888C94]`}>2Mb</Text>
                </View>
              </View>
            </View>

            <Image source={Icon.download} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  const handlePress = useCallback((item) => {
    setVideo(item);
  }, []);

  function Lessons() {
    return (
      <ScrollView
        className={`bg-white flex-1 rounded-2xl`}
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ alignSelf: "stretch" }}
      >
        <View className="pl-4 pr-4 pt-5 rounded-2xl shadow-md shadow-[#d4d3d3] pb-6 ">
          <LessonComponent
            item={course.course.sections}
            status={0}
            page="MyCourseDetail"
            onPress={ handlePress}
            userId={user.id}
          />
        </View>
      </ScrollView>
    );
  }

  function QA() {
    const [comment, setComment] = useState("");
    return (
      <ScrollView
        className={`bg-white flex-1 rounded-2xl`}
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ alignSelf: "stretch" }}
      >
        {questionCourse.map((quest) => {
          return (
            <View key={quest.id} className="bg-blue p-4 mb-2">
              <View className="flex-row items-center mb-2">
                <Image
                  source={{ uri: quest.user.avatar }}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <View>
                  <Text className="font-bold text-base">
                    {quest.user.name}
                  </Text>
                  <Text className="text-gray-500 text-sm">
                    {quest.createdDate.slice(0, 10)}  
                  </Text>
                </View>
              </View>
              <Text className="text-base mb-2">{quest.comment}</Text>
              <TouchableOpacity>
                <Text className="text-blue-600 font-medium mb-1">Reply</Text>
              </TouchableOpacity>
            </View>
          );
        })}
        <View className="absolute bottom-0 inset-x-0 flex-row items-center bg-gray-200 p-2 border-t border-gray-300">
          <Image
            source={{ uri: user.avatar }}
            className="w-8 h-8 rounded-full mr-2"
          />
          <TextInput
            className="flex-1 bg-white rounded-full px-4 py-2 text-base"
            placeholder="Write a Q&A"
            placeholderTextColor="#999"
            onChangeText={(text) => setComment(text)}
          />
          <TouchableOpacity className="bg-blue-600 w-8 h-8 rounded-full justify-center items-center ml-2" onPress={() => {
            
          }}>
            <Text className="text-white text-lg">➤</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  const onStateChange = async (state) => {
    if(state === "started") {
      setPlaying(true);
    }
    if (state === "ended") {
      const res = await userLessonController.updateStatus(user.id, video.id);
      if (res) {
        alert("Video has finished");
      }
      setPlaying(false);
    }
  };


  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  // console.log(video)

  return video ? (
    <View className={`bg-white flex-1`}>
      <YoutubeIframe
        height={200}
        play={playing}
        videoId={video.url}
        onChangeState={onStateChange}
      />
      <View className={`ml-4 mt-3 mr-4`}>
        <Text
          className={` text-white bg-[#26C4E8] rounded text-xs pl-2 pr-2 pt-1 pb-1 font-bold w-1/4 text-center `}
        >
          {course.course.status}
        </Text>
        <View className={`flex-row items-center`}>
          <Image
            className={`mt-2 mr-3`}
            source={require("../../assets/images/avatar.png")}
          />
          <Text className={`font-bold`}>{course.teacherName}</Text>
        </View>
        <Text className={`font-bold text-xl `}>{course.course.title}</Text>
        <View className={`justify-between flex-row mt-2`}>
          <View className={`flex-row items-center`}>
            <Image source={Icon.clock} />
            <Text className={`ml-2 text-[#666666] text-xs opacity-60`}>
              {Math.floor(course.totalMinutes / 60)} hour{" "}
              {Math.floor(course.totalMinutes % 60)} min
            </Text>
          </View>
          <View className={`flex-row items-center`}>
            <Image source={Icon.camera} />
            <Text className={`ml-2 text-[#666666] text-xs opacity-60`}>
              {course.totalLesson} lessons
            </Text>
          </View>
        </View>
        <View className={`justify-between flex-row mb-3 mt-2`}>
          <View className={`flex-row items-center`}>
            <Image source={Icon.starNoFill} />
            <Text className={`ml-2 text-[#666666] text-xs opacity-60`}>
              {String(course.course.rating).includes(".")
                ? course.course.rating
                : `${course.course.rating}.0`}
            </Text>
          </View>
          <View className={`flex-row items-center`}>
            <Image source={Icon.user3} />
            <Text className={`ml-2 text-[#666666] text-xs opacity-60`}>
              {course.course.enrollCourses.length} students
            </Text>
          </View>
        </View>
        <Text className={`mb-3`}>
          {course.course.description.length > 80
            ? course.course.description.slice(0, 75) + "..."
            : course.course.description}
        </Text>
      </View>
      <ScrollView contentContainerStyle={{ height: "100%", flexGrow: 1 }}>
        <NavigationContainer independent={true}>
          <Tab.Navigator>
            <Tab.Screen name="Lessons" component={Lessons} />
            <Tab.Screen name="Project" component={Project} />
            <Tab.Screen name="Q&A" component={QA} />
          </Tab.Navigator>
        </NavigationContainer>
      </ScrollView>
    </View>
  ) : (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default MyCourseDetail;
