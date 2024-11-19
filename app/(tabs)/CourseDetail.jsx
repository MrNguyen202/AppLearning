import {
  View,
  Text,
  ScrollView,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
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
import { Video } from 'expo-av'


const Tab = createMaterialTopTabNavigator();

const CourseDetail = ({ navigation, route }) => {
  const [student, setStudent] = useState(0);
  const [section, setSection] = useState([]);
  const [lesson, setLesson] = useState([]);
  const [time, setTime] = useState(0);
  const [feedbackCourse, setFeedbackCourse] = useState([]);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [course, setCourse] = useState([]);

  useEffect(() => {
    const initializeData = async () => {

      setCourse(route.params.course);

      var section_course = sections.filter(
        (section) => section.course_id === course.course_id
      );

      setSection(section_course);


      const studentCount = enroll_courses.reduce(
        (count, value) =>
          value.course === course.course_id  ? count + 1 : count,
        0
      );
      setStudent(studentCount);


      const lesson_course = lessons.filter((lesson) =>
        section_course
          .map((section) => section.section_id)
          .includes(lesson.section_id)
      );
      setLesson(lesson_course);

      const totalSeconds = lesson_course.reduce((total, lesson) => {
        const [minutes, seconds] = lesson.time.split(":").map(Number);
        return total + minutes * 60 + seconds;
      }, 0);
      setTime(totalSeconds);

      const filteredFeedback = feedback.filter(
        (value) => value.course === course.course_id
      );
      setFeedbackCourse(filteredFeedback);

    };

    initializeData();
  }, [
    sections,
    enroll_courses,
    lessons,
    feedback,
    course,
  ]);


  function OverView() {
    const [status, setStatus] = useState(true);
    const [showFeedback, setShowFeedback] = useState([]);

    useEffect(() => {
      status
        ? setShowFeedback(feedbackCourse.slice(0, 3))
        : setShowFeedback(feedbackCourse);
    }, [status]);

    return (
      <ScrollView
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }}
      style={{ alignSelf: 'stretch' }} 
              className={`bg-white pl-4 pr-4 pt-6`}
      >
        <Text className={`font-bold mb-4 text-lg`}>Introduction</Text>
        <Text className={`text-[#666666] mb-4`}>
          {course.description}
        </Text>
        <Text className={`font-bold mb-4  text-lg`}>What You'll Get</Text>
        <View className={`flex-row mt-2`}>
          <Image source={Icon.book}></Image>
          <Text className={`ml-3`}>25 Lessons</Text>
        </View>
        <View className={`flex-row mt-2`}>
          <Image source={Icon.phone}></Image>
          <Text className={`ml-3`}>Access Mobile, Desktop & TV</Text>
        </View>
        <View className={`flex-row mt-2`}>
          <Image source={Icon.trendUp1}></Image>
          <Text className={`ml-3`}>Beginner Level</Text>
        </View>
        <View className={`flex-row mt-2`}>
          <Image source={Icon.soundcloud}></Image>
          <Text className={`ml-3`}>Audio Book</Text>
        </View>
        <View className={`flex-row mt-2`}>
          <Image source={Icon.ride}></Image>
          <Text className={`ml-3`}>Lifetime Access</Text>
        </View>
        <View className={`flex-row mt-2`}>
          <Image source={Icon.write}></Image>
          <Text className={`ml-3`}>100 Quizzes</Text>
        </View>
        <View className={`flex-row mt-2`}>
          <Image source={Icon.book}></Image>
          <Text className={`ml-3`}>25 Lessons</Text>
        </View>
        <Text className={`font-bold mb-4 mt-4 text-lg`}>Feedback</Text>
        <View className={`flex-row justify-between mb-3`}>
          <View
            className={`w-[180] h-[90] bg-[#FFF1F3] items-center justify-center rounded`}
          >
            <View className={`flex-row items-center`}>
              <Image source={Icon.star} />
              <Text className={`ml-2`}>5.0</Text>
            </View>
            <Text className={`font-bold`}>Reviews</Text>
          </View>
          <View
            className={`w-[180] h-[90] bg-[#FFF1F3] items-center justify-center rounded`}
          >
            <View className={`flex-row items-center`}>
              <Image source={Icon.user1} />
              <Text className={`ml-2`}>475</Text>
            </View>
            <Text className={`font-bold`}>Students</Text>
          </View>
        </View>
        {showFeedback.map((value, index) => {
          return <CommentComponent key={index} item={value} />;
        })}
        <View className={`mb-5`}></View>
        <Button
          border={"border"}
          txtColor={"text-[#265AE8]"}
          height={60}
          width={375}
          valTxt={status ? "Load more" : "Hide"}
          onPress={() => {
            setStatus(!status);
          }}
        />
      </ScrollView>
    );
  }

  function Lessons() {
    return (
      <ScrollView className={`bg-white flex-1 rounded-2xl`} contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
      style={{ alignSelf: 'stretch' }} >
          <View className="pl-4 pr-4 pt-5 rounded-2xl shadow-md shadow-[#d4d3d3] pb-6 ">
            <LessonComponent item={section} status={0} />
        </View>
      </ScrollView>
    );
  }

  return (
    <View className={`bg-white flex-1`}>
      <Video
        ref={video}
        className={`w-full h-[200]`}
        source={{uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"}}
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
        <Text className={`font-bold text-xl `}>
          {course.title}
        </Text>
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
            <Tab.Screen name="Over view" component={OverView} />
            <Tab.Screen name="Lessons" component={Lessons} />
          </Tab.Navigator>
        </NavigationContainer>
      </ScrollView>
      <View className="absolute bottom-0 inset-x-0 border-t border-[#DDDDDD] py-4 bg-[#F5F9FF] flex-row justify-between pl-8 pr-8 items-center">
        <Text className=" text-black font-bold">
          $ {course.price}
        </Text>
        <Button
          bgColor={"#265AE8"}
          width={141}
          height={44}
          icon={Icon.shoppingCart}
          txtColor={"text-white"}
          valTxt={"Add to cart"}
        />
      </View>
    </View>
  );
};

export default CourseDetail;
