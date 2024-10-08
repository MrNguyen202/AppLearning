import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import TabsLayout from './(tabs)/_layout';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import login from './(auth)/login';
import signup from './(auth)/signup';
const Stack = createNativeStackNavigator();

const index = () => {
    return (
        <NavigationContainer independent={true}>
            {/* <Stack.Navigator>
                <Stack.Screen name="login" component={login} />
                <Stack.Screen name="signup" component={signup} />
            </Stack.Navigator> */}

            <TabsLayout />
        </NavigationContainer>
      );
}

export default index