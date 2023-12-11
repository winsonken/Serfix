import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { Link, useNavigation } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function TrackCard( props ) {
  const navigation = useNavigation();
  function presentModal() {
    props.bottomSheetModalRef.current?.present();
    navigation.navigate('TrackScreen', { serviceTrackDevice: props.serviceTrackDevice, serviceTrackLocation: props.serviceTrackLocation, serviceTrackPrice: props.serviceTrackPrice, serviceTrackProblem: props.serviceTrackProblem, serviceTrackService: props.serviceTrackService, serviceTrackStartDate: props.serviceTrackStartDate, serviceTrackStatus: props.serviceTrackStatus, serviceTrackIcon: props.serviceTrackIcon})
  }

  return (
    <View className="bg-[#89CFF3] relative flex flex-row items-center w-full p-3 mt-3 rounded-xl shadow-sm shadow-[#ACA9A9]">
        <View>
          <MaterialCommunityIcons name={`${props.serviceTrackIcon}`} color="#FFFFFF" size={90} />
        </View>

        <View className="flex gap-y-1 ml-3">
          <Text className="text-base font-bold">{ props.serviceTrackDevice }</Text>
          <Text>Service: { props.serviceTrackService} { props.serviceTrackProblem }</Text>    
          <Text>Status: { props.serviceTrackStatus }</Text>
        </View>

        <View className="absolute right-3 bottom-3">
            <TouchableOpacity className="bg-main-blue px-3 py-1 rounded-md" onPress={presentModal}>
                <Text className="text-sm text-[#FFFFFF] font-bold">Track</Text>
            </TouchableOpacity>
        </View>
    </View>

    
  )
}