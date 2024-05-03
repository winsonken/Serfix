import { View, Text, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import axios from 'axios'

const ReportBugScreen = () => {
    const [bug, setBug] = useState("");
    const [desc, setDesc] = useState("");
    const navigation = useNavigation();
    axios.defaults.withCredentials = true;

    function handleSubmit() {
        axios.post('http://localhost:8082/helpcenter/reportbug', {bug, desc})
        .then(res => {
            console.log(res);
            alert('Terima kasih atas feedback anda');
            navigation.navigate('HomeScreen');
        }).catch(err => console.log(err));
    }

    return (
        <View className="flex flex-1 bg-main-background px-5 py-5">
            <ScrollView showsVerticalScrollIndicator={false} >
                <View className="w-full h-full flex gap-y-10 pt-5">
                    <View>
                        <Text className="text-2xl text-main-blue font-medium text-center">Found bug on this app?</Text>
                        <Text className="text-2xl text-main-blue font-medium text-center">Report below!</Text>
                    </View>

                    <View className="flex gap-y-5">
                        <View className="flex gap-y-3">
                            <Text className="text-xl font-bold">Bug type</Text>
                            <TextInput className="bg-second-blue rounded-md px-3 py-3" placeholder="Ex: app crashes" placeholderTextColor="#00A9FF" onChangeText={text => setBug(text)}/>
                        </View>

                        <View className="flex gap-y-3">
                            <Text className="text-xl font-bold">Description</Text>
                            <TextInput className="bg-second-blue rounded-md px-3 py-3" multiline textAlignVertical='top' numberOfLines={5} placeholderTextColor="#00A9FF" onChangeText={text => setDesc(text)}/>
                        </View>
                    </View>

                    <TouchableOpacity className="bg-main-blue px-5 py-3 rounded-md" onPress={handleSubmit}>
                        <Text className="text-base text-center text-[#FFFFFF] font-medium">Submit</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>

            <StatusBar style="auto" />
        </View>
    )
}

export default ReportBugScreen