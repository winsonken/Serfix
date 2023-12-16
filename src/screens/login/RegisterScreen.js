import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { Link, useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function RegisterScreen() {
    const navigation = useNavigation();

    return (
        <View className="flex flex-1 bg-main-background px-5">
            <View className="w-full h-full flex justify-center items-center gap-y-3 px-5">
                <View className="">
                    <Image source={require("../../../assets/register-img.png")} className="w-[200px] h-[200px]" />
                </View>
                
                <View className="flex justify-center items-center gap-y-5 w-full">
                    <View className="mx-auto">
                        <Text className="text-main-blue text-3xl font-bold">Register</Text>
                    </View>

                    <View className="flex gap-y-5 w-full">
                        <View>
                            <TextInput placeholder="Name" className="bg-second-blue px-3 py-2 rounded-md placeholder:text-main-blue" placeholderTextColor="#00A9FF" />
                        </View>

                        <View>
                            <TextInput placeholder="Email" className="bg-second-blue px-3 py-2 rounded-md placeholder:text-main-blue" placeholderTextColor="#00A9FF" />
                        </View>

                        <View>
                            <TextInput placeholder="Phone number" className="bg-second-blue px-3 py-2 rounded-md placeholder:text-main-blue" placeholderTextColor="#00A9FF" />
                        </View>

                        <View>
                            <TextInput placeholder="Password" className="bg-second-blue px-3 py-2 rounded-md placeholder:text-main-blue" placeholderTextColor="#00A9FF" />
                        </View>
                    </View>

                    <View className="w-full">
                        <TouchableOpacity onPress={() => { navigation.navigate('HomePage')}} className="bg-main-blue w-full py-2 rounded-lg">
                            <Text className="text-center text-main-text text-lg font-medium">Register</Text>
                        </TouchableOpacity>
                    </View>

                    <View className="flex flex-row items-center gap-1 mt-3">
                        <Text className="text-lg">Already have account?</Text>
                        <Link to={{ screen: 'LoginScreen'}}>
                            <Text className="text-lg text-main-blue font-medium">Login</Text>
                        </Link>
                    </View>
                </View>
            </View>
        </View>
    )
}