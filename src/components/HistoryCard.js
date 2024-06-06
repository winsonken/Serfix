import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { Link, useNavigation } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function HistoryCard( props ) {
  const navigation = useNavigation();
  function presentModal() {
    props.bottomSheetModalRef.current?.present();
    navigation.navigate('HistoryScreen', { serviceHistoryUser: props.serviceHistoryUser, serviceHistoryDeviceName: props.serviceHistoryDeviceName, serviceHistoryCategory: props.serviceHistoryCategory, serviceHistoryStore: props.serviceHistoryStore, serviceHistoryPrice: props.serviceHistoryPrice, serviceHistoryNotes: props.serviceHistoryNotes, serviceHistoryStatus: props.serviceHistoryStatus, serviceHistoryType: props.serviceHistoryType, serviceHistoryStartDate: props.serviceHistoryStartDate, serviceHistoryEndDate: props.serviceHistoryEndDate })
  }

  return (
    <View className="bg-[#89CFF3] relative flex flex-row items-center w-full space-x-2 p-3 mt-3 rounded-xl shadow-sm shadow-[#ACA9A9]">
        <View>
          <MaterialCommunityIcons name={`${props.serviceHistoryType?.toLowerCase() == 'laptop' ? 'laptop' : props.serviceHistoryType?.toLowerCase() == 'phone' ? 'cellphone' : props.serviceHistoryType?.toLowerCase() == 'pc' ? 'desktop-tower-monitor' : ''}`} color="#FFFFFF" size={90} /> 
        </View>

        <View className="flex">
          <Text className="text-base font-bold mb-1">{ props.serviceHistoryDeviceName }</Text>
          
          <View className="flex">
            <View className="flex flex-row items-center space-x-1">
                <MaterialCommunityIcons name="account" color="#222222" size={15} />
                <Text className="text-xs">{ props.serviceHistoryUser}</Text>    
            </View>
            <View className="flex flex-row items-center space-x-1">
                <MaterialCommunityIcons name="tools" color="#222222" size={15} />
                <Text className="text-xs">{ props.serviceHistoryType?.replace(/^\w/, c => c.toUpperCase())} { props.serviceHistoryCategory }</Text>    
            </View>
          </View>

          <View className="flex flex-row items-center space-x-1">
              <MaterialCommunityIcons name="timelapse" color="#4d7c0f" size={15} />
              <Text className="font-bold text-xs text-green-700">{ props.serviceHistoryStatus == 3 ? 'Completed' : ''}</Text>
          </View>
        </View>

        <View className="absolute right-3 bottom-3">
            <TouchableOpacity className="bg-main-blue px-3 py-1 rounded-md" onPress={presentModal}>
                <Text className="text-sm text-[#FFFFFF] font-bold">View</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}