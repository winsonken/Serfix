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

function TrackCardDetail(props) {
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

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
  };

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
          
            <View className="flex gap-y-3 h-full px-5">
              <Text className="text-xl text-main-blue font-bold">Track Service</Text>
              
              <View className="flex gap-y-2">
                <View className="flex flex-row justify-between items-center">
                  <View className="flex flex-row items-center gap-x-3">
                    <MaterialCommunityIcons name="account" color="#222222" size={30} />
                    <Text className="text-lg">User</Text>
                  </View>
                  <Text className="text-lg">{ props.serviceTrackUser }</Text>
                </View>

                <View className="flex flex-row justify-between items-center">
                  <View className="flex flex-row items-center gap-x-3">
                    <MaterialCommunityIcons name="tools" color="#222222" size={30} />
                    <Text className="text-lg">Service</Text>
                  </View>
                  <Text className="text-lg">{ props.serviceTrackType?.replace(/^\w/, c => c.toUpperCase()) }</Text>
                </View>

                <View className="flex flex-row justify-between items-center">
                  <View className="flex flex-row items-center gap-x-3">
                    <MaterialCommunityIcons name="devices" color="#222222" size={30} />
                    <Text className="text-lg">Device</Text>
                  </View>
                  <Text className="text-lg">{ props.serviceTrackDeviceName }</Text>
                </View>

                <View className="flex flex-row justify-between items-center">
                  <View className="flex flex-row items-center gap-x-3">
                    <MaterialCommunityIcons name="currency-usd" color="#222222" size={30} />
                    <Text className="text-lg">Price</Text>
                  </View>
                  <Text className="text-lg">Rp. { props.serviceTrackPrice?.toLocaleString('id-ID') }</Text>
                </View>

                <View className="flex flex-row justify-between items-center">
                  <View className="flex flex-row items-center gap-x-3">
                    <MaterialCommunityIcons name="timelapse" color="#222222" size={30} />
                    <Text className="text-lg">Status</Text>
                  </View>
                  <Text className="text-lg">{ props.serviceTrackStatus == 2 ? 'On going' : '' }</Text>
                </View>

                <View className="flex flex-row justify-between items-center">
                  <View className="flex flex-row items-center gap-x-3">
                    <MaterialCommunityIcons name="calendar-month" color="#222222" size={30} />
                    <Text className="text-lg">Start date</Text>
                  </View>
                  <Text className="text-lg">{formatDate( props.serviceTrackStartDate )}</Text>
                </View>

                <View className="flex flex-row justify-between items-center">
                  <View className="flex flex-row items-center gap-x-3">
                    <MaterialCommunityIcons name="alert-circle" color="#222222" size={30} />
                    <Text className="text-lg">Problem</Text>
                  </View>
                  <Text className="text-lg">{ props.serviceTrackCategory }</Text>
                </View>

                <View className="flex flex-row justify-between items-center">
                  <View className="flex flex-row items-center gap-x-3">
                    <MaterialCommunityIcons name="map-marker" color="#222222" size={30} />
                    <Text className="text-lg">Location</Text>
                  </View>
                  <Text className="text-lg">{ props.serviceTrackStore }</Text>
                </View>

                <View className="flex flex-row justify-between items-center">
                  <View className="flex flex-row items-center gap-x-3">
                    <MaterialCommunityIcons name="message-bulleted" color="#222222" size={30} />
                    <Text className="text-lg">Notes</Text>
                  </View>
                  <Text className="text-lg">{ props.serviceTrackNotes }</Text>
                </View>
              </View>
            </View>
        </BottomSheetModal>
    </BottomSheetModalProvider>
    
  )
}

export default TrackCardDetail