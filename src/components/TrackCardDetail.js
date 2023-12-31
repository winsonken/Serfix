import { View, Text } from 'react-native'
import React, { useCallback, useMemo, useRef } from 'react'
import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetModalProvider,
    useBottomSheetModal
} from '@gorhom/bottom-sheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useFocusEffect } from '@react-navigation/native';

export default function TrackCardDetail(props) {
    const bottomSheetModalRef = useRef(null);

    // Close modal on button click
    function closeModal() {
      props.refs.current?.close();
    }

    // Close bottom modal while navigating to other page
    useFocusEffect(
      useCallback(() => {
        return () => props.refs.current?.close()
      }, [])
    );

  return (
    <BottomSheetModalProvider>
        <BottomSheetModal
            ref={props.refs}
            index={props.index}
            snapPoints={props.snapPoints}
            backdropComponent={({ style }) => (
                <View style={[style, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]} onStartShouldSetResponder={() => { props.refs.current?.close() }} />
              )}    
        >
          
            <View className="flex gap-y-3 justify-between h-full px-5">
              <Text className="text-xl text-main-blue font-bold">Track Service</Text>
              
              <View className="flex gap-y-2">
                <View className="flex flex-row justify-between items-center">
                  <View className="flex flex-row items-center gap-x-3">
                    <MaterialCommunityIcons name="tools" color="#222222" size={30} />
                    <Text className="text-lg">Service</Text>
                  </View>
                  <Text className="text-lg">{ props.serviceTrackService }</Text>
                </View>

                <View className="flex flex-row justify-between items-center">
                  <View className="flex flex-row items-center gap-x-3">
                    <MaterialCommunityIcons name="devices" color="#222222" size={30} />
                    <Text className="text-lg">Device</Text>
                  </View>
                  <Text className="text-lg">{ props.serviceTrackDevice }</Text>
                </View>

                <View className="flex flex-row justify-between items-center">
                  <View className="flex flex-row items-center gap-x-3">
                    <MaterialCommunityIcons name="currency-usd" color="#222222" size={30} />
                    <Text className="text-lg">Price</Text>
                  </View>
                  <Text className="text-lg">Rp. { props.serviceTrackPrice }</Text>
                </View>

                <View className="flex flex-row justify-between items-center">
                  <View className="flex flex-row items-center gap-x-3">
                    <MaterialCommunityIcons name="timelapse" color="#222222" size={30} />
                    <Text className="text-lg">Status</Text>
                  </View>
                  <Text className="text-lg">{ props.serviceTrackStatus }</Text>
                </View>

                <View className="flex flex-row justify-between items-center">
                  <View className="flex flex-row items-center gap-x-3">
                    <MaterialCommunityIcons name="calendar-month" color="#222222" size={30} />
                    <Text className="text-lg">Start date</Text>
                  </View>
                  <Text className="text-lg">{ props.serviceTrackStartDate }</Text>
                </View>

                <View className="flex flex-row justify-between items-center">
                  <View className="flex flex-row items-center gap-x-3">
                    <MaterialCommunityIcons name="alert-circle" color="#222222" size={30} />
                    <Text className="text-lg">Problem</Text>
                  </View>
                  <Text className="text-lg">{ props.serviceTrackProblem }</Text>
                </View>

                <View className="flex flex-row justify-between items-center">
                  <View className="flex flex-row items-center gap-x-3">
                    <MaterialCommunityIcons name="map-marker" color="#222222" size={30} />
                    <Text className="text-lg">Location</Text>
                  </View>
                  <Text className="text-lg">{ props.serviceTrackLocation }</Text>
                </View>
              </View>
              
              <TouchableOpacity className="bg-main-blue flex justify-center items-center p-3 rounded-md" onPress={closeModal}>
                <Text className="text-xl text-[#FFFFFF] font-medium">Finish</Text>
              </TouchableOpacity>
            </View>
        </BottomSheetModal>
    </BottomSheetModalProvider>
    
  )
}