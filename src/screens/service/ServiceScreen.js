import { View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import TrackCard from '../../components/TrackCard';
import TrackCardDetail from '../../components/TrackCardDetail';
import { StatusBar } from 'expo-status-bar';
import ServiceCard from '../../components/ServiceCard';
import ServiceCardDetail from '../../components/ServiceCardDetail';

export default function ServiceScreen({ route }) {
    const serviceUser = route.params?.serviceUser;
    const serviceDeviceName = route.params?.serviceDeviceName;
    const serviceCategory = route.params?.serviceCategory
    const serviceStore = route.params?.serviceStore;
    const servicePrice = route.params?.servicePrice;
    const serviceNotes = route.params?.serviceNotes;
    const serviceStatus = route.params?.serviceStatus;
    const serviceType = route.params?.serviceType;
    const serviceStartDate = route.params?.serviceStartDate;
    const serviceEndDate = route.params?.serviceEndDate;
    
    const service = [
        {
            id: 1,
            user: 'Jonathan',
            device_name: "Samsung S9",
            category: 'Battery',
            store: "Store1",
            price: 300000,
            notes: 'tes',
            status: 1,
            type: 'phone',
            startDate: '',
            endDate: '',
        },
        {
            id: 2,
            user: 'Jonathan',
            device_name: "Samsung S10",
            category: 'Battery',
            store: "Store1",
            price: 300000,
            notes: 'tes',
            status: 2,
            type: 'phone',
            startDate: '05 January 2023',
            endDate: '',
        },
        {
            id: 3,
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
    ];

    const tabs = [
        { id: 1, name: 'Service'},
        { id: 2, name: 'On going'},
        { id: 3, name: 'Completed'},
    ]

    const [activeTabs, setActiveTabs] = useState(1);
    const filterService = service?.filter(e => e?.status == activeTabs)

    const bottomSheetModalRef = useRef(null);
    const snapPoints = [activeTabs == 1 ? "100%" : "80%"];

    return (
        <View className="flex flex-1 px-5 py-5 bg-main-background">
            <View className="flex flex-row gap-2">
                { tabs?.map((allTabs, index) => (
                <TouchableWithoutFeedback key={allTabs?.id} onPress={() => setActiveTabs(allTabs?.id)}>
                    <View className={`px-3 py-2 ml-2 rounded-md ${activeTabs == allTabs?.id ? 'bg-main-blue' : 'bg-second-blue' }`}>
                        <Text className="font-bold">{allTabs?.name}</Text>
                    </View>
                </TouchableWithoutFeedback>
                ))}
            </View>
            <View className="flex w-full h-full">
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View className="flex justify-center items-center">
                    { filterService.map(allService => (
                        <ServiceCard
                            key = {allService?.id}
                            serviceUser = {allService?.user}
                            serviceDeviceName = {allService?.device_name}
                            serviceCategory = {allService?.category}
                            serviceStore = {allService?.store}
                            servicePrice = {allService?.price}
                            serviceNotes = {allService?.notes}
                            serviceStatus = {allService?.status}
                            serviceType = {allService?.type}
                            serviceStartDate = {allService?.startDate}
                            serviceEndDate = {allService?.endDate}
                            bottomSheetModalRef = {bottomSheetModalRef}
                        />
                    ))}
                    </View>
                </ScrollView>
            </View>
            
            <ServiceCardDetail 
                refs={bottomSheetModalRef} 
                index={0}
                snapPoints={snapPoints}
                serviceUser = {serviceUser}
                serviceDeviceName = {serviceDeviceName}
                serviceCategory = {serviceCategory}
                serviceStore = {serviceStore}
                servicePrice = {servicePrice}
                serviceNotes = {serviceNotes}
                serviceStatus = {serviceStatus}
                serviceType = {serviceType}
                serviceStartDate = {serviceStartDate}
                serviceEndDate = {serviceEndDate}
            />

            <StatusBar style="auto" />
        </View>
    )
}