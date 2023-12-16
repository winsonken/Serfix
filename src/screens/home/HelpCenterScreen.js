import { View, Text, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function HelpCenterScreen() {
    const navigation = useNavigation();

    return (
        <View className="flex flex-1 bg-main-background px-5 py-5">
            <View className="flex w-full h-full">
                <View className="flex justify-center items-center gap-y-5 flex-1">
                    <Text className="text-2xl font-black text-main-blue">Kendala yang dialami</Text>

                    <View className="flex flex-row items-center flex-wrap justify-center gap-2 w-full">
                        <TouchableOpacity className="bg-[#89CFF3] flex items-center px-2 py-1 rounded-xl shadow-sm shadow-[#ACA9A9]" onPress={() => { navigation.navigate('ReportBugScreen')}}>
                            <Image source={require('../../../assets/helpcenter/services-online.png')} className="w-[70px] h-[70px]" />
                            <Text className="text-xs font-bold mt-1">Services online</Text>
                        </TouchableOpacity>

                        <TouchableOpacity className="bg-[#89CFF3] flex items-center px-2 py-1 rounded-xl shadow-sm shadow-[#ACA9A9]" onPress={() => { navigation.navigate('ReportBugScreen')}}>
                            <Image source={require('../../../assets/helpcenter/payment.png')} className="w-[70px] h-[70px]" />
                            <Text className="text-xs font-bold  mt-1">Payment</Text>
                        </TouchableOpacity>

                        <TouchableOpacity className="bg-[#89CFF3] flex items-center px-2 py-1 rounded-xl shadow-sm shadow-[#ACA9A9]" onPress={() => { navigation.navigate('ReportBugScreen')}}>
                            <Image source={require('../../../assets/helpcenter/app-crash.png')} className="w-[70px] h-[70px]" />
                            <Text className="text-xs font-bold  mt-1">App crash</Text>
                        </TouchableOpacity>

                        <TouchableOpacity className="bg-[#89CFF3] flex items-center px-2 py-1 rounded-xl shadow-sm shadow-[#ACA9A9]" onPress={() => { navigation.navigate('ReportBugScreen')}}>
                            <Image source={require('../../../assets/helpcenter/account-privacy.png')} className="w-[70px] h-[70px]" />
                            <Text className="text-xs font-bold  mt-1">Account Privacy</Text>
                        </TouchableOpacity>

                        <TouchableOpacity className="bg-[#89CFF3] flex items-center px-2 py-1 rounded-xl shadow-sm shadow-[#ACA9A9]" onPress={() => { navigation.navigate('ReportBugScreen')}}>
                            <Image source={require('../../../assets/helpcenter/application-bug.png')} className="w-[70px] h-[70px]" />
                            <Text className="text-xs font-bold  mt-1">Application Bug</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}