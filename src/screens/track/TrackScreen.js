import { View, Text, ScrollView } from 'react-native'
import React, { useCallback, useMemo, useRef } from 'react'
import TrackCard from '../../components/TrackCard';
import TrackCardDetail from '../../components/TrackCardDetail';
import { StatusBar } from 'expo-status-bar';

export default function TrackScreen({ route }) {
    const serviceTrackUser = route.params?.serviceTrackUser;
    const serviceTrackDeviceName = route.params?.serviceTrackDeviceName;
    const serviceTrackCategory = route.params?.serviceTrackCategory
    const serviceTrackStore = route.params?.serviceTrackStore;
    const serviceTrackPrice = route.params?.serviceTrackPrice;
    const serviceTrackNotes = route.params?.serviceTrackNotes;
    const serviceTrackStatus = route.params?.serviceTrackStatus;
    const serviceTrackType = route.params?.serviceTrackType;
    const serviceTrackStartDate = route.params?.serviceTrackStartDate;
    
    const bottomSheetModalRef = useRef(null);
    const snapPoints = ["80%"];
    
    const serviceTrack = [
        {
            id: 1,
            user: 'Vincent',
            device_name: "Samsung S11",
            category: 'Battery',
            store: "Store1",
            price: 300000,
            notes: 'tes',
            status: 2,
            type: 'phone',
            startDate: '05 January 2023',
            endDate: '06 January 2023',
        },
];

    return (
        <View className="flex flex-1 px-5 py-5 bg-main-background">
            <View className="flex w-full h-full">
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View className="flex justify-center items-center">
                    { serviceTrack.map(allServiceTrack => (
                        <TrackCard 
                            key = {allServiceTrack?.id}
                            serviceTrackUser = {allServiceTrack?.user}
                            serviceTrackDeviceName = {allServiceTrack?.device_name}
                            serviceTrackCategory = {allServiceTrack?.category}
                            serviceTrackStore = {allServiceTrack?.store}
                            serviceTrackPrice = {allServiceTrack?.price}
                            serviceTrackNotes = {allServiceTrack?.notes}
                            serviceTrackStatus = {allServiceTrack?.status}
                            serviceTrackType = {allServiceTrack?.type}
                            serviceTrackStartDate = {allServiceTrack?.startDate}
                            bottomSheetModalRef = {bottomSheetModalRef}
                        />
                    ))}
                    </View>
                </ScrollView>
            </View>
            
            <TrackCardDetail 
                refs={bottomSheetModalRef} 
                index={0}
                snapPoints={snapPoints}
                serviceTrackUser = {serviceTrackUser}
                serviceTrackDeviceName = {serviceTrackDeviceName}
                serviceTrackCategory = {serviceTrackCategory}
                serviceTrackStore = {serviceTrackStore}
                serviceTrackPrice = {serviceTrackPrice}
                serviceTrackNotes = {serviceTrackNotes}
                serviceTrackStatus = {serviceTrackStatus}
                serviceTrackType = {serviceTrackType}
                serviceTrackStartDate = {serviceTrackStartDate}
            />

            <StatusBar style="auto" />
        </View>
    )
}