import { View, Text, Image, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    BottomSheetModal,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import ImageView from './ImageView';
import { useNavigation } from '@react-navigation/native'

function ServiceCardDetail(props) {
    const API_URL = process.env.EXPO_PUBLIC_API_URL;
    const bottomSheetModalRef = useRef(null);
    const [imageLoading, setImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);
    const [image, setImage] = useState('');
    const [isOpenPopUpImage, setIsOpenPopUpImage] = useState('');
    const [isOpenPopUpErrorImage, setIsOpenPopUpErrorImage] = useState(false);
    const [isOpenPopUpSuccess, setIsOpenPopUpSuccess] = useState(false);
    const [isOpenPopUpReject, setIsOpenPopUpReject] = useState(false);
    const [isOpenPopUpFinish, setIsOpenPopUpFinish] = useState(false);

    const handleApiCall = async (url, service) => {
        const serviceRequest = service;
        try {
            const id = props.serviceId;
            const response = await axios.put(`${url}/${id}`);
            serviceRequest == 'accept' ? setIsOpenPopUpSuccess(true) : serviceRequest == 'reject' ? setIsOpenPopUpReject(true) : setIsOpenPopUpFinish(true);
            props.refs.current?.close();
            props.fetchDataValidation(props.activeTabs); // Fetch the data immediately after the API call
        } catch (err) {
            console.log('Error:', err);
        }
    };

    const validation = () => handleApiCall(`${API_URL}admin-page-ongoing`, 'finish');
    const accept = () => handleApiCall(`${API_URL}admin-page-accept`, 'accept');
    const reject = () => handleApiCall(`${API_URL}admin-page-reject`, 'reject');

    const closeModal = () => props.refs.current?.close();

    useFocusEffect(
        useCallback(() => {
            return () => { 
                props.refs.current?.close();
                setIsOpenPopUpImage(false);
            }
        }, [])
    );

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleViewImage = (image) => {
        setImage(image);
        setIsOpenPopUpImage(true);
    }

    useEffect(() => {
        setIsOpenPopUpErrorImage(false);
        setImageError(false);
    }, [])

    return (
        <BottomSheetModalProvider>
            <BottomSheetModal
                ref={props.refs}
                index={props.index}
                snapPoints={props.snapPoints}
                backdropComponent={({ style }) => (
                    <View style={[style, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]} onStartShouldSetResponder={closeModal} />
                )}
            >
                <View className={`flex gap-y-3 h-full px-5`}>
                    <Text className="text-xl text-main-blue font-bold">{props.serviceStatus == 1 ? 'Service payment validation' : props.serviceStatus == 2 ? 'On going service' : props.serviceStatus == 3 ? 'Completed service' : props.serviceStatus == 4 ? 'Rejected service' : ''}</Text>
                    
                    <View className="flex gap-y-2">
                        { props.serviceStatus == 1 &&
                            <View className="flex flex-row justify-between items-center">
                                <View className="flex flex-row items-center gap-x-3">
                                    <MaterialCommunityIcons name="file-image" color="#222222" size={30} />
                                    <Text className="text-lg">Payment</Text>
                                </View>
                                <TouchableOpacity className="bg-gray-300 flex justify-center items-center px-2 py-1 rounded-md" onPress={() => {handleViewImage(props?.serviceImage)}}>
                                    <Text className="text-base">View image</Text>
                                </TouchableOpacity>
                            </View>                        
                        }

                        <View className="flex flex-row justify-between items-center">
                            <View className="flex flex-row items-center gap-x-3">
                                <MaterialCommunityIcons name="account" color="#222222" size={30} />
                                <Text className="text-lg">User</Text>
                            </View>
                            <Text className="text-lg">{props.serviceUser}</Text>
                        </View>

                        <View className="flex flex-row justify-between items-center">
                            <View className="flex flex-row items-center gap-x-3">
                                <MaterialCommunityIcons name="tools" color="#222222" size={30} />
                                <Text className="text-lg">Service</Text>
                            </View>
                            <Text className="text-lg">{props.serviceType?.replace(/^\w/, c => c.toUpperCase())}</Text>
                        </View>

                        <View className="flex flex-row justify-between items-center">
                            <View className="flex flex-row items-center gap-x-3">
                                <MaterialCommunityIcons name="devices" color="#222222" size={30} />
                                <Text className="text-lg">Device</Text>
                            </View>

                            <View className="flex items-end w-52">
                                <Text className="text-base">{props.serviceDeviceName}</Text>
                            </View>
                        </View>

                        <View className="flex flex-row justify-between items-center">
                            <View className="flex flex-row items-center gap-x-3">
                                <MaterialCommunityIcons name="currency-usd" color="#222222" size={30} />
                                <Text className="text-lg">Price</Text>
                            </View>
                            <Text className="text-lg">Rp. {props.servicePrice?.toLocaleString('id-ID')}</Text>
                        </View>

                        <View className="flex flex-row justify-between items-center">
                            <View className="flex flex-row items-center gap-x-3">
                                <MaterialCommunityIcons name="timelapse" color="#222222" size={30} />
                                <Text className="text-lg">Status</Text>
                            </View>
                            <Text className="text-lg">{props.serviceStatus == 1 ? 'Pending' : props.serviceStatus == 2 ? 'On going' : props.serviceStatus == 3 ? 'Completed' : props.serviceStatus == 4 ? 'Rejected' : ''}</Text>
                        </View>

                        {(props.serviceStatus == 2 || props.serviceStatus == 3) &&
                            <View className="flex flex-row justify-between items-center">
                                <View className="flex flex-row items-center gap-x-3">
                                    <MaterialCommunityIcons name="calendar-month" color="#222222" size={30} />
                                    <Text className="text-lg">Start date</Text>
                                </View>
                                <Text className="text-lg">{formatDate(props.serviceStartDate)}</Text>
                            </View>
                        }

                        {props.serviceStatus == 3 &&
                            <View className="flex flex-row justify-between items-center">
                                <View className="flex flex-row items-center gap-x-3">
                                    <MaterialCommunityIcons name="calendar-month" color="#222222" size={30} />
                                    <Text className="text-lg">End date</Text>
                                </View>
                                <Text className="text-lg">{formatDate(props.serviceEndDate)}</Text>
                            </View>
                        }

                        <View className="flex flex-row justify-between items-center">
                            <View className="flex flex-row items-center gap-x-3">
                                <MaterialCommunityIcons name="alert-circle" color="#222222" size={30} />
                                <Text className="text-lg">Problem</Text>
                            </View>
                            <Text className="text-lg">{props.serviceCategory}</Text>
                        </View>

                        <View className="flex flex-row justify-between items-center">
                            <View className="flex flex-row items-center gap-x-3">
                                <MaterialCommunityIcons name="map-marker" color="#222222" size={30} />
                                <Text className="text-lg">Location</Text>
                            </View>
                            <Text className="text-lg">{props.serviceStore}</Text>
                        </View>

                        <View className="flex flex-row justify-between items-center">
                            <View className="flex flex-row items-center gap-x-3">
                                <MaterialCommunityIcons name="message-bulleted" color="#222222" size={30} />
                                <Text className="text-base">Notes</Text>
                            </View>

                            <View className="flex items-end w-52">
                                <Text className="text-sm">{props.serviceNotes}</Text>
                            </View>
                        </View>
                    </View>

                    {props.serviceStatus == 1 &&
                        <View className="flex flex-row justify-end gap-3">
                            <TouchableOpacity className="bg-red-500 flex justify-center items-center px-5 py-2 rounded-lg" onPress={reject}>
                                <Text className="text-xl text-[#FFFFFF] font-medium">Reject</Text>
                            </TouchableOpacity>

                            <TouchableOpacity className="bg-green-500 flex justify-center items-center px-5 py-2 rounded-lg" onPress={accept}>
                                <Text className="text-xl text-[#FFFFFF] font-medium">Accept</Text>
                            </TouchableOpacity>
                        </View>
                    }

                    {props.serviceStatus == 2 &&
                        <TouchableOpacity className="bg-main-blue flex justify-center items-center p-3 rounded-lg" onPress={validation}>
                            <Text className="text-xl text-[#FFFFFF] font-medium">Finish</Text>
                        </TouchableOpacity>
                    }
                </View>
            </BottomSheetModal>
            <ImageView image={image} imageLoading={imageLoading} setImageLoading={setImageLoading} imageError={imageError} setImageError={setImageError} isOpenPopUpImage={isOpenPopUpImage} setIsOpenPopUpImage={setIsOpenPopUpImage} isOpenPopUpErrorImage={isOpenPopUpErrorImage} setIsOpenPopUpErrorImage={setIsOpenPopUpErrorImage}/>
            <PopUpService title="Service accepted" content="Service accepted succesfully!" isOpenPopUp={isOpenPopUpSuccess} setIsOpenPopUp={setIsOpenPopUpSuccess} />
            <PopUpService title="Service rejected" content="Service rejected succesfully!" isOpenPopUp={isOpenPopUpReject} setIsOpenPopUp={setIsOpenPopUpReject} />
            <PopUpService title="Service completed" content="Service completed succesfully!" isOpenPopUp={isOpenPopUpFinish} setIsOpenPopUp={setIsOpenPopUpFinish} />
        </BottomSheetModalProvider>
    );
}

export default ServiceCardDetail;

export function PopUpService(props) {
  const { title, content, isOpenPopUp, setIsOpenPopUp } = props;
  const navigation = useNavigation();

  const handleClick = () => {
    setIsOpenPopUp(false);
    
  }

  return (
    <View className={`absolute top-0 bottom-0 left-0 right-0 ${isOpenPopUp ? 'block' : 'hidden'}`} style={{ backgroundColor: 'rgba(34,34,34,0.3)' }}>
      <View className="w-full h-full flex justify-center items-center">
          <View className="bg-white w-4/5 h-fit min-h-32 flex justify-between rounded-md p-2">
            <View>
                <View className="flex flex-row justify-center items-center space-x-2">
                    <MaterialCommunityIcons name="check-circle" color="#65B741" size={30}/>
                    <Text className="text-xl font-medium text-center">{ title || 'Title'}</Text>
                </View>

                <View className="py-3">
                    <Text className="text-center">{content}</Text>
                </View>
            </View>

            <View className="flex items-center">
                <TouchableOpacity className="flex justify-center items-center bg-green-500 w-12 h-8 rounded-md" onPress={handleClick}>
                    <Text className="text-white font-bold">OK</Text>
                </TouchableOpacity>
            </View>
          </View>
      </View>
    </View>
  )
}