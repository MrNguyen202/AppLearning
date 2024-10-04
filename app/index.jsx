import { Link } from 'expo-router';
import { Image, StyleSheet, Platform, View, Text } from 'react-native';


export default function HomeScreen() {
  return (
    <View className="bg-slate-400">
      <Link href="/home">Go to profile</Link>
    </View>
  );
}