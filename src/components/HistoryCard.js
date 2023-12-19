import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { Link, useNavigation } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function HistoryCard( props ) {
  const navigation = useNavigation();
  function presentModal() {
    props.bottomSheetModalRef.current?.present();
    navigation.navigate('HistoryScreen', { serviceHistoryDevice: props.serviceHistoryDevice, serviceHistoryLocation: props.serviceHistoryLocation, serviceHistoryPrice: props.serviceHistoryPrice, serviceHistoryProblem: props.serviceHistoryProblem, serviceHistoryService: props.serviceHistoryService, serviceHistoryStartDate: props.serviceHistoryStartDate, serviceHistoryFinishDate: props.serviceHistoryFinishDate, serviceHistoryWarranty: props.serviceHistoryWarranty,  serviceHistoryWarrantyDate: props.serviceHistoryWarrantyDate, serviceHistoryStatus: props.serviceHistoryStatus, serviceHistoryIcon: props.serviceHistoryIcon})
  }

  return (
    <View className="bg-[#89CFF3] flex w-full rounded-xl shadow-sm mt-3 shadow-[#ACA9A9]">
      <TouchableOpacity className="flex flex-row items-center p-3 rounded-xl" onPress={presentModal}>
        <View>
          <MaterialCommunityIcons name={`${props.serviceHistoryIcon}`} color="#FFFFFF" size={90} />
        </View>

        <View className="flex gap-y-1 ml-3">
          <Text className="text-base font-bold">{ props.serviceHistoryDevice }</Text>
          <Text>Service: { props.serviceHistoryService} { props.serviceHistoryProblem }</Text>    
          <Text>Warranty: { props.serviceHistoryWarranty }</Text>
        </View>
      </TouchableOpacity>

    </View>

    
  )
}