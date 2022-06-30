import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import auth from '@react-native-firebase/auth'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

//screens
import Login from './src/Login'
import Notification from './src/Notification'
import Calculator from './src/Calculator'
import TextScreen from './src/Text'
import Photo from './src/Photo'
import Signup from './src/Signup'
import ForgotPassword from './src/ForgotPassword'

import PushNotification from 'react-native-push-notification'
import SplashScreen from 'react-native-splash-screen'
import { StatusBar } from 'react-native'

const Tab = createBottomTabNavigator()
const App = () => {

  const [u, setU] = useState()

  useEffect(() => {
    StatusBar.setTranslucent(true)
    StatusBar.setBackgroundColor('#1B2430')
    PushNotification.channelExists('Nordstone', e => {
      if(!e) {
        PushNotification.createChannel({
          channelId: 'Nordstone',
          channelName: 'Default Nordstone Channel'
        })
      }
      SplashScreen.hide()
    })
  }, [])

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if(user) {
        setU(user)
      } else {
        setU(null)
      }
    })
  }, [])

  return auth().currentUser || u ? (
    <NavigationContainer>
      <Tab.Navigator
        
        screenOptions={({ route }) => ({
          tabBarLabel: () => null,
          headerShown: false,
          tabBarStyle: {backgroundColor: '#1B2430'},
          tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Notification') {
                iconName = 'bells'
              } else if (route.name === 'Photo') {
                iconName = 'picture'
              } else if (route.name === 'Text') {
                iconName = 'filetext1'
              } else if (route.name === 'Calculator') {
                iconName = 'calculator'
              } 

              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#C46D5E',
            tabBarInactiveTintColor: '#9CF6F6',
        })}>
        <Tab.Screen name="Notification" component={Notification} />
        <Tab.Screen name="Text" component={TextScreen} />
        <Tab.Screen name="Photo" component={Photo} />
        <Tab.Screen name="Calculator" component={Calculator} />
      </Tab.Navigator>
    </NavigationContainer>
  ) : (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
        tabBarStyle: {height: 0},
        headerShown: false
      }}>
        <Tab.Screen name="login" component={Login} />
        <Tab.Screen name="signup" component={Signup} />
        <Tab.Screen name="forgotpass" component={ForgotPassword} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App
