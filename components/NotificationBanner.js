import React, { useRef, useEffect } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';

const NotificationBanner = ({ onUpdate }) => {
  const slideAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    // Hiệu ứng trượt xuống
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Tự động ẩn sau 5 giây
    const timer = setTimeout(() => {
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View
      style={[
        {
          transform: [{ translateY: slideAnim }],
        },
      ]}
      className="absolute rounded-xl left-[5%] h-16 top-5 w-[90%] bg-orange-500 px-4 flex-row justify-between items-center z-50"
    >
      <Text className="text-white text-base mr-2 w-44">
        Bạn cần cập nhật thông tin cá nhân!
      </Text>
      <TouchableOpacity
        className="bg-white px-4 py-2 rounded"
        onPress={onUpdate}
      >
        <Text className="text-orange-500 font-bold">Cập nhật ngay</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default NotificationBanner;