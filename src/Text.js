import React, {useEffect, useState} from 'react'
import {
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    TextInput, 
    StyleSheet,
    ToastAndroid
} from 'react-native'
import database from '@react-native-firebase/database'

export default function TextScreen() {

    const [localText, setLocalText] = useState('')
    const [remoteText, setRemoteText] = useState('')

    useEffect(() => {
        database().ref('/text')
            .on('value', snapshot => {
                setRemoteText(snapshot.val())
                ToastAndroid.show('Update fetched from remote DB', ToastAndroid.SHORT)
            })
    }, [])

    function send() {
        database()
            .ref('/text')
            .set(localText)
    }

    return (
        <ScrollView style={{
            flex: 1,
            paddingTop: 60,
            padding: 20,
            backgroundColor: '#1B2430'
        }} contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center'}}>
            <Text style={{
                color: '#D6D5A8',
                fontSize: 45,
                fontWeight: 'bold',
                marginBottom: 100,
                borderBottomWidth: 2,
                borderBottomColor: '#816797'
            }}>Text Update</Text>

            <View style={styles.remoteBox}> 
                <Text style={{fontSize: 25, fontWeight: 'bold', textAlign: 'center'}}>Text:</Text>
                <Text style={{fontSize: 20, textAlign: 'center'}}>
                    {remoteText ? remoteText : '[No Text is Saved on Remote]'}</Text>
            </View>

            <TextInput placeholder="Write something..." onChangeText={val => setLocalText(val)} 
              style={styles.textInput}
              placeholderTextColor="white" multiline />
            <TouchableOpacity onPress={send} style={styles.button}>
                <Text style={{fontSize: 20, color: 'black', textAlign: 'center' }}>Send</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    textInput : {
        width: '70%',
        color: 'white',
        backgroundColor: '#2B333E',
        margin: 5,
        padding: 20,
        borderRadius: 10,
        fontSize: 20,
        textAlign: 'center'
    },
    button : {
        width: '60%',
        padding: 15, 
        margin: 20, 
        backgroundColor: '#F3C98B',
        borderRadius: 15
    },
    remoteBox: {
        marginBottom: 60,
        backgroundColor: '#9CF6F6',
        borderRadius: 20,
        maxWidth: '80%',
        padding: 20,
        minWidth: 150
    }
})