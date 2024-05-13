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
    <View className="bg-[#89CFF3] flex w-full rounded-xl shadow-sm mt-3 shadow-[#ACA9A9]">
      <TouchableOpacity className="flex flex-row items-center py-3 rounded-xl" onPress={presentModal}>
        <View>
          <MaterialCommunityIcons name={`${props.serviceHistoryType?.toLowerCase() == 'laptop' ? 'laptop' : props.serviceHistoryType?.toLowerCase() == 'phone' ? 'cellphone' : props.serviceHistoryType?.toLowerCase() == 'pc' ? 'desktop-tower-monitor' : ''}`} color="#FFFFFF" size={90} /> 
        </View>

        <View className="flex gap-y-1">
          <Text className="text-base font-bold">{ props.serviceHistoryDeviceName }</Text>
          
          <View className="flex flex-row">
            <View className="flex flex-row gap-x-2">
                <MaterialCommunityIcons name="account" color="#222222" size={20} />
                <Text>{ props.serviceHistoryUser}</Text>    
            </View>
            <View className="flex flex-row gap-x-2 ml-2">
                <MaterialCommunityIcons name="tools" color="#222222" size={20} />
                <Text>{ props.serviceHistoryType?.replace(/^\w/, c => c.toUpperCase())} { props.serviceHistoryCategory }</Text>    
            </View>
          </View>

          <View className="flex flex-row gap-x-2">
            <MaterialCommunityIcons name="timelapse" color="#222222" size={20} />
            <Text>{ props.serviceHistoryStatus == 1 ? 'Waiting validation' : props.serviceHistoryStatus == 2 ? 'On going' : props.serviceHistoryStatus == 3 ? 'Completed' : ''}</Text>
          </View>
        </View>
      </TouchableOpacity>

    </View>

    
  )
}