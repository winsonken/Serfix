import { View, Text, TextInput, ScrollView } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

export default function ReportBugScreen() {
    const navigation = useNavigation();
    return (
        <View className="flex flex-1 bg-main-background px-5 py-5">
            <ScrollView showsVerticalScrollIndicator={false} >
                <View className="w-full h-full flex gap-y-10 pt-5">
                    <View>
                        <Text className="text-2xl text-main-blue font-medium text-center">Anda menemukan bug?</Text>
                        <Text className="text-2xl text-main-blue font-medium text-center">laporkan sekarang</Text>
                    </View>

                    <View className="flex gap-y-5">
                        <View className="flex gap-y-3">
                            <Text className="text-xl font-bold">Bug type</Text>
                            <TextInput className="bg-second-blue rounded-md px-3 py-3" placeholder="Ex: app crashes" placeholderTextColor="#00A9FF"/>
                        </View>

                        <View className="flex gap-y-3">
                            <Text className="text-xl font-bold">Description</Text>
                            <TextInput className="bg-second-blue rounded-md px-3 py-3" multiline textAlignVertical='top' numberOfLines={5} placeholderTextColor="#00A9FF" />
                        </View>
                    </View>

                    <TouchableOpacity className="bg-main-blue px-5 py-3 rounded-md" onPress={() => {navigation.navigate('HomeScreen') }}>
                        <Text className="text-base text-center text-[#FFFFFF] font-medium">Submit</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </View>
    )
}