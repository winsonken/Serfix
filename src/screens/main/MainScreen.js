import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MainScreen() {
    const navigation = useNavigation();
    const [token, setToken] = useState('');

    AsyncStorage.getItem('token').then(value => {
        setToken(value);
    });

    useEffect(() => {
        if (token) {
            navigation.navigate('HomePage');
        }
    }, [token]);    

    return (
        <View className="flex flex-1 bg-main-background px-2 py-12">
            <View className="w-full h-full flex justify-evenly items-center">
                <View className="w-full flex justify-center items-center">
                    <Image source={require('../../../assets/serfix-logo.png')} className="w-[350px] h-[350px]"/> 
                    <Text className="text-xl -mt-24">Fix Your Problem</Text>
                </View>

                <View className="w-4/5">
                    <TouchableOpacity onPress={() => { navigation.navigate('LoginScreen')}} className="bg-main-blue w-full py-5 rounded-full">
                        <Text className="text-center text-main-text text-xl font-medium">Let's get started</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
            <StatusBar style="auto" />
        </View>
    )
}