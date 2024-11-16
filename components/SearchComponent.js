import { View, Text, TextInput, Image } from "react-native";
import React from "react";

const SearchComponent = ({placeholder, img, onChange,valTxt}) => {
  return (
    <View
      className={`flex-row pl-3 rounded bg-gray-200 h-10  items-center w-3/4 mr-3`}
    >
      <View 
        className={`flex-row items-center`}
      >
        <TextInput placeholder={placeholder}
          className={`flex-1`}
          onChangeText={onChange}
          defaultValue={valTxt}
        ></TextInput>
        <Image source={img}
          className={`w-5 h-5 mr-3`}
          resizeMode="contain"
        ></Image>
      </View>
    </View>
  );
};

export default SearchComponent;
