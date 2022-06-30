import React from 'react'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import PushNotification from "react-native-push-notification"

// C46D5E, DAA588, F3C98B, 9CF6F6

export default function Notification() {

    function send() {
      PushNotification.localNotification({
        channelId: 'Nordstone',
        title: "Nordstone Alert!", 
        message: "Hello world, this is your super important notification, read or lose",
      });
    }
    
    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center',
        alignItems: 'center'}}>
            <TouchableOpacity onPress={send} style={{
              backgroundColor: '#F56960',
              padding: 20,
              borderRadius: 10
            }}>
              <Text style={{color: 'white', fontSize: 20}}>
                Send Notification
              </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
