import { View, Text, ScrollView } from 'react-native'
import React, { useCallback, useMemo, useRef } from 'react'
import TrackCard from '../../components/TrackCard';
import TrackCardDetail from '../../components/TrackCardDetail';

export default function TrackScreen({ route }) {
    const serviceTrackDevice = route.params?.serviceTrackDevice;
    const serviceTrackLocation = route.params?.serviceTrackLocation;
    const serviceTrackPrice = route.params?.serviceTrackPrice;
    const serviceTrackProblem = route.params?.serviceTrackProblem;
    const serviceTrackService = route.params?.serviceTrackService;
    const serviceTrackStartDate = route.params?.serviceTrackStartDate;
    const serviceTrackStatus = route.params?.serviceTrackStatus;
    const serviceTrackIcon = route.params?.serviceTrackIcon;
    
    const bottomSheetModalRef = useRef(null);
    const snapPoints = ["70%"];
    
    const serviceTrack = [
    {
        id: 1,
        device: "Samsung S9",
        location: "Store1",
        price: 300000,
        service: 'Phone',
        problem: 'LCD',
        startDate: '05 January 2023',
        status: 'On going',
        icon: 'cellphone'
    },
    {
        id: 2,
        device: "Macbook Pro 13",
        location: "Store1",
        price: 4000000,
        problem: 'LCD',
        service: 'Laptop',
        startDate: '05 January 2023',
        status: 'On going',
        icon: 'laptop'
    },
    {
        id: 3,
        device: "PC",
        location: "Store2",
        price: 4000000,
        problem: 'LCD',
        service: 'PC',
        startDate: '05 January 2023',
        status: 'On going',
        icon: 'desktop-tower-monitor'
    }
];

    return (
        <View className="flex flex-1 px-5 py-5 bg-main-background">
            <View className="flex w-full h-full">
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View className="flex justify-center items-center">
                    { serviceTrack.map(allServiceTrack => (
                        <TrackCard 
                            key = {allServiceTrack.id}
                            serviceTrackDevice = {allServiceTrack.device}
                            serviceTrackLocation = {allServiceTrack.location}
                            serviceTrackPrice = {allServiceTrack.price}
                            serviceTrackProblem = {allServiceTrack.problem}
                            serviceTrackService = {allServiceTrack.service}
                            serviceTrackStartDate = {allServiceTrack.startDate}
                            serviceTrackStatus = {allServiceTrack.status}
                            serviceTrackIcon = {allServiceTrack.icon}
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
                serviceTrackDevice = {serviceTrackDevice}
                serviceTrackLocation = {serviceTrackLocation}
                serviceTrackPrice = {serviceTrackPrice}
                serviceTrackProblem = {serviceTrackProblem}
                serviceTrackService = {serviceTrackService}
                serviceTrackStartDate = {serviceTrackStartDate}
                serviceTrackStatus = {serviceTrackStatus}
                serviceTrackIcon = {serviceTrackIcon}
            />
        </View>
    )
}