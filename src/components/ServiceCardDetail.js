import { View, Text, Image } from 'react-native'
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
import axios from 'axios'

function ServiceCardDetail(props) {
    const bottomSheetModalRef = useRef(null);

    // Close modal on button click
    function validation() {
      const id = props.serviceId;
      axios.put(`http://localhost:8081/admin-page-ongoing/${id}`)
        .then(res => {
            console.log(res);
            alert('Berhasil', 'Data telah berhasil diupdate.')
            props.refs.current?.close();
            props.fetchDataValidation();
        }).catch(err => console.log(err));
      
    }

    function accept() {
      const id = props.serviceId;
      axios.put(`http://localhost:8081/admin-page-accept/${id}`)
        .then(res => {
            console.log(res);
            alert('Berhasil', 'Data telah berhasil diupdate.')
            props.refs.current?.close();
            props.fetchDataValidation();
        }).catch(err => console.log(err));
      
    }

    function reject() {
      const id = props.serviceId;
      axios.put(`http://localhost:8081/admin-page-reject/${id}`)
        .then(res => {
            console.log(res);
            alert('Berhasil', 'Data telah berhasil diupdate.')
            props.refs.current?.close();
            props.fetchDataValidation();
        }).catch(err => console.log(err));
      
    }
 
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
              <Text className="text-xl text-main-blue font-bold">{ props.serviceStatus == 1 ? 'Service payment validation' : props.serviceStatus == 2 ? 'On going service' : props.serviceStatus == 3 ? 'Completed service' : ''}</Text>
              
              { props.serviceStatus == 1 &&
                <View className="flex justify-center w-full">
                    <Image source={require('../../assets/banner.png')} className="w-full h-32 rounded-md" /> 
                </View>
              }
              
              <View className="flex gap-y-2">
                <View className="flex flex-row justify-between items-center">
                  <View className="flex flex-row items-center gap-x-3">
                    <MaterialCommunityIcons name="account" color="#222222" size={30} />
                    <Text className="text-lg">User</Text>
                  </View>
                  <Text className="text-lg">{ props.serviceUser }</Text>
                </View>

                <View className="flex flex-row justify-between items-center">
                  <View className="flex flex-row items-center gap-x-3">
                    <MaterialCommunityIcons name="tools" color="#222222" size={30} />
                    <Text className="text-lg">Service</Text>
                  </View>
                  <Text className="text-lg">{ props.serviceType?.replace(/^\w/, c => c.toUpperCase()) }</Text>
                </View>

                <View className="flex flex-row justify-between items-center">
                  <View className="flex flex-row items-center gap-x-3">
                    <MaterialCommunityIcons name="devices" color="#222222" size={30} />
                    <Text className="text-lg">Device</Text>
                  </View>
                  <Text className="text-lg">{ props.serviceDeviceName }</Text>
                </View>

                <View className="flex flex-row justify-between items-center">
                  <View className="flex flex-row items-center gap-x-3">
                    <MaterialCommunityIcons name="currency-usd" color="#222222" size={30} />
                    <Text className="text-lg">Price</Text>
                  </View>
                  <Text className="text-lg">Rp. { props.servicePrice }</Text>
                </View>

                <View className="flex flex-row justify-between items-center">
                  <View className="flex flex-row items-center gap-x-3">
                    <MaterialCommunityIcons name="timelapse" color="#222222" size={30} />
                    <Text className="text-lg">Status</Text>
                  </View>
                  <Text className="text-lg">{ props.serviceStatus == 1 ? 'Waiting validation' : props.serviceStatus == 2 ? 'On going' : props.serviceStatus == 3 ? 'Completed' : ''}</Text>
                </View>

                { (props.serviceStatus == 2 || props.serviceStatus == 3) &&
                        <View className="flex flex-row justify-between items-center">
                            <View className="flex flex-row items-center gap-x-3">
                                <MaterialCommunityIcons name="calendar-month" color="#222222" size={30} />
                                <Text className="text-lg">Start date</Text>
                            </View>
                            <Text className="text-lg">{ props.serviceStartDate }</Text>
                        </View>
                }

                { props.serviceStatus == 3 && 
                    <View className="flex flex-row justify-between items-center">
                        <View className="flex flex-row items-center gap-x-3">
                            <MaterialCommunityIcons name="calendar-month" color="#222222" size={30} />
                            <Text className="text-lg">End date</Text>
                        </View>
                        <Text className="text-lg">{ props.serviceEndDate }</Text>
                    </View>
                }


                <View className="flex flex-row justify-between items-center">
                  <View className="flex flex-row items-center gap-x-3">
                    <MaterialCommunityIcons name="alert-circle" color="#222222" size={30} />
                    <Text className="text-lg">Problem</Text>
                  </View>
                  <Text className="text-lg">{ props.serviceCategory }</Text>
                </View>

                <View className="flex flex-row justify-between items-center">
                  <View className="flex flex-row items-center gap-x-3">
                    <MaterialCommunityIcons name="map-marker" color="#222222" size={30} />
                    <Text className="text-lg">Location</Text>
                  </View>
                  <Text className="text-lg">{ props.serviceStore }</Text>
                </View>

                <View className="flex flex-row justify-between items-center">
                  <View className="flex flex-row items-center gap-x-3">
                    <MaterialCommunityIcons name="message-bulleted" color="#222222" size={30} />
                    <Text className="text-lg">Notes</Text>
                  </View>
                  <Text className="text-lg">{ props.serviceNotes }</Text>
                </View>
              </View>

              { props.serviceStatus == 1 &&
                <View className="flex flex-row justify-end gap-3">
                    <TouchableOpacity className="bg-red-500 flex justify-center items-center px-3 py-2 rounded-md" onPress={reject}>
                        <Text className="text-xl text-[#FFFFFF] font-medium">Reject</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="bg-green-500 flex justify-center items-center px-3 py-2 rounded-md" onPress={accept}>
                        <Text className="text-xl text-[#FFFFFF] font-medium">Accept</Text>
                    </TouchableOpacity>
                </View>
              }
              
              { props.serviceStatus == 2 &&
                <TouchableOpacity className="bg-main-blue flex justify-center items-center p-3 rounded-md" onPress={validation}>
                    <Text className="text-xl text-[#FFFFFF] font-medium">Finish</Text>
                </TouchableOpacity>
              }
            </View>
        </BottomSheetModal>
    </BottomSheetModalProvider>
    
  )
}

export default ServiceCardDetail;