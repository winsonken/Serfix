import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { Link, useNavigation } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function TrackCard( props ) {
  const navigation = useNavigation();
  function presentModal() {
    props.bottomSheetModalRef.current?.present();
    navigation.navigate('TrackScreen', { serviceTrackUser: props.serviceTrackUser, serviceTrackDeviceName: props.serviceTrackDeviceName, serviceTrackCategory: props.serviceTrackCategory, serviceTrackStore: props.serviceTrackStore, serviceTrackPrice: props.serviceTrackPrice, serviceTrackNotes: props.serviceTrackNotes, serviceTrackStatus: props.serviceTrackStatus, serviceTrackType: props.serviceTrackType, serviceTrackStartDate: props.serviceTrackStartDate })
  }

  return (
    <View className="bg-[#89CFF3] relative flex flex-row items-center w-full p-3 mt-3 rounded-xl shadow-sm shadow-[#ACA9A9]">
        <View>
          <MaterialCommunityIcons name={`${props.serviceTrackType?.toLowerCase() == 'laptop' ? 'laptop' : props.serviceTrackType?.toLowerCase() == 'phone' ? 'cellphone' : props.serviceTrackType?.toLowerCase() == 'pc' ? 'desktop-tower-monitor' : ''}`} color="#FFFFFF" size={90} /> 
        </View>

        <View className="flex gap-y-1">
          <Text className="text-base font-bold">{ props.serviceTrackDeviceName }</Text>
          
          <View className="flex flex-row">
            <View className="flex flex-row gap-x-2">
                <MaterialCommunityIcons name="account" color="#222222" size={20} />
                <Text>{ props.serviceTrackUser}</Text>    
            </View>
            <View className="flex flex-row gap-x-2 ml-2">
                <MaterialCommunityIcons name="tools" color="#222222" size={20} />
                <Text>{ props.serviceTrackType?.replace(/^\w/, c => c.toUpperCase())} { props.serviceTrackCategory }</Text>    
            </View>
          </View>

          <View className="flex flex-row gap-x-2">
            <MaterialCommunityIcons name="timelapse" color="#222222" size={20} />
            <Text>{ props.serviceTrackStatus == 1 ? 'Waiting validation' : props.serviceTrackStatus == 2 ? 'On going' : props.serviceTrackStatus == 3 ? 'Completed' : ''}</Text>
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