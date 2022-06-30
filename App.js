import React, { useEffect } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

//screens
import Notification from './src/Notification'
import Calculator from './src/Calculator'
import PushNotification from 'react-native-push-notification'

const Tab = createBottomTabNavigator()
const App = () => {

  useEffect(() => {
    PushNotification.channelExists('Nordstone', e => {
      if(!e) {
        PushNotification.createChannel({
          channelId: 'Nordstone',
          channelName: 'Default Nordstone Channel'
        })
      }
    })
  }, [])

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Notification" component={Notification} />
        {//<Tab.Screen name="Photo" component={SettingsScreen} />
        //<Tab.Screen name="Text" component={HomeScreen} />
  }
        <Tab.Screen name="Calculator" component={Calculator} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App
