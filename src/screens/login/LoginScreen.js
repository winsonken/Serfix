import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Link, useNavigation } from '@react-navigation/native'

export default function LoginScreen() {
    const navigation = useNavigation();

    return (
        <View className="flex flex-1 bg-main-background px-5">
            <View className="w-full h-full flex justify-center items-center gap-y-3 px-5">
                <View className="">
                    <Image source={require("../../../assets/login-img.png")} className="w-[230px] h-[230px]" />
                </View>

                <View className="flex justify-center items-center gap-y-8 w-full">
                    <View className="mx-auto">
                        <Text className="text-main-blue text-xl font-bold">Welcome back, please login</Text>
                    </View>

                    <View className="flex gap-y-5 w-full">
                        <View>
                            <TextInput placeholder="Email" className="bg-second-blue px-3 py-2 rounded-md placeholder:text-main-blue" placeholderTextColor="#00A9FF" />
                        </View>

                        <View>
                            <TextInput placeholder="Password" className="bg-second-blue px-3 py-2 rounded-md placeholder:text-main-blue" placeholderTextColor="#00A9FF" />
                        </View>
                    </View>

                    <View className="w-full">
                        <TouchableOpacity onPress={() => { navigation.navigate('HomePage')}} className="bg-main-blue w-full py-2 rounded-lg">
                            <Text className="text-center text-main-text text-lg font-medium">Log In</Text>
                        </TouchableOpacity>
                    </View>


                    <View className="flex flex-row items-center gap-1 mt-3">
                        <Text className="text-lg">Don’t have an account?</Text>
                        <Link to={{ screen: 'RegisterScreen'}}>
                            <Text className="text-lg text-main-blue font-medium">Sign up</Text>
                        </Link>
                    </View>
                </View>
            </View>
        </View>
    )
}