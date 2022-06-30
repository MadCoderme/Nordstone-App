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

export default function Signup({ navigation }) {

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    useEffect(() => {
        setPass('')
    }, [])


    function login() {
        if(email.endsWith('gmail.com') || email.endsWith('yahoo.com') || email.endsWith('hotmail.com')
         || email.endsWith('.co') || email.endsWith('.co.uk')) {
            ToastAndroid.show('Creating Account...', ToastAndroid.SHORT)
            auth().createUserWithEmailAndPassword(email, pass).then(e => {
                console.log(e)
            })
            .catch(e => {
                ToastAndroid.show(e.toString(), ToastAndroid.SHORT)
            })
        } else {
            ToastAndroid.show('Please use an Email address from trusted services', ToastAndroid.SHORT)
        }

    }

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
            backgroundColor: '#1B2430'
        }}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput placeholder="Email" onChangeText={val => setEmail(val)} 
              style={styles.textInput} value={email} placeholderTextColor="white" />
            <TextInput placeholder="Password" onChangeText={val => setPass(val)} 
              style={styles.textInput} value={pass} secureTextEntry placeholderTextColor="white" />
            <TouchableOpacity onPress={login} style={styles.button}>
                <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold',
                 textAlign: 'center' }}>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('login')}>
                <Text style={{color: 'white'}}>Already have an Account?</Text>
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
        backgroundColor: '#F3C98B',
        borderRadius: 15,
        width: '90%'
    },
})