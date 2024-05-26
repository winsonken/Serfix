import { View, Text, Image, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import axios from 'axios'
import PopUpSuccess from '../../components/PopUpSuccess'

const FeedbackScreen = () => {
    const API_URL = process.env.EXPO_PUBLIC_API_URL;
    const [feedback, setFeedback] = useState("");
    const navigation = useNavigation();
    const [errors, setErrors] = useState({ feedback: ''});
    const [isOpenPopUp, setIsOpenPopUp] = useState(false);
    axios.defaults.withCredentials = true;

    function handleSubmit() {
        // Reset errors
        setErrors({ feedback: ''});

        // Validate inputs
        if (!feedback) {
            setErrors(prev => ({ ...prev, feedback: 'Feedback & suggestion cannot be empty' }));
            return;
        }
        
        axios.post(`${API_URL}feedback`, {feedback})
        .then(res => {
            setIsOpenPopUp(true);
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
                            <View>
                                <View className="flex gap-y-3 w-full">
                                    <Text className="text-base text-center font-medium text-main-blue">Leave your feedback & suggestion here</Text>
                                    <TextInput className="bg-[#CDF5FD] py-3 px-3 rounded-md" multiline textAlignVertical='top' numberOfLines={5} placeholderTextColor="#39A7FF" onChangeText={text => setFeedback(text)}/>
                                </View>
                                {errors.feedback ? <Text className="text-red-500">{errors.feedback}</Text> : null}
                            </View>

                            <TouchableOpacity className="bg-main-blue px-5 py-3 rounded-md" onPress={handleSubmit}>
                                <Text className="text-base text-center text-[#FFFFFF] font-medium">Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>

            <PopUpSuccess title="Feedback success" content="Thanks for your feedback & suggestion!" isOpenPopUp={isOpenPopUp} setIsOpenPopUp={setIsOpenPopUp} />
            <StatusBar style="auto" />
        </View>
    )
}

export default FeedbackScreen