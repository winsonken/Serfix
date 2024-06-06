import { View, Text } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ServiceCard(props) {
    const navigation = useNavigation();

    const presentModal = () => {
        props.bottomSheetModalRef.current?.present();
        navigation.navigate('ServiceScreen', {
            serviceId: props.serviceId,
            serviceUser: props.serviceUser,
            serviceDeviceName: props.serviceDeviceName,
            serviceCategory: props.serviceCategory,
            serviceStore: props.serviceStore,
            servicePrice: props.servicePrice,
            serviceNotes: props.serviceNotes,
            serviceStatus: props.serviceStatus,
            serviceType: props.serviceType,
            serviceStartDate: props.serviceStartDate,
            serviceEndDate: props.serviceEndDate,
            serviceImage : props.serviceImage,
            fetchDataValidation: props.fetchDataValidation,
            activeTabs: props.activeTabs,
        });
    };

    return (
        <View className="bg-[#89CFF3] relative flex flex-row items-center w-full space-x-2 p-3 mt-3 rounded-xl shadow-sm shadow-[#ACA9A9]">
            <View>
                <MaterialCommunityIcons name={`${props.serviceType?.toLowerCase() == 'laptop' ? 'laptop' : props.serviceType?.toLowerCase() == 'phone' ? 'cellphone' : props.serviceType?.toLowerCase() == 'pc' ? 'desktop-tower-monitor' : ''}`} color="#FFFFFF" size={90} />
            </View>

            <View className="flex">
                <Text className="text-base font-bold mb-1">{props.serviceDeviceName}</Text>

                <View className="flex">
                    <View className="flex flex-row items-center space-x-1">
                        <MaterialCommunityIcons name="account" color="#222222" size={15} />
                        <Text className="text-xs">{props.serviceUser}</Text>
                    </View>
                    <View className="flex flex-row items-center space-x-1">
                        <MaterialCommunityIcons name="tools" color="#222222" size={15} />
                        <Text className="text-xs">{props.serviceType?.replace(/^\w/, c => c.toUpperCase())} {props.serviceCategory}</Text>
                    </View>
                </View>

                <View className="flex flex-row items-center space-x-1">
                    <MaterialCommunityIcons name="timelapse" color={`${props.serviceStatus == 1 ? '#ca8a04' : props.serviceStatus == 2 ? '#6b7280' : props.serviceStatus == 3 ? '#4d7c0f' : props.serviceStatus == 4 ? '#dc2626' : '#222222'}`} size={15} />
                    <Text className={`font-bold text-xs ${props.serviceStatus == 1 ? 'text-yellow-600' : props.serviceStatus == 2 ? 'text-gray-500' : props.serviceStatus == 3 ? 'text-green-700' : props.serviceStatus == 4 ? 'text-red-600' : ''}`}>{props.serviceStatus == 1 ? 'Pending' : props.serviceStatus == 2 ? 'On going' : props.serviceStatus == 3 ? 'Completed' : props.serviceStatus == 4 ? 'Rejected' : ''}</Text>
                </View>
            </View>

            <View className="absolute right-3 bottom-3">
                <TouchableOpacity className="bg-main-blue px-3 py-1 rounded-md" onPress={presentModal}>
                    <Text className="text-sm text-[#FFFFFF] font-bold">View</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
