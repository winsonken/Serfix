import { View, Text, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';

export default function PaymentScreen() {
    const navigation = useNavigation();

    return (
        <View className="flex flex-1 bg-main-background px-5 py-5">
            <View className="w-full h-full flex gap-y-10 pt-5">
                <View className="flex bg-second-blue h-fit rounded-sm px-5 py-3 gap-y-3">
                    <Text className="font-bold text-xl">Payment details</Text>

                    <View className="flex w-full">
                        <View className="border-b-2 border-dotted pb-8">
                            <View className="flex flex-row justify-between">
                                <Text className="text-xl">Type</Text>
                                <Text className="text-xl">Phone LCD Service</Text>
                            </View>
                            
                            <View className="flex flex-row justify-between">
                                <Text className="text-xl">Cost</Text>
                                <Text className="text-xl">Rp. 5000000</Text>
                            </View>
                        </View>

                        <View className="flex flex-row justify-between items-center pt-5">
                            <Text className="text-xl">Total</Text>
                            <Text className="text-2xl text-[#2AB31E] font-medium">Rp. 5000000</Text>
                        </View>
                    </View>
                </View>

                <View className="flex gap-y-5">
                    <Text className="text-center text-xl text-[#ACA9A9] font-medium">Payment Method</Text>

                    <View className="flex flex-row justify-between items-center">
                        <View className="w-[30%]">
                            <TouchableOpacity className="flex justify-between items-center bg-second-blue rounded-md h-24" onPress={() => { navigation.navigate('PaymentSuccessScreen')}}>
                                <Image source={require('../../../assets/payment/credit-card.png')} />
                                <Text className="font-medium pb-1">Credit Card</Text>
                            </TouchableOpacity>
                        </View>

                        <View className="w-[30%]">
                            <TouchableOpacity className="flex justify-between items-center bg-second-blue rounded-md h-24" onPress={() => { navigation.navigate('PaymentSuccessScreen')}}>
                                <Image source={require('../../../assets/payment/transfer.png')} />
                                <Text className="font-medium pb-1">Transfer</Text>
                            </TouchableOpacity>
                        </View>

                        
                        <View className="w-[30%]">
                            <TouchableOpacity className="flex justify-between items-center bg-second-blue rounded-md h-24" onPress={() => { navigation.navigate('PaymentSuccessScreen')}}>
                                <Image source={require('../../../assets/payment/e-money.png')} className="mt-3" />
                                <Text className="font-medium pb-1">E-money</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}