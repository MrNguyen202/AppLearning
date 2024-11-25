import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, TextInput, TouchableWithoutFeedback, Platform, Keyboard, ScrollView } from "react-native";
import Icon from "../../constants/Icon";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const MyProfile = ({ navigation, route }) => {
  // State lưu trữ dữ liệu
  const [profile, setProfile] = useState(route.params.user);
  const [initialProfile, setInitialProfile] = useState(route.params.user);
  const [isEdit, setIsEdit] = useState(false);
  const [selection, setSelection] = useState({ start: 0, end: 0 });


  // Hàm xử lý cập nhật giá trị
  const handleInputChange = (key, value) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      [key]: value,
    }));
  };

  const handleCancel = () => {
    setProfile(initialProfile); // Reset to the initial profile state
    setIsEdit(false); // Disable editing
    setSelection({ start: 0, end: 0 }); // Reset selection
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      enableOnAndroid={true} // Để hỗ trợ Android
      extraHeight={Platform.OS === "ios" ? 120 : 100}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View className="container">
          <View className="flex-row items-center h-20 px-6">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={Icon.arrowLeft} />
            </TouchableOpacity>
            <Text className="mx-4 text-xl font-bold">My profile</Text>
          </View>
          <View className="items-center justify-center">
            <TouchableOpacity className="w-28 h-28 rounded-full border-2 border-[#167F71] items-center justify-center">
              {profile.avatar ? (
                <Image className="w-full h-full rounded-full" source={{ uri: profile.avatar }} />
              ) : (
                <View className="items-center justify-center">
                  <View className="bg-[#167F71] h-[2] w-14"></View>
                  <View className="bg-[#167F71] h-[2] w-14 rotate-90 absolute"></View>
                </View>
              )}
              <View className="w-8 h-8 rounded-lg border-2 border-[#167F71] items-center justify-center absolute right-0 bottom-0 bg-white">
                <Image source={Icon.imageMyProfile} />
              </View>
            </TouchableOpacity>
            <View className="items-center justify-center h-24">
              <TextInput
                className="text-sm text-black"
                value={profile.description}
                onChangeText={(value) => handleInputChange("description", value)}
                editable={isEdit}
                selectTextOnFocus={true}
                onFocus={() => {setSelection(null)}}
              ></TextInput>
            </View>
          </View>
          <View className="px-6 justify-evenly h-[350]">
            <View className="flex-row items-center">
              <Text className="mr-2 w-32 text-lg font-bold">Full name:</Text>
              <TextInput
                className="text-lg border-b border-gray-400 flex-1 text-black"
                value={profile.name}
                onChangeText={(value) => handleInputChange("name", value)}
                editable={isEdit}
                selectTextOnFocus={true}
                onFocus={() => {setSelection(null)}}
              />
            </View>
            <View className="flex-row items-center">
              <Text className="mr-2 w-32 text-lg font-bold">Date of birth:</Text>
              <TextInput
                className="text-lg border-b border-gray-400 flex-1 text-black"
                value={new Date(profile.date_of_birth).toLocaleDateString('en-GB')}
                onChangeText={(value) => handleInputChange("date_of_birth", value)}
                editable={isEdit}
                selectTextOnFocus={true}
                onFocus={() => {setSelection(null)}}
              />
            </View>
            <View className="flex-row items-center">
              <Text className="mr-2 w-32 text-lg font-bold">Email:</Text>
              <TextInput
                className="text-lg border-b border-gray-400 flex-1 text-black"
                value={profile.email}
                onChangeText={(value) => handleInputChange("email", value)}
                editable={isEdit}
                
                selectTextOnFocus={true}
                onFocus={() => {setSelection(null)}}

              />
            </View>
            <View className="flex-row items-center">
              <Text className="mr-2 w-32 text-lg font-bold">Phone: (+84)</Text>
              <TextInput
                className="text-lg border-b border-gray-400 flex-1 text-black"
                value={profile.phone}
                onChangeText={(value) => handleInputChange("phone", value)}
                editable={isEdit}
                selectTextOnFocus={true}
                onFocus={() => {setSelection(null)}}
              />
            </View>
          </View>
          {isEdit ? (
            <View className="flex-row items-center justify-evenly my-6">
            <TouchableOpacity className="w-40 h-12 bg-[#0961F5] rounded-lg items-center justify-center">
              <Text className="text-white text-lg font-bold">Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel} className="w-40 h-12 bg-red-500 rounded-lg items-center justify-center">
              <Text className="text-black text-lg font-bold">Cancel</Text>
            </TouchableOpacity>
          </View>
          ) : (
            <View className="flex-row items-center justify-evenly my-6">
              <TouchableOpacity onPress={() => setIsEdit(!isEdit)} className="w-40 h-12 bg-[#0961F5] rounded-lg items-center justify-center">
                <Text className="text-white text-lg font-bold">Edit</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

export default MyProfile;