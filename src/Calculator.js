import React, {useState} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    TextInput 
} from 'react-native'

export default function Calculator() {

    const [fNum, setFNum] = useState('')
    const [sNum, setSNum] = useState('')
    const [res, setRes] = useState('')

    function process() {
        fetch(`https://ns-calculator.heroku.app?f=${fNum}&s=${sNum}&o=add`)
            .then(response => response.json())
            .then(responseJson => {
                setRes(responseJson.res)
            })
    }

    return (
        <View>
            <TextInput placeholder="First number" onChangeText={val => setFNum(val)} />
            <TextInput placeholder="Second number" onChangeText={val => setSNum(val)} />
            <TouchableOpacity onPress={process}
                style={{padding: 15, margin: 10, backgroundColor: '#F56960'}}>
                <Text style={{fontSize: 10, color: 'white'}}>Add</Text>
            </TouchableOpacity>
            <Text style={{marginTop: 50, fontSize: 30}}>{res}</Text>
        </View>
    )
}