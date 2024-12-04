import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, TextInput, TouchableWithoutFeedback, Platform, Keyboard, ScrollView } from "react-native";
import Icon from "../../constants/Icon";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import userController from "../../controllers/user_controller";
import * as DocumentPicker from "expo-document-picker";
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../reuduxToolkit/userSlice';
import axios from "axios";


const MyProfile = ({ navigation, route }) => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  // State lưu trữ dữ liệu
  const [profile, setProfile] = useState(user);
  const [initialProfile, setInitialProfile] = useState(user);
  const [isEdit, setIsEdit] = useState(false);
  const [selection, setSelection] = useState({ start: 0, end: 0 });

  const [document, setDocument] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  // console.log(profile);

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

  //update profile
  const handleUpdateProfile = async () => {
    profile.status = "YES";
    const user = await userController.updateUser(profile);
    if (user === "User not found") {
      alert("Update failed");
    } else {
      dispatch(setUser(profile));
      setIsEdit(false);
    };
  }

  const pickImage = async () => {
    try {
      // Mở bộ chọn tài liệu và chỉ cho phép chọn file ảnh duy nhất
      const result = await DocumentPicker.getDocumentAsync({
        type: 'image/*',
        multiple: false,  // Chỉ cho phép chọn file ảnh
      });

      if (result.type !== 'cancel') {
        setDocument(result);  // Lưu thông tin file ảnh đã chọn
        uploadImageToCloudinary(result.uri);  // Upload ảnh lên Cloudinary
      }
    } catch (error) {
      console.log('DocumentPicker Error:', error);
    }
  };

  const uploadImageToCloudinary = async (uri) => {
    setUploading(true);

    const formData = new FormData();
    formData.append('file', {
      uri,
      name: 'photo.jpg',  // Tên ảnh (có thể lấy từ result.name nếu muốn)
      type: 'image/jpeg',  // Loại file (có thể thay đổi theo loại ảnh)
    });
    formData.append('upload_preset', 'fbizj8rm'); // Tên preset upload của bạn
    formData.append('cloud_name', 'dx0blzlhd'); // Tên Cloudinary của bạn

    console.log(JSON.stringify(formData));

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dx0blzlhd/image/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // console.log(response)

      if (response.data.secure_url) {
        setUploading(false);
        setImageUrl(response.data.secure_url);  // Lưu URL ảnh sau khi upload thành công
      }
    } catch (error) {
      setUploading(false);
      console.log('Upload to Cloudinary failed:', error.response || error.message || error);
    }
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
            <TouchableOpacity disabled={!isEdit} onPress={pickImage} className="w-28 h-28 rounded-full border-2 border-[#167F71] items-center justify-center">
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
                onFocus={() => { setSelection(null) }}
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
                onFocus={() => { setSelection(null) }}
                placeholder="VD: Nguyen Van A"
              />
            </View>
            <View className="flex-row items-center">
              <Text className="mr-2 w-32 text-lg font-bold">Date of birth:</Text>
              <TextInput
                className="text-lg border-b border-gray-400 flex-1 text-black"
                value={profile.date_of_birth}
                onChangeText={(value) => handleInputChange("date_of_birth", value)}
                editable={isEdit}
                selectTextOnFocus={true}
                onFocus={() => { setSelection(null) }}
                placeholder="VD: 01/01/2000"
              />
            </View>
            <View className="flex-row items-center">
              <Text className="mr-2 w-32 text-lg font-bold">Email:</Text>
              <TextInput
                className="text-lg border-b border-gray-400 flex-1 text-black"
                value={profile.email_contact}
                onChangeText={(value) => handleInputChange("email_contact", value)}
                editable={isEdit}

                selectTextOnFocus={true}
                onFocus={() => { setSelection(null) }}
                placeholder="VD: nguyenvan@gmail.com"
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
                onFocus={() => { setSelection(null) }}
                placeholder="VD: 123456789"
              />
            </View>
          </View>
          {isEdit ? (
            <View className="flex-row items-center justify-evenly my-6">
              <TouchableOpacity onPress={handleUpdateProfile} className="w-40 h-12 bg-[#0961F5] rounded-lg items-center justify-center">
                <Text className="text-white text-lg font-bold">Save</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCancel} className="w-40 h-12 bg-red-500 rounded-lg items-center justify-center">
                <Text className="text-white text-lg font-bold">Cancel</Text>
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