import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "../../constants/Icon";
import RadioButton from "../../components/RadioButton";
import courseController from "../../controllers/course_controller";
import paymentController from "../../controllers/payment_controller";
import billController from "../../controllers/bill_controller";
import { useSelector } from "react-redux";

const PaymentMethod = ({ navigation, route }) => {
  const [course, setCourse] = useState(null);
  const [indexSelect, setIndexSelect] = useState(0);
  const [payment, setPayment] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user.user);


  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await courseController.getCourseById(
          route.params.courseId
        );
        setCourse(data);
        const payments = await paymentController.getPayments();
        setPayment(payments);
      } catch (error) {
        console.error("Failed to fetch course:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [route.params.courseId]);

  const handleSelect = (index) => {
    setIndexSelect(index);
  };

  const handleBuyNow = () => {
    const bill = {
      courseId: course.course.id,
      userId: user.id,
      paymentId: payment[indexSelect].id,
      status: "paid",
      createdDate: new Date(),
    };
    billController.addBill(bill);
    navigation.navigate("PaymentSuccess", {
      course: course,
      payment: payment[indexSelect],
    });
  };

  if (!course || !payment.length) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>No data available</Text>
      </View>
    );
  }

  // console.log(course)
  return (
    <View className="container">
      <View className="h-16 justify-end mx-6">
        <View className="flex-row items-center">
          <TouchableOpacity>
            <Image source={Icon.goBack} className="mr-4" resizeMode="contain" />
          </TouchableOpacity>
          <Text className="text-xl font-bold">Payment Method</Text>
        </View>
      </View>
      <View className="mx-6 my-6">
        <View className="flex-row justify-between">
          <Image
            source={{ uri: course.course.image }}
            className="w-28 h-24 rounded-md"
          />
          <View className="w-60 justify-between">
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="text-lg font-bold"
            >
              {course.course.title}
            </Text>
            <Text className="text-sm">{course.teacherName}</Text>
            <View className="items-end">
              <Text className="text-lg font-bold">
                $ {course.course.price.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
        {/* <Image source={{ uri: payment[0].image }} /> */}
      </View>
      <View className="mx-6 my-6">
        <Text className="text-base">
          Select the Payment Methods you want to use
        </Text>
        <View>
          {payment.map((item, index) => (
            <TouchableOpacity
              onPress={() => handleSelect(index)}
              className="flex-row justify-between items-center my-4 px-4 h-14 shadow-2xl bg-white rounded-lg"
              key={index}
            >
              <Image source={{ uri: item.image }} className={`w-[40] h-[29]`} />
              <View className="flex-row items-center">
                <Text className="font-bold text-base">{item.name}</Text>
                <View className="ml-4 justify-center items-center">
                  <RadioButton
                    width={24}
                    height={24}
                    color={"gray"}
                    select={indexSelect === index}
                    click={() => handleSelect(index)}
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View className="mx-6">
        <TouchableOpacity
          onPress={handleBuyNow}
          className="bg-[#265AE8] rounded-md h-14 justify-center items-center"
        >
          <Text className="text-white font-bold text-2xl">Buy now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentMethod;
