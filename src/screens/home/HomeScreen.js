import { View, Text, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

export default function HomeScreen() {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    return (
      <View className="flex flex-1 bg-main-background px-5" style={{ paddingTop: insets.top }}>
        
          <View className="w-full h-full flex justify-start items-center gap-y-5">

              <View className="w-full flex flex-row items-center">
                  <MaterialCommunityIcons name="account-circle" color="#00A9FF" size={35} onPress={() => { navigation.navigate('ProfileScreen') }}/>
                  <Text className="text-left text-lg font-medium ml-3">Welcome back, Vincent!</Text>
              </View>

              <View className="flex justify-center w-full">
                  <Image source={require('../../../assets/banner.png')} className="w-full rounded-md" /> 
              </View>

              <View className="flex flex-col gap-y-5 w-full">
                  <Text className="text-sm font-medium">Services</Text>
                  
                  <View className="flex flex-row justify-between">
                      <View className="flex gap-y-5 w-[30%]">
                          <TouchableOpacity onPress={() => navigation.navigate('LaptopScreen')} className="  flex items-center bg-[#E6FBFF] px-2 py-1 rounded-xl shadow-sm shadow-[#ACA9A9]">
                              <MaterialCommunityIcons name="laptop" color="#39A7FF" size={60} />
                          </TouchableOpacity>
                          <Text className="text-center text-xs font-medium">Laptop</Text>
                      </View>
                      
                      <View className="flex gap-y-5 w-[30%]">
                          <TouchableOpacity onPress={() => navigation.navigate('PhoneScreen')} className="flex items-center bg-[#E6FBFF] px-2 py-1 rounded-xl shadow-sm shadow-[#ACA9A9]">
                              <MaterialCommunityIcons name="cellphone" color="#39A7FF" size={60} />
                          </TouchableOpacity>
                          <Text className="text-center text-xs font-medium">Phone</Text>
                      </View>
                      
                      <View className="flex gap-y-5 w-[30%]">
                          <TouchableOpacity onPress={() => navigation.navigate('PCScreen')} className="flex items-center bg-[#E6FBFF] px-2 py-1 rounded-xl shadow-sm shadow-[#ACA9A9]">
                              <MaterialCommunityIcons name="desktop-tower-monitor" color="#39A7FF" size={60} />
                          </TouchableOpacity>
                          <Text className="text-center text-xs font-medium">PC</Text>
                      </View>
                  </View>
              </View>

              <View className="flex flex-row justify-between mt-3 w-full">
                  <View className="w-[45%]">
                    <TouchableOpacity className=" bg-[#E6FBFF] px-2 py-5 rounded-xl flex flex-row justify-around items-center shadow-sm shadow-[#ACA9A9]" onPress={() => navigation.navigate('HelpCenterScreen')}>
                        <View className="w-1/3 flex justify-center items-center">
                            <MaterialCommunityIcons name="headset" color="#39A7FF" size={30} />
                        </View>
                        <View className="w-[70%]">
                            <Text className="text-left text-base font-medium">Help center</Text>
                        </View>
                    </TouchableOpacity>
                  </View>

                  <View className="w-[45%]">
                    <TouchableOpacity className=" bg-[#E6FBFF] px-2 py-5 rounded-xl flex flex-row justify-around items-center shadow-sm shadow-[#ACA9A9]" onPress={() => navigation.navigate('FeedbackScreen')}>
                        <View className="w-1/3 flex justify-center items-center">
                            <MaterialCommunityIcons name="android-messages" color="#39A7FF" size={30} />
                        </View>
                        <View className="w-[70%]">
                            <Text className="text-left text-base font-medium">Feedback</Text>
                        </View>
                    </TouchableOpacity>
                  </View>
              </View>

              <View className="flex flex-row justify-between mt-3 w-full">
                  <View className="w-[45%]">
                    <TouchableOpacity className=" bg-[#E6FBFF] px-2 py-5 rounded-xl flex flex-row justify-around items-center shadow-sm shadow-[#ACA9A9]" onPress={() => navigation.navigate('AboutScreen')}>
                        <View className="w-1/3 flex justify-center items-center">
                            <MaterialCommunityIcons name="help-circle" color="#39A7FF" size={30} />
                        </View>
                        <View className="w-[70%]">
                            <Text className="text-left text-base font-medium">Why Serfix?</Text>
                        </View>                        
                    </TouchableOpacity>
                  </View>

                  <View className="w-[45%]">
                    <TouchableOpacity className=" bg-[#E6FBFF] px-2 py-5 rounded-xl flex flex-row justify-around items-center shadow-sm shadow-[#ACA9A9]" onPress={() => navigation.navigate('TermsScreen')}>
                        <View className="w-1/3 flex justify-center items-center">
                            <MaterialCommunityIcons name="file-check" color="#39A7FF" size={30} />
                        </View>
                        <View className="w-[70%]">
                            <Text className="text-left text-base font-medium">T & C</Text>
                        </View>
                    </TouchableOpacity>
                  </View>
              </View>
          </View>

          <StatusBar style="auto" />

      </View>
    )
}