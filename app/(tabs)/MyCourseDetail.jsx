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
} from "react-native";
import React, { useState, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Search from "./Search";
import Home from "./Home";
import { NavigationContainer } from "@react-navigation/native";
import courses from "../../assets/data/Course";
import Icon from "../../constants/Icon";
import sections from "../../assets/data/Section";
import lessons from "../../assets/data/Lesson";
import enroll_courses from "../../assets/data/enroll_course";
import feedback from "../../assets/data/FeedBack";
import CommentComponent from "../../components/CommentComponent";
import Button from "../../components/Button";
import LessonComponent from "../../components/LessonComponent";
import { Video } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import questions from "../../assets/data/Question";
import answers from "../../assets/data/Answer";

const Tab = createMaterialTopTabNavigator();

const MyCourseDetail = ({ navigation, route }) => {
  const [student, setStudent] = useState(0);
  const [section, setSection] = useState([]);
  const [lesson, setLesson] = useState([]);
  const [time, setTime] = useState(0);
  const [feedbackCourse, setFeedbackCourse] = useState([]);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [course, setCourse] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

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

  useEffect(() => {
    if (courses && courses.length > 0) {
      setCourse(courses[0]);
    }
  }, [courses]);

  // Cập nhật dữ liệu section và student count khi course thay đổi
  useEffect(() => {
    if (course && sections) {
      const section_course = sections.filter(
        (section) => section.course_id === course.course_id
      );
      setSection(section_course);

      const studentCount = enroll_courses.reduce(
        (count, value) =>
          value.course === course.course_id ? count + 1 : count,
        0
      );
      setStudent(studentCount);
    }
  }, [course, sections, enroll_courses]);

  // Cập nhật danh sách bài học và tổng thời gian khi section thay đổi
  useEffect(() => {
    if (section.length > 0 && lessons) {
      const lesson_course = lessons.filter((lesson) =>
        section.map((sec) => sec.section_id).includes(lesson.section_id)
      );
      setLesson(lesson_course);

      const totalSeconds = lesson_course.reduce((total, lesson) => {
        const [minutes, seconds] = lesson.time.split(":").map(Number);
        return total + minutes * 60 + seconds;
      }, 0);
      setTime(totalSeconds);
    }
  }, [section, lessons]);

  // Cập nhật danh sách câu hỏi và câu trả lời khi course hoặc danh sách questions thay đổi
  useEffect(() => {
    if (course && questions) {
      const questionCourse = questions.filter(
        (question) => question.course === course.course_id
      );
      setQuestions(questionCourse);

      const questionIds = questionCourse.map(
        (question) => question.question_id
      );

      if (answers) {
        const answerQuestion = answers.filter((answer) =>
          questionIds.includes(answer.question)
        );
        setAnswers(answerQuestion);
      }
    }
  }, [course, questions, answers]);

  function Project() {
    const [status, setStatus] = useState(true);
    const [showFeedback, setShowFeedback] = useState([]);
    const [fileResource, setFileResource] = useState("sample.pdf");

    useEffect(() => {
      status
        ? setShowFeedback(feedbackCourse.slice(0, 3))
        : setShowFeedback(feedbackCourse);
    }, [status]);

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
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }}
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
          if (index >= 3 && status) {
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
          <Text className={`text-[#666666] mb-4`}>{course.description}</Text>
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

  function Lessons() {
    return (
      <ScrollView
        className={`bg-white flex-1 rounded-2xl`}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
        style={{ alignSelf: "stretch" }}
      >
        <View className="pl-4 pr-4 pt-5 rounded-2xl shadow-md shadow-[#d4d3d3] pb-6 ">
          <LessonComponent item={section} status={0} />
        </View>
      </ScrollView>
    );
  }

  function QA() {
    console.log(questions);

    const renderPost = ({ item }) => (
      <View className="bg-white p-4 mb-2">
        <View className="flex-row items-center mb-2">
          <Image
            source={{ uri: item.avatar }}
            className="w-10 h-10 rounded-full mr-3"
          />
          <View>
            <Text className="font-bold text-base">{item.username}</Text>
            <Text className="text-gray-500 text-sm">
              {item.timestamp} · Student
            </Text>
          </View>
        </View>
        <Text className="text-base mb-2">{item.content}</Text>
        <TouchableOpacity>
          <Text className="text-blue-600 font-medium mb-1">Reply</Text>
        </TouchableOpacity>
        {item.replies > 0 && (
          <TouchableOpacity>
            <Text className="text-blue-600 font-medium">
              view {item.replies} replies
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );

    return (
      <View className="flex-1 bg-gray-100 ">
        {questions.length > 0
          ? questions.map((question) => {
              console.log(question);
              renderPost({ item: question });
            })
          : null}
        <View className="flex-row items-center bg-gray-200 p-2 border-t border-gray-300">
          <Image
            source={{ uri: "https://v0.dev/placeholder.svg" }}
            className="w-8 h-8 rounded-full mr-2"
          />
          <TextInput
            className="flex-1 bg-white rounded-full px-4 py-2 text-base"
            placeholder="Write a Q&A"
            placeholderTextColor="#999"
          />
          <TouchableOpacity className="bg-blue-600 w-8 h-8 rounded-full justify-center items-center ml-2">
            <Text className="text-white text-lg">➤</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View className={`bg-white flex-1`}>
      <Video
        ref={video}
        className={`w-full h-[200]`}
        source={{
          uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        }}
        useNativeControls
        isLooping
        onPlaybackStatusUpdate={setStatus}
        resizeMode="contain"
      />

      <View className={`ml-4 mt-3 mr-4`}>
        <Text
          className={` text-white bg-[#26C4E8] rounded text-xs pl-2 pr-2 pt-1 pb-1 font-bold w-1/4 text-center `}
        >
          {course.status}
        </Text>
        <View className={`flex-row items-center`}>
          <Image
            className={`mt-2 mr-3`}
            source={require("../../assets/images/avatar.png")}
          />
          <Text className={`font-bold`}>{course.teacher}</Text>
        </View>
        <Text className={`font-bold text-xl `}>{course.title}</Text>
        <View className={`justify-between flex-row mt-2`}>
          <View className={`flex-row items-center`}>
            <Image source={Icon.clock} />
            <Text className={`ml-2 text-[#666666] text-xs opacity-60`}>
              {Math.floor(time / 3600)} hour {Math.floor((time % 3600) / 60)}{" "}
              min
            </Text>
          </View>
          <View className={`flex-row items-center`}>
            <Image source={Icon.camera} />
            <Text className={`ml-2 text-[#666666] text-xs opacity-60`}>
              {lesson.length} lessons
            </Text>
          </View>
        </View>
        <View className={`justify-between flex-row mb-3 mt-2`}>
          <View className={`flex-row items-center`}>
            <Image source={Icon.starNoFill} />
            <Text className={`ml-2 text-[#666666] text-xs opacity-60`}>
              {course.rating}
            </Text>
          </View>
          <View className={`flex-row items-center`}>
            <Image source={Icon.user3} />
            <Text className={`ml-2 text-[#666666] text-xs opacity-60`}>
              {student} students
            </Text>
          </View>
        </View>
        <Text className={`mb-3`}>{course.description}</Text>
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
  );
};

export default MyCourseDetail;
