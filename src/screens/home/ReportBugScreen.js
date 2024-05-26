import { View, Text, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import axios from 'axios'
import PopUpSuccess from '../../components/PopUpSuccess'

const ReportBugScreen = () => {
    const API_URL = process.env.EXPO_PUBLIC_API_URL;
    const [bug, setBug] = useState("");
    const [desc, setDesc] = useState("");
    const navigation = useNavigation();
    const [errors, setErrors] = useState({ bug: '', desc: ''});
    const [isOpenPopUp, setIsOpenPopUp] = useState(false);

    axios.defaults.withCredentials = true;

    function handleSubmit() {
        // Reset errors
        setErrors({ bug: '', desc: ''});

        // Validate inputs
        if (!bug) {
            setErrors(prev => ({ ...prev, bug: 'Bug cannot be empty' }));
            return;
        }
        if (!desc) {
            setErrors(prev => ({ ...prev, desc: 'Description cannot be empty' }));
            return;
        }

        axios.post(`${API_URL}helpcenter/reportbug`, {bug, desc})
        .then(res => {
            setIsOpenPopUp(true)
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
                        <View>
                            <View className="flex gap-y-3">
                                <Text className="text-xl font-bold">Bug type</Text>
                                <TextInput className="bg-second-blue rounded-md px-3 py-3" placeholder="Ex: app crashes" placeholderTextColor="#00A9FF" onChangeText={text => setBug(text)}/>
                            </View>
                            {errors.bug ? <Text className="text-red-500">{errors.bug}</Text> : null}
                        </View>

                        <View>
                            <View className="flex gap-y-3">
                                <Text className="text-xl font-bold">Description</Text>
                                <TextInput className="bg-second-blue rounded-md px-3 py-3" placeholder="Write bug description" multiline textAlignVertical='top' numberOfLines={5} placeholderTextColor="#00A9FF" onChangeText={text => setDesc(text)}/>
                            </View>
                            {errors.desc ? <Text className="text-red-500">{errors.desc}</Text> : null}
                        </View>
                    </View>

                    <TouchableOpacity className="bg-main-blue px-5 py-3 rounded-md" onPress={handleSubmit}>
                        <Text className="text-base text-center text-[#FFFFFF] font-medium">Submit</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>

            <PopUpSuccess title="Report success" content="Thanks for your report!" isOpenPopUp={isOpenPopUp} setIsOpenPopUp={setIsOpenPopUp} />
            <StatusBar style="auto" />
        </View>
    )
}

export default ReportBugScreen