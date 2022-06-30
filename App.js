import React from 'react'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

//screens
import Notification from './src/Notification'
import Calculator from './src/Calculator'

const Tab = createBottomTabNavigator()
const App = () => {
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  return (
    <Tab.Navigator>
      <Tab.Screen name="Notification" component={Notification} />
      <Tab.Screen name="Photo" component={SettingsScreen} />
      <Tab.Screen name="Text" component={HomeScreen} />
      <Tab.Screen name="Calculator" component={Calculator} />
    </Tab.Navigator>
  )
}

export default App
