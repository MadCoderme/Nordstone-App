import React, {useEffect, useState} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    TextInput, 
    StyleSheet,
    ToastAndroid,
} from 'react-native'
import auth from '@react-native-firebase/auth'

export default function ForgotPassword({ navigation }) {

    const [email, setEmail] = useState('')


    function reset() {
        ToastAndroid.show('Please wait...', ToastAndroid.SHORT)
        auth().sendPasswordResetEmail(email).then(e => {
            ToastAndroid.show('Password Reset Link has been Sent. Please check Inbox (also Spam folder)', ToastAndroid.LONG)
            navigation.navigate('login')
        })
        .catch(e => {
            ToastAndroid.show(e.toString(), ToastAndroid.SHORT)
        })
    }

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
            backgroundColor: '#1B2430'
        }}>
            <Text style={styles.title}>Forgot Password?</Text>
            <TextInput placeholder="Email" onChangeText={val => setEmail(val)} 
              style={styles.textInput} placeholderTextColor="white" />
            <TouchableOpacity onPress={reset} style={styles.button}>
                <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold',
                 textAlign: 'center' }}>Reset Password</Text>
            </TouchableOpacity>
            
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        color: '#D6D5A8',
        fontSize: 45,
        fontWeight: 'bold',
        borderBottomWidth: 2,
        borderBottomColor: '#816797',
        marginLeft: 20,
        marginBottom: 30,
        alignSelf: 'flex-start'
    },
    textInput : {
        width: '95%',
        margin: 5,
        marginVertical: 10,
        padding: 15,
        paddingHorizontal: 20,
        fontSize: 18,
        borderRadius: 20,
        backgroundColor: '#2B333E',
        color: 'white'
    },
    button : {
        padding: 15, 
        margin: 20, 
        marginBottom: 30,
        backgroundColor: '#F3C98B',
        borderRadius: 15,
        width: '90%'
    },
})