import { View, Text } from 'react-native'
import React, { useCallback, useMemo, useRef } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import HistoryCard from '../../components/HistoryCard'
import HistoryCardDetail from '../../components/HistoryCardDetail'
import { StatusBar } from 'expo-status-bar'

export default function HistoryScreen({ route }) {
    const serviceHistoryUser = route.params?.serviceHistoryUser;
    const serviceHistoryDeviceName = route.params?.serviceHistoryDeviceName;
    const serviceHistoryCategory = route.params?.serviceHistoryCategory
    const serviceHistoryStore = route.params?.serviceHistoryStore;
    const serviceHistoryPrice = route.params?.serviceHistoryPrice;
    const serviceHistoryNotes = route.params?.serviceHistoryNotes;
    const serviceHistoryStatus = route.params?.serviceHistoryStatus;
    const serviceHistoryType = route.params?.serviceHistoryType;
    const serviceHistoryStartDate = route.params?.serviceHistoryStartDate;
    const serviceHistoryEndDate = route.params?.serviceHistoryEndDate;

    const bottomSheetModalRef = useRef(null);
    const snapPoints = ["80%"];

    const serviceHistory = [
        {
            id: 1,
            user: 'Vincent',
            device_name: "Samsung S11",
            category: 'Battery',
            store: "Store1",
            price: 300000,
            notes: 'tes',
            status: 3,
            type: 'phone',
            startDate: '05 January 2023',
            endDate: '06 January 2023',
        },
    ]
    return (
        <View className="flex flex-1 bg-main-background px-5 py-5">
            <View className="flex w-full h-full">
                <View className="flex justify-center items-center">
                { serviceHistory.map(allServiceHistory => (
                    <HistoryCard 
                        key = {allServiceHistory.id}
                        serviceHistoryUser = {allServiceHistory?.user}
                        serviceHistoryDeviceName = {allServiceHistory?.device_name}
                        serviceHistoryCategory = {allServiceHistory?.category}
                        serviceHistoryStore = {allServiceHistory?.store}
                        serviceHistoryPrice = {allServiceHistory?.price}
                        serviceHistoryNotes = {allServiceHistory?.notes}
                        serviceHistoryStatus = {allServiceHistory?.status}
                        serviceHistoryType = {allServiceHistory?.type}
                        serviceHistoryStartDate = {allServiceHistory?.startDate}
                        serviceHistoryEndDate = {allServiceHistory?.endDate}
                        bottomSheetModalRef = {bottomSheetModalRef}
                    />
                ))}
                </View>
            </View>

            <HistoryCardDetail 
                refs={bottomSheetModalRef} 
                index={0}
                snapPoints={snapPoints}
                serviceHistoryUser = {serviceHistoryUser}
                serviceHistoryDeviceName = {serviceHistoryDeviceName}
                serviceHistoryCategory = {serviceHistoryCategory}
                serviceHistoryStore = {serviceHistoryStore}
                serviceHistoryPrice = {serviceHistoryPrice}
                serviceHistoryNotes = {serviceHistoryNotes}
                serviceHistoryStatus = {serviceHistoryStatus}
                serviceHistoryType = {serviceHistoryType}
                serviceHistoryStartDate = {serviceHistoryStartDate}
                serviceHistoryEndDate = {serviceHistoryEndDate}
            />

            <StatusBar style="auto" />
        </View>
    )
}