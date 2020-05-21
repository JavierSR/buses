import 'react-native-gesture-handler'
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './src/componentes/home.js'
import Login from './src/componentes/login.js'
import Register from './src/componentes/register.js'
import postLogin from './src/componentes/postLogin.js'

const Stack = createStackNavigator();

export default () => {
  return (
    <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="Home"
                component={HomeScreen}
            />
            <Stack.Screen
                name="Login"
                component={Login}
            />
            <Stack.Screen
                name="Register"
                component={Register}
            />
            <Stack.Screen
                name="postLogin"
                component={postLogin}
            />
        </Stack.Navigator>
    </NavigationContainer>
  )
}