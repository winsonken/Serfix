import { View, Text, Pressable, Image, ScrollView } from 'react-native'
import React from 'react'
import { Link, useNavigation } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function TrackCard( props ) {
  const navigation = useNavigation();
  function presentModal() {
    props.bottomSheetModalRef.current?.present();
    navigation.navigate('TrackScreen', { serviceTrackUser: props.serviceTrackUser, serviceTrackImage: props.serviceTrackImage, serviceTrackDeviceName: props.serviceTrackDeviceName, serviceTrackCategory: props.serviceTrackCategory, serviceTrackStore: props.serviceTrackStore, serviceTrackPrice: props.serviceTrackPrice, serviceTrackNotes: props.serviceTrackNotes, serviceTrackStatus: props.serviceTrackStatus, serviceTrackType: props.serviceTrackType, serviceTrackStartDate: props.serviceTrackStartDate })
  }

  return (
    <View className="bg-[#89CFF3] relative flex flex-row items-center w-full space-x-2 p-3 mt-3 rounded-xl shadow-sm shadow-[#ACA9A9]">
        <View>
          <MaterialCommunityIcons name={`${props.serviceTrackType?.toLowerCase() == 'laptop' ? 'laptop' : props.serviceTrackType?.toLowerCase() == 'phone' ? 'cellphone' : props.serviceTrackType?.toLowerCase() == 'pc' ? 'desktop-tower-monitor' : ''}`} color="#FFFFFF" size={90} /> 
        </View>

        <View className="flex space-y-1">
          <Text className="text-base font-bold">{ props.serviceTrackDeviceName }</Text>
          
          <View className="flex flex-row">
            <View className="flex flex-row">
                <MaterialCommunityIcons name="account" color="#222222" size={20} />
                <Text>{ props.serviceTrackUser}</Text>    
            </View>
            <View className="flex flex-row space-x-1 ml-2">
                <MaterialCommunityIcons name="tools" color="#222222" size={20} />
                <Text>{ props.serviceTrackType?.replace(/^\w/, c => c.toUpperCase())} { props.serviceTrackCategory }</Text>    
            </View>
          </View>

          <View className="flex flex-row space-x-1">
            <MaterialCommunityIcons name="timelapse" color={`${props.serviceTrackStatus == 1 ? '#fde047' : props.serviceTrackStatus == 2 ? '#6b7280' : props.serviceTrackStatus == 4 ? '#dc2626' : '#222222'}`} size={20} />
            <Text className={`font-bold ${props.serviceTrackStatus == 1 ? 'text-yellow-300' : props.serviceTrackStatus == 2 ? 'text-gray-500' : props.serviceTrackStatus == 4 ? 'text-red-600' : ''}`}>{ props.serviceTrackStatus == 1 ? 'Pending' : props.serviceTrackStatus == 2 ? 'On going' : props.serviceTrackStatus == 3 ? 'Completed' : props.serviceTrackStatus == 4 ? 'Rejected' : ''}</Text>
          </View>
        </View>

        <View className="absolute right-3 bottom-3">
            <TouchableOpacity className="bg-main-blue px-3 py-1 rounded-md" onPress={presentModal}>
                <Text className="text-sm text-[#FFFFFF] font-bold">Track</Text>
            </TouchableOpacity>
        </View>
    </View>

    
  )
}