import { View, Text } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'


export default function ProfileScreen() {
    const navigation = useNavigation();
    
    return (
    <View className="flex flex-1 bg-main-background px-2 py-5">
      
      <View className="flex w-full h-full">
        <View className="bg-[#FFFFFF] px-3 py-5 flex flex-row justify-between items-center rounded-lg shadow-sm shadow-[#ACA9A9] border-b border-[#CCCCCC]">
          <View className="flex flex-row items-center gap-x-3">
            <MaterialCommunityIcons name="account" color="#00A9FF" size={30} />
            <Text className="text-base font-medium">Username</Text>
          </View>

          <View>
            <Text className="text-[#ACA9A9] font-bold text-base">Vincent</Text>
          </View>
        </View>

        <View className="bg-[#FFFFFF] px-3 py-5 flex flex-row justify-between items-center rounded-lg shadow-sm shadow-[#ACA9A9] border-b border-[#CCCCCC]">
          <View className="flex flex-row items-center gap-x-3">
            <MaterialCommunityIcons name="email" color="#00A9FF" size={30} />
            <Text className="text-base font-medium">Email</Text>
          </View>

          <View>
            <Text className="text-[#ACA9A9] font-bold text-base">example.email@gmail.com</Text>
          </View>
        </View>

        <View className="bg-[#FFFFFF] px-3 py-5 flex flex-row justify-between items-center rounded-lg shadow-sm shadow-[#ACA9A9] border-b border-[#CCCCCC]">
          <View className="flex flex-row items-center gap-x-3">
            <MaterialCommunityIcons name="phone" color="#00A9FF" size={30} />
            <Text className="text-base font-medium">Phone</Text>
          </View>

          <View>
            <Text className="text-[#ACA9A9] font-bold text-base">123456789</Text>
          </View>
        </View>

        <View className="bg-[#FFFFFF] px-3 py-5 flex flex-row justify-between items-center rounded-lg shadow-sm shadow-[#ACA9A9] border-b border-[#CCCCCC]">
          <View className="flex flex-row items-center gap-x-3">
            <MaterialCommunityIcons name="lock" color="#00A9FF" size={30} />
            <Text className="text-base font-medium">Password</Text>
          </View>

          <View>
            <Text className="text-[#ACA9A9] font-bold text-base">**********</Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => { navigation.navigate('HomePage', {screen: 'HelpCenterScreen'}) }} className="bg-[#FFFFFF] px-3 py-5 flex flex-row justify-between items-center rounded-lg shadow-sm shadow-[#ACA9A9] border-b border-[#CCCCCC]">
          <View className="flex flex-row items-center gap-x-3">
            <MaterialCommunityIcons name="help-circle" color="#00A9FF" size={30} />
            <Text className="text-base font-medium">Help Center</Text>
          </View>

          <View>
            <Text className="text-[#ACA9A9] font-bold text-base"></Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => { navigation.navigate('LoginScreen') }} className="bg-main-blue px-3 py-3 mt-5 flex flex-row justify-center items-center rounded-lg shadow-sm shadow-[#ACA9A9]">
          <View className="flex flex-row items-center gap-x-3">
            <MaterialCommunityIcons name="logout" color="#FFFFFF" size={30} />
            <Text className="text-base font-medium text-[#FFFFFF]">Logout</Text>
          </View>

          <View>
            <Text className="text-[#ACA9A9] font-bold text-base"></Text>
          </View>
        </TouchableOpacity>
        
      </View>

    </View>
    )
}