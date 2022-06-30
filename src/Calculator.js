import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    TextInput 
} from 'react-native'

export default function Calculator() {
    return (
        <View>
            <TextInput placeholder="First number" />
            <TextInput placeholder="Second number" />
        </View>
    )
}