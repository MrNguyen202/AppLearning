import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import TabsLayout from './(tabs)/_layout';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './(auth)/login';
import Signup from './(auth)/signup';
const Stack = createNativeStackNavigator();

const index = () => {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator>
                <Stack.Screen name="Signup" component={Signup} options={{headerShown: false}}/>
                <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
            </Stack.Navigator>

            {/* <TabsLayout /> */}
        </NavigationContainer>
      );
}

export default index