import { View, Text, Image, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import axios from 'axios'

const FeedbackScreen = () => {
    const [feedback, setFeedback] = useState("");
    const navigation = useNavigation();
    axios.defaults.withCredentials = true;

    function handleSubmit() {
        axios.post('http://192.168.100.7:8082/feedback', {feedback})
        .then(res => {
            console.log(res);
            alert('Terima kasih atas feedback anda');
            navigation.navigate('HomeScreen');
        }).catch(err => console.log(err));
    }
    return (
        <View className="flex flex-1 bg-main-background px-5 py-5">
            <View className="flex w-full h-full">
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View className="flex items-center">
                        <Text className="text-base text-center text-main-blue font-bold">We would like your feedback & suggestion to improve our application</Text>
                        <Image source={require('../../../assets/feedback-suggestion.png')} className="w-[200px] h-[200px]" />
                        <View className="flex gap-y-3 w-full">
                            <Text className="text-base text-center font-medium text-main-blue">Leave your feedback & suggestion here</Text>
                            <TextInput className="bg-[#CDF5FD] py-3 px-3 rounded-md" multiline textAlignVertical='top' numberOfLines={5} placeholderTextColor="#39A7FF" onChangeText={text => setFeedback(text)}/>
                            <TouchableOpacity className="bg-main-blue px-5 py-3 rounded-md" onPress={handleSubmit}>
                                <Text className="text-base text-center text-[#FFFFFF] font-medium">Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>

            <StatusBar style="auto" />
        </View>
    )
}

export default FeedbackScreen