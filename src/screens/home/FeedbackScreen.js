import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

export default function FeedbackScreen() {
    const navigation = useNavigation();
    return (
        <View className="flex flex-1 bg-main-background px-5 py-5">
            <View className="flex w-full h-full">
                <View className="flex items-center">
                    <Text className="text-base text-center text-main-blue font-bold">We would like your feedback & suggestion to improve our application</Text>
                    <Image source={require('../../../assets/feedback-suggestion.png')} className="w-[200px] h-[200px]" />
                    <View className="flex gap-y-3 w-full">
                        <Text className="text-base text-center font-medium text-main-blue">Leave your feedback & suggestion here</Text>
                        <TextInput className="bg-[#CDF5FD] h-1/3 py-3 px-3 rounded-sm" multiline />
                        <TouchableOpacity className="bg-main-blue px-5 py-3 rounded-md" onPress={() => {navigation.navigate('HomeScreen') }}>
                            <Text className="text-base text-center text-[#FFFFFF] font-medium">Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}