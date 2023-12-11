import { View, Text, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function PaymentSuccessScreen() {
    const navigation = useNavigation();

    return (
        <View className="flex flex-1 bg-main-background px-5 py-5">
            <View className="w-full h-full flex justify-around">
                <View className="flex flex-col justify-center items-center gap-y-5">
                    <Image source={require("../../../assets/payment/payment-success.png")} className="" />
                    <Text className="text-main-blue text-2xl font-bold">Payment success!</Text>
                </View>

                <View className="flex justify-center items-center gap-y-5">
                    <View className="w-full">
                        <TouchableOpacity className="w-full bg-main-blue py-3 justify-center items-center rounded-md" onPress={() => { navigation.navigate('HomeScreen' )}}>
                            <Text className="text-[#FFFFFF] text-lg font-medium">Back to Home</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => { navigation.navigate('TrackPage', {screen: 'TrackScreen'})}}>
                        <Text className="text-lg font-medium">Track Service</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}