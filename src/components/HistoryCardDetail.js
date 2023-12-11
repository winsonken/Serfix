import { View, Text } from 'react-native'
import React, { useCallback, useMemo, useRef } from 'react'
import {
    BottomSheetModal,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useFocusEffect } from '@react-navigation/native';

export default function HistoryCardDetail(props) {
    const bottomSheetModalRef = useRef(null);

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
                <View style={[style, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]} />
            )}
        >
            <View className="flex gap-y-3 px-5">
              <Text className="text-xl text-main-blue font-bold">Service history detail</Text>
              
              <View className="flex gap-y-2">
                <View className="flex flex-row justify-between items-center">
                  <View className="flex flex-row items-center gap-x-3">
                    <MaterialCommunityIcons name="tools" color="#222222" size={30} />
                    <Text className="text-lg">Service</Text>
                  </View>
                  <Text className="text-lg">{ props.serviceHistoryService }</Text>
                </View>

                <View className="flex flex-row justify-between items-center">
                  <View className="flex flex-row items-center gap-x-3">
                    <MaterialCommunityIcons name="devices" color="#222222" size={30} />
                    <Text className="text-lg">Device</Text>
                  </View>
                  <Text className="text-lg">{ props.serviceHistoryDevice }</Text>
                </View>

                <View className="flex flex-row justify-between items-center">
                  <View className="flex flex-row items-center gap-x-3">
                    <MaterialCommunityIcons name="currency-usd" color="#222222" size={30} />
                    <Text className="text-lg">Price</Text>
                  </View>
                  <Text className="text-lg">Rp. { props.serviceHistoryPrice }</Text>
                </View>

                <View className="flex flex-row justify-between items-center">
                  <View className="flex flex-row items-center gap-x-3">
                    <MaterialCommunityIcons name="timelapse" color="#222222" size={30} />
                    <Text className="text-lg">Status</Text>
                  </View>
                  <Text className="text-lg">{ props.serviceHistoryStatus }</Text>
                </View>

                <View className="flex flex-row justify-between items-center">
                  <View className="flex flex-row items-center gap-x-3">
                    <MaterialCommunityIcons name="calendar-month" color="#222222" size={30} />
                    <Text className="text-lg">Start date</Text>
                  </View>
                  <Text className="text-lg">{ props.serviceHistoryStartDate }</Text>
                </View>

                <View className="flex flex-row justify-between items-center">
                  <View className="flex flex-row items-center gap-x-3">
                    <MaterialCommunityIcons name="calendar-month" color="#222222" size={30} />
                    <Text className="text-lg">Finish date</Text>
                  </View>
                  <Text className="text-lg">{ props.serviceHistoryFinishDate }</Text>
                </View>

                <View className="flex flex-row justify-between items-center">
                  <View className="flex flex-row items-center gap-x-3">
                    <MaterialCommunityIcons name="alert-circle" color="#222222" size={30} />
                    <Text className="text-lg">Problem</Text>
                  </View>
                  <Text className="text-lg">{ props.serviceHistoryProblem }</Text>
                </View>

                <View className="flex flex-row justify-between items-center">
                  <View className="flex flex-row items-center gap-x-3">
                    <MaterialCommunityIcons name="calendar-clock" color="#222222" size={30} />
                    <Text className="text-lg">Warranty</Text>
                  </View>
                  <Text className="text-lg">{ props.serviceHistoryWarrantyDate }</Text>
                </View>

                <View className="flex flex-row justify-between items-center">
                  <View className="flex flex-row items-center gap-x-3">
                    <MaterialCommunityIcons name="map-marker" color="#222222" size={30} />
                    <Text className="text-lg">Location</Text>
                  </View>
                  <Text className="text-lg">{ props.serviceHistoryLocation }</Text>
                </View>
              </View>
            </View>
        </BottomSheetModal>
    </BottomSheetModalProvider>
    
  )
}