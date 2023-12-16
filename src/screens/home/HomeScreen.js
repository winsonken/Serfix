import { View, Text, Image } from 'react-native'
import React from 'react'
import { Link, useNavigation } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function HomeScreen() {
  const navigation = useNavigation();
    return (
      <View className="flex flex-1 bg-main-background px-5 pt-12">
          <View className="w-full h-full flex justify-start items-center gap-y-5">

              <View className="w-full flex flex-row items-center">
                  <MaterialCommunityIcons name="account-circle" color="#CCCCCC" size={35} onPress={() => { navigation.navigate('ProfileScreen') }}/>
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

              {/* <View className="flex w-full gap-y-5">
                  <View className="flex flex-row justify-between">
                      <Text className="text-sm font-medium">Top product</Text>
                      <Text className="text-[#39A7FF] font-medium">View all</Text>
                  </View>

                  <View className="bg-[#E6FBFF] h-full">
                      <Text>Laptop LCD</Text>
                  </View>
              </View> */}

              {/* <View className="bg-main-blue w-full flex flex-row justify-center items-center h-1/5 rounded">
                    <MaterialCommunityIcons name="help-circle" color="#FFFFFF" size={40} />
                  <Text className="text-3xl text-[#FFFFFF] font-medium ml-3">Why serfix?</Text>
              </View> */}
          </View>

      </View>
    )
}