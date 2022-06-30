import React, {useEffect, useState} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    ToastAndroid,
    Image,
    PermissionsAndroid
} from 'react-native'
import database from '@react-native-firebase/database'
import storage from '@react-native-firebase/storage'
import ImagePicker from 'react-native-image-crop-picker'
import Icon from 'react-native-vector-icons/AntDesign'

export default function Photo() {

    const [photo, setPhoto] = useState('')

    useEffect(() => {
        database().ref('/image')
            .on('value', snapshot => {
                setPhoto(snapshot.val())
            })
    }, [])

    function choose() {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
            upload(image)
          })
    }

    function capture() {
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA).then(e => {
            if(!e) {
                PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA).then(granted => {
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        ImagePicker.openCamera({
                            width: 300,
                            height: 400,
                            cropping: true,
                          }).then(image => {
                            upload(image)
                          })
                      } else {
                        ToastAndroid.show('Permission must be provided to capture with camera', ToastAndroid.SHORT)
                      }
                })
            } else {
                ImagePicker.openCamera({
                    width: 300,
                    height: 400,
                    cropping: true,
                  }).then(image => {
                    upload(image)
                  })
            }
        })
    }

    async function upload(img) {
        ToastAndroid.show('Uploading your Image...', ToastAndroid.SHORT)
        await storage().ref(img.modificationDate).putFile(img.path)
        
        const url = await storage().ref(img.modificationDate).getDownloadURL()
        await database().ref('/image').set(url)
        ToastAndroid.show('Successfully Uploaded image!', ToastAndroid.SHORT)
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

            <View style={styles.remoteBox}> 
                {photo ? <Image source={{uri: photo}} style={{height: 200, width: 200, borderRadius: 20}} /> : null}
            </View>
            <View style={{height: 1, width: '90%', backgroundColor: '#F3C98B', marginVertical: 5, marginBottom: 20}} />
            <Text style={{fontSize: 20, color :'#D6D5A8',
                fontWeight: 'bold',
                borderBottomWidth: 2,
                borderBottomColor: '#816797'}}>Upload Photo</Text>
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={capture} style={styles.button}>
                    <Icon name="camera" size={30} />
                </TouchableOpacity>
                
                <TouchableOpacity onPress={choose} style={styles.button}>
                    <Icon name="addfile" size={30} />
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    textInput : {
        width: '70%',
        backgroundColor: 'white',
        margin: 5,
        padding: 20,
        borderRadius: 10,
        fontSize: 20,
        textAlign: 'center'
    },
    button : {
        padding: 35, 
        margin: 20, 
        backgroundColor: '#DAA588',
        borderRadius: 15
    },
    remoteBox: {
        marginBottom: 60,
        borderRadius: 20,
        maxWidth: '80%',
        padding: 20
    }
})