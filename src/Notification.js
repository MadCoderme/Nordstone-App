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
import auth from '@react-native-firebase/auth'

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
        alignItems: 'center', backgroundColor: '#1B2430'}}>
          <Text style={{
            color: '#D6D5A8',
            fontSize: 45,
            fontWeight: 'bold',
            marginBottom: 100,
            borderBottomWidth: 2,
            borderBottomColor: '#816797'
          }}>Notifications</Text>
            <TouchableOpacity onPress={send} style={{
              backgroundColor: '#F56960',
              padding: 20,
              borderRadius: 10
            }}>
              <Text style={{color: 'white', fontSize: 20}}>
                Send Notification
              </Text>

            </TouchableOpacity>

            <TouchableOpacity onPress={() => auth().signOut()}>
                <Text style={{color: 'white', marginTop: 30}}>Log Out</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
