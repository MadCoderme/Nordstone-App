import React, {useState} from 'react'
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    TextInput, 
    StyleSheet,
    ToastAndroid
} from 'react-native'

export default function Calculator() {

    const [fNum, setFNum] = useState('')
    const [sNum, setSNum] = useState('')
    const [res, setRes] = useState('')
    const [currAction, setCurrAction] = useState('add')

    function process() {
        ToastAndroid.show('Loading...', ToastAndroid.SHORT)
        fetch(`https://ns-calculator.herokuapp.com?f=${fNum}&s=${sNum}&o=${currAction}`)
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson)
                setRes(responseJson.res)
            })
            .catch(err => ToastAndroid.show('Something went wrong', ToastAndroid.SHORT))
    }

    const getSign = (t) => {
        let val = ''
        switch (t) {
            case 'add':
                val = '+'
                break
            case 'minus':
                val = '-'
                break
            case 'multiply':
                val = '*'
                break
            case 'divide':
                val = '/'
                break
            default: 
                break
        }

        return val
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
            }}>Calculator</Text>

            <TextInput placeholder="First number" onChangeText={val => setFNum(val)} style={styles.textInput} 
            keyboardType="numeric" placeholderTextColor="white" />
            <View style={styles.actionsHolder}>
                {['add', 'minus', 'multiply', 'divide'].map((i, v) => (
                    <TouchableOpacity style={[styles.box, {backgroundColor: 
                    currAction == i ? '#F3C98B': 'white'}]}
                       onPress={() => setCurrAction(i)} key={i}>
                        <Text style={{
                            fontSize: 30
                        }}>{getSign(i)}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <TextInput placeholder="Second number" onChangeText={val => setSNum(val)} style={styles.textInput}
              keyboardType="numeric"  placeholderTextColor="white" />
            <TouchableOpacity onPress={process} style={styles.button}>
                <Text style={{fontSize: 20, color: 'black', textAlign: 'center' }}>Calculate</Text>
            </TouchableOpacity>
            <Text style={{marginTop: 30, fontSize: 30, color: 'white',}}>Result: {res}</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    textInput : {
        width: '80%',
        backgroundColor: '#2B333E',
        margin: 5,
        padding: 20,
        borderRadius: 10,
        fontSize: 20,
        textAlign: 'center',
        color: 'white'
    },
    button : {
        width: '60%',
        padding: 15, 
        margin: 20, 
        backgroundColor: '#F3C98B',
        borderRadius: 15
    },
    actionsHolder: {
        flexDirection: 'row',
        width: '80%',
        justifyContent: 'space-evenly',
        margin: 20
    },
    box : {
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 20
    }
})