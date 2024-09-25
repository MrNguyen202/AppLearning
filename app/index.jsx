import { Link } from 'expo-router';
import { Image, StyleSheet, Platform, View, Text } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';


export default function HomeScreen() {
  return (
    <View className="bg-slate-400">
      <Text >ABC</Text>
      <Link href="/home">Go to profile</Link>
      
    </View>
  );
}


